<template>
  <div class="setting-block__section">
    <div class="setting-block--title">文字内容</div>
    <text-area :model="model" :name="'Desc'" :length-limit="30" />
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
  },
  computed: {},
  methods: {}
}
</script>
