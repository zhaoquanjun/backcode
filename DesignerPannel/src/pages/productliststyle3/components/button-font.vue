<template>
  <div>
    <div class="font-section">
      <switch-area
        :prefix="prefix"
        :model="model"
        :name="'buttonShow'"
      >
        <span class="setting-attribute--title">显示按钮</span>
      </switch-area>
    </div>
    <template v-if="model.styleModel.cssvars['$button-buttonShow'] == 'block'">
      <div class="row-top__dis">
        <ButtonFont
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :value-range="fontRange.productlist4buttontextfs"
        />
      </div>

    </template>
  </div>
</template>
<script>
import SwitchArea from '@comp/form/form-switch'
import ButtonFont from '@comp/font/font-group/font-style2'

export default {
  name: 'Font',
  components: {
    ButtonFont,
    SwitchArea
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  width: 166px !important;
  li {
    width: 27px !important;
  }
}
</style>
