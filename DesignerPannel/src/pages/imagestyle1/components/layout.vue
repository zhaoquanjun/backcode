<template>
  <div class="layout-section">
    <div class="setting-block__section">
      <p class="setting-block--title ">布局方式</p>
      <display :model="model.styleModel.cssvars" :prefix="prefix" @onCssChange="onCssChange" />
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title ">尺寸</p>
      <size :id="model.controlId" :model="model.styleModel.cssvars" :data-model="model.dataModel" :prefix="prefix" :size-setting="sizeSetting" @onCssChange="onCssChange" />
    </div>
  </div>
</template>

<script>
import Display from '@comp/layout/display'
import Size from '@comp/layout/img-square-size'
export default {
  components: {
    Display,
    Size
  },
  props: {
    model: {
      type: Object
    },
    setting: {
      type: Object
    },
    prefix: {
      type: String
    },
    sizeSetting: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
