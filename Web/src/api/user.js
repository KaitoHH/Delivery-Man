import request from '@/utils/request'

export function fetchUser(query) {
  return request({
    url: '/user',
    method: 'get',
    param: query
  })
}
