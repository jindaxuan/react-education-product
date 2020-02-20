import React from 'react'
import Link from 'next/link'
import Head from 'next/head'  // 在head中通过link引入antd css样式
// import '../static/css/site.less'    //不使用这种方法
import css from '../static/css/site.less'

import {Button} from 'antd'
// 引入高阶函数
import {connect} from "react-redux";

// 1导入fetchHelper函数 
import fetchHelper from '../kits/fetch.js'


class index extends React.Component{

//   // 2在组件中定义getInitialProps 这个方法只会在NodeJS服务器执行 
// static async getInitialProps(){ 
//   let result = await fetchHelper
//           .get('/mock') 
//       // 默认将data数据绑定到当前组件的props中，将来在render函数中可以通过this.props.data就可 以获取数据了
//       console.log(result.data.info.information)
//   return { data:result.data.info.information} 
//   }

render(){
return (
  <div>
    <Head>
      <title>大煊首页</title>
    </Head>
    {/* 人生可真是寂寞如雪{this.props.pageProps.data} */}
    <Link href={{pathname:'/home'}}>
      <Button type="primary" icon="search">搜索</Button>
    </Link>
    <div className='hero'>
      <h1 className={css.title} style={{color:this.props.testReducer.color}}>Welcome to Next.js!</h1>
      
      <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className='row'>
        <Link href='https://github.com/zeit/next.js#setup'>
          <a className='card'>
            <h3>Getting Started &rarr;</h3>
            <p>Learn more about Next.js on GitHub and in their examples.</p>
          </a>
        </Link>
        <Link href='https://github.com/zeit/next.js/tree/master/examples'>
          <a className='card'>
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </Link>
        <Link href='https://github.com/zeit/next.js'>
          <a className='card'>
            <h3>Create Next App &rarr;</h3>
            <p>Was this tool helpful? Let us know how we can improve it!</p>
          </a>
        </Link>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)
    }
  }
  const mapStateToProps = (state)=>{
    return {
      ...state
    }
  }
export default connect(mapStateToProps,null)(index)

// 继承redux-persist实现store持久化到localStorage的步骤
//  1.导入相关的方法和storage对象
// 2.配置storage对象的key
// 3.配置persistReducer将rootReducer重新包装后返回新对象pReducer
// 4.createStore(pReducer)创建新的store对象
// 5。（export）利用persistStore方法传入store对象创建出新的persistot对象，将来在_app.js中被PersistGate组件使用
