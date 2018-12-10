Page({
    data:{
        storeGoods: {},
        totalPrice: 3,
        shipmentFee: 3
    },
    onLoad: function (options) {
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

    submitOrder() {
        console.log('submit order')
        wx.navigateTo({
            url: '/pages/order/order-create',
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

    deleteStoreGoods: function(e) {
        const newStoreGoods = {}
        const storeId = e.currentTarget.dataset.storeid 
        console.log(storeId)
        Object.keys(this.data.storeGoods).forEach(k => {
            const i = Number.parseInt(k)
            if(storeId !== i) {
                newStoreGoods[i] = this.data.storeGoods[i]
            }
        })
        this.setData({
            storeGoods: newStoreGoods
        })
        this.computeTotalPrice()
    },

    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
        this.loadCart()
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
    computeTotalPrice() {
        let total = 0;
        Object.keys(this.data.storeGoods).forEach((key => {
            const goodsList = this.data.storeGoods[key].goodsList
            goodsList.forEach(g => {
                total += g.totalPrice;
            })
        }));

        this.setData({
            totalPrice: total + this.data.shipmentFee
        })
    },
    loadCart() {
        this.setData({
            storeGoods: {
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
        })
        this.computeTotalPrice();
    },
    onChangeNumber(e) {
        const { storeId, goodsId } = e.detail.extraData
        const currentCount = e.detail.number
        const goodsList = this.data.storeGoods[storeId].goodsList
        let spliceIndex = -1;
        for(let i = 0; i < goodsList.length; i++) {
            if(goodsList[i].id === goodsId) {
                if (currentCount === 0) {
                    spliceIndex = i
                } else{
                    Object.assign(goodsList[i], { count: currentCount, totalPrice: currentCount * goodsList[i].price})
                }
                break;
            }
        }
        if (spliceIndex >=0) {
            this.removeGoodsFromCart(storeId, goodsId, spliceIndex)
        }
        this.computeTotalPrice()
    },
    removeGoodsFromCart(storeId, goodsId, index) {
        const storeGoods = {}
        Object.keys(this.data.storeGoods).map(k => {
            const store = this.data.storeGoods[k];
            if(storeId !== Number.parseInt(k)) {
                storeGoods[k] = store
            } else {
                const newStoreGoodsList = []
                const storeGoodsList = store.goodsList
                for(let i = 0; i < storeGoodsList.length; i++) {
                    const goods = storeGoodsList[i]
                    if (goods.id !== goodsId) {
                        newStoreGoodsList.push(goods)
                    }
                }
                if(newStoreGoodsList.length > 0) {
                    storeGoods[k] = {
                        id: store.id,
                        name: store.name,
                        goodsList: newStoreGoodsList
                    }
                }
            }
        });
        this.setData({
            storeGoods: storeGoods
        })
    }
})