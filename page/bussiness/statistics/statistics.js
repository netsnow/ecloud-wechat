var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey
var leave = require("../common/leave.js")

Page({
  data: {
    date:'',
    items: []
  },
  onShow: function(){
    var self = this
    console.log("group:"+app.globalData.usergroup)
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

    leave.getByGroupDate(app.globalData.usergroup, date, function (result) {
      self.setData({
        items: result.data.results,
        date: date
      })
    })

  }
})
