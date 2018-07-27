var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey


Page({
  data: {
    date:'',
    items: []
  },
  onShow: function(){
    var date = new Date()
    date.setTime(date.getTime())
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var today = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
    this.showleave(today)
  },
  DateChange: function (e) {
    console.log(e)
    this.showleave(e.detail.value)
  },
  showleave: function (date) {
    var self = this

    var selectDate = date

    wx.request({
      url: requestUrl + '/1/classes/leave?where=%7B%22date%22:%22' + selectDate + '%22%7D',
      header: {
        'Content-Type': 'application/json',
        'X-Bmob-Application-Id': applicationId,
        'X-Bmob-REST-API-Key': restApiKey,
      },
      data: {
        'include': 'user'
      },
      success: function (result) {
        console.log(result)
        self.setData({
          items: result.data.results,
          date: selectDate
        })
      }
    })
  }
})
