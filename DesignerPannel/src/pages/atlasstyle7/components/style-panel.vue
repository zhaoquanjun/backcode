<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item v-show="type === 'pc'" name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >
          布局设置
        </span>
      </template>
      <div>
        <set-columns-num-pc
          v-show="type === 'pc'"
          :model="model.dataModel"
          :min-value="3"
        >
          <span class="collapse-content-title">电脑端展示</span>
        </set-columns-num-pc>
        <set-columns-num-mb v-show="type === 'phone'" :model="model.dataModel">
          <span class="collapse-content-title">移动端展示</span>
        </set-columns-num-mb>
      </div>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc'" name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >
          图片设置
        </span>
      </template>
      <div>
        <image-height
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'imgHeight'"
          :value-range="fontRange.atlas8imgh"
        >
          <span class="setting-attribute--title">高度</span>
        </image-height>
      </div>
    </el-collapse-item>

    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames !== '4'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >标题</span>
      </template>
      <switch-area :prefix="'$title-'" :model="model" :name="'show'">
        <span class="setting-attribute--title">显示标题</span>
      </switch-area>

      <title-font
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        prefix="$title-"
        :font-range="fontRange.productfs"
      />
      <title-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        prefix="$title-"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </title-line-height>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleLineHeight from '@comp/font/font-line-height'

import SwitchArea from '@comp/form/form-switch'
import TitleFont from '@comp/font/font-group/font-style1'
import ImageHeight from '@comp/form/form-slider-css'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
export default {
  components: {
    TitleFont,
    ImageHeight,
    SetColumnsNumPc,
    TitleLineHeight,
    SwitchArea,
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
      activeNames: '0',
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

<style lang="scss" scoped>
.borderdashed-hr {
  margin: 15px 0;
  border-bottom: 1px dashed rgba(201, 217, 220, 1);
}
</style>
