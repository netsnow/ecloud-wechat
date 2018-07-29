var app = getApp()
var userinfo = require("../common/userinfo.js")
var leave = require("../common/leave.js")


Page({
  data: {
    items: [],
    userList: [],
    index: 0,
    isAdmin:false
  },
  onShow: function () {
    //console.log(app.globalData.isadmin)
    var self = this
    var myindex = -1
    userinfo.getAll(function(result){
      var list = result.data.results
      var userList = []
      for (var i = 0, len = list.length; i < len; ++i) {
        userList.push(list[i].userName)
        if (list[i].userName == app.globalData.username){
          myindex = i
        }
      }

      self.setData({
        index: myindex,
        userList: userList,
        isAdmin: app.globalData.isadmin
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
      //console.log(result)
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
        title: '删除成功！',
        icon: 'success',
        mask: true,
        duration: 2000
      })
    })
  }
})
