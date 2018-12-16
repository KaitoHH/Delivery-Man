import request from '@/utils/request'

export function fetchGoods(query) {
  return request({
    url: '/goods',
    method: 'get',
    params: query
  })
}

export function updateGoods(goodsId, data) {
  return request({
    url: `/goods/${goodsId}/`,
    method: 'put',
    data
  })
}

export function deleteGoods(goodsId) {
  return request({
    url: `/goods/${goodsId}/`,
    method: 'delete'
  })
}

export function addGoods(data) {
  return request({
    url: '/goods/',
    method: 'post',
    data
  })
}

