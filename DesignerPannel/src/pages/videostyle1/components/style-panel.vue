<template>
  <div class="style-section">
    <border :model="model" :prefix="prefix" :font-range="fontRange"></border>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">阴影</p>
      <shadow-area-new
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
      />
    </div>
  </div>
</template>

<script>
import Border from './border'
import ShadowAreaNew from '@comp/shadow/new-shadow'
export default {
  components: {
    Border,
    ShadowAreaNew
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

<style lang="scss" scoped>
.text-font__area {
  padding: 16px 0 24px;
  margin-bottom: 16px;
  p {
    font-size: 14px;
    padding: 0 24px 24px;
  }
}
</style>
