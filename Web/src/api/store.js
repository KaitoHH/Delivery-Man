import request from '@/utils/request'

export function fetchStore(query) {
  return request({
    url: '/Store',
    method: 'get'
  })
}

export function deleteStore(storeId) {
  return request({
    url: `/store/${storeId}`,
    method: 'delete'
  })
}

export function fetchStoreGoods(storeId) {
  return request({
    url: `/store/${storeId}`,
    method: 'get'
  })
}

export function addStore(data) {
  return request({
    url: '/store/',
    method: 'post',
    data
  })
}

export function updateStore(storeId, data) {
  return request({
    url: `/store/${storeId}/`,
    method: 'put',
    data
  })
}

export function updateStoreStock(itemId, data) {
  return request({
    url: `/storegoods/${itemId}/`,
    method: 'put',
    data
  })
}

export function addStoreStock(data) {
  return request({
    url: `/storegoods/`,
    method: 'post',
    data
  })
}

export function deleteStoreGoods(itemId) {
  return request({
    url: `/storegoods/${itemId}`,
    method: 'delete'
  })
}

export function addStoreStockGoods(data) {
  return request({
    url: '/addStoreStockGoods',
    method: 'post',
    data
  })
}
