<template>
  <div class="layout-section">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">输入框尺寸</p>

      <size
        :id="model.controlId"
        :model="model.styleModel.cssvars"
        :data-model="model.dataModel"
        :prefix="'$input-'"
        :size-setting="sizeSetting"
        :value-range="fontRange.msgboardinputheight"
      />
      <div class="divider" style="margin-bottom:16px"></div>

      <p class="setting-block--title">按钮尺寸</p>

      <size
        :id="model.controlId"
        :model="model.styleModel.cssvars"
        :data-model="model.dataModel"
        :prefix="'$submitBtn-'"
        :size-setting="sizeSetting"
        :value-range="fontRange.msgboardbtnheight"
      />
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
