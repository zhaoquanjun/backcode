<template>
  <div class="popup-content__open">
    <span>页面打开方式</span>
    <div class="way-list__box">
      <el-radio
        v-model="target"
        label="_self"
        @change="_handleChageLinkTarget('_self')"
      >当前窗口打开</el-radio>
      <el-radio
        v-model="target"
        label="_blank"
        style="margin-left: 24px;"
        @change="_handleChageLinkTarget('_blank')"
      >新窗口打开</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: String
    }
  },
  methods: {
    _handleChageLinkTarget(val) {
      this.$emit('handleChangeLinkTarget', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-content__open {
  margin-right: 16px;
  padding: 16px 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 566px;
  border-top: 1px solid $--popup-border-color;
  span {
    margin-right: 16px;
    display: inline-block;
    min-width: 100px;
    text-align: right;
    font-size: $--font-size-small;
    line-height: 20px;
    color: $--popup-font-color-main;
  }
  .way-list__box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .way-list__box /deep/ .el-radio__inner {
    border-color: $--popup-border-color;
    background-color: $--popup-background-main;
  }

  .way-list__box /deep/ .el-radio__label {
    color: $--popup-font-color-main !important;
  }
}
</style>
