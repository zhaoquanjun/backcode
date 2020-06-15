<template>
  <div class="panel">
    <div class="panel-content">
      <header-area :control-name="'个人中心'" />
      <div class="setting-block__section">
        <p class="setting-block--title row-top__dis">主色</p>
        <color-picker
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :name="'bgColor'"
        ></color-picker>
        <p class="setting-block--title row-top__dis">文字色</p>
        <color-picker
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :name="'ftColor'"
        ></color-picker>
        <p class="setting-block--title row-top__dis">页面背景</p>
        <background :prefix="'$content-'" :model="model.data.styleModel.cssvars" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderArea from '@comp/tab/header'
import ColorPicker from './components/color-picker'
import Background from '@comp/background/background'
import modelData from './data.js'
export default {
  name: 'Personalcenterpage',
  components: {
    HeaderArea,
    ColorPicker,
    Background
  },
  data() {
    return {
      curIndex: 0,
      model: modelData,
      prefix: '$',
      controlName: '个人中心'
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  .panel-content {
    padding-top: 0 !important;
    top: 0 !important;
  }
}
</style>
