<template>
  <div class="panel">
    <div class="panel-content">
      <header-area :control-name="'内容区域'" />
      <div class="setting-block__section" style="margin-top: 32px;">
        <p class="setting-block--title">背景</p>
        <background :prefix="prefix" :model="model.data.styleModel.cssvars" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderArea from '@comp/tab/header'
import Background from '@comp/background/background'
import modelData from './data.js'
export default {
  name: 'ContentPage',
  components: {
    HeaderArea,
    Background
  },
  data() {
    return {
      model: modelData,
      prefix: '$content-',
      controlName: '内容区域'
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  .panel-content {
    height: 100% !important;
    top: 0 !important;
    padding-top: 0 !important;
  }
}
</style>
