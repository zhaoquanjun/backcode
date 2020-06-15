<template>
  <div class="data-section">
    <div class=" setting-block__section">
      <div class="setting-block--title">文字内容</div>
      <text-area
        :model="model"
        :name="'Text'"
        :length-limit="30"
      />
    </div>
  </div>
</template>

<script>
import TextArea from '@comp/data/text'
export default {
  components: {
    TextArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

.link-setting__area {
  margin-top: 24px;
}

</style>
