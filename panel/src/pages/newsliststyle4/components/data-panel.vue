<template>
  <DataSelect :model="model" :prefix="prefix" />
</template>
<script>
import DataSelect from '@/pages/newsliststyle1/components/data-panel'
export default {
  components: {
    DataSelect
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    }
  }
}
</script>
