<template>
  <div class="layout-section">
    <div class="setting-block__section">
      <p class="setting-block--title">布局方式</p>
      <display :model="model.styleModel.cssvars" :prefix="prefix" />
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">尺寸</p>
      <size
        :id="model.controlId"
        :model="model.styleModel.cssvars"
        :data-model="model.dataModel"
        :prefix="prefix"
        :value-range="valueRange.newscoversize"
        :size-setting="sizeSetting"
      />
    </div>
  </div>
</template>

<script>
import Display from '@comp/layout/display'
import Size from '@comp/layout/size'
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
    valueRange: {
      type: Object
    },
    sizeSetting: {
      type: Object
    }
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
.setting-block--title {
  padding-bottom: 24px;
}
</style>
