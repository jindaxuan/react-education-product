// 注意文件名不能改变
import Document, { Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          {/* 导入全局样式文件，使所有的antd组件均能应用上样式 */}
          <link rel="stylesheet" href="../static/css/antd.css" />
          <link rel="stylesheet" href="../static/css/base.css"/>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}