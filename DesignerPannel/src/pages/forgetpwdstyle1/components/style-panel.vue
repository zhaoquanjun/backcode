<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-area__title setting-block--title">主色</div>
      <theme-color
        :model="model"
        :prefix="'$themeStyle-'"
        color-name="bgColor"
      />
    </div>
    <div class="setting-block__top setting-block__section">
      <div class="setting-area__title setting-block--title">文字色</div>
      <theme-color
        :model="model"
        :prefix="'$themeStyle-'"
        color-name="ftColor"
      />
    </div>
  </div>
</template>

<script>
import ThemeColor from '@comp/theme/theme-color'
export default {
  components: {
    ThemeColor
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
