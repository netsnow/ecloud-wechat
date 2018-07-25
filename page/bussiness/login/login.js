var app = getApp()
Page({
  onLoad: function () {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login: function (e) {
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok"){
      console.log("登陆成功");
      app.globalData.hasLogin = true;
      app.globalData.openid = e.detail.userInfo.nickName;
      console.log(app.globalData.openid);
      wx.switchTab({
        url: '../order/index'
      })
    }else{
      console.log("登陆失败");
    }
    
  }
})
