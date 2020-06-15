<template>
  <div>
    <div class="setting-block--subtitle">
      文字
    </div>
    <button-font
      :model="model.styleModel.cssvars"
      :prefix="prefix"
      :font-range="fontRange.newslistdescfs"
    />
    <div class="divider"></div>
    <div class="setting-block--subtitle row-top__dis">
      背景
    </div>
    <background :model="model.styleModel.cssvars" :prefix="prefix" />
    <div class="divider"></div>
    <div class="setting-block--subtitle row-top__dis">
      边框
    </div>
    <button-border :model="model.styleModel.cssvars" :prefix="prefix"
      >颜色</button-border
    >
  </div>
</template>
<script>
import ButtonFont from '@comp/font/font-group/font-style4'
import Background from '@comp/background/background'
import ButtonBorder from '@comp/border/border-color'
export default {
  components: {
    ButtonFont,
    ButtonBorder,
    Background
  },
  props: {
    value: {
      type: Object
    },
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  }
}
</script>
