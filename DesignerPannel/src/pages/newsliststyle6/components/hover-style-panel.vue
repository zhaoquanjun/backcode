<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames == '1'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
          >阴影</span
        >
      </template>
      <div>
        <shadow-area-new
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :value-range="fontRange"
        />
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
          >标题文字</span
        >
      </template>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$title-hov_'" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
          >简介/日期</span
        >
      </template>
      <div class="collapse-content-title">
        简介
      </div>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$desc-hov_'" />
      <div class="collapse-content-title" style="padding-top:16px;">
        日期
      </div>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$date-hov_'" />
      <div
        class="flex-between-center--area row-top__dis"
        style="padding-top:16px;"
      >
        <opacity
          class="row-top__dis"
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'opacity'"
          :value-range="fontRange.opacity"
          >透明度</opacity
        >
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
          >按钮</span
        >
      </template>
      <hover-font
        :model="model.styleModel.cssvars"
        :prefix="'$button-hov_'"
        :font-range="fontRange"
        :value="value"
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
          >背景</span
        >
      </template>

      <background :model="model.styleModel.cssvars" :prefix="prefix" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from '@comp/font/font-group/font-style2'
import ShadowAreaNew from '@comp/shadow/new-shadow'
import Background from '@comp/background/background'
import Opacity from '@comp/form/form-slider-num'
export default {
  components: {
    HoverFont,
    ShadowAreaNew,
    Background,
    Opacity
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
    },
    value: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
.item-container__area {
  padding: 0 24px;
}
</style>
