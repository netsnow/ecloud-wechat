var app = getApp()
const requestUrl = require('../../../../config').requestUrl
const applicationId = require('../../../../config').applicationId
const restApiKey = require('../../../../config').restApiKey

function callapi(url,method,data,callback) {
  
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json',
      'X-Bmob-Application-Id': applicationId,
      'X-Bmob-REST-API-Key': restApiKey,
    },
    method: method,
    data: data,
    success: callback,
    fail: function ({ errMsg }) {
      wx.showToast({
        title: '请假失败,可能是网络问题！',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      console.log('request fail', errMsg)
    }
  })
}
module.exports = {
  callapi: callapi
}