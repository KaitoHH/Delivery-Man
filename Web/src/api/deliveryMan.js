import request from '@/utils/request'

export function fetchDeliveryMan(query) {
  return request({
    url: '/user',
    method: 'get',
    params: {
      verified: true
    }
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

