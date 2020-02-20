
// 导入antd中所有页面需要的组件
import fetch from '../../kits/fetch'
import css from '../../pages/account/login.less'
import { Icon, Row, Col, Form, Input, Button,message } from 'antd'

const FormItem = Form.Item;


class Register extends React.Component {

  // 定义一个register方法来注册用户
  register= (e) =>{
    // 为了能够正常验证表单，需要两件事
    // 1、利用getFielDecrator进行表单合法性的检查
    // 2、在onSubmit指定的方法中利用this.props.form.validateField()来进行表单合法性检查的触发工作
    e.preventDefault()   // 阻止了默认事件触发
    this.props.form.validateFields((err,values)=>{
      // 如果err存在，否则values就会获取到值
      if(!err){
        //  处理正常注册逻辑

      }
    })
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
            rules: [{ required: true, message: '请再一次输入密码!' }]
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
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </FormItem>
      </Form>
    )
  }
}

// 包装以后，就会在Register组件的props上挂载一个form对象
export default Form.create()(Register)