<template>
  <border-color style="margin-top: -16px;" :model="model" :prefix="prefix" @onCssChange="onCssChange">颜色</border-color>
</template>
<script>
import BorderColor from '@comp/border/border-color'
export default {
  name: 'Border',
  components: { BorderColor },
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
