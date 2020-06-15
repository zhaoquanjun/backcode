<template>
  <div class="flex-between-center--area">
    <ul class="font-style">
      <li>
        <font-weight :prefix="prefix" :model="model"></font-weight>
      </li>
      <li>
        <font-italic :prefix="prefix" :model="model"></font-italic>
      </li>
      <li>
        <font-underline :prefix="prefix" :model="model"></font-underline>
      </li>
    </ul>
    <font-color :model="model" :prefix="prefix"></font-color>
  </div>
</template>
<script>
import FontColor from '@comp/font/font-color'
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

export default {
  name: 'Font',
  components: {
    FontColor,
    FontWeight,
    FontItalic,
    FontUnderline
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
