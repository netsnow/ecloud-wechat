var app = getApp()
var leave = require("../common/leave.js")

Page({
  data: {
    date: '',
    items: []
  },
  onShow: function () {
    var date = new Date()
    date.setTime(date.getTime())
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var today = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)

  },
  DateChange: function (e) {
    var items = this.data.items
    var item = { 'userName': app.globalData.username, 'leaveDate': e.detail.value }
    items.push(item)
    this.setData({
      items: items,
      date: e.detail.value
    })
  },
  leave: function(e){
    var items = this.data.items
    console.log(items)
    for (var i = 0, len = items.length; i < len; ++i) {
      leave.leaveapply('请假',items[i].leaveDate)
    }
  },

})
