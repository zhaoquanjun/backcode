<template>
  <div class="flex-between-center--area">
    <ul class="font-style flex-start-center--area">
      <li>
        <font-weight :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-weight>
      </li>
      <li>
        <font-italic :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-italic>
      </li>
      <li>
        <font-underline :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-underline>
      </li>
    </ul>
    <!-- 字体颜色选择器 begin -->
    <font-color :model="model" :prefix="prefix" @onCssChange="onCssChange"></font-color>
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
