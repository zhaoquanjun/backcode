<template>
  <div class="layout-section">
    <div class="setting-block__section">
      <p class="setting-block--title">尺寸</p>
      <size :id="model.controlId" :model="model.styleModel.cssvars" :value-range="valueRange" :data-model="model.dataModel" :prefix="prefix" :size-setting="sizeSetting" @onCssChange="onCssChange" />
    </div>
  </div>
</template>

<script>
import Size from '@comp/layout/size'
export default {
  components: {
    Size
  },
  props: {
    model: {
      type: Object
    },
    valueRange: {
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
  created() {

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
