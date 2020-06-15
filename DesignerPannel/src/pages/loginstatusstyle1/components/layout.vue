<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">尺寸</p>
      <size
        @onCssChange="onCssChange"
        :model="model.styleModel.cssvars"
        :id="model.controlId"
        :dataModel="model.dataModel"
        :prefix="prefix"
        :valueRange="valueRange.loginstatussize"
        :sizeSetting="sizeSetting"
      />
    </div>
  </div>
</template>

<script>
import Size from "./size";
export default {
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

