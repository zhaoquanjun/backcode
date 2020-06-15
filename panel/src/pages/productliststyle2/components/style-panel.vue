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
                    :value-range="fontRange.productimgh">
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
              :class="{ active: activeNames == '4' }">简介</span>
      </template>
      <switch-area prefix="$desc-"
                   :model="model"
                   name="descShow">
        <span class="setting-attribute--title">显示简介</span>
      </switch-area>
      <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
        <font-style class="row-top__dis"
                    :model="model.styleModel.cssvars"
                    prefix="$desc-"
                    :font-range="fontRange" />
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import ListSpace from '@comp/form/form-slider-css'
import FontStyle from './font-style'
import SwitchArea from '@comp/form/form-switch'
import ImageHeight from '@comp/form/form-slider-css'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
export default {
  components: {
    FontStyle,
    ListSpace,
    ImageHeight,
    SwitchArea,
    SetColumnsNumPc,
    SetColumnsNumMb
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
