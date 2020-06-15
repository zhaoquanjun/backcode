<template>
  <div class="divider-section">
    <border-color
      :model="model"
      :width="232"
      :prefix="prefix"
    >颜色</border-color>
    <border-style
      :model="model"
      :prefix="prefix"
    >线型</border-style>
    <line-width
      class="row-top__dis"
      :model="model"
      :prefix="'$'"
      :name="'bdLineWidth'"
      :value-range="fontRange.newslistdatelw"
    >
      <span class="setting-attribute--title">线宽</span>
    </line-width>
  </div>
</template>

<script>
import BorderColor from '@comp/border/border-color'
import BorderStyle from '@comp/border/border-style'
import LineWidth from '@comp/form/form-slider-css'
export default {
  components: {
    BorderColor,
    BorderStyle,
    LineWidth
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
