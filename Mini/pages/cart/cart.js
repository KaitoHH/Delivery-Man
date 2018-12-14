const app = getApp()
const storeGoods = {
    1: {
        id: 1,
        name: 'store1',
        goodsList: [
            {
                id: 1,
                name: 'goods1',
                count: 2,
                price: 2,
                totalPrice: 4
            },
            {
                id: 2,
                name: 'goods3',
                price: 2,
                count: 3,
                totalPrice: 6
            }
        ]
    },
    2: {
        id: 2,
        name: 'store2',
        goodsList: [
            {
                id: 1,
                name: 'goods1',
                count: 2,
                price: 3,
                totalPrice: 6
            },
            {
                id: 2,
                name: 'goods3',
                price: 4,
                count: 3,
                totalPrice: 12
            }
        ]
    }
}
Page({
    data:{
        cart: {},
        totalPrice: 3,
        shipmentFee: 3,
        isCartEmpty: false,
        hasLoad: false
    },
    onLoad: function (options) {

    },

    updateIsCartEmpty() {
        this.setData({
            isCartEmpty: Object.keys(this.data.cart).length === 0
        })
    },

    goToShop: function(e) {
        wx.switchTab({
            url: '/pages/index/index',
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

    noPay() {
      wx.switchTab({
          url: '/pages/index/index',
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

    submitOrder() {
        const order = Object.assign({}, {
            price: this.data.totalPrice - this.data.shipmentFee,
            ship: this.data.shipmentFee,
            status: 0,
            user: app.globalData.userId
        })
        app.order.submitOrder(order, this.data.cart)
        .then(res => {
            const cart = app.cart.clearCart(app)
            this.setData({
                cart: cart
            })
            this.cartChange()
            wx.navigateTo({
                url: '/pages/order/order-create?orderId=' + res.data.id,
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
        }).catch(e => {
            console.log(e)
        })
    },

    deleteStoreGoods: function(e) {
        const storeId = e.currentTarget.dataset.storeid
        const _cart = app.cart.deleteStoreGoods(app, this.data.cart, storeId)
        this.setData({
            cart: _cart
        })
        this.cartChange()
    },


    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
       
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
        this.loadCart()
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
    loadCart() {
        this.setData({
            cart: app.globalData.cart
        })
        this.cartChange()
        this.setData({
            hasLoad: true
        })
    },

    cartChange() {
        this.setData({
            totalPrice: app.cart.computeTotalPrice(this.data.cart, this.data.shipmentFee)
        })
        this.updateIsCartEmpty()
    },

    onChangeNumber(e) {
        const { storeId, goodsId } = e.detail.extraData
        const currentCount = e.detail.number
        const _cart = app.cart.changeCartGoodsCount(app, this.data.cart, storeId, goodsId, currentCount)
        this.setData({
            cart: _cart
        })
        this.cartChange()
    }
})