import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: `goods${i}`,
    img: 'static/img/401.gif'
  }))
}

export default {
  getGoods: config => {
    const mockList = List.filter(() => {
      return true
    })
    return {
      items: mockList
    }
  },
  addGoods: config => {
    let goods = JSON.parse(config.body)
    goods = Object.assign(Mock.mock({
      id: '@increment'
    }), goods)
    return {
      item: goods
    }
  }
}
