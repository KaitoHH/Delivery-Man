const app = getApp()
const defaultMaker = {
    iconPath: '/images/order.png',
    id: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    width: 25,
    height: 25
}
Page({
    data: {
        hasLoad: false,
        markers: [],
        longitude: '',
        latitude: '',
    },
    onLoad() {

    },
    onShow() {
        this.loadOrderMap()
    },
    loadOrderMap() {
        wx.showLoading({
            title: '加载中'
        })
        app.order.fetchNearWaitTransitOrders()
            .then(res => {
                const markers = []
                res.data.forEach(order => {
                    markers.push(Object.assign({}, defaultMaker, {
                        id: order.id,
                        latitude: order.latitude,
                        longitude: order.longitude
                    }))
                })
                this.setData({
                    markers: markers
                })
                console.log(markers)
                this.calculateMapCenter()
                wx.hideLoading()
                this.setData({
                    hasLoad: true
                })
            })
    },
    calculateMapCenter() {
        let lng = 0.0
        let lat = 0.0
        this.data.markers.forEach(m => {
            lng += Number.parseFloat(m.longitude)
            lat += Number.parseFloat(m.latitude)
        })
        this.setData({
            latitude: lat / this.data.markers.length,
            longitude: lng / this.data.markers.length
        })
        console.log(this.data)
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        wx.navigateTo({
            url: `/pages/order/order-detail/order-detail?orderId=${e.markerId}`,
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },
    controltap(e) {
        console.log(e.controlId)
    }
})