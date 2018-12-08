import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: `store${i}`,
    address: '上海市闵行区上海交通大学' + `${i}`,
    registerDate: +Mock.Random.date('T'),
    star: Math.ceil(5 * Math.random()),
    contactPhone: `182177988${(i + 1) % 10}${(i + 3) % 10}`,
    serviceTime: '8:00-23:00'
  }))
}

const goodsStore = [{
  goodsId: 1,
  goodsName: 'goods1',
  goodsPrice: 13.5,
  goodsCount: 12,
  storeId: 201
}, {
  goodsId: 2,
  goodsName: 'goods2',
  goodsPrice: 15.5,
  goodsCount: 10,
  storeId: 201
}, {
  goodsId: 1,
  goodsName: 'goods1',
  goodsPrice: 13.5,
  goodsCount: 12,
  storeId: 202
}, {
  goodsId: 2,
  goodsName: 'goods2',
  goodsPrice: 15.5,
  goodsCount: 10,
  storeId: 202
}]

export default {
  getStores: config => {
    const mockList = List.filter(() => {
      return true
    })
    return {
      items: mockList
    }
  },
  addStore: config => {
    let store = JSON.parse(config.body)
    store = Object.assign(Mock.mock({
      id: '@increment',
      registerDate: new Date(),
      star: 3
    }), store)
    return {
      item: store
    }
  },
  updateStore: config => {
    const store = JSON.parse(config.body)
    return {
      item: store,
      status: 'success'
    }
  },
  getGoodsInStores: config => {
    const { storeId } = param2Obj(config.url)
    const items = goodsStore.filter((g) => {
      return g.storeId === Number.parseInt(storeId)
    })
    return {
      items: items
    }
  },
  addStoreStock: config => {
    const { storeId, goodsId, goodsPrice, goodsCount } = param2Obj(config.url)
    console.log(`${storeId}-${goodsId}-${goodsPrice}-${goodsCount}`)
    return {
      status: 200
    }
  }
}
