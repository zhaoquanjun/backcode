<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font :model="model" :value="value" :prefix="'$hov_signinBtnText-'" :font-range="fontRange.loginbtnhovfs" />
      <div class="setting-block--subtitle" style="padding-top:16px">背景</div>
      <background :model="model" :prefix="'$hov_signinBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" :prefix="'$hov_signinBtn-'" :control-name="'loginbtnhov'" :value-range="fontRange" :is-show="false" :is-board-width-show="false" :is-board-radius-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span v-show="activeNames !== '2'" class="collapse-icon title-item text-icon"></span><span class="collapse-title title-item" :class="{active: activeNames == '2'}">注册/找回密码按钮</span>
      </template>
      <hover-font :model="model" :prefix="'$hov_signinRegisterOrPwd-'" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
export default {
  components: {
    HoverFont,
    Background,
    Border
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

