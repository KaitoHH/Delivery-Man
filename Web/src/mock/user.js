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
  }
}
