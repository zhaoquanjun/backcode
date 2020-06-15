<template>
  <div class="border-section">
    <!-- 线宽 begin -->
    <border-width
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="valueRange.imagebw"
    >
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <!-- 线宽 end -->
    <div class="row-top__dis">
      <border-radius
        :model="model"
        :prefix="prefix"
        :name="'bdRadius'"
        :value-range="valueRange.imagebr"
      >
        <span class="setting-attribute--title">圆角</span>
      </border-radius>
    </div>
    <!-- 颜色 begin -->
    <border-color :model="model" :prefix="prefix">
      <span class="setting-attribute--title">颜色</span>
    </border-color>
    <!-- 颜色 end -->
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
  }
}
</script>
