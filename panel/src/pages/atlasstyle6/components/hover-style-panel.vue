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
        >标题文字</span>
      </template>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$title-hov_'" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >按钮</span>
      </template>
      <button-font
        :model="model.styleModel.cssvars"
        :prefix="'$button-hov_'"
        :font-range="fontRange"
        :value="value"
        :width="100"
        units="%"
      >颜色</button-font>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from '@comp/font/font-group/font-style2'
import ButtonFont from '@comp/font/font-color'
export default {
  components: {
    HoverFont,
    ButtonFont
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
    },
    value: {
      type: Object,
      default: () => ({})
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
