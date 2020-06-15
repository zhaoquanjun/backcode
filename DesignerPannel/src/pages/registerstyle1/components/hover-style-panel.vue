<template>
  <el-collapse v-model="activeNames" :accordion="true" class="register-hover">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">输入框</span>
      </template>
      <div class="setting-block--subtitle">发送验证码文字</div>
      <sms-font class :model="model" :value="value" :prefix="'$hov_smsBtn-'" :isinput="true" :is-font-text-seting-show="false" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">注册按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font :model="model" :value="value" :prefix="'$hov_signinBtnText-'" />
      <div class="cutline"></div>
      <div class="setting-block--subtitle row-top__dis">背景</div>
      <background :model="model" :prefix="'$hov_signinBtn-'" />
      <div class="cutline"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border style="margin-top: -16px;" :model="model" :prefix="'$hov_signinBtn-'" :control-name="'loginbtnhov'" :value-range="fontRange" :is-show="false" :is-board-width-show="false" :is-board-radius-show="false" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '3'}">去登录按钮</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <hover-font :model="model" :value="value" :prefix="'$hov_tologinBtnText-'" :font-range="fontRange" />
      <div class="cutline"></div>
      <div class="setting-block--subtitle row-top__dis">背景</div>
      <background :model="model" :prefix="'$hov_tologinBtn-'" />
      <div class="cutline"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border style="margin-top: -16px;" :model="model" :prefix="'$hov_tologinBtn-'" :control-name="'loginbtnhov'" :value-range="fontRange" :is-show="false" :is-board-width-show="false" :is-board-radius-show="false" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from './hover-font'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
import SmsFont from './sms-font'
export default {
  components: {
    HoverFont,
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

