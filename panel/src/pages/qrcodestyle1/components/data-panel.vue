<template>
  <div class>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">二维码内容</p>
      <code-link :model="model" :css-model="cssModel" @onCssChange="onCssChange" @onDataChange="onDataChange"></code-link>
    </div>
  </div>
</template>

<script>
import CodeLink from './code-link'
export default {
  components: {
    CodeLink
  },
  props: {
    model: {
      type: Object
    },
    cssModel: {
      type: Object
    }
  },
  data() {
    return {
      timer: null,
      oldRecord: null
    }
  },
  computed: {
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>

