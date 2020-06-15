<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <!-- 字体下拉框 begin -->
      <font-family
        :model="model"
        :prefix="prefix"
        @onCssChange="onCssChange"
      ></font-family>
      <!-- 字体下拉框 end -->
      <!-- 字体尺寸输入框 begin -->
      <font-size
        :model="model"
        :prefix="prefix"
        :value-range="fontRange.detailfs"
        @onCssChange="onCssChange"
      ></font-size>
      <!-- 字体尺寸输入框 end -->
    </div>
    <div class="flex-between-center--area row-top__dis">
      <ul class="font-style">
        <el-tooltip
          class="item"
          effect="dark"
          content="加粗"
          placement="top-start"
        >
          <li>
            <font-weight
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-weight>
          </li>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="斜体"
          placement="top-start"
        >
          <li>
            <font-italic
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-italic>
          </li>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="下划线"
          placement="top-start"
        >
          <li>
            <font-underline
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-underline>
          </li>
        </el-tooltip>
        <li>
          <font-align-group
            :prefix="prefix"
            :model="model"
            @onCssChange="onCssChange"
          ></font-align-group>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color
        :model="model"
        :prefix="prefix"
        @onCssChange="onCssChange"
      ></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <font-line-height class="row-top__dis" :model="model" :prefix="prefix" :name="'lineHeight'">
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.newssummaryls"
      @onCssChange="onCssChange"
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
  name: 'Newssummary',
  components: {
    FontFamily,
    FontSize,
    FontWeight,
    FontColor,
    FontLineHeight,
    FontLetterSpace,
    FontUnderline,
    FontItalic,
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
  computed: {
    color: {
      get: function() {
        return this.model[this.prefix + 'ftColor']
      },
      set: function() {}
    }
  },
  mounted() {},
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
