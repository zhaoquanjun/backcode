<template>
  <div class="font-section" :class="{ flexWrap: isinput }">
    <div class="flex-between-center--area">
      <!-- 字体下拉框 begin -->
      <font-family
        :model="model"
        :prefix="prefix"
      ></font-family>
      <!-- 字体下拉框 end -->
      <!-- 字体尺寸输入框 begin -->
      <font-size
        v-show="isShow"
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
      ></font-size>
      <!-- 字体尺寸输入框 end -->
    </div>
    <div class="flex-between-center--area row-top__dis" :class="{ padtop16: !isinput }">
      <ul v-show="isShow" class="font-style">
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
              @onCssChange="onCssChange"
            ></font-center>
          </li>
        </el-tooltip>
      </ul>
      <font-color
        :model="model"
        :prefix="prefix"
        @onCssChange="onCssChange"
      ></font-color>
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
import FontCenter from '@comp/font/font-text-center'

export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    FontCenter
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
      width: 40px;
      height: 40px;
      // padding: 12px 14px;
      &::after {
        display: block;
        position: absolute;
        right: 0;
        top: 12px;
        content: '';
        width: 1px;
        height: 16px;
        background: #eee;
      }
    }
  .add {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed #c9d9dc;
    .icon-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      div:first-of-type {
        font-size: 14px;
      }
      div.icon-show {
        margin-right: 8px;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background: #e9f0f4;
        &:hover {
          background: #fff;
        }
      }
      div.add-icon,
      div.minus-icon {
        width: 24px;
        height: 24px;
        font-size: 20px;
        line-height: 20px;
        text-align: center;
        color: #00c1de;
        border-radius: 2px;
        background: rgba(9, 213, 245, 0.15);
        cursor: pointer;
      }
    }
  }
}
</style>
