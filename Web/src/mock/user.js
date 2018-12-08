import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 100
const StatusList = ['open', 'locked']

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: `yuxia${i}`,
    registerDate: +Mock.Random.date('T'),
    credit: Math.ceil(5 * Math.random()),
    status: StatusList[Math.floor(StatusList.length * Math.random())]
  }))
}

export default {
  getUsers: config => {
    const mockList = List.filter(() => {
      return true
    })
    return {
      total: mockList.length,
      items: mockList
    }
  },
  addUser: config => {
    let user = JSON.parse(config.body)
    user = Object.assign(Mock.mock({ id: '@increment' }),
      { name: user.name, registerDate: new Date(), credit: 5, status: 'open' })
    return {
      item: user
    }
  },
  updateUser: config => {
    const user = JSON.parse(config.body)
    return {
      item: user
    }
  }
}
