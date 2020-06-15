<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <font-family :model="model" :prefix="prefix"></font-family>
      <font-size
        :model="model"
        :prefix="prefix"
        :value-range="fontRange.detailfs"
      ></font-size>
    </div>
    <font-style1 class="row-top__dis" :model="model" :prefix="prefix"></font-style1>
    <font-line-height
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'lineHeight'"
    >
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.productsummaryls"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontStyle1 from '@comp/font/font-group/font-style1'

import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'
export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontStyle1,
    FontLineHeight,
    FontLetterSpace
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
    },
    controlName: {
      type: String
    }
  },
  data() {
    return {
      activeName: '1',
      iconPopupFlag: false
    }
  },
  mounted() {},
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-section {
  .font-setting__area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .row-pad__top {
    margin-top: 16px;
  }
  .font-style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #b9cbcf;
    border-radius: 4px;
    background: #fff;
    li {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      border-radius: 4px;
      &::after {
        position: absolute;
        display: block;
        content: '';
        width: 1px;
        height: 14px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #eee;
      }
    }
  }
  .divider {
    margin-top: 16px;
    height: 1px;
    width: 100%;
    border-top: 1px dashed #c9d9dc;
  }
}
</style>
