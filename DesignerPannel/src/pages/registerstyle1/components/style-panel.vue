<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">输入框</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" :prefix="'$input-'" :font-range="fontRange.registerinputfs" :is-show="false" :isinput="true" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">发送验证码文字</div>
      <sms-font :model="model" :value="value" :prefix="'$smsBtn-'" :isinput="true" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">背景</div>
      <background :model="model" :prefix="'$input-'" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" :prefix="'$input-'" :control-name="'registerinput'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">注册按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" :prefix="'$signinBtnText-'" :font-range="fontRange" />
      <div class="setting-block--subtitle row-top__dis">背景</div>
      <background :model="model" :prefix="'$signinBtn-'" />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border class="border-style" :model="model" :prefix="'$signinBtn-'" :control-name="'registerbtn'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '3'}">去登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font :model="model" :value="value" :prefix="'$tologinBtnText-'" :font-range="fontRange" />
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" :prefix="'$tologinBtn-'" />
      <div class="cutline"></div>
      <div class="setting-block--subtitle">边框</div>
      <border class="border-style" :model="model" :prefix="'$tologinBtn-'" :control-name="'tologinbtn'" :value-range="fontRange" :is-show="false" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Font from './font'
import SmsFont from './sms-font'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
export default {
  components: {
    Font,
    Background,
    Border,
    SmsFont
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
