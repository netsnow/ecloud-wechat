var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

Page({
  data: {
    list: [
    ]
  },
  onShow: function () {
    var self = this

    wx.request({
      url: requestUrl + '/1/classes/groupbuy',
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {
        'include':'goodId'
      },
      success: function (result) {

        var list = result.data.results
        for (var i = 0, len = list.length; i < len; ++i) {
        }

        self.setData({
          list: list
        })
        //console.log('request success', result)
      },

      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)

      }
    })
  },
  showDetail: function (e) {
    wx.setStorageSync("groupId", e.currentTarget.dataset.id)
    wx.navigateTo({ url: "../groupdetail/groupdetail" });
  },
  
  //kindToggle: function (e) {
  //  var id = e.currentTarget.id, list = this.data.list;
  //  for (var i = 0, len = list.length; i < len; ++i) {
  //    if (list[i].id == id) {
  //      list[i].open = !list[i].open
  //    } else {
  //      list[i].open = false
  //    }
  //  }
  //  this.setData({
  //    list: list
  //  });
  //}
})

