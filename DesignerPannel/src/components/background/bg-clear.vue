<template>
  <div class="pannel-clear">
    <div class="clear-icon"></div>
    <p class="clear-tips">背景样式已清除</p>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .pannel-clear {
    .clear-icon {
      margin: 24px auto 16px;
      width: 48px;
      height: 40px;
      background: url('~@static/images/background/clear_success.png') no-repeat center center;
      background-size: 100% 100%;
    }
    .clear-tips {
      color: $--color-main;
      line-height: 17px;
      text-align: center;
    }
  }
</style>
