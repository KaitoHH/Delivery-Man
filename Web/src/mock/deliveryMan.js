import Mock from 'mockjs'

const List = []
const count = 100
const StatusList = ['open', 'locked']

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: `delivery-man-${i}`,
    registerDate: +Mock.Random.date('T'),
    credit: Math.ceil(5 * Math.random()),
    status: StatusList[Math.floor(StatusList.length * Math.random())]
  }))
}

export default {
  getDeliveryMan: config => {
    return {
      items: List
    }
  },
  addDeliveryMan: config => {
    let deliveryMan = JSON.parse(config.body)
    deliveryMan = Object.assign(Mock.mock({ id: '@increment' }),
      { name: deliveryMan.name, registerDate: new Date(), credit: 5, status: 'open' })
    return {
      item: deliveryMan
    }
  },
  updateDeliveryMan: config => {
    const deliveryMan = JSON.parse(config.body)
    return {
      item: deliveryMan
    }
  }
}
