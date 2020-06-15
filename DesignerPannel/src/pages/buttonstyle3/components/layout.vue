<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">尺寸</p>
      <size :model="model" :prefix="prefix" :size-setting="sizeSetting" @onCssChange="onCssChange" />
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

