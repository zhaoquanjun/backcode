<template>
  <div class="border-section">
    <border-width
      :model="model"
      :prefix="prefix"
      :name="'bdWidth'"
      :value-range="fontRange[controlName + 'bw']"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title">线宽</span>
    </border-width>
    <padding-area
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'padding'"
      :value-range="fontRange[controlName + 'padding']"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title" style="width: 70px;">上下边距</span>
    </padding-area>
    <!-- 颜色 begin -->
    <border-color class="row-top__dis" :model="model" :prefix="prefix" @onCssChange="onCssChange">颜色</border-color>
    <!-- 颜色 end -->
  </div>
</template>
<script>
import BorderColor from '@comp/border/border-color'
import BorderWidth from '@comp/form/form-slider-css'
import PaddingArea from '@comp/form/form-slider-css'
export default {
  name: 'Border',
  components: { BorderColor, BorderWidth, PaddingArea },
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
    controlName: {
      type: String
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
