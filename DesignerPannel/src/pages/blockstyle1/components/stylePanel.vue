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
        >内容对齐</span>
      </template>
      <div class="collapse-content-title">左右对齐</div>
      <horizontal-group :model="model" :prefix="prefix" />
      <div class="collapse-content-title setting-block__top">上下对齐</div>
      <vertical-group :model="model" :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >背景</span>
      </template>
      <background :model="model" :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames == '3'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >边框</span>
      </template>
      <border
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
        :control-name="'image'"
      />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames == '4'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >阴影</span>
      </template>
      <div>

        <shadow-area-new
          :model="model"
          :prefix="prefix"
          :value-range="fontRange"
        />
      </div>
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span
          v-show="activeNames == '5'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '5' }"
        >填充方式</span>
      </template>
      <padding-area :model="model" :prefix="prefix" :list="[0, 2, 3]" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Background from '@comp/background/background'

import VerticalGroup from '@comp/contentAlign/flex/vertical-group'
import HorizontalGroup from '@comp/contentAlign/flex/horizontal-group'

import Border from '@comp/border/border-group/style1'

import ShadowAreaNew from '@comp/shadow/new-shadow'
import PaddingArea from '@comp/layout/padding'
export default {
  components: {
    Background,
    Border,
    VerticalGroup,
    HorizontalGroup,
    PaddingArea,
    ShadowAreaNew
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
      activeNames: '1'
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.componet-title {
  padding: 16px 24px;
}
</style>
