import css from './layout.less'
import { Icon, Badge, message } from 'antd'
// redux步骤一：导入connect高阶函数（react-redux）按需将store中的state注册到当前组件中
import { connect } from 'react-redux'
import fetch from '../../kits/fetch'
import { getUser, removeUser } from '../../kits/storageHelper'
import Link from 'next/link'

class head extends React.Component {
  // 登出系统逻辑
  logOut() {
    fetch.get('/nc/common/account/logout').then(res => {
      // console.log(res)
      if (res.status === 1) {
        message.error(res.message.text, 1)
      } else {
        removeUser()
        message.success(res.message.text, 1, () => {
          window.location = '/index'
        })
      }
    })
  }
  render() {
    let userInfo = getUser()
    // console.log(userInfo)
    return (
      <header className={css.headtop + ' w'}>
        <a href='' className='fl'>
          <img src='/static/img/asset-logoIco.png' alt='' />
        </a>
        <div className={css.left + ' fl'}>
          <a className={css.a} href=''>
            首页
          </a>
          <a className={css.a} href=''>
            课程
          </a>
          <a className={css.a} href=''>
            职业规划
          </a>
        </div>
        <div className={css.input + ' fl'}>
          <input type='text' className='fl' placeholder='输入查询关键字' />
          <button className='fr'>搜索</button>
        </div>
        <div className={css.right + ' fr'}>
          <div className={css.signin}>
            {/* <!-- 未登录 -->*/}
            {/* <a onClick={()=>this.props.onChangeColor('blue')}>蓝色</a> */}
            {/* <a onClick={()=>this.props.onChangeColor('red')}>红色</a> */}
            {this.props.shopCarCountReducer.count}
            <Link href={{pathname:'/car/carlist'}}>
              <Badge count={this.props.shopCarCountReducer.count}>
                <Icon style={{cursor:'pointer'}} type="shopping-cart" className={css.Icon} />
              </Badge>
            </Link>
            {!userInfo.uid ? (
              <span>
                <a
                  href='#'
                  onClick={() => {
                    window.location = '/account/login'
                  }}>
                  登录{' '}
                </a>{' '}
                <span> |</span> <a href='#'> 注册</a>
              </span>
            ) : (
              <span>
                <a href='#'>
                  <Icon type='bell' theme='twoTone' />
                  个人中心
                </a>
                <a href='#'>
                  <img src='/static/img/asset-myImg.jpg' alt='' />
                  {userInfo.nick_name}
                </a>
                <a
                  href='#'
                  onClick={() => {
                    this.logOut()
                  }}>
                  退出
                </a>
              </span>
            )}
            {/* <!-- 登录 --> */}
          </div>
        </div>
      </header>
    )
  }
}
/*
connect有两个参数
1.第一个参数本质上是一个函数，可以将store中的state绑定到head组件中的props中
2.第二个参数本质上也可以是一个函数，可以通过这个函数中定义的事件去操作store中的dispatch
由于head组件只需要dispatch，所以只需要传入第二个参数，第一个参数传入null即可
*/

const mapDispatchToProps = dispatch => {
  return {
    onChangeColor: color => {
      // console.log(color)
      // 利用dispatch去更新store中state的color属性（实际上是操作testReducer中的state中的color属性）
      dispatch({ type: 'CHANGE_COLOR', color })
    }
  }
}
const mapStateToProps = (state) =>{
  return {
    ...state
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(head)
