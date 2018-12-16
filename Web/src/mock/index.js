import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import userAPI from './user'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import storeAPI from './store'
import goodsAPI from './goods'
import orderAPI from './order'
import deliveryManAPI from './deliveryMan'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// 用户相关
Mock.mock(/\/user/, 'get', userAPI.getUsers)
Mock.mock(/\/user/, 'post', userAPI.addUser)
Mock.mock(/\/user/, 'put', userAPI.updateUser)

// 快递员相关
Mock.mock(/\/deliveryMan/, 'get', deliveryManAPI.getDeliveryMan)
Mock.mock(/\/deliveryMan/, 'post', deliveryManAPI.addDeliveryMan)
Mock.mock(/\/deliveryMan/, 'put', deliveryManAPI.updateDeliveryMan)

Mock.mock(/\/stock/, 'get', storeAPI.getGoodsInStores)
Mock.mock(/\/addStoreStockGoods/, 'post', storeAPI.addStoreStock)

// 商品相关
Mock.mock(/\/goods/, 'get', goodsAPI.getGoods)
Mock.mock(/\/goods/, 'post', goodsAPI.addGoods)

// 订单相关
Mock.mock(/\/order\/unpaid/, 'get', orderAPI.getUnpaidOrder)
Mock.mock(/\/order\/wait/, 'get', orderAPI.getWaitOrder)
Mock.mock(/\/order\/inTransit/, 'get', orderAPI.getInTransitOrder)
Mock.mock(/\/order\/finished/, 'get', orderAPI.getFinishedOrder)

export default Mock
