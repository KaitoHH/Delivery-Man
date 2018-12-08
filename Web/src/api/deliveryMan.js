import request from '@/utils/request'

export function fetchDeliveryMan(query) {
  return request({
    url: '/deliveryMan',
    method: 'get',
    param: query
  })
}

export function addDeliveryMan(data) {
  return request({
    url: '/deliveryMan',
    method: 'post',
    data
  })
}

export function updateDeliveryMan(data) {
  return request({
    url: '/deliveryMan',
    method: 'put',
    data
  })
}

