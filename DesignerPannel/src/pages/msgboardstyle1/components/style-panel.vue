<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
          >输入框</span
        >
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font-input
        :model="model"
        :value="value"
        prefix="$input-"
        :font-range="fontRange.msgboardinputfs"
      />
      <div class="space"></div>
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" prefix="$input-" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border
        class="border-style"
        :model="model"
        prefix="$input-"
        :control-name="'msgboardinput'"
        :value-range="fontRange"
        :is-show="false"
      />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
          >按钮</span
        >
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font-btn
        :model="model"
        :value="value"
        :prefix="'$submitBtnText-'"
        :font-range="fontRange.msgboardbtnfs"
      />
      <div class="space"></div>
      <div class="setting-block--subtitle">背景</div>
      <background :model="model" :prefix="'$submitBtn-'" />
      <div class="divider row-top__dis"></div>
      <div class="setting-block--subtitle row-top__dis">边框</div>
      <border
        class="border-style"
        :model="model"
        :prefix="'$submitBtn-'"
        :control-name="'msgboardbtn'"
        :value-range="fontRange"
        :is-show="false"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import FontInput from '@comp/font/font-group/font-style5'
import FontBtn from '@comp/font/font-group/font-style4'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
export default {
  components: {
    Background,
    Border,
    FontInput,
    FontBtn
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
<style>
.cutline {
  display: block;
  margin: 15px;
  border-top: 1px dashed #c9d9dc;
}
.componet-title {
  padding: 16px 24px;
}
.el-collapse /deep/ .el-collapse-item .border-style .el-color-picker--small {
  width: 100%;
}
.space {
  margin-top: 12px;
}
</style>
