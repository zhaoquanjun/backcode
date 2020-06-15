<template>
  <ul class="theme-list">
    <li
      class="list-item"
      v-for="item in Object.values(config.data)"
      :key="item"
      :style="{ background: item }"
      @click="handleThemeClick(item)"
    >
      <span :class="{ selected: trim(selected) == trim(item) }"></span>
    </li>
  </ul>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    },
    colorName: {
      type: String
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  mounted() {},
  methods: {
    trim(str) {
      var s = str.replace(/\s*/g, '')
      return s
    },
    handleThemeClick(item) {
      let newValue = item
      let oldValue = this.model[this.combineName]
      if (newValue == oldValue) return
      let oldData = {}
      let newData = {}
      oldData[this.combineName] = oldValue
      newData[this.combineName] = newValue

      this.model[this.combineName] = item
      this.onCssChange(oldData, newData)
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  },
  computed: {
    combineName() {
      return this.prefix + this.colorName
    },
    selected() {
      return this.model[this.combineName]
    }
  }
}
</script>
<style lang="scss" scoped>
.theme-list {
  display: flex;
  justify-content: space-between;
  .list-item {
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    .selected {
      position: absolute;
      width: 18px;
      height: 18px;
      top: -9px;
      right: 0px;
      background: url('~@static/images/theme_selected.png') no-repeat center;
      background-size: contain;
    }
  }
}
</style>
