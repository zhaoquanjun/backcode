<template>
  <div class="border-section">
    <!-- 线宽 begin -->
    <border-width
      v-show="isBoardWidthShow"
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="valueRange[controlName + 'bw']"
    >
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <!-- 线宽 end -->

    <div class="row-top__dis">
      <!-- 圆角 begin  -->
      <border-radius
        v-show="isBoardRadiusShow"
        :model="model"
        :prefix="prefix"
        :name="'bdRadius'"
        :value-range="valueRange[controlName + 'br']"
      >
        <span class="setting-attribute--title">圆角</span>
      </border-radius>
    </div>
    <!-- 圆角 end  -->

    <!-- 颜色 begin -->
    <border-color
      :model="model"
      :prefix="prefix"
    ><span class="setting-attribute--title">颜色</span></border-color>
    <!-- 颜色 end -->

    <!-- 线型与颜色 begin -->
    <border-style
      v-show="isShow"
      :model="model"
      :prefix="prefix"
    ><span class="setting-attribute--title">边框</span></border-style>
    <!-- 线型 end -->
  </div>
</template>
<script>
import BorderStyle from './border-style'
import BorderColor from './border-color'
import BorderWidth from '@comp/form/form-slider-css'
import BorderRadius from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: { BorderStyle, BorderColor, BorderWidth, BorderRadius },
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
    isShow: {
      type: Boolean,
      default: true
    },
    isBoardWidthShow: {
      type: Boolean,
      default: true
    },
    isBoardRadiusShow: {
      type: Boolean,
      default: true
    },
    controlName: {
      type: String
    }
  }
}
</script>
