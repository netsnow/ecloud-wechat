var app = getApp()
var userinfo = require("../common/userinfo.js")
var leave = require("../common/leave.js")


Page({
  data: {
    items: [],
    userList: [],
    index: 0,
  },
  onShow: function () {

    var self = this
    userinfo.getAll(function(result){
      console.log(result)
      var list = result.data.results
      var userList = []
      for (var i = 0, len = list.length; i < len; ++i) {
        userList.push(list[i].userName)
      }
      self.setData({
        userList: userList,
      })
      self.userChange(self.data.index)
    })
  },
  btnChange: function (e) {
    this.userChange(e.detail.value)
  },
  userChange: function (index) {
    self = this
    self.setData({
      index: index
    })
    leave.getByUserName(this.data.userList[index],function(result){
      console.log(result)
      self.setData({
        items: result.data.results
      })
    })

  },
  btnDelete: function (e) {
    var self = this
    console.log(e)
    leave.deleteByObjectId(e.currentTarget.dataset.objectid,function(result){
      self.userChange(self.data.index)
      wx.showToast({
        title: '请假成功！',
        icon: 'success',
        mask: true,
        duration: 2000
      })
    })
  }
})
