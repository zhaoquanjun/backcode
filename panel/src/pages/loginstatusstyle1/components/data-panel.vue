<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-area__title setting-block--title">登录按钮</div>
      <text-area
        :model="model"
        :name="'LoginBtnText'"
        :length-limit="10"
        :is-show-word-limit="true"
      />
      <div class="divider"></div>
      <div class="setting-area__title setting-block--title">注册按钮</div>
      <text-area
        :model="model"
        :name="'RegisterBtnText'"
        :length-limit="10"
        :is-show-word-limit="true"
      />
    </div>
  </div>
</template>

<script>
import TextArea from '@comp/data/text'
export default {
  components: {
    TextArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

.data-section .divider {
    margin: 16px 0;
}

.data-section /deep/ .el-input .el-input__count-inner {
  background-color: $--panel-background-color;
}
</style>
