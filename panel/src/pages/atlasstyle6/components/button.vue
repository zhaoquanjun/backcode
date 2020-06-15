<template>
  <div>
    <button-font
      :model="model.styleModel.cssvars"
      :prefix="prefix"
      :font-range="fontRange"
      :width="100"
      units="%"
    >颜色</button-font>
    <div class="divider"></div>
    <AddIcon :value="value" :model="model" :prefix="prefix" />
  </div>
</template>
<script>
import AddIcon from '@comp/iconSelect/addIcon'
import ButtonFont from '@comp/font/font-color'
export default {
  components: {
    ButtonFont,
    AddIcon
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: () => ({})
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
