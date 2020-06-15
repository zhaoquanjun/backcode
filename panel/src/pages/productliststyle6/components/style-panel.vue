<template>
  <el-collapse v-model="activeNames"
               :accordion="true">
    <el-collapse-item v-show="type === 'pc'"
                      name="1">
      <template slot="title">
        <span v-show="activeNames !== '1'"
              class="collapse-icon title-item text-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '1' }">图片设置</span>
      </template>
      <image-height :model="model.styleModel.cssvars"
                    :prefix="prefix"
                    :name="'imgHeight'"
                    :value-range="fontRange.productlist8imgh">
        <span class="setting-attribute--title">高度</span>
      </image-height>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc'"
                      name="2">
      <template slot="title">
        <span v-show="activeNames !== '2'"
              class="collapse-icon title-item background-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '2' }">间距</span>
      </template>
      <list-space :model="model.styleModel.cssvars"
                  prefix="$list-"
                  name="space"
                  :value-range="fontRange.productlistls">
        <span class="setting-attribute--title">间距</span>
      </list-space>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span v-show="activeNames !== '3'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '3' }">标题</span>
      </template>
      <title-font :model="model.styleModel.cssvars"
                  :prefix="'$title-'"
                  :font-range-titlelh="fontRange.productlist4titlelh"
                  :font-range-titlefs="fontRange.productlist4titlefs" />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span v-show="activeNames !== '4'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '4' }">简介</span>
      </template>
      <desc-font :model="model"
                 :prefix="prefix"
                 :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span v-show="activeNames !== '5'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '5' }">价格</span>
      </template>
      <title-font :model="model.styleModel.cssvars"
                  :prefix="'$price-'"
                  :font-range-titlelh="fontRange.productlist4pricelh"
                  :font-range-titlefs="fontRange.productlist4pricefs"
                  :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="6">
      <template slot="title">
        <span v-show="activeNames !== '6'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '6' }">按钮</span>
      </template>
      <button-font :model="model"
                   :prefix="'$button-'"
                   :font-range="fontRange" />
      <div class="add-icon__area">
        <div class="setting-attribute--title">图标</div>
        <div class="icon-container">
          <div v-show="icon"
               class="icon-show"
               @click="_handleAddButtonIcon">
            <i class="iconfont"
               :class="icon"
               :style="{ color: color }"></i>
          </div>
          <div v-show="!icon"
               class="add-icon"
               @click="_handleAddButtonIcon">
            +
          </div>
          <!-- <div v-show="icon" class="minus-icon" @click="_handleMinusButtonIcon">
            -
          </div> -->
        </div>
      </div>
      <icon :icon="icon"
            :icon-popup-flag="iconPopupFlag"
            @handleClosePopup="_handleClosePopup"
            @handleChooseIcon="_handleChooseIcon" />
    </el-collapse-item>

    <el-collapse-item name="7">
      <template slot="title">
        <span v-show="activeNames !== '7'"
              class="collapse-icon title-item border-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '7' }">边框</span>
      </template>
      <border :model="model.styleModel.cssvars"
              :font-range="fontRange"
              :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="8">
      <template slot="title">
        <span v-show="activeNames !== '8'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '8' }">分页设置</span>
      </template>
      <pagitation :model="model"
                  :prefix="prefix"
                  :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleFont from './title-font'
import DescFont from './desc-font'
import ButtonFont from './button-font'
import Pagitation from '@comp/pagitation/pagitation'
import ListSpace from './list-space'
import ImageHeight from '@comp/form/form-slider-css'
import Border from './border'
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    TitleFont,
    DescFont,
    ButtonFont,
    ListSpace,
    Pagitation,
    ImageHeight,
    Border,
    Icon
  },
  props: {
    value: {
      type: Object
    },
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
  data () {
    return {
      activeNames: '1',
      type: 'pc',
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
        return this.model.styleModel.cssvars[this.prefix + 'button-']
      },
      set: function() {}
    }
  },
  created () {
    if(window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    _getCurrentEquipmentType () {
      const _this = this
      if(window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    },
    _handleAddButtonIcon () {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon () {
      const oldVal = this.value['icon']
      const oldData = {}
      const data = {}
      oldData['icon'] = oldVal
      data['icon'] = ''
      this.value['icon'] = ''
      oldData['iconDisplay'] = 'block'
      data['iconDisplay'] = 'none'
      this.onIconChange('none')
      this.onDataChange('changeIconDisplay',oldData,data)
    },
    _handleClosePopup () {
      this.iconPopupFlag = false
    },
    _handleChooseIcon (val) {
      const oldVal = this.value['icon']
      if(val !== oldVal) {
        this.value['icon'] = val
        const oldData = {}
        const data = {}
        oldData['icon'] = oldVal
        data['icon'] = val
        oldData['iconDisplay'] = 'none'
        data['iconDisplay'] = 'block'
        this.onIconChange('block')
        this.onDataChange('changeIconDisplay',oldData,data)
        this.iconPopupFlag = false
      }
    },
    onIconChange (showIcon) {
      const oldData = {}
      const data = {}
      oldData[this.prefix + 'icon-show'] = this.model.styleModel.cssvars[
        this.prefix + 'icon-show'
      ]
      data[this.prefix + 'icon-show'] = showIcon
      this.model.styleModel.cssvars[this.prefix + 'icon-show'] = showIcon
      this.onCssChange(oldData,data)
    },
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    },
    onDataChange (action,oldData,data) {
      if(window.smSite) {
        window.smSite.onDataChange(action,oldData,data)
      }
    }
  }
}
</script>
