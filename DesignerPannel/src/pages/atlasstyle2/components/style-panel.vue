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
      <div class="com-box__area">
        <set-columns-num-pc

          :model="model.dataModel"
          :min-value="2"
        >
          <span class="collapse-content-title">电脑端展示</span>
        </set-columns-num-pc>
        <!-- <set-columns-num-mb v-show="type === 'phone'" :model="model.dataModel">
          <span class="collapse-content-title">移动端展示</span>
        </set-columns-num-mb> -->
        <div class="divider"></div>
        <image-height
          class="row-top__dis "
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'imgHeight'"
          :value-range="fontRange.atlasimgh"
        >
          <span class="setting-attribute--title">高度</span>
        </image-height>
      </div>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'phone'" name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >图片设置</span>
      </template>
      <div class="com-box__area">
        <set-columns-num-mb :model="model.dataModel">
          <span class="collapse-content-title">移动端展示</span>
        </set-columns-num-mb>
      </div>
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

      <title-font :model="model.styleModel.cssvars" prefix="$title-" />
      <div class="divider"></div>
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
import TitleFont from '@comp/font/font-group/font-style4'
import SetColumnsNumPc from '@comp/layout/set-columns-num-pc'
import SetColumnsNumMb from '@comp/layout/set-columns-num-mb'
import ListSpace from '@comp/form/form-slider-css'
import ImageHeight from '@comp/layout/img-height'
export default {
  components: {
    TitleLineHeight,
    TitleFont,
    ListSpace,
    ImageHeight,
    SetColumnsNumMb,
    SetColumnsNumPc
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
