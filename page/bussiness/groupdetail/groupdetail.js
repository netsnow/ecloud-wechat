var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
    groupinfo:{}
  },
  formSubmit: function (e) {
    if (!app.globalData.hasLogin) {
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    } else {
      var goodId = this.data.groupinfo.goodId.objectId
      var goodName = this.data.groupinfo.goodId.name;
      var count = this.data.groupinfo.totalCount;
      var totalPrice = this.data.groupinfo.totalPrice;
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
  },

  onShow: function () {
    var self = this;

    var groupId = wx.getStorageSync('groupId');

    wx.request({
      url: requestUrl + '/1/classes/groupbuy/' + groupId,
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {
        'include': 'goodId'
      },
      success: function (result) {
        console.log(result);
        var data = result.data
        data.totalPrice = data.price * data.minCount
        data.totalCount = data.minCount
        wx.setNavigationBarTitle({
          title: data.goodId.name,
          success: function () {
            console.log('setNavigationBarTitle success')
          },
          fail: function (err) {
            console.log('setNavigationBarTitle fail, err is', err)
          }
        })
        self.setData({
          groupinfo:data
        })
        console.log(self.data)
      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
      }
    })


  },
  numberChange: function (e) {
    this.data.groupinfo.totalCount = e.detail.value
    this.data.groupinfo.totalPrice = e.detail.value * this.data.groupinfo.price
    //console.log(this.data)
    this.setData({
      groupinfo: this.data.groupinfo
    })
  }
})
