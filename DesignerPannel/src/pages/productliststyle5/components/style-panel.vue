<template>
  <el-collapse v-model="activeNames"
               :accordion="true">
    <el-collapse-item name="0">
      <template slot="title">
        <span v-show="activeNames !== '0'"
              class="collapse-icon title-item text-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '0' }">布局设置</span>
      </template>
      <set-columns-num-pc v-show="type === 'pc'"
                          :model="model.dataModel"
                          :min-value="2">
        <span class="setting-attribute--title">电脑端展示</span>
      </set-columns-num-pc>
      <set-columns-num-mb v-show="type === 'phone'"
                          :model="model.dataModel">
        <span class="setting-attribute--title">移动端展示</span>
      </set-columns-num-mb>
    </el-collapse-item>
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
                    :value-range="fontRange.productlist7imgh">
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
  </el-collapse>
</template>

<script>
import TitleFont from './title-font'
import DescFont from './desc-font'
import ButtonFont from './button-font'
import ListSpace from './list-space'
import ImageHeight from '@comp/form/form-slider-css'
import Border from './border'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
export default {
  components: {
    TitleFont,
    DescFont,
    ButtonFont,
    ListSpace,
    ImageHeight,
    SetColumnsNumPc,
    SetColumnsNumMb,
    Border
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
  data () {
    return {
      activeNames: '0',
      type: 'pc'
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
    }
  }
}
</script>
