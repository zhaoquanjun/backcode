<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top ">
      <p class="setting-block--title">尺寸</p>
      <size @onCssChange="onCssChange" :model="model" :prefix="'$pc-'" :sizeSetting="sizeSetting" :valueRange="fontRange.bannerh" />
    </div>
  </div>
</template>

<script>
import Size from "@comp/layout/size";
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
    },
    marginSetting: {
      type: Object,
      default: () => {
        return {}
      }
    },
    sizeSetting: {
      type: Object
    }
  },
  components: {
    Size
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

