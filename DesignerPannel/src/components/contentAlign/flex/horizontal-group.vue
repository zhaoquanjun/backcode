<template>
  <div class="flex-between-center--area">
    <text-left
      :model="model"
      :prefix="prefix"
      curtom-name="justify-content"
      @onCssChange="onCssChange"
    ></text-left>
    <text-center
      :model="model"
      :prefix="prefix"
      curtom-name="justify-content"
      @onCssChange="onCssChange"
    ></text-center>
    <text-right
      :model="model"
      :prefix="prefix"
      curtom-name="justify-content"
      @onCssChange="onCssChange"
    ></text-right>
  </div>
</template>

<script>
import TextLeft from '@comp/contentAlign/flex/left-horizontal'
import TextCenter from '@comp/contentAlign/flex/center-horizontal'
import TextRight from '@comp/contentAlign/flex/right-horizontal'
export default {
  components: {
    TextLeft,
    TextCenter,
    TextRight
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  data() {
    return {
      activeName: '1'
    }
  },
  mounted() {},
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
