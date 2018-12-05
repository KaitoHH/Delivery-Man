<template>
  <div class="good">
    {{ message }}
  </div>
</template>
<script>
  export default {
    name: 'Good',
    data() {
      return {
        message: '商品管理'
      }
    }
  }
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .good {
    color: green;
  }
</style>
