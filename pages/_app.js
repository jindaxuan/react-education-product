import App, { Container } from 'next/app'
import React from 'react'
import Layout from '../components/layout/layout'
// redux步骤一，导入store/index   其中persistor是store持久化使用
import { initStore, persistor } from '../store'

// store持久化步骤2导入persisGate组件
import { PersistGate } from 'redux-persist/integration/react'

// redux步骤二，从next-redux-wraper中导入withRedux
import withRedux from 'next-redux-wrapper'

// redux步骤三，导入一个provider组件，将来作为layout的父组件
import { Provider } from 'react-redux'


// 1.0 低版本浏览器中可以正常使用promise兼容性处理   
// 为什么是在_app.js中导入somorphic-fetch和es6-promise？ 
// A：因为在Next.js中解析一个组件前会先解析_app.js，所以在 _app.js中全局导入好somorphic-fetch和es6- promise后，在其他所有组件中就能正常使用了

require('es6-promise').polyfill(); 
/*Next.js项目中有一种数据请求是会在组件的await async getInitialProps()方法中去请求数据，
而 getInitialProps方法会在nodejs服务器执行，不会在浏览器中执行 保证在nodejs环境中也能利用isomorphic‐fetch请求数据服务api，需要全局导入一下 */
import 'isomorphic-fetch'



class MyApp extends App {
  获取子组件的props对象
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    /*判断子组件是否有getInitialProps，如果有则调用子组件的getInitialProps，可以在子组件中getInitialProps返回同一个key
     的不同值，类实现是否加载局部组件*/

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    // 展开运算符必须放在最后，所有pageProps要放在最后
    const { Component, store, ...pageProps } = this.props
    return (
      <Container>
        {/* 通过provider拿到store传入到所有的子组件 */}
        <Provider store={store}>

          {/* store持久化步骤3 ，将PersisterGate组件当做layout的跟组件 */}
          <PersistGate persistor={persistor}>
            {/* 调用Layout布局组件并完成子组件Component内容的显示 */}
            <Layout Component={Component} {...pageProps}></Layout>
          </PersistGate>
        </Provider>
      </Container>
    )
  }
}
// redux步骤四：包装myapp，使得store能够绑定到myapp中的props上
export default withRedux(initStore)(MyApp)
