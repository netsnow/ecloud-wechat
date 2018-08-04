var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey

var leave = require("../common/leave.js")
var usergroup = require("../common/usergroup.js")

Page({
  data: {
    date: '',
    color: 'green',
    delaycount: '',
    leavecount: '',
    items: [],
    shareData: {
      title: '今日请假',
      //desc: '今日请假人员详细列表',
      path: 'page/bussiness/statistics/statistics'
    }
  },
  onShow: function () {
    var self = this
    console.log("group:" + app.globalData.usergroup)
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
    usergroup.getByName('爱谁谁', function (result) {
      var allcount = result.data.results[0].count

      leave.getByGroupDate(app.globalData.usergroup, date, function (result) {
        var delaycount = allcount - result.data.results.length

        var list = result.data.results
        var leavecount = delaycount
        var color = 'green'

        for (var i = 0, len = list.length; i < len; ++i) {
          if (list[i].leaveType == '迟到') {
            leavecount = leavecount + 1
          }
        }
        if (delaycount < 20) {
          color = 'blue'
        }
        if (leavecount < 20) {
          color = 'red'
        }
        self.setData({
          items: result.data.results,
          date: date,
          color: color,
          delaycount: delaycount,
          leavecount: leavecount
        })
      })
    })


  },
  onShareAppMessage: function () {
    return this.data.shareData
  }
})
