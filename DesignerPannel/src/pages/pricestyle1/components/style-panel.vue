<template>
  <div class="setting-block__section">
    <p class="setting-block--title">文字</p>
    <font :model="model" :value="value" :prefix="prefix" :font-range="fontRange" />
  </div>
</template>

<script>
import Font from './font'
export default {
  components: {
    Font
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {}
}
</script>
