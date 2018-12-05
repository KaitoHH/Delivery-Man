<template>
  <div class="in-transit-order">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'InTransitOrder',
    data() {
      return {
        message: '配送中的订单'
      }
    },
    methods: {
      test: function () {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .in-transit-order {
    color: green;
  }
</style>
