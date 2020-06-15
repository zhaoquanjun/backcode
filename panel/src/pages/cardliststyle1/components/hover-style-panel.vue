<template>
  <el-collapse v-model="activeNames" :accordion="false">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >标题</span>
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
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item-container__area {
  padding: 0 24px;
}
</style>
