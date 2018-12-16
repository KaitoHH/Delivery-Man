import request from '@/utils/request'

export function fetchUnpaidOrder(query) {
  return request({
    url: '/order',
    methods: 'get',
    params: {
      status: 0
    }
  })
}

export function fetchWaitDeliveryOrder(query) {
  return request({
    url: '/order',
    methods: 'get',
    params: {
      status: 1
    }
  })
}

export function fectchInTransitOrder(query) {
  return request({
    url: '/order',
    methods: 'get',
    params: {
      status: 2
    }
  })
}

export function fetchFinishedOrder(query) {
  return request({
    url: '/order',
    methods: 'get',
    params: {
      status: 3
    }
  })
}
