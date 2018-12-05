<template>
  <div class="delivery-man">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'Delivery-Man',
    data() {
      return {
        message: '送货员'
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .message {
    color: green;
  }
</style>
