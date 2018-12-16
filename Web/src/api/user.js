import request from '@/utils/request'

export function fetchUser(query) {
  return request({
    url: '/user',
    method: 'get',
    param: query
  })
}

export function fetchOneUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/user/',
    method: 'post',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}

export function updateUser(userId, data) {
  return request({
    url: `/user/${userId}/`,
    method: 'put',
    data
  })
}
