<template>
  <div class="setting-block__section">
    <p class="setting-block--title">尺寸</p>
    <size
      :id="model.controlId"
      :model="model.styleModel.cssvars"
      :data-model="model.dataModel"
      :prefix="prefix"
      :size-setting="sizeSetting"
      :value-range="fontRange.qrcodewh"
      :size-range="sizeValue"
      @onCssChange="onCssChange"
    />
  </div>
</template>

<script>
import Size from '@comp/layout/img-square-size'
export default {
  components: {
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
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      sizeValue: {
        minValue: 30,
        maxValue: 400
      }
    }
  },
  created() {},
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
