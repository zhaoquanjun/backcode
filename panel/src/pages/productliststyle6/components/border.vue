<template>
  <div class="border-section">
    <!-- 颜色 begin -->
    <border-color
      style="margin-top: 0;"
      :model="model"
      :width="232"
      :prefix="prefix"
      class="border-padding"
    >颜色</border-color>
    <!-- 颜色 end -->

    <!-- 线宽 begin -->
    <border-width
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="fontRange.productlistbw"
    >
      <span class="form-title__area">线宽</span>
    </border-width>
    <!-- 线宽 end -->
  </div>
</template>
<script>
import BorderColor from '@comp/border/border-color'
import BorderWidth from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: { BorderColor, BorderWidth },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    },
    name: {
      type: String
    }
  }
}
</script>
