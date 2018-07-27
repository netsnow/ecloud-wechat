var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
    isDisable: false,
    isHidden: true,
    username: '',
    lable: '',
  },
  onShow: function (e) {
    var self = this
    if (!app.globalData.hasLogin) {
      wx.setStorageSync('backurl', 'userinfo')
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    }else{
      wx.request({
        url: requestUrl + '/1/classes/userinfo?where=%7B%22wechatNickName%22:%22' + app.globalData.nickname + '%22%7D',
        //url: requestUrl + '/1/classes/userinfo?where=%7B%22wechatOpenId%22:%22' + app.globalData.openid + '%22%7D',
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
            if (result.data.results[0].userName == '霜月'){
              var isHidden = false;
            }else{
              var isHidden = true;
            }
            self.setData({
              username: result.data.results[0].userName,
              lable: '名字',
              isDisable: true,
              isHidden: isHidden
            })
          }
        }
      })
    }

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
          wechatOpenId: app.globalData.openid,
          wechatNickName: app.globalData.nickname,
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
  },
  logout: function (e) {
    app.globalData.hasLogin = false
    app.globalData.openid = ''
    app.globalData.nickname = ''
    wx.switchTab({
      url: '../statistics/statistics'
    })
  },
  showComponent: function(e){
    wx.navigateTo({ url: '../../component/index' })
  },
  showAPI: function (e) {
    wx.navigateTo({ url: '../../API/index' })
  }
})
