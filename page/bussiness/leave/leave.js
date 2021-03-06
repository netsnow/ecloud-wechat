var app = getApp()
var leave = require("../common/leave.js")

Page({
  data: {
    shareData: {
      title: '大家来请假',
      //desc: '今日请假人员详细列表',
      path: 'page/bussiness/leave/leave'
    }
  },
  onShow: function () {
    if (!app.globalData.hasLogin) {
      wx.setStorageSync('backurl', 'leave')
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    }
  },
  delay: function (e) {
    wx.showModal({
      //title: '提示',
      content: '是否确定迟到？',
      success: function (res) {
        if (res.confirm) {
          leave.leaveapply("迟到");
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })

  },
  leave: function (e) {
    wx.showModal({
      //title: '提示',
      content: '是否确定请假？',
      success: function (res) {
        if (res.confirm) {
          leave.leaveapply("请假");
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    })
    
  },
  other:function(e){
    wx.navigateTo({ url: '../leavedetail/leavedetail' })
  },
  onShareAppMessage: function () {
    return this.data.shareData
  }
})
