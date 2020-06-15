<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">尺寸</p>
      <size :id="model.controlId" :model="model.styleModel.cssvars" :data-model="model.dataModel" :prefix="prefix" :size-setting="sizeSetting.carousel" :value-range="fontRange.bannerh"/>
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
    fontRange: {
      type: Object
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
  }
}
</script>
