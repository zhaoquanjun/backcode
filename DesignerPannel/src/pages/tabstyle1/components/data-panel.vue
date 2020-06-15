<template>
  <div class="setting-block__section">
    <p class="setting-block--title">栏目设置</p>
    <set-tab-item
      :id="id"
      :model="model.data"
      @onDataChange="onDataChange"
    ></set-tab-item>
  </div>
</template>

<script>
import SetTabItem from './set-tab-item'
export default {
  components: {
    SetTabItem
  },
  props: {
    model: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite.onDataChange) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
