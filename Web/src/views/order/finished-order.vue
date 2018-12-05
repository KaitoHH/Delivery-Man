<template>
  <div @click="showAlert" class="finished-order">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'Finished-Order',
    data() {
      return {
        message: '已完成订单'
      }
    },
    methods: {
      showAlert: function () {
        alert(`${this.message}`)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .message {
    color: green;
  }
</style>
