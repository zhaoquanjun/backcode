<template>
  <div class="setting-block__section">
    <p class="setting-block--title">布局方式</p>
    <display :model="model" :prefix="prefix" />
  </div>
</template>

<script>
import Display from '@comp/layout/display'
export default {
  components: {
    Display
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
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
