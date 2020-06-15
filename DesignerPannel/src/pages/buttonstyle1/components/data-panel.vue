<template>
  <div class="data-section">
    <div class=" setting-block__section">
      <text-area :model="model" :name="'Text'" :length-limit="30" />
    </div>
    <div class="setting-block__section">
      <div class="setting-area__title setting-block--title">按钮链接</div>
      <link-area :model="model" :action-key="'changeLink'" />
    </div>
  </div>
</template>

<script>
import TextArea from '@comp/data/text'
import LinkArea from '@comp/link/index'
export default {
  components: {
    TextArea,
    LinkArea
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
