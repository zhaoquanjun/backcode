<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
          >按钮</span
        >
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font
        :model="model"
        :value="value"
        :prefix="'$hov_submitBtnText-'"
      />
      <div class="setting-block--subtitle" style="padding-top:16px">背景</div>
      <background :model="model" :prefix="'$hov_submitBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border-color
        class="border-style"
        :model="model"
        :width="100"
        unit="%"
        :prefix="'$hov_submitBtn-'"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Background from '@comp/background/background'
import BorderColor from '@comp/border/border-color'
export default {
  components: {
    HoverFont,
    Background,
    BorderColor
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>
