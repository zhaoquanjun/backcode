<template>
  <div class="border-section">
    <!-- 线宽 begin -->
    <border-width :model="model"
                  :prefix="prefix"
                  :name="'bdWidth'"
                  :value-range="valueRange[controlName + 'bw']">
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <border-color :model="model"
                  :prefix="prefix">
      <span class="setting-attribute--title">颜色</span>
    </border-color>
    <border-style class="row-top__dis"
                  :model="model"
                  :prefix="prefix"
                  :value-range="valueRange">
      <span class="setting-attribute--title">线条</span>
    </border-style>
  </div>
</template>
<script>
import BorderStyle from '@comp/border/border-style'
import BorderColor from '@comp/border/border-color'
import BorderWidth from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: {BorderColor,BorderWidth,BorderStyle},
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
    },
    controlName: {
      type: String
    }
  }
}
</script>
