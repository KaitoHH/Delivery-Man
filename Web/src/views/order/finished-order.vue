<template>
  <div class="finished-order" @click="showAlert">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'FinishedOrder',
  data() {
    return {
      message: '已完成订单'
    }
  },
  methods: {
    showAlert: function() {
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
