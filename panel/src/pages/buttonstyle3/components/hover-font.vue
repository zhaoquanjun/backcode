<template>
  <div class="flex-between-center--area">
    <ul class="font-style flex-start-center--area">
      <li>
        <font-weight :prefix="prefix" :model="model"></font-weight>
      </li>
      <li>
        <font-italic :prefix="prefix" :model="model"></font-italic>
      </li>
      <li>
        <font-underline :prefix="prefix" :model="model"></font-underline>
      </li>
    </ul>
    <!-- 字体颜色选择器 begin -->
    <font-color :model="model" :prefix="prefix"></font-color>
    <!-- 字体颜色选择器 end -->
  </div>
</template>
<script>
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

export default {
  name: 'Font',
  components: {
    FontColor,
    FontWeight,
    FontItalic,
    FontUnderline
  },
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
      activeName: '1'
    }
  },
  mounted() {},
  methods: {
    _handleAddButtonIcon() {},
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  border: 1px solid $--usual-border-color;
  border-radius: $--border-radius-base;
  background: $--panel-background-color;
  li {
    position: relative;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 14px;
    padding: 12px 14px;
    &::after {
      display: block;
      position: absolute;
      right: 0;
      top: 12px;
      content: '';
      width: 1px;
      height: 16px;
      background: $--usual-border-color;
    }
    i.iconfont {
      color: $--usual-font-color-main;
    }
  }
  li:last-of-type {
    &::after {
      display: none;
    }
  }
}
.el-input__inner {
  min-width: 40px;
}
</style>
