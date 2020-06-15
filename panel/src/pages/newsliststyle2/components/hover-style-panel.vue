<template>
  <el-collapse
    v-model="activeNames"
    :accordion="false"
  >
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{active: activeNames == '1'}"
        >标题文字</span>
      </template>
      <hover-font :model="model.styleModel.cssvars" />
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
    }
  },
  data() {
    return {
      activeNames: ['1']
    }
  }
}
</script>
