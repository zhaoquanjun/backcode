<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >标题文字</span>
      </template>
      <font
        :model="model.styleModel.cssvars"
        :value="value"
        :prefix="'$title-'"
        :font-range="fontRange"
      />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >简介</span>
      </template>
      <font
        :model="model.styleModel.cssvars"
        :value="value"
        :prefix="'$desc-'"
        :font-range="fontRange"
      />
      <line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </line-height>
      <desc-line-num
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineClamp'"
        :value-range="fontRange.productdesccol"
      >
        <span class="setting-attribute--title">行数</span>
      </desc-line-num>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >
          节点</span>
      </template>
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
      <!-- <icon-font-color
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$node-'"
        :width="232"
      >
        <span class="setting-attribute--title">颜色</span>
      </icon-font-color> -->
      <background-color
        :title-show="false"
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$node-'"
      ><span class="setting-attribute--title">颜色</span></background-color>
      <list-num
        class="row-top__dis"
        :model="model.dataModel"
        :name="'listShowNum'"
        :value-range="fontRange.steplistnum"
        :event-name="'onDataChange'"
        :action-key="'refreshList'"
      >
        <span class="setting-attribute--title">数量</span>
      </list-num>
      <margin-area
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$node-'"
        :name="'space'"
        :value-range="fontRange.columnsmr"
      >
        <span
          class="setting-attribute--title"
          style="width: 70px;"
        >间距(%)</span>
      </margin-area>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >线条</span>
      </template>
      <border
        :model="model.styleModel.cssvars"
        :prefix="'$node-'"
        :value-range="fontRange.stepbw"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Font from '@comp/font/font-group/font-style4'
import Border from '@comp/border/border-group/style2'
import LineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'
import ListNum from '@comp/form/form-slider-data'
import BackgroundColor from '@comp/background/bg-color'
import MarginArea from '@comp/layout/margin'
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    Font,
    Border,
    LineHeight,
    DescLineNum,
    BackgroundColor,
    ListNum,
    MarginArea,
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
      type: String
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
      activeNames: '1',
      iconPopupFlag: false
    }
  },
  computed: {
    icon: {
      get: function() {
        return this.model.dataModel['icon']
      },
      set: function() {}
    },
    color: {
      get: function() {
        return this.model.styleModel.cssvars['$node-ftColor']
      },
      set: function() {}
    }
  },

  methods: {
    _handleAddButtonIcon() {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon() {
      const oldVal = this.model.dataModel['icon']
      this.model.dataModel['icon'] = ''
      const oldData = {}
      const data = {}
      oldData['icon'] = oldVal
      data['icon'] = ''
      this.onDataChange('changeIcon', oldData, data)
    },
    handleClosePopup(msg) {
      this.iconPopupFlag = false
    },
    handleChooseIcon(val) {
      const oldVal = this.model.dataModel['icon']
      if (val !== oldVal) {
        this.model.dataModel['icon'] = val
        const oldData = {}
        const data = {}
        oldData['icon'] = oldVal
        data['icon'] = val
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
.row-top__dis /deep/ .el-color-picker--small {
  width: 100% !important;
}
.row-top__dis /deep/ .section-content {
  padding-left: 0 !important;
}
</style>
