<template>
  <div>
    <button-font
      :model="model.styleModel.cssvars"
      :prefix="prefix"
      :font-range="fontRange.newslistdescfs"
    /></div
></template>
<script>
import ButtonFont from '@comp/font/font-group/font-style3'
export default {
  components: {
    ButtonFont
  },
  props: {
    value: {
      type: Object
    },
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  }
}
</script>
