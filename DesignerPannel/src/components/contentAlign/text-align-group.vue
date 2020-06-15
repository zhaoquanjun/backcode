<template>
  <div class="flex-between-center--area">
    <text-left
      :model="model"
      :prefix="prefix"
    ></text-left>
    <text-center
      :model="model"
      :prefix="prefix"
    ></text-center>
    <text-right
      :model="model"
      :prefix="prefix"
    ></text-right>
  </div>
</template>
<script>
import TextLeft from '@comp/contentAlign/left-align'
import TextCenter from '@comp/contentAlign/center-align'
import TextRight from '@comp/contentAlign/right-align'

export default {
  name: 'TextAlign',
  components: {
    TextLeft,
    TextCenter,
    TextRight
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>
