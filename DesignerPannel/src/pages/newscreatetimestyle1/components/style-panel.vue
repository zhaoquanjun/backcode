<template>
  <div class="setting-block__section">
    <p class="setting-block--title ">简介文字</p>
    <font :model="model" :prefix="prefix" :font-range="fontRange" :control-name="'newscreatetime'" />
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
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  },
  methods: {}
}
</script>
