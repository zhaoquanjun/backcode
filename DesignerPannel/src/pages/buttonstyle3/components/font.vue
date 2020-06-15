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
        :value-range="fontRange.buttonfs"
        @onCssChange="onCssChange"
      ></font-size>
      <!-- 字体尺寸输入框 end -->
    </div>
    <div class="row-top__dis flex-between-center--area">
      <ul class="font-style flex-start-center--area">
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
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color
        :model="model"
        :prefix="prefix"
        @onCssChange="onCssChange"
      ></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <div class="divider"></div>
    <div class="add-icon__area">
      <div class="setting-attribute--title">按钮</div>
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
      @handleClosePopup="handleClosePopup"
      @handleChooseIcon="handleChooseIcon"
    />
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

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
      this.onDataChange('changeIcon', oldData, data)
    },
    handleClosePopup() {
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
<style lang="scss" scoped>
.font-section {
  .font-size-family--area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .font-decoration__area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font-style {
      border: 1px solid $--usual-border-color;
      border-radius: $--border-radius-base;
      background: $--panel-background-color;
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
          content: '';
          width: 1px;
          height: 16px;
          background: $--usual-border-color;
        }
        i.iconfont {
          color: $--usual-font-color-main;
        }
      }
      li:last-of-type {
        &::after {
          display: none;
        }
      }
    }
  }
  .add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    color: $--usual-font-color-sub;
    .icon-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      div:first-of-type {
        font-size: $--font-size-normal;
      }
      div.icon-show {
        margin-right: 8px;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background: $--panel-background-color;
        cursor: pointer;
      }
      div.add-icon,
      div.minus-icon {
        width: 24px;
        height: 24px;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: $--usual-font-color-sub;
        border-radius: $--border-radius-base;
        background: $--panel-background-color;
        cursor: pointer;
      }
    }
  }
}
</style>
