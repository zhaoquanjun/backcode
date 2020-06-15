<template>
  <div class="right-pannel">
    <div class="pannel-head">
      <span>
        <slot name="back"></slot>
        <slot name="title-text"></slot>
        <el-tooltip
          class="item"
          effect="dark"
          content="可批量为多个成员增加权限，该操作不会删除"
          placement="left-start"
        >
          <slot name="icon-tip"></slot>
        </el-tooltip>
      </span>
      <span class="close-pannel" @click="closePanel">
        <i class="iconfont iconguanbi"></i>
      </span>
    </div>
    <div class="pannel-main" style="padding:0 17px">
      <div>
        <slot></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: 'RightPannel',
  props: {
    pannelWidth: {
      type: String,
      default: '331'
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {},

  mounted() {},
  methods: {
    closePanel() {
      this.$emit('closeRightPanel', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-title {
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
}
.right-pannel {
  background: $--popup-background-main;
  position: fixed;
  z-index: 2200;
  right: 0;
  top: 0;
  bottom: 0;
  color: $--popup-font-color-main;
  box-shadow: $--area-shadow-base;
  transition: width 0.2s linear;
  overflow: hidden;
  .pannel-head {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    border-bottom: 1px solid $--popup-border-color;
    span {
      padding: 0 10px;
    }
    .auth-title {
      margin-right: 10px;
    }
    .close-pannel {
      float: right;
      cursor: pointer;
    }
  }
}

.category-content {
  padding: 30px 0 13px 0;
}
.pannle-footer {
  text-align: left;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0px;
  padding: 16px;
  border-top: 1px solid $--popup-border-color;
  box-sizing: border-box;
}
</style>
