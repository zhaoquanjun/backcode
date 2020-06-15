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
  </el-collapse>
</template>

<script>
import HoverFont from '@comp/font/font-group/font-style2'
export default {
  components: {
    HoverFont
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
