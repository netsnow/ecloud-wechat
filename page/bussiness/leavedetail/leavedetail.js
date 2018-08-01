var app = getApp()
var userinfo = require("../common/userinfo.js")
var leave = require("../common/leave.js")

Page({
  data: {
    date: '',
    today:'',
    items: [],
    userList: [],
    index: 0,
    isAdmin: false
  },
  onShow: function () {
    console.log(app.globalData)
    var date = new Date()
    date.setTime(date.getTime())
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var today = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
    var self = this
    var myindex = -1

    userinfo.getAll(function (result) {
      var list = result.data.results
      var userList = []
      for (var i = 0, len = list.length; i < len; ++i) {
        userList.push(list[i].userName)
        if (list[i].userName == app.globalData.username) {
          myindex = i
        }
      }

      self.setData({
        index: myindex,
        userList: userList,
        isAdmin: app.globalData.isadmin,
        today: today
      })

    })
  },
  DateChange: function (e) {
    var items = this.data.items
    var username = ''
    if (app.globalData.isadmin){
      username = this.data.userList[this.data.index]
    }else{
      username = app.globalData.username
    }
    console.log(username)
    var item = { 'userName': username, 'leaveDate': e.detail.value }
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
      leave.leaveapply('请假', items[i].leaveDate, items[i].userName)
    }
  },
  userChange: function (e) {
    self = this
    self.setData({
      index: e.detail.value
    })

  },
})
