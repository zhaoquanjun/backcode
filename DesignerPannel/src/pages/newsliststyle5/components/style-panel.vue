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
          >图片设置</span
        >
      </template>
      <image-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :name="'imgHeight'"
        :value-range="fontRange.product4imgh"
      >
        <span class="setting-attribute--title">高度</span>
      </image-height>
    </el-collapse-item>

    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
          >标题</span
        >
      </template>
      <title-font
        :model="model.styleModel.cssvars"
        :prefix="'$title-'"
        :font-range="fontRange"
      />
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
          >日期</span
        >
      </template>
      <date-font :model="model" :prefix="prefix" :font-range="fontRange" />
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
          >简介</span
        >
      </template>
      <title-font
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :font-range="fontRange"
      />
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
          >线条</span
        >
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
import TitleFont from './title-font'
import DateFont from './date-font'
import ImageHeight from '@comp/form/form-slider-css'
import BorderStyle from '@comp/border/border-group/style3'
export default {
  components: {
    TitleFont,
    DateFont,
    ImageHeight,
    BorderStyle
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
    changeImgShow(oldData, data) {
      this.onCssChange(oldData, data)
      this.onDataChange('changeNewsCoverShow', oldData, data)
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
