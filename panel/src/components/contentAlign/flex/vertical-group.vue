<template>
  <div class="flex-between-center--area">
    <text-top
      :model="model"
      :prefix="prefix"
      curtom-name="align-items"
      @onCssChange="onCssChange"
    ></text-top>
    <text-center
      :model="model"
      :prefix="prefix"
      curtom-name="align-items"
      @onCssChange="onCssChange"
    ></text-center>
    <text-bottom
      :model="model"
      :prefix="prefix"
      curtom-name="align-items"
      @onCssChange="onCssChange"
    ></text-bottom>
  </div>
</template>
<script>
import TextTop from '@comp/contentAlign/flex/top-vertical'
import TextCenter from '@comp/contentAlign/flex/center-vertical'
import TextBottom from '@comp/contentAlign/flex/bottom-vertical'
export default {
  name: 'TextAlign',
  components: {
    TextTop,
    TextCenter,
    TextBottom
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
