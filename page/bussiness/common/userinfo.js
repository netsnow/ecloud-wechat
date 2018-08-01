var app = getApp()
const requestUrl = require('../../../config').requestUrl
var callapi = require("./base/callapi.js").callapi

function getByNickName(callback) {

  var url = requestUrl + '/1/classes/userinfo?where=%7B%22wechatNickName%22:%22' + app.globalData.nickname + '%22%7D'
  callapi(url, 'GET', {}, function (result) {

    if (result.data.results.length == 0) {
      wx.showToast({
        title: '请点击我的，请补全用户信息！',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {
      callback(result)
    }
  })
}
function getByUserName(userName,callback) {

    var url = requestUrl + '/1/classes/userinfo?where=%7B%22userName%22:%22' + userName + '%22%7D'
    callapi(url, 'GET', {}, function (result) {

      if (result.data.results.length == 0) {
        wx.showToast({
          title: '请点击我的，请补全用户信息！',
          icon: 'none',
          mask: true,
          duration: 2000
        })
      } else {
        callback(result)
      }
    })

}
function getAll(callback) {

  var url = requestUrl + '/1/classes/userinfo'
  var data = {
    'where':{
      'group':'爱谁谁'
    }
  }
  callapi(url, 'GET', data, callback)

}
module.exports = {
  getAll: getAll,
  getByNickName: getByNickName,
  getByUserName: getByUserName
}