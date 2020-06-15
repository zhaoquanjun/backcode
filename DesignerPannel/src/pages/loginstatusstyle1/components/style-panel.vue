<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" prefix="$loginBtnText-" :font-range="fontRange.loginstatusbtnfs" />
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" prefix="$loginBtn-" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" prefix="$loginBtn-" :control-name="'loginstatusbtn'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">注册按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" :prefix="'$registerBtnText-'" :font-range="fontRange.loginstatusbtnfs" />
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" :prefix="'$registerBtn-'" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" :prefix="'$registerBtn-'" :control-name="'loginstatusbtn'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '3'}">用户账号文字</span>
      </template>
      <font :model="model" :value="value" :prefix="'$useraccountText-'" :font-range="fontRange.loginstatustext" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Font from './font'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
export default {
  components: {
    Font,
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
  },
  methods: {}
}
</script>
<style  >
.cutline{
  display: block;
  margin: 15px;
  border-top: 1px dashed #c9d9dc;
}
.el-collapse /deep/  .el-collapse-item  .border-style .el-color-picker--small{
  width: 100%;
}
</style>

