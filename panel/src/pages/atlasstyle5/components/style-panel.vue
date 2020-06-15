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
        >布局设置</span>
      </template>
      <div>
        <set-columns-num-pc
          :model="model.dataModel"
          :min-value="2"
          :max-value="5"
        >
          <span class="collapse-content-title">电脑端展示</span>
        </set-columns-num-pc>
        <!-- <set-columns-num-mb v-show="type === 'phone'" :model="model.dataModel">
          <span class="collapse-content-title">移动端展示</span>
        </set-columns-num-mb> -->
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
        >图片设置</span>
      </template>
      <div>
        <image-height
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'imgHeight'"
          :value-range="fontRange.atlas6imgh"
        >
          <span class="setting-attribute--title">高度</span>
        </image-height>
      </div>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc'" name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >间距</span>
      </template>
      <div>
        <list-space
          :model="model.styleModel.cssvars"
          prefix="$list-"
          name="space"
          :value-range="fontRange.atlaslist6space"
        >
          <span class="form-title__area">间距</span>
        </list-space>
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
      <title-font
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
    <el-collapse-item name="5">
      <template slot="title">
        <span
          v-show="activeNames !== '5'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '5' }"
        >线条</span>
      </template>
      <border-style
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :control-name="'productlist4'"
        :value-range="fontRange"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleLineHeight from '@comp/font/font-line-height'

import TitleFont from '@comp/font/font-group/font-style3'
import ListSpace from '@comp/form/form-slider-css'
import ImageHeight from '@comp/form/form-slider-css'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import BorderStyle from '@comp/border/border-group/style3'
export default {
  components: {
    TitleFont,
    ListSpace,
    ImageHeight,
    SetColumnsNumPc,
    TitleLineHeight,
    BorderStyle
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
