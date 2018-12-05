<template>
  <div class=".wait-delivery-order">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'WaitDeliveryOrder',
  data() {
    return {
      message: '等待配送的订单'
    }
  },
  methods: {
    test: function() {
    }
  }
}
</script>
<style rel="stylesheet" lang="scss">
  .wait-delivery-order {
    color: green;
  }
</style>
