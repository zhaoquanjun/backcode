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
                          :min-value="2"
                          @onDataChange="onDataChange">
        <span class="setting-attribute--title">电脑端展示</span>
      </set-columns-num-pc>
      <set-columns-num-mb v-show="type === 'phone'"
                          :model="model.dataModel"
                          @onDataChange="onDataChange">
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
                    :value-range="fontRange.product6imgh">
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
      <font-style :model="model.styleModel.cssvars"
                  prefix="$title-"
                  :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span v-show="activeNames !== '4'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '4' }">价格</span>
      </template>
      <font-style :model="model.styleModel.cssvars"
                  :prefix="'$price-'"
                  :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span v-show="activeNames !== '5'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '5' }">分页显示</span>
      </template>
      <pagitation :model="model"
                  :prefix="prefix"
                  :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Pagitation from '@comp/pagitation/pagitation'
import ListSpace from '@comp/form/form-slider-css'
import FontStyle from './font-style'
import ImageHeight from '@comp/form/form-slider-css'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
export default {
  components: {
    FontStyle,
    ListSpace,
    Pagitation,
    ImageHeight,
    SetColumnsNumPc,
    SetColumnsNumMb
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    fontRange: {
      type: Object,
      default: () => ({})
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
