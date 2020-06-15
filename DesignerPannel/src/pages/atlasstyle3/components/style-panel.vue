<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >布局设置</span>
      </template>
      <set-columns-num-pc
        v-show="type === 'pc'"
        :model="model.dataModel"
        :min-value="2"
      >
        <span class="collapse-content-title">电脑端展示</span>
      </set-columns-num-pc>
      <set-columns-num-mb v-show="type === 'phone'" :model="model.dataModel">
        <span class="collapse-content-title">移动端展示</span>
      </set-columns-num-mb>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc'" name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >间距</span>
      </template>
      <list-space
        :model="model.styleModel.cssvars"
        prefix="$list-"
        name="space"
        :value-range="fontRange.atlaslistspace"
      >
        <span class="form-title__area">间距</span>
      </list-space>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >标题</span>
      </template>
      <switch-area
        :prefix="'$title-'"
        :model="model"
        :name="'show'"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">显示标题</span>
      </switch-area>

      <title-font class="row-top__dis" :model="model.styleModel.cssvars" prefix="$title-" :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import ListSpace from '@comp/form/form-slider-css'
import TitleFont from '@comp/font/font-group/font-style4'
import SwitchArea from '@comp/form/form-switch'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
export default {
  components: {
    TitleFont,
    ListSpace,
    SwitchArea,
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
  data() {
    return {
      activeNames: '1',
      type: 'pc'
    }
  },
  created() {
    if (window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    _getCurrentEquipmentType() {
      const _this = this
      if (window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    }
  }
}
</script>
