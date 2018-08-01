var app = getApp()
const requestUrlLogin = require('../../../config').requestUrlLogin
const applicationIdLogin = require('../../../config').applicationIdLogin
const restApiKeyLogin = require('../../../config').restApiKeyLogin

var userinfo = require("../common/userinfo.js")

Page({
  onLoad: function() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login: function(e) {
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      console.log("登陆成功");

      wx.login({
        success: function(res) {
          if (res.code) {
            //console.log(res.code)
            //发起网络请求
            //wx.request({
            //  url: requestUrlLogin,
            //  header: {
            //    'Content-Type': 'application/json',
            //    'X-LC-Id': applicationIdLogin,
            //    'X-LC-Key': restApiKeyLogin,
            //  },
            //  data: {
            //    'code': res.code
            //  },
            //  method: 'POST',
            //  success: function(result) {

                app.globalData.hasLogin = true;
            //    var data = {}
            //    data = JSON.parse(result.data.result.data)
            //    app.globalData.openid = data.openid;
                app.globalData.nickname = e.detail.userInfo.nickName;
            userinfo.getByNickName(function (result) {
              console.log(result);
              app.globalData.username = result.data.results[0].userName;
              app.globalData.isadmin = result.data.results[0].isAdmin;
              app.globalData.userobjectid = result.data.results[0].objectId;
              app.globalData.usergroup = result.data.results[0].group;
            })
                console.log(app.globalData.openid);
                var backurl = wx.getStorageSync('backurl');
                wx.switchTab({
                  url: '../' + backurl + '/' + backurl
                })
            //  }
            //})
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });

    } else {
      wx.showToast({
        title: '登陆失败，可能是网络问题！',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      console.log("登陆失败");
    }

  }
})