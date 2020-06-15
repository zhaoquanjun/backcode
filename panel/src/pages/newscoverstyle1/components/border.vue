<template>
  <div class="border-section">
    <border-width
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="valueRange.imagebw"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <border-radius
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'bdRadius'"
      :value-range="valueRange.imagebr"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title">圆角</span>
    </border-radius>
    <border-color
      :model="model"
      :prefix="prefix"
      @onCssChange="onCssChange"
    >颜色</border-color>
  </div>
</template>
<script>
import BorderRadius from '@comp/form/form-slider-css'
import BorderColor from '@comp/border/border-color'
import BorderWidth from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: { BorderColor, BorderWidth, BorderRadius },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    valueRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
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
