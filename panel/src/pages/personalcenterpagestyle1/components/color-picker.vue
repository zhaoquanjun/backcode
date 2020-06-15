<template>
  <ul class="color-list__section row-top__dis flex-between-center--area">
    <li
      v-for="(item, index) in predefineColors"
      :key="index"
      :style="{ background: item }"
      @click="_handleSelectColor(item)"
    >
      <span
        v-show="
          replaceSpace(item) == replaceSpace(color) ||
            replaceSpace(item) == replaceSpace(noOpacityColor)
        "
        :data-color="replaceSpace(color)"
        :data-c="replaceSpace(noOpacityColor)"
        :data-d="item"
      ></span>
    </li>
  </ul>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  computed: {
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    },
    color: {
      get: function() {
        return this.model[this.prefix + this.name]
      },
      set: function() {}
    },
    noOpacityColor: {
      get: function() {
        const color = this.model[this.prefix + this.name]
        let dColor = ''
        if (color) {
          const noOpa = color.split(',')
          const cColor = noOpa.slice(0, noOpa.length - 1)
          dColor = cColor.join(',') + ')'
          return dColor
        }
      },
      set: function() {}
    }
  },
  methods: {
    replaceSpace(str) {
      var s = str.replace(/\s*/g, '')
      return s
    },
    _handleSelectColor(item) {
      const oldVal = this.model[this.prefix + this.name]
      if (item !== oldVal) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + this.name] = oldVal
        data[this.prefix + this.name] = item
        this.model[this.prefix + this.name] = item
        this.onCssChange(oldData, data)
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onPageCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.color-list__section {
  li {
    position: relative;
    width: 28px;
    height: 28px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid $--usual-border-color;
    span {
      position: absolute;
      display: block;
      width: 18px;
      height: 18px;
      top: -4px;
      right: -4px;
      background: url('~@static/images/theme_selected.png') no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
}
</style>
