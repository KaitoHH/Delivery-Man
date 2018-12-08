import request from '@/utils/request'

export function fetchUser(query) {
  return request({
    url: '/user',
    method: 'get',
    param: query
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(user) {
  return request({
    url: '/user',
    method: 'put',
    user
  })
}
