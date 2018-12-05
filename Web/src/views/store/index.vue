<template>
  <div class="message"> {{ message }}</div>
</template>

<script>
  export default {
    name: 'Store',
    data() {
      return {
        message: '商家管理'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .message {
    background-color: green;
  }
</style>
