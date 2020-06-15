<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">输入框</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" prefix="$input-" :font-range="fontRange.logininputfs" :is-show="false" :isinput="true" />
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" prefix="$input-" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" prefix="$input-" :control-name="'logininput'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" :prefix="'$signinBtnText-'" :font-range="fontRange.loginbtnfs" />
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" :prefix="'$signinBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" :prefix="'$signinBtn-'" :control-name="'loginbtn'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '3'}">注册/找回密码按钮</span>
      </template>
      <font :model="model" :value="value" :prefix="'$signinRegisterOrPwd-'" :font-range="fontRange.findandforgetbtnfs" />
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
.componet-title{
  padding: 16px 24px;
}
.el-collapse /deep/  .el-collapse-item  .border-style .el-color-picker--small{
  width: 100%;
}
</style>

