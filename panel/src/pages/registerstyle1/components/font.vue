<template>
  <div class="font-section">
    <div
      class="flex-between-center--area"
      :style="{ 'flex-wrap': isShow || isGetCode ? 'wrap' : 'nowrap', width: '100%' }"
      :class="{ flexWrap: isinput }"
    >
      <div class="flex-between-center--area" style="width: 100%;">
        <font-family
          v-if="!isGetCode"
          :style="{marginRight: isShow || isGetCode ? '0px' : '30px'}"
          :model="model"
          :prefix="prefix"
        ></font-family>
        <font-size
          v-show="isShow || isGetCode"
          :model="model"
          :prefix="prefix"
          :value-range="fontRange.buttonfs"
        ></font-size>
      </div>
      <div
        class="flex-between-center--area"
        style="width: 100%;"
        :class="{ padtop16: !isinput, 'row-top__dis': isShow || isGetCode }"
      >
        <ul v-show="isShow || isGetCode" class="font-style">
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
              ></font-underline>
            </li>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="居中"
            placement="top-start"
          >
            <li>
              <font-center
                :prefix="prefix"
                :model="model"
              ></font-center>
            </li>
          </el-tooltip>
        </ul>
        <!-- 字体颜色选择器 begin -->
        <font-color
          :model="model"
          :prefix="prefix"
        ></font-color>
        <!-- 字体颜色选择器 end -->
      </div>
    </div>
    <div class="flex-between-center--area"></div>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontCenter from '@comp/font/font-text-center'

import Icon from '@comp/iconSelect/icon'

export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    FontCenter,
    Icon
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
    isShow: {
      type: Boolean,
      default: true
    },
    isinput: {
      type: Boolean,
      default: false
    },
    isGetCode: {
      type: Boolean,
      default: false
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
      set: function() {}
    },
    color: {
      get: function() {
        return this.model[this.prefix + 'ftColor']
      },
      set: function() {}
    }
  },
  mounted() {},
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
    handleClosePopup(msg) {
      this.iconPopupFlag = false
    },
    handleChooseIcon(val) {
      const oldVal = this.value['Icon']
      if (val !== oldVal) {
        this.value['Icon'] = val
        const oldData = {}
        const data = {}
        oldData['Icon'] = oldVal
        data['Icon'] = val
        this.onDataChange('changeIcon', oldData, data)
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
