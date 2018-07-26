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
      wx.showToast({
        title: '登陆失败',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      console.log("登陆失败");
    }
    
  }
})
