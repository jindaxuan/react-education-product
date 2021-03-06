
import {connect} from 'react-redux'
import css from './order.less'
import Link from 'next/link'
import {Row,Col,Button,Table,message} from 'antd'
import fetchHelper from '../../kits/fetch.js'
import Router from 'next/router'

class order extends React.Component {
    // 在当前日期上加上一个月份得到新日期
    AddMouth(num)
      {
          var d =new Date();
          var y = d.getFullYear();
          var m = d.getMonth()+1
          var day = d.getDate();
          m = m<10?'0'+m:m
          if(parseInt(day)<10){
              day = '0'+day;
          }
          var date = y + '-' + m + '-'+ day;
          //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
          var mouthnum = parseInt(num);
          console.log(date,mouthnum)
          var year = parseInt(date.substring(0, 4));
          var mouth = parseInt(date.substring(5, 7));
          var day = parseInt(date.substring(8, 10));
          if (mouth + mouthnum > 12)
          {
              var newyear = year + 1;
              var newmouth = mouth + mouthnum - 12;
              var newday = day;
          }
          else
          {
              var newyear = year
              var newmouth = mouth + mouthnum;
              var newday = day;
          }
          var newdate = newyear + "-" + (newmouth<10?'0'+newmouth:newmouth) + "-" + (newday<10?'0'+newday:newday);
          return newdate;
      }

      state ={
          totalAmount:0
      }

      componentWillMount(){
          let amount = 0;
        this.props.selectedReducer.state.forEach(item=>{
            amount += item.sell_price;
        })
        this.setState({
            totalAmount : amount
        })
      }

    //   下单方法
    setOrder(){
        // 1.0 调用下单接口完成下单操作
        let amount = this.state.totalAmount;
        let gids =this.props.selectedReducer.state.map(item=>item.goods_id).join(',');

        fetchHelper.post('/ch/shop/postOrder',{amount:amount,payment_id:1,goodsIds:gids})
        .then(json=>{
            if(json.status ==2){
                message.warn('用户未登录',1)
                return 
            }

            if(json.status == 1){
                message.error(json.message,1)
                return;
            }

            // 下单成功后应该将接口返回的数据保存到redux中
            message.success('下单成功',1,()=>{
                this.props.onSetOrderInfo(json.message)
                 // 2.0 跳转到支付页面
                 Router.push({pathname:'/car/pay'});
            })
        })
    }
    render() {
        let columns = [{
            title: '课程图片',
            dataIndex: 'img_url',
            render: text => <img src={text} width="150" height="80" />,
          }, {
            title: '课程名称',
            dataIndex: 'title',
          },{
            title: '课程服务期',
            dataIndex: 'timeout',
            render: text => <span>即日起至{this.AddMouth(text)}</span>
          }, {
            title: '小计',
            dataIndex: 'sell_price',
            render: text => <span style={{color:"red"}}>￥{text}</span>
          }];

        return (<div style={{ minHeight: 800 }}>
            <div className={css.shoppingCart}>
                <div className={css.shoppingTitle}>
                    <span className={css.cartitle}>订单确认</span>
                </div>
                <div className={css.shoppingTableTitle}>
                    <Table columns={columns} dataSource={this.props.selectedReducer.state} />
                </div>
                <div className={css.shoppingTitle}>
                <Row>
                    <Col offset="11" span="8">
                    <Link href={{pathname:'/car/carlist'}}>
                      <a>返回购物车修改</a> 
                      </Link>
                    </Col>
                    <Col span="3">合计: <span style={{color:"red",fontSize:'20px'}}>￥{this.state.totalAmount}</span>
                   
                    </Col>
                    <Col span="2"> <Button type="primary" size="large" onClick={this.setOrder.bind(this)} >提交订单</Button></Col>                    
                </Row>
                </div>
            </div>
            <style>{`
            .ant-pagination.ant-table-pagination{
                display:none;
            }
            `}
            </style>
 </div>)
    }
}

let mapStateToProps = (state) =>{
    return {
        ...state
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        onSetOrderInfo:(orderinfo)=>{
            dispatch({type:'SET_ORDER',orderinfo:orderinfo})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(order)