// 导入antd中所有页面需要的组件
import fetch from '../../kits/fetch'
import css from '../../pages/account/login.less'
import { Icon, Row, Col, Form, Input, Button, message } from 'antd'

const FormItem = Form.Item

let intervalHander = null
let timeout = 60

class Register extends React.Component {
  state = {
    bttxt: '获取验证码', //  虎丘雁阵听歌吗按钮的文字
    isdisabled: false //  控制获取验证码按钮是否可用
  }

  // 定义一个register方法来注册用户
  register = e => {
    // 为了能够正常验证表单，需要两件事
    // 1、利用getFielDecrator进行表单合法性的检查
    // 2、在onSubmit指定的方法中利用this.props.form.validateField()来进行表单合法性检查的触发工作
    e.preventDefault() // 阻止了默认事件触发
    this.props.form.validateFields((err, values) => {
      // 如果err存在，否则values就会获取到值
      if (!err) {
        //  处理正常注册逻辑
        this.checkuser(() => {
          // 发起注册请求
          console.log('123 ')
        })
      }
    })
  }

  // 点击获取验证码按钮后触发的事件
  processsns() {
    intervalHander = setInterval(() => {
      timeout--
      if (timeout <= 0) {
        clearInterval(intervalHander)
        timeout = 5
        this.setState({
          snsbttxt: '获取验证码',
          isdisabled: false
        })
      } else {
        this.setState({
          snsbttxt: timeout + '后获取验证码',
          isdisabled: true
        })
      }
    }, 1000)

    // ajax请求获取验证码
    // this.getsnscode()
  }

  // 定义手机号是否已经被注册了逻辑
  checkuser(callback) {
    // 1.0 获取注册手机号码文本框的内容
    let tel = Number(this.props.form.getFieldValue('user_name'))
    // 2.0 将手机号码传入到服务器  /nc/common/account/checkuser
    fetch.post('/nc/common/account/register', { username: tel }).then(res => {
      console.log(res)
      // return
      if (res.status === 0) {
        if (res.message.isRegister) {
          // message.error('用户注册成功')
          this.props.form.setFields({
            ['user_name']: { value: tel, errors: [new Error('手机号码被注册')] }
          })
        } else {
          //
          if (typeof callback === 'function') {
            callback()
          }
          message.error('用户注册成功')
        }
      } else {
        // 跑出错误
        console.log(res.message.text)
      }
    })
    // 3.0 如果服务器响应已注册，则提示
  }

  // ajax请求获取验证码
  getsnscode() {
    // 获取用户在表单中输入的手机号码
    let tel = this.props.form.getFieldValue('user_name')
    //调用接口获取验证码
    fetchHelper
      .post('/nc/common/account/snscode', { username: tel })
      .then(json => {
        if (json.status == 1) {
          message.error(json.message.reason || json.message)
          return
        }

        message.success(json.message.reason)
      })
  }

  // 定义检查密码是否一致的逻辑方法
  checkpwd(rule,value,callback){
    const form = this.props.form;
    let oldvalue = this.props.form.getFieldValue('password')
    console.log(value,oldvalue)
    if(value&&value != oldvalue){
      callback('两次输入的不一致')
    }else{
      callback()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form ref="register" onSubmit={this.register} className={css.login_form}>
        <FormItem>
          {getFieldDecorator('user_name', {
            rules: [
              { required: true, message: '请输入手机号码' },
              {
                pattern: /^1(3|4|5|7|8)\d{9}$/,
                message: '用户名必须符合手机格式!'
              }
            ]
            // validateTrigger:'onBlur'
          })(
            <Row>
              <Col span="14">
                <Input
                  onBlur={this.checkuser.bind(this)}
                  ref="user_name"
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="输入注册时的手机号码"
                />
              </Col>
              <Col span="1">
                <Button
                  disabled={false}
                  type="primary"
                  // onClick={this.processsns.bind(this)}
                >
                  获取验证码
                </Button>
              </Col>
            </Row>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('sns_code', {
            rules: [{ required: true, message: '请输入验证码!' }]
          })(
            <Input
              prefix={<Icon type="eye" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入验证码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(
            <Input
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="输入密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password1', {
            rules: [{ required: true, message: '请再一次输入密码!' },
                      {validator:this.checkpwd.bind(this)}
          ]
          })(
            <Input
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="输入密码"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            disabled={this.props.disabled}
            type="primary"
            onClick={this.processsns.bind(this)}
            htmlType="submit"
            className="login-form-button"
          >
            {this.state.bttxt}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

// 包装以后，就会在Register组件的props上挂载一个form对象
export default Form.create()(Register)
