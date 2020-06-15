<template>
  <el-collapse v-model="activeName" :accordion="true">
    <el-collapse-item name="0">
      <template slot="title">
        <span
          v-show="activeName !== '1'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeName == '1' }"
        >标题</span>
      </template>
      <title-font
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :font-range="fontRange"
      />
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
        @handleClosePopup="_handleClosePopup"
        @handleChooseIcon="_handleChooseIcon"
      />
    </el-collapse-item>
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeName !== '2'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeName == '2' }"
        >日期</span>
      </template>
      <date-font :model="model" :prefix="prefix" :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeName !== '3'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeName == '3' }"
        >分割线</span>
      </template>
      <divider
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :font-range="fontRange"
      />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeName !== '4'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeName == '4' }"
        >分页设置</span>
      </template>
      <pagitation :model="model" :prefix="prefix" :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleFont from './title-font'
import DateFont from './date-font'
import Pagitation from '@comp/pagitation/pagitation'
import Divider from './divider'
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    TitleFont,
    DateFont,
    Pagitation,
    Divider,
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
      type: Object
    }
  },
  data() {
    return {
      activeName: '0',
      iconPopupFlag: false
    }
  },
  computed: {
    icon: {
      get: function() {
        return this.value['icon']
      },
      set: function() {}
    },
    color: {
      get: function() {
        return this.model.styleModel.cssvars[this.prefix + 'ftColor']
      },
      set: function() {}
    }
  },
  created() {},
  methods: {
    _handleAddButtonIcon() {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon() {
      const oldVal = this.value['icon']
      const oldData = {}
      const data = {}
      oldData['icon'] = oldVal
      data['icon'] = ''
      this.value['icon'] = ''
      oldData['iconDisplay'] = 'block'
      data['iconDisplay'] = 'none'
      this.onIconChange('none')
      this.onDataChange('changeIconDisplay', oldData, data)
    },
    _handleClosePopup() {
      this.iconPopupFlag = false
    },
    _handleChooseIcon(val) {
      const oldVal = this.value['icon']
      if (val !== oldVal) {
        this.value['icon'] = val
        const oldData = {}
        const data = {}
        oldData['icon'] = oldVal
        data['icon'] = val
        oldData['iconDisplay'] = 'none'
        data['iconDisplay'] = 'block'
        this.onIconChange('block')
        this.onDataChange('changeIconDisplay', oldData, data)
        this.iconPopupFlag = false
      }
    },
    onIconChange(showIcon) {
      const oldData = {}
      const data = {}
      oldData[this.prefix + 'icon-show'] = this.model.styleModel.cssvars[
        this.prefix + 'icon-show'
      ]
      data[this.prefix + 'icon-show'] = showIcon
      this.model.styleModel.cssvars[this.prefix + 'icon-show'] = showIcon
      this.onCssChange(oldData, data)
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
