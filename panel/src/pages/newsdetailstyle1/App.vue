<template>
  <div class="panel">
    <div class="panel-content">
      <header-area :control-name="'文章详情'" />
      <none-area></none-area>
    </div>
  </div>
</template>

<script>
import HeaderArea from '@comp/tab/header'
import NoneArea from '@comp/none/none'
export default {
  name: 'Newsdetail',
  components: {
    HeaderArea,
    NoneArea
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
