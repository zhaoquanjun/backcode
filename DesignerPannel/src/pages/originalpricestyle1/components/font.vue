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
    <div class="flex-between-center--area row-top__dis">
      <ul class="font-style">
        <el-tooltip class="item" effect="dark" content="加粗" placement="top-start">
          <li>
            <font-weight :prefix="prefix" :model="model"></font-weight>
          </li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="斜体" placement="top-start">
          <li>
            <font-italic :prefix="prefix" :model="model"></font-italic>
          </li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="下划线" placement="top-start">
          <li>
            <font-underline :prefix="prefix" :model="model"></font-underline>
          </li>
        </el-tooltip>
        <li>
          <font-align-group :prefix="prefix" :model="model"></font-align-group>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color :model="model" :prefix="prefix"></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <font-line-height
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'lineHeight'"
      :value-range="fontRange.newstitlelh"
    >
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.newstitlels"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'
import FontAlignGroup from '@comp/font/font-align-group'
export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    FontLineHeight,
    FontLetterSpace,
    FontAlignGroup
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
.stpanel-parcel {
  padding: 0 25px;
  .font-style__padding {
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .font-style {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #c9d9dc;
    border-radius: 4px;
    background: #fff;
    li {
      position: relative;
      box-sizing: content-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 14px;
      padding: 12px 14px;
      &::after {
        display: block;
        position: absolute;
        right: 0;
        top: 12px;
        content: "";
        width: 1px;
        height: 16px;
        background: #eee;
      }
    }
  }
}
</style>

