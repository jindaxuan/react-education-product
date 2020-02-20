import {Button} from "antd";
import Head from "next/head";
import {connect} from "react-redux";
// 导入fetchHelper函数 
import fetchHelper from '../kits/fetch.js'



class home extends React.Component{
  // 在组件中定义
  state={ blist:null } 
  // componentWillMount 函数中请求数据 
  componentWillMount(){ // 请求数据(浏览器发出的请求) 
    let urlPath = '/nc/course/home/gettopdata' 
    fetchHelper.get(urlPath) 
      .then(data=>{ 
        this.setState({ blist:data.message.catelist }) 
        // alert(data)
        console.log(data)
      })
       }
  render (){
    return (
      <div>
        <Head><title>首页</title></Head>
        <span style={{color:this.props.testReducer.color}}>home</span>
        <ul>{this.state.blist && this.state.blist.map(item=>( <li key={item.id}>{item.title}</li> ))} </ul>
        <Button type="primary">antd按钮</Button>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    ...state
  }
}
export default connect(mapStateToProps)(home)