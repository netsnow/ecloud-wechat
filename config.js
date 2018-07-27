/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "14592619.qcloud.la"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: `https://${host}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `https://api.bmobcloud.com/`,
    applicationId: `ca2f55a021ade113a81abccf0fc08c7b`,
    restApiKey: `605286cad82873618c7cb56b05c16fb7`,

  requestUrlLogin: `https://lNvNTaOi.engine.lncld.net/1.1/functions/getUserInfo`,
  applicationIdLogin: `lNvNTaOiN7tFSJ61h56mQFzu-gzGzoHsz`,
  restApiKeyLogin: `VaHTizAja646yrQOGSr80sQw`,


    // 用code换取openId
    openIdUrl: `https://${host}/openid`,

    // 测试的信道服务接口
    tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `https://${host}/static/weapp.jpg`
};

module.exports = config
