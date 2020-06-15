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
        <li>
          <font-weight :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-weight>
        </li>
        <li>
          <font-italic :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-italic>
        </li>
        <li>
          <font-underline :prefix="prefix" :model="model" @onCssChange="onCssChange"></font-underline>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color :model="model" :prefix="prefix" @onCssChange="onCssChange"></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <div class="divider"></div>
    <font-line-height
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'lineHeight'"
      :value-range="fontRange.newsviewcountlh"
    >
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.newsviewcountls"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
    <p class="setting-block--subtitle row-top__dis">对齐方式</p>
    <text-align-center :model="model" :prefix="prefix"></text-align-center>

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
import TextAlignCenter from '@comp/contentAlign/text-align-group'

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
    TextAlignCenter
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeName: '1',
      iconPopupFlag: false
    }
  },
  computed: {
    icon: {
      get: function() {
        return this.value['Icon']
      },
      set: function() { }
    },
    color: {
      get: function() {
        return this.model[this.prefix + 'ftColor']
      },
      set: function() { }
    }
  },
  mounted() { },
  methods: {
    _handleAddButtonIcon() {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon() {
      const oldVal = this.value['Icon']
      this.value['Icon'] = ''
      const oldData = {}
      const data = {}
      oldData['Icon'] = oldVal
      data['Icon'] = ''
      this.onDataChange(null, oldData, data)
    },
    _handleClosePopup() {
      this.iconPopupFlag = false
    },
    _handleChooseIcon(val) {
      const oldVal = this.value['Icon']
      if (val !== oldVal) {
        this.value['Icon'] = val
        const oldData = {}
        const data = {}
        oldData['Icon'] = oldVal
        data['Icon'] = val
        this.onDataChange(null, oldData, data)
        this.iconPopupFlag = false
      }
    },
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
