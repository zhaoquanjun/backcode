<template>
  <div class="pannel-name clearfix">
    <span class="name-inner name">{{ controlName }}</span>
    <!-- <span class="name-inner theme"></span> -->
  </div>
</template>

<script>
export default {
  props: ['controlName'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.pannel-name {
  position: relative;
  height: 58px;
  padding: 24px 24px 12px;

  &:after {
    position: absolute;
    bottom: 0;
    left: 12px;
    display: block;
    content: '';
    width: 256px;
    height: 1px;
    background: $--usual-border-color;
  }
  .name-inner {
    display: block;
  }
  .name {
    float: left;
    color: $--usual-font-color-sub;
    font-size: $--font-size-big;
    line-height: 22px;
  }
  .theme {
    float: right;
    width: 20px;
    height: 20px;
    background: url("~@static/images/pannel_theme.png") no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
