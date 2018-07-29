var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
    isDisable: false,
    isHidden: true,
    isUser: true,
    username: '',
    group: '',
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
            if (result.data.results[0].isAdmin) {
              var isUser = false
            }else{
              var isUser = true
            }
            self.setData({
              username: result.data.results[0].userName,
              group: result.data.results[0].group,
              lable: '名字',
              isDisable: true,
              isHidden: isHidden,
              isUser: isUser
            })
            app.globalData.userobjectid = result.data.results[0].objectId
            app.globalData.username = result.data.results[0].userName
            app.globalData.usergroup = result.data.results[0].group
          }
        }
      })
    }

  },
  formSubmit: function (e) {
    var self = this
    console.log(e)
    if (e.detail.value.username == '' || e.detail.value.group == ''){
      wx.showToast({
        title: '请输入名字或组别',
        icon: 'none',
        mask: true,
        duration: 2000
      })
    }else{
      if (app.globalData.userobjectid == ''){
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
            userName: e.detail.value.username,
            group: e.detail.value.group
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
      }else{
        wx.request({
          url: requestUrl + '/1/classes/userinfo/' + app.globalData.userobjectid,
          header: {
            'Content-Type': 'application/json',
            'X-Bmob-Application-Id': applicationId,
            'X-Bmob-REST-API-Key': restApiKey,
          },
          method: 'PUT',
          data: {
            group: e.detail.value.group
          },
          success: function (result) {
            wx.showToast({
              title: '修改成功',
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
  },
  logout: function (e) {
    app.globalData.hasLogin = false
    app.globalData.openid = ''
    app.globalData.nickname = ''
    app.globalData.userobjectid = ''
    app.globalData.username = ''
    app.globalData.usergroup = ''
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
