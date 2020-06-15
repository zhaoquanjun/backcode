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
          >标题文字</span
        >
      </template>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$title-hov_'" />
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
          >按钮</span
        >
      </template>
      <button-font
        :model="model"
        :prefix="'$button-hov_'"
        :font-range="fontRange"
        :value="value"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import ButtonFont from './button'
export default {
  components: {
    HoverFont,
    ButtonFont
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
