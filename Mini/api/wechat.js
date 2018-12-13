const fetch = require('./fetch')
const config = require('../utils/config')
const APP_ID = config.appId
const APP_SECRET = config.secretKey
const url = 'https://api.weixin.qq.com/sns/jscode2session'
function getOpenId() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function(res){
        const code = res.code
        fetch(url, '', {
          appid:APP_ID,
          secret:APP_SECRET,
          js_code: code,
          grant_type:'authorization_code'
        }).then(res => {
          resolve(res)
          console.log(res)
        }).catch(e => {
          reject(e)
          console.log(e)
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  })
}


module.exports = {
  getOpenId
}