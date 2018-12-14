const app = getApp()
Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	login: function (userInfo) {
		wx.showLoading({
			title: '登录中',
		})
		console.log(userInfo)
		this.setData({
			userInfo: userInfo
		})
		app.globalData.userInfo = this.data.userInfo
		app.user.updateUserNickName(app.globalData.userId, app.globalData.userInfo.nickName)
			.then(res => {
				console.log(res)
			}).catch(e => {
				console.log(e)
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
	},
	onLoad() {
		let that = this
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success(res) {
							console.log(res.userInfo)
							that.login(res.userInfo)
						}
					})
				}
			}
		})
	},
	bindGetUserInfo: function (e) {
		console.log(e);
		if (e.detail.userInfo) {
			this.login(e.detail.userInfo)
		} else {
			wx.showToast({ title: '拒绝怎么给你用？', icon: 'none' })
		}
	}
})
