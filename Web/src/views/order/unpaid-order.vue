<template>
  <div class="unpaid-order">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'Unpaid Order',
    data() {
      return {
        message: '未支付订单'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .unpaid-order {
    color: green;
  }
</style>
