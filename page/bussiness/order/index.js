var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey
Page({
  data: {
    list: []
  },
  onShow: function () {
    if (!app.globalData.hasLogin){
      wx.redirectTo({ url: '../login/login' })
      //console.log("123");
    }else{
      var self = this

      self.setData({
        loading: true
      })

      wx.request({
        url: requestUrl + '/1/classes/order',
        header: {
          'Content-Type': 'application/json',
          'X-Bmob-Application-Id': applicationId,
          'X-Bmob-REST-API-Key': restApiKey,
        },
        data: {
        },
        success: function (result) {
          var list = result.data.results;
          var listout = [];
          for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].userName == app.globalData.openid){
              listout.push(list[i]); 
            }
          }
          self.setData({
            loading: false,
            list: listout
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
    }

  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  }
})

