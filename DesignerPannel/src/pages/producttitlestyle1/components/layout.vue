<template>
  <div class="layout-section">
    <div class="setting-block__section">
      <p class="setting-block--title ">布局方式</p>
      <display @onCssChange="onCssChange" :model="model" :prefix="prefix" />
    </div>
  </div>
</template>

<script>
import Display from "@comp/layout/display";
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  components: {
    Display
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
