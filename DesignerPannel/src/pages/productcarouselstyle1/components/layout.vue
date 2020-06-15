<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">尺寸</p>
      <size
        @onCssChange="onCssChange"
        :model="model"
        :prefix="'$pc-'"
        :sizeSetting="sizeSetting"
        :valueRange="valueRange"
      />
    </div>
  </div>
</template>

<script>
import Margin from "@comp/layout/margin";
import Size from "@comp/layout/size";
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    sizeSetting: {
      type: Object
    },
    valueRange: {
      type: Object
    }
  },
  data() {
    return {};
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

