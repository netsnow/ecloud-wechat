var app = getApp()
const requestUrl = require('../../../config').requestUrl
const applicationId = require('../../../config').applicationId
const restApiKey = require('../../../config').restApiKey


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
  },

})
