<template>
  <div class="border-section">
    <!-- 线宽 begin -->
    <border-width
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="valueRange[controlName + 'bw']"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <border-color :model="model" :prefix="prefix" @onCssChange="onCssChange">颜色</border-color>
    <border-style :model="model" :prefix="prefix" @onCssChange="onCssChange">边框</border-style>
  </div>
</template>
<script>
import BorderStyle from '@comp/border/border-style'
import BorderColor from '@comp/border/border-color'
import BorderWidth from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: { BorderStyle, BorderColor, BorderWidth },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    valueRange: {
      type: Object
    },
    controlName: {
      type: String
    }
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
