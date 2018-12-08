import request from '@/utils/request'

export function fetchGoods(query) {
  return request({
    url: '/goods',
    method: 'get',
    params: query
  })
}

export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}

