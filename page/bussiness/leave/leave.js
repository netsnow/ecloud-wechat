var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
  },
  onShow: function () {
    if (!app.globalData.hasLogin) {
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    }
  },
  apply: function (memo) {
    //console.log(app.globalData.openid)
    wx.request({
      url: requestUrl + '/1/classes/userinfo?where=%7B%22wechatNickName%22:%22' + app.globalData.nickname+'%22%7D',
      //url: requestUrl + '/1/classes/userinfo?where=%7B%22wechatOpenId%22:%22' + app.globalData.openid + '%22%7D',
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {
      },
      success: function (result) {
        if(result.data.results.length == 0){
          wx.showToast({
            title: '请补全用户信息',
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }else{
          var userObjectId = result.data.results[0].objectId
          var date = new Date()
          date.setTime(date.getTime())
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
          var today = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)

          wx.request({
            url: requestUrl + '/1/classes/leave?where=%7B%22date%22:%22' + today + '%22%7D',
            header: {
              'Content-Type': 'application/json',
              'X-Bmob-Application-Id': applicationId,
              'X-Bmob-REST-API-Key': restApiKey,
            },
            data: {
              'include': 'user'
            },
            success: function (result) {
              var list = result.data.results
              var isExist = false
              for (var i = 0, len = list.length; i < len; ++i) {
                if (list[i].user.wechatNickName == app.globalData.nickname) {
                //if (list[i].user.wechatOpenId == app.globalData.openid) {
                  isExist = true
                }
              }
              if(isExist){
                wx.showToast({
                  title: '今天已请过假！',
                  icon: 'none',
                  mask: true,
                  duration: 2000
                })
              }else{
                wx.request({
                  url: requestUrl + '/1/classes/leave',
                  header: {
                    'Content-Type': 'application/json',
                    'X-Bmob-Application-Id': applicationId,
                    'X-Bmob-REST-API-Key': restApiKey,
                  },
                  method: 'POST',
                  data: {
                    user: {
                      "__type": "Pointer",
                      "className": "_User",
                      "objectId": userObjectId
                    },
                    leaveType: memo,
                    date: today,
                  },
                  success: function (result) {
                    wx.showToast({
                      title: '请假成功！',
                      icon: 'success',
                      mask: true,
                      duration: 2000
                    })
                  },
                  fail: function ({ errMsg }) {
                    wx.showToast({
                      title: '请假失败,可能是网络问题！',
                      icon: 'none',
                      mask: true,
                      duration: 2000
                    })
                  }
                })

              }
              console.log('request success', result)
            }
          })
        }
        //console.log('request success', result)
      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })
  },
  delay: function (e) {
    this.apply("迟到");
  },
  leave: function (e) {
    this.apply("请假");
  }
})
