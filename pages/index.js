import css from './index.less'
import fetchHelper from '../kits/fetch'
import { Carousel, Menu, Icon, Spin, Row, Col } from 'antd'
// 导入next路由标签Link
import Link from 'next/link'
const { SubMenu, ItemGroup } = Menu
export default class extends React.Component {
  static async getInitialProps() {
    // 获取数据的两种方法，一种是写在这里，另外一种是写在生命周期中
    let list = await fetchHelper.get('/nc/course/home/gettopdata')
    // 通过return{}默认绑定到当前组件的dprops对象中，在render中就可以通过this.props.sliderlist
    return {
      sliderlist: list.message.sliderlist
    }
  }

  state = {
    catelist: null,
    toplist: null, // 精品课程数据
    types: null, // 课程分类，热门，初级，中级，高级
    cateCourseList: null, // 分类课程数据
    isLoading: false // 是否加载中
  }

  // 生命周期函数
  componentDidMount() {
    //1.0 获取轮播数据和分类菜单数据(fetch发出请求获取数据)
    this.getCateAndSlidImg()
    //2.0 获取首页精品课程数据(fetch发出请求获取数据)
    this.getTopLessonList()
    //3.0 按照分类分组获取课程数据(fetch发出请求获取数据)
    this.getCourseList()
  }
  getTopLessonList() {
    //1.0 获取首页精品课程数据
    fetchHelper.get(`/nc/course/home/getTopCourseList`).then(res => {
      // console.log(res)
      this.setState({
        toplist: res.message
      })
    })
  }

  getCateAndSlidImg() {
    //1.0 获取轮播数据和分类菜单数据
    this.setState({ isloading: true })
    fetchHelper.get(`/nc/course/home/gettopdata`).then(res => {
      // console.log(res)
      // console.log(res.message.catelist)
      this.setState({
        catelist: res.message.catelist,
        isloading: false
      })
    })
  }

  getCourseList() {
    //1.0 按照分类分组获取课程数据
    fetchHelper.get(`/nc/course/home/getcourselist`).then(res => {
      // console.log(res)
      this.setState({
        types: res.message.types,
        cateCourseList: res.message.datas
      })
    })
  }

  render() {
    return (
      <div>
        <Spin
          className="loading"
          tip="正在努力加载中..."
          spinning={this.state.isLoading}
        ></Spin>
        <div className={css.banner_roll}>
          {/* 1.0实现轮播图-begin 使用antd中的走马灯组件：Carousel */}
          {/* 注意这里map()(),这是map函数如果不用return就要加括号或者不加{}，如果你要加{}，就要写return，这里没有写return，故。。。 */}
          {/* ant-design中轮播图有很多的参数，可以设置产生很多效果 */}
          <Carousel autoplay lazyLoad autoplaySpeed={5000} speed={300}>
            {this.props.sliderlist &&
              this.props.sliderlist.map((item, i) => (
                <div key={i}>
                  <img src={item.img_url} />
                </div>
              ))}
          </Carousel>
          {/* 1.0实现轮播图-end */}
          {/* 2.0 左边分类菜单数据-begin 使用antd中的Menu组件 */}
          <div className={css.catelist}>
            <Menu style={{ width: 256 }} mode="vertical">
              {this.state.catelist &&
                this.state.catelist.map((item, i) => (
                  <SubMenu key={item.id} title={item.title}>
                    {item.subcates.map((item2, i2) => (
                      <ItemGroup key={item2.id} title={item2.title}>
                        {item2.subcates.map((item3, i3) => (
                          <Menu.Item key={item3.id}>{item3.title}</Menu.Item>
                        ))}
                      </ItemGroup>
                    ))}
                  </SubMenu>
                ))}
            </Menu>
          </div>
          {/* 2.0 左边分类菜单数据-end */}
        </div>
        <br />
        <div className={css.toplesson}>
          {/* 3.0 精品课程布局-begin */}
          <Row>
            <Col span="12">
              <h2>精品课程</h2>
            </Col>
            <Col offset={10} span="2" className={css.typesli}>
              <a href="#">查看全部</a>
            </Col>
          </Row>
          <br />
          <ul>
            {this.state.toplist &&
              this.state.toplist.map((item, i) => (
                <Link key={item.id} href={'/course/detail?cid='+item.id}>
                  <li className={css.recom_item}>
                    <a href="#">
                      <p>
                        <img className={css.img} src={item.img_url} />
                        <span className={css.lab}>HOT</span>
                      </p>
                      <ul>
                        <li style={{ height: 36 }}>{item.title}</li>
                        <li className={css.li2}>
                          <span>{item.lesson_level}</span>
                          <em>.</em>
                          {item.click}人在学习
                        </li>
                      </ul>
                    </a>
                  </li>
                </Link>
              ))}
          </ul>
          {/* 3.0 精品课程布局-end */}
          {/* 4.0 分类分组课程数据-begin */}
          <br /> <br />
          {this.state.cateCourseList &&
            this.state.cateCourseList.map((item, i) => (
              <div key={i}>
                <br />
                <Row type="flex" align="bottom">
                  <Col span="8">
                    <h2>{item.title}</h2>
                  </Col>
                  <Col span="8" className={css.typesli}>
                    <ul>
                      <li>
                        <a className={css.active} href="#">
                          热门
                        </a>
                      </li>
                      <li>
                        <a href="#">初级</a>
                      </li>
                      <li>
                        <a href="#">中级</a>
                      </li>
                      <li>
                        <a href="#">高级</a>
                      </li>
                    </ul>
                  </Col>
                  <Col className={css.typesli} span="2" offset="6">
                    <a href="#">查看全部</a>
                  </Col>
                </Row>

                <br />
                <br />
                <Row type="flex" align="top">
                  <Col span="5">
                    {/* 左边图片 */}
                    <img src={item.img_url} width="228" height="392" alt="" />
                  </Col>

                  <Col span="19">
                    <Row>
                      {/* 上边图片 */}
                      <Col span="24">
                        <img
                          src={item.img1_url}
                          width="957"
                          height="100"
                          alt=""
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <ul>
                          {item.courseList.map((item1, i) => (
                            <li key={i} className={css.recom_item}>
                              <a href="#">
                                <p>
                                  <img
                                    src={item1.img_url}
                                    width="100%"
                                    height="160"
                                    alt=""
                                  />
                                  <span className={css.lab}>HOT</span>
                                </p>
                                <ul>
                                  <li style={{ height: 36 }}>{item1.title} </li>
                                  <li className={css.li2}>
                                    <span>{item1.lesson_level}</span>{' '}
                                    <em> · </em> {item1.click}人在学习
                                  </li>
                                </ul>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
          {/* 4.0 分类分组课程数据-end */}
        </div>
        <style>{`
              /*首页轮播和分类begin*/ 
                   /*覆盖antd轮播图小图标的位置，只有在当前组件有效*/
                  .slick-dots {
                      position: relative !important;
                      bottom:40px !important;
                  }
                  /*重写antd一级菜单样式*/ 
                  .ant-menu{
                      background: rgba(0, 0, 0, 0.2) !important;
                      color:#fff;
                  }
                  /*重写二级菜单样式*/ 
                  .ant-menu-sub{
                      background: #fff !important;
                      color:#000;
                  }
                  .ant-menu-submenu-arrow{
                      color:#fff !important;                  
                  }
                  .ant-menu-submenu-arrow::after, .ant-menu-submenu-arrow::before{                   
                      background-image:none !important;
                  }
                  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
                      border-right:none !important;
                  }
                  .ant-menu-item-group-list{
                      width:500px
                  }
                  .ant-menu-item-group-list li{
                      display:inline-block !important;
                  }
                  p{
                    margin-bottom:none;
                  }
                  /*首页轮播和分类end*/ 
              `}</style>
      </div>
    )
  }
}
