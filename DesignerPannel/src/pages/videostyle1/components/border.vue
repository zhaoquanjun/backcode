<template>
  <div class="setting-block__section">
    <p class="setting-block--title">边框</p>
    <border-width :model="model" :prefix="prefix" :name="'bdWidth'" :value-range="fontRange.videobw" @onCssChange="onCssChange"><span class="form-title__area">线宽</span></border-width>
    <border-radius class="setting-block__top" :model="model" :prefix="prefix" :name="'bdRadius'" :value-range="fontRange.videobr" @onCssChange="onCssChange"><span class="form-title__area">圆角</span></border-radius>
    <border-color :model="model" :prefix="prefix" @onCssChange="onCssChange"><span class="form-title__area">颜色</span></border-color>
  </div>
</template>
<script>
import BorderWidth from '@comp/form/form-slider-css'
import borderRadius from '@comp/form/form-slider-css'
import BorderColor from '@comp/border/border-color'
export default {
  components: {
    BorderWidth,
    borderRadius,
    BorderColor
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
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
