import request from '@/utils/request'

export function fetchStore(query) {
  return request({
    url: '/store',
    method: 'get',
    params: query
  })
}

export function fetchStoreGoods(storeId) {
  return request({
    url: `/stock`,
    method: 'get',
    params: { storeId: storeId }
  })
}

export function addStore(data) {
  return request({
    url: '/store',
    method: 'post',
    data
  })
}

export function updateStore(data) {
  return request({
    url: '/store',
    method: 'put',
    data
  })
}

export function addStoreStockGoods(data) {
  return request({
    url: '/addStoreStockGoods',
    method: 'post',
    data
  })
}
