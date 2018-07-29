var app = getApp()
const requestUrl = require('../../../config').requestUrl
var callapi = require("./base/callapi.js").callapi

function leaveapply(memo,date) {

  if (date == undefined){
    var date = new Date()
    date.setTime(date.getTime())
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var today = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
    date = today
  }

  var url = requestUrl + '/1/classes/userinfo?where=%7B%22wechatNickName%22:%22' + app.globalData.nickname + '%22%7D'
  callapi(url, 'GET', {}, function(result) {

    if (result.data.results.length == 0) {
      wx.showToast({
        title: '请点击我的，请补全用户信息！',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    } else {
      var userObjectId = result.data.results[0].objectId


      var url = requestUrl + '/1/classes/leave?where=%7B%22date%22:%22' + date + '%22%7D'
      var data = {
        'include': 'user'
      }
      callapi(url, 'GET', data, function(result) {

        var list = result.data.results
        var isExist = false
        for (var i = 0, len = list.length; i < len; ++i) {
          if (list[i].user.wechatNickName == app.globalData.nickname) {
            //if (list[i].user.wechatOpenId == app.globalData.openid) {
            isExist = true
          }
        }
        if (isExist) {
          wx.showToast({
            title: date+'：已请过假！',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        } else {
          url = requestUrl + '/1/classes/leave'
          data = {
            user: {
              "__type": "Pointer",
              "className": "_User",
              "objectId": userObjectId
            },
            leaveType: memo,
            date: date,
          }
          callapi(url, 'POST', data, function(result) {
            wx.showToast({
              title: '请假成功！',
              icon: 'success',
              mask: true,
              duration: 2000
            })
          })
        }
      })
    }
  })

}
function getByUserName(userName,callback) {
  console.log(userName)
  var url = requestUrl + '/1/classes/leave'
  var data = {
    'order':'-date',
    'where':{
      "user":{
        "$inQuery":{
          "where":{
            "userName": userName
          },
          "className": "userinfo"
        },
        
      }
    }
  }
  callapi(url, 'GET', data, function (result) {
    callback(result)
  })
}
function deleteByObjectId(objectId, callback) {
  console.log(objectId)
  var url = requestUrl + '/1/classes/leave/' + objectId
  callapi(url, 'DELETE', {}, function (result) {
    callback(result)
  })
}
module.exports = {
  leaveapply: leaveapply,
  getByUserName: getByUserName,
  deleteByObjectId: deleteByObjectId
}