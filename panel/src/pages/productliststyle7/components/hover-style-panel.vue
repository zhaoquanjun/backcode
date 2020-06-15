<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="0">
      <template slot="title">
        <span
          v-show="activeNames == '0'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '0' }"
          >阴影</span
        >
      </template>
      <div>
        <shadow-area-new
          :model="model.styleModel.cssvars"
          :prefix="'$'"
          :value-range="fontRange"
        />
      </div>
    </el-collapse-item>
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
          >标题</span
        >
      </template>
      <hover-font :model="model.styleModel.cssvars" :prefix="'$title-hov_'" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import ShadowAreaNew from '@comp/shadow/new-shadow'
export default {
  components: {
    HoverFont,
    ShadowAreaNew
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
      activeNames: '0'
    }
  }
}
</script>
