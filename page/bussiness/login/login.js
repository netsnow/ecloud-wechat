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

      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session',
              data: {
                appid:'wx3442971cdcf6afdf',
                secret:'359f7dafdf826eb596a84211a8789e98',
                js_code: res.code,
                grant_type:'authorization_code'
              },
              success: function (result) {
                app.globalData.hasLogin = true;
                app.globalData.openid = result.data.openid;
                app.globalData.nickname = e.detail.userInfo.nickName;
                console.log(app.globalData.openid);
                console.log(result)
                wx.switchTab({
                  url: '../leave/leave'
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });

    }else{
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
