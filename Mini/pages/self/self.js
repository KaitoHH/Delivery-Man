Page({
    data:{
    },
    unPaidOrder: function(){
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=unPaid',
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
        console.log('unpaid order');
    },
    waitTransitOrder: function(){
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=waitTransit',
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
        console.log('wait transit order')
    },
    inTransitOrder: function() {
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=inTransit',
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
        console.log('in transit Order')
    },

    finishOrder: function() {
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=finished',
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
        console.log('has finished order')
    },

    myAcceptOrder: function() {
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=myAcceptOrder',
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

    historyAcceptOrder: function() {
        wx.navigateTo({
            url: '/pages/order/order-list/order-list?status=historyOrder',
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
        console.log('my history accept order')
    },

    onLoad:function(options){
        // 生命周期函数--监听页面加载
    },
    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
    },
    onUnload:function(){
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
    }
})