import request from '@/utils/request'

export function fetchUnpaidOrder(query) {
  return request({
    url: '/order/unpaid',
    methods: 'get',
    params: query
  })
}

export function fetchWaitDeliveryOrder(query) {
  return request({
    url: '/order/wait',
    methods: 'get',
    params: query
  })
}

export function fectchInTransitOrder(query) {
  return request({
    url: '/order/inTransit',
    methods: 'get',
    params: query
  })
}

export function fetchFinishedOrder(query) {
  return request({
    url: '/order/finished',
    methods: 'get',
    params: query
  })
}
