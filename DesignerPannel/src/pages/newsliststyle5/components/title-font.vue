<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <!-- 字体下拉框 begin -->
      <font-family :model="model"
                   :prefix="prefix"
                   @onCssChange="onCssChange"></font-family>
      <!-- 字体下拉框 end -->
      <!-- 字体尺寸输入框 begin -->
      <font-size :model="model"
                 :prefix="prefix"
                 :value-range="fontRange.productfs"
                 @onCssChange="onCssChange"></font-size>
      <!-- 字体尺寸输入框 end -->
    </div>
    <div class="flex-between-center--area row-top__dis">
      <ul class="font-style">
        <li>
          <font-weight :prefix="prefix"
                       :model="model"
                       @onCssChange="onCssChange"></font-weight>
        </li>
        <li>
          <font-italic :prefix="prefix"
                       :model="model"
                       @onCssChange="onCssChange"></font-italic>
        </li>
        <li>
          <font-underline :prefix="prefix"
                          :model="model"
                          @onCssChange="onCssChange"></font-underline>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color :model="model"
                  :prefix="prefix"
                  @onCssChange="onCssChange"></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <div class="divider"></div>
    <div class="row-pad__top">
      <title-line-height class="row-top__dis"
                         :model="model"
                         :prefix="prefix"
                         :name="'lineHeight'">
        <span class="setting-attribute--title">行高</span>
      </title-line-height>
      <desc-line-num class="row-top__dis"
                     :model="model"
                     :prefix="prefix"
                     :name="'lineClamp'"
                     :value-range="fontRange.productdesccol">
        <span class="setting-attribute--title">行数</span>
      </desc-line-num>
    </div>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

import TitleLineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'
export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    TitleLineHeight,
    DescLineNum
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object
    }
  },
  data () {
    return {
      activeName: '1'
    }
  },
  methods: {
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  width: 166px !important;
  li {
    width: 27px !important;
  }
}
</style>
