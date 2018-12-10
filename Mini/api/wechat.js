function getUserInfo () {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({ success: resolve, fail: reject })
    })
  }

module.exports = {
    getUserInfo
}