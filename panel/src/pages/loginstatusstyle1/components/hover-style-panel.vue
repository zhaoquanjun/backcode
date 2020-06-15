<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font :model="model" :value="value" :prefix="'$hov_loginBtnText-'" />
      <div class="setting-block--subtitle" style="padding-top:16px">背景</div>
      <background :model="model" :prefix="'$hov_loginBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border-area class="border-style" :model="model" :prefix="'$hov_loginBtn-'" :control-name="'loginstatusbtn'" :value-range="fontRange" :is-show="false" :is-board-width-show="false" :is-board-radius-show="false" />
    </el-collapse-item>
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">注册按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font :model="model" :value="value" :prefix="'$hov_registerBtnText-'" />
      <div class="setting-block--subtitle" style="padding-top:16px">背景</div>
      <background :model="model" :prefix="'$hov_registerBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border-area class="border-style" :model="model" :prefix="'$hov_registerBtn-'" :control-name="'loginstatusbtn'" :value-range="fontRange" :is-show="false" :is-board-width-show="false" :is-board-radius-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span v-show="activeNames !== '1'" class="collapse-icon title-item text-icon"></span><span class="collapse-title title-item" :class="{active: activeNames == '1'}">用户账号文字</span>
      </template>
      <hover-font :model="model" :prefix="'$hov_useraccountText-'" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Font from './font'
import Background from '@comp/background/background'
import BorderArea from '@comp/border/border'
export default {
  components: {
    HoverFont,
    Font,
    // Background,
    BorderArea
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
  },
  methods: {

  }
}
</script>
<style  scoped>
.componet-title{
  padding: 0 24px 24px
}
.el-collapse /deep/ .el-collapse-item  .border-style .el-color-picker--small{
  width: 100%;
}

</style>

