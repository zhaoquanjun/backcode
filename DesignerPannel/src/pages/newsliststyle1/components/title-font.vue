<template>
  <div class="font-section">
    <TitleFont
      :model="model"
      :prefix="'$title-'"
      :font-range="fontRange.newslisttitlefs"
      @onCssChange="onCssChange"
    />
    <div class="divider"></div>

    <div class="row-pad__top">
      <title-line-height
        class="row-top__dis"
        :model="model"
        :prefix="'$title-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </title-line-height>
    </div>
  </div>
</template>
<script>
import TitleFont from '@comp/font/font-group/font-style3'
import TitleLineHeight from '@comp/font/font-line-height'

export default {
  name: 'Font',
  components: {
    TitleFont,
    TitleLineHeight
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeName: '1'
    }
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
