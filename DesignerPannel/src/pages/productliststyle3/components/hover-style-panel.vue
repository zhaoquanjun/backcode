<template>
  <el-collapse
    v-model="activeNames"
    :accordion="true"
  >
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
      <hover-font
        :model="model.styleModel.cssvars"
        :prefix="'$title-hov_'"
      />
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
        >简介</span>
      </template>
      <hover-font
        :model="model.styleModel.cssvars"
        :prefix="'$desc-hov_'"
      />
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
        >背景</span>
      </template>
      <background
        :model="model.styleModel.cssvars"
        :prefix="'$hov_'"
      />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames !== '4'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >边框</span>
      </template>
      <hover-border
        :model="model.styleModel.cssvars"
        :prefix="'$hov_'"
        :width="232"
      />
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span
          v-show="activeNames !== '5'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '5' }"
        >按钮</span>
      </template>
      <hover-font
        :model="model.styleModel.cssvars"
        :prefix="'$button-hov_'"
      />

    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Background from '@comp/background/background'
import HoverBorder from '@comp/border/border-color'
export default {
  components: {
    HoverFont,
    Background,
    HoverBorder
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
