// 导入头部组件，底部组件
import Head from "./head";
import Bottom from "./bottom";
export default class layout extends React.Component {
  render() {
    // 接受app.js传入的component和pageprops这两个对象
    const {Component,pageProps} = this.props
    return (<div>
      {/* head */}
      <Head></Head>
      {/* bottom */}
      <Component {...pageProps}/>
      <Bottom></Bottom>
      </div>)
  }
}