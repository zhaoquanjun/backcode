<template>
  <div class="setting-block__section">
    <p class="setting-block--title ">文字样式</p>
    <font :model="model" :prefix="prefix" :fontRange="fontRange" :controlName="'producttitle'" />
  </div>
</template>

<script>
import Font from "./font";
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: "1"
    };
  },
  components: {
    Font
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
