var app = getApp()
var leave = require("../common/leave.js")

Page({
  data: {
  },
  onShow: function () {
    if (!app.globalData.hasLogin) {
      wx.setStorageSync('backurl', 'leave')
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    }
  },
  delay: function (e) {
    leave.leaveapply("迟到");
  },
  leave: function (e) {
    leave.leaveapply("请假");
  },
  other:function(e){
    wx.navigateTo({ url: '../leavedetail/leavedetail' })
  }
})
