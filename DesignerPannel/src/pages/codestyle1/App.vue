<template>
  <div class="panel">
    <div class="panel-content">
      <header-area :control-name="'代码控件'" />
      <data-pannel :model="model.data.dataModel" />
    </div>
  </div>
</template>

<script>
import HeaderArea from '@comp/tab/header'
import DataPannel from './components/data-panel'
import modelData from './data.js'
export default {
  name: 'Code',
  components: {
    HeaderArea,
    DataPannel
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '代码控件',
      curStyleIndex: 0
    }
  },
  methods: {
    changeTab(i) {
      this.curIndex = i
    },
    _handleChangeStyleTab(i) {
      this.curStyleIndex = i
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
