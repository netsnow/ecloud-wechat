var app = getApp()
const requestUrl = require('../../../config').requestUrl
var callapi = require("./base/callapi.js").callapi

function getByName(name,callback) {

  var url = requestUrl + '/1/classes/usergroup'
  var data = {
    'where': {
      'name': name
    }
  }
  callapi(url, 'GET', data, callback)

}
module.exports = {
  getByName: getByName
}