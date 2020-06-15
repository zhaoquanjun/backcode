<template>
  <div class="link-section__show">
    <none-area :tips="tips" />
  </div>
</template>

<script>
import NoneArea from './none'
export default {
  components: {
    NoneArea
  },
  data() {
    return {
      tips: '新功能待更新'
    }
  }
}
</script>

<style lang="scss" scoped>
.link-section__show {
  width: 100%;
  height: 100%;

  &:hover {
    border-color: $--background-hover;
  }
}
</style>
