var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
    isDisable: false,
    username: '',
    lable: '',
  },
  onShow: function (e) {
    var self = this
    wx.request({
      url: requestUrl + '/1/classes/userinfo?where=%7B%22wechatNickName%22:%22' + app.globalData.openid + '%22%7D',
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {

      },
      success: function (result) {
        if (result.data.results.length == 0) {
          self.setData({
            username: '',
            lable: '名字(输入后无法修改)',
            isDisable: false,
          })
        } else {
          
          self.setData({
            username: result.data.results[0].userName,
            lable:'名字',
            isDisable:true,
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    var self = this
    console.log(e)
    if (e.detail.value.username == ''){
      wx.showToast({
        title: '请输入名称',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }else{
      wx.request({
        url: requestUrl + '/1/classes/userinfo',
        header: {
          'Content-Type': 'application/json',
          'X-Bmob-Application-Id': applicationId,
          'X-Bmob-REST-API-Key': restApiKey,
        },
        method: 'POST',
        data: {
          wechatNickName: app.globalData.openid,
          userName: e.detail.value.username
        },
        success: function (result) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
          self.setData({
            lable: '名字',
            isDisable: true,
          })
        }
      })
    }
  }
})
