import Mock from 'mockjs'

const count = 100

const unPaidOrders = []
const waitDeliveryOrders = []
const inTransitOrders = []
const finishedOrders = []

for (let i = 0; i < count; i++) {
  unPaidOrders.push(Mock.mock({
    id: '@increment',
    totalPrice: i * 100 + 10,
    userId: (i + 1) * 100 + 1,
    username: `yuxia${i}`,
    address: `上海市闵行区上海交通大学软件大楼2${i}号`,
    receiver: `yuxia${i}`,
    orderDate: +Mock.Random.date('T')
  }))
}

for (let i = 0; i < count; i++) {
  waitDeliveryOrders.push(Mock.mock({
    id: '@increment',
    totalPrice: i * 100 + 10,
    userId: (i + 1) * 100 + 1,
    username: `yuxia${i}`,
    address: `上海市闵行区上海交通大学软件大楼2${i}号`,
    receiver: `yuxia${i}`,
    orderDate: +Mock.Random.date('T'),
    paidDate: +Mock.Random.date('T')
  }))
}

for (let i = 0; i < count; i++) {
  inTransitOrders.push(Mock.mock({
    id: '@increment',
    totalPrice: i * 100 + 10,
    userId: (i + 1) * 100 + 1,
    username: `yuxia${i}`,
    address: `上海市闵行区上海交通大学软件大楼2${i}号`,
    receiver: `yuxia${i}`,
    orderDate: +Mock.Random.date('T'),
    paidDate: +Mock.Random.date('T'),
    deliveryUserId: `${i}`,
    deliveryUserName: `xia${i}`,
    deliveryAcceptDate: +Mock.Random.date('T')
  }))
}

for (let i = 0; i < count; i++) {
  finishedOrders.push(Mock.mock({
    id: '@increment',
    totalPrice: i * 100 + 10,
    userId: (i + 1) * 100 + 1,
    username: `yuxia${i}`,
    address: `上海市闵行区上海交通大学软件大楼2${i}号`,
    receiver: `yuxia${i}`,
    orderDate: +Mock.Random.date('T'),
    paidDate: +Mock.Random.date('T'),
    deliveryUserId: `${i}`,
    deliveryUserName: `xia${i}`,
    deliveryAcceptDate: +Mock.Random.date('T'),
    deliveryDate: +Mock.Random.date('T')
  }))
}

export default {
  getUnpaidOrder: config => {
    const data = unPaidOrders.filter(() => {
      return true
    })
    return {
      items: data
    }
  },
  getWaitOrder: config => {
    const data = waitDeliveryOrders.filter(() => {
      return true
    })
    return {
      items: data
    }
  },
  getInTransitOrder: config => {
    const data = inTransitOrders.filter(() => {
      return true
    })
    return {
      items: data
    }
  },
  getFinishedOrder: config => {
    const data = finishedOrders.filter(() => {
      return true
    })
    return {
      items: data
    }
  }
}
