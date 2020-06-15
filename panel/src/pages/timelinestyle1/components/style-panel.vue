<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >分栏比例</span>
      </template>
      <percent
        :model="model.dataModel"
        :left-percent="'leftPercent'"
        :right-percent="'rightPercent'"
        :action-key="'changePercent'"
      />
    </el-collapse-item>

    <el-collapse-item name="2">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >节点</span>
      </template>
      <icon-distance
        :model="model.styleModel.cssvars"
        :value-range="fontRange.timelinedistance"
        :prefix="'$node-'"
        :name="'distance'"
      >
        <span class="setting-attribute--title">间距</span>
      </icon-distance>
      <div class="add-icon__area">
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
        @handleClosePopup="handleClosePopup"
        @handleChooseIcon="handleChooseIcon"
      />
      <icon-font-color
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$node-'"
        :width="232"
      >
        <span class="setting-attribute--title">颜色</span>
      </icon-font-color>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >日期</span>
      </template>
      <div class="flex-between-center--area">
        <span class="setting-attribute--title">显示日期</span>
        <date-switch
          :model="model"
          :prefix="'$time-'"
          :name="'show'"
          :attribute="'table-cell'"
          @changeTimeShow="changeTimeShow"
        />
      </div>
      <date-font-area
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$time-'"
        :font-range="fontRange.timelinedatefs"
      ></date-font-area>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >标题文字</span>
      </template>
      <title-font-area
        :model="model.styleModel.cssvars"
        :prefix="'$title-'"
        :font-range="fontRange.timelinetitlefs"
      ></title-font-area>
      <font-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$title-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </font-line-height>
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '5' }"
        >简介</span>
      </template>
      <div class="flex-between-center--area">
        <span class="setting-attribute--title">显示简介</span>
        <date-switch :model="model" :prefix="'$desc-'" :name="'show'" />
      </div>
      <desc-font-area
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :font-range="fontRange.timelinedescfs"
      ></desc-font-area>
      <font-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </font-line-height>
    </el-collapse-item>
    <el-collapse-item name="6">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '6' }"
        >线条</span>
      </template>
      <border-area
        :model="model.styleModel.cssvars"
        :prefix="'$line-'"
        :value-range="fontRange.timelinebw"
      ></border-area>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import Percent from '@comp/font/font-percent'
import DateSwitch from '@comp/form/form-switch'
import DateFontArea from '@comp/font/font-group/font-style4'
import TitleFontArea from '@comp/font/font-group/font-style4'
import DescFontArea from '@comp/font/font-group/font-style3'
import FontLineHeight from '@comp/font/font-line-height'
import IconFontColor from '@comp/font/font-color'
import IconDistance from '@comp/form/form-slider-css'
import BorderArea from '@comp/border/border-group/style2'
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    Percent,
    DateSwitch,
    DateFontArea,
    TitleFontArea,
    DescFontArea,
    FontLineHeight,
    IconFontColor,
    IconDistance,
    BorderArea,
    Icon
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
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
  created() {
    console.log(this.fontRange.timelinebw)
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
    changeTimeShow(flag) {
      const oldData = {}
      const data = {}
      if (flag === 'none') {
        oldData['leftPercent'] = this.model.dataModel.leftPercent
        oldData['rightPercent'] = this.model.dataModel.rightPercent
        data['leftPercent'] = 0
        data['rightPercent'] = 12
      } else {
        var rightP = document
          .getElementById('site-frame')
          .contentWindow.document.getElementById(this.model.controlId)
          .getAttribute('data-percent')
        oldData['leftPercent'] = 12
        oldData['rightPercent'] = 0
        data['leftPercent'] = 12 - parseInt(rightP)
        data['rightPercent'] = rightP
      }
      this.onDataChange('changePercent', oldData, data)
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
