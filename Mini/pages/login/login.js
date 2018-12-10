Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	bindGetUserInfo: function (e) {
		console.log(e);
		if (e.detail.userInfo) {
			wx.showLoading({
				title: '登录中',
			})
			console.log(e.detail.userInfo)
			this.setData({
				userInfo: e.detail.userInfo
			})
			console.log('switch page');
			setTimeout(() => {
				wx.switchTab({
					url: '/pages/index/index',
					fail: function (res) {
						console.log(res)
					}
				});
			}, 0);
		} else {
			wx.showToast({ title: '拒绝怎么给你用？', icon: 'none' })
		}
	}
})
