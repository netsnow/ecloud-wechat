var app = getApp()
const requestUrl = require('../../config').requestUrl
const applicationId = require('../../config').applicationId
const restApiKey = require('../../config').restApiKey

var count=[];
var totalPrice = [];

Page({
  data: {
    list: [
    ]
  },
  
  onShow: function () {
    var self = this

    self.setData({
      loading: true
    })

    wx.request({
      url: requestUrl+'/1/classes/good',
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {
      },
      success: function (result) {
        console.log(result);
        var list = result.data.results
        for (var i = 0, len = list.length; i < len; ++i) {
            list[i].count = 1
            list[i].totalPrice = list[i].price
            if(!list[i].image){
              list[i].image = "../../image/wechat.png"
            }
        }
        self.setData({
          loading: false,
          list: list
        })
        //console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
  },
  countPlus: function (e) {
    console.log(e.currentTarget)
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].objectId == id) {
        list[i].count = list[i].count + 1
        list[i].totalPrice = list[i].count * list[i].price
      }
    }
    this.setData({
      list: list
    });
  },
  countMinus: function (e) {
    console.log(e.currentTarget)
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].objectId == id) {
        list[i].count = list[i].count - 1
        if (list[i].count<1){
          list[i].count = 1
        }
        list[i].totalPrice = list[i].count * list[i].price
      }
    }
    this.setData({
      list: list
    });
  },
  postPay: function (e) {
    if (!app.globalData.hasLogin) {
      wx.redirectTo({ url: './login/login' })
      //console.log("123");
    }else{
      console.log(app.globalData.openid);
      var goodId = e.currentTarget.dataset.id;
      var goodName = e.currentTarget.dataset.goodname;
      var count = e.currentTarget.dataset.count;
      var totalPrice = e.currentTarget.dataset.totalprice;
      var userName = app.globalData.openid;
      wx.request({
        url: requestUrl + '/1/classes/order',
        header: {
          'Content-Type': 'application/json',
          'X-Bmob-Application-Id': applicationId,
          'X-Bmob-REST-API-Key': restApiKey,
        },
        method: 'POST',
        data: {
          goodId: goodId,
          goodName: goodName,
          count: count,
          totalPrice: totalPrice,
          userName: userName
        },
        success: function (result) {
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
        },
        fail: function ({ errMsg }) {
          console.log('request fail', errMsg)
          self.setData({
            loading: false
          })
        }
      })
    }


  }
})

