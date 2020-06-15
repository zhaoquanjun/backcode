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
    <font-line-height class="row-top__dis" :model="model" :prefix="prefix" :name="'lineHeight'">
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.textls"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
    <div class="divider"></div>
    <div class="add-icon__area row-top__dis">
      <div class="setting-attribute--title">图标</div>
      <div class="icon-container">
        <div v-show="icon" class="icon-show" @click="_handleAddButtonIcon">
          <i class="iconfont" :class="icon" :style="{ color: color }"></i>
        </div>
        <div v-show="!icon" class="add-icon" @click="_handleAddButtonIcon">
          +
        </div>
        <div v-show="icon" class="minus-icon" @click="_handleMinusButtonIcon">
          -
        </div>
      </div>
    </div>
    <icon
      :icon="icon"
      :icon-popup-flag="iconPopupFlag"
      @handleClosePopup="_handleClosePopup"
      @handleChooseIcon="_handleChooseIcon"
    />
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'

import FontStyle1 from '@comp/font/font-group/font-style1'

import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'

import Icon from '@comp/iconSelect/icon'
export default {
  name: 'Font',
  components: {
    FontFamily,
    FontSize,
    FontLineHeight,
    FontLetterSpace,
    Icon,
    FontStyle1
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
      type: Object
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
      set: function() {}
    },
    color: {
      get: function() {
        return this.model[this.prefix + 'ftColor']
      },
      set: function() {}
    }
  },
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
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
