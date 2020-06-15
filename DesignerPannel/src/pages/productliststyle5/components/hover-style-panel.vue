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
          >蒙版色</span
        >
      </template>
      <background :model="model.styleModel.cssvars" :prefix="'$hov_'" />
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
          >按钮</span
        >
      </template>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$button-hov_'" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Background from '@comp/background/background'
import HoverBorder from './hover-border'

import FontColor from '@comp/font/font-color'
export default {
  components: {
    HoverFont,
    Background,
    HoverBorder,
    FontColor
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>
