<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <font-family
        :model="model"
        :prefix="prefix"
      ></font-family>
      <font-color
        :model="model"
        :prefix="prefix"
      ></font-color>
    </div>
    <ul class="">
      <li class="row-top__dis">
        <font-line-height :model="model" :prefix="prefix" :name="'lineHeight'">
          <span class="setting-attribute--title">行高</span>
        </font-line-height>
      </li>
      <li class="row-top__dis">
        <font-letter-space
          :model="model"
          :prefix="prefix"
          :name="'letterSpace'"
          :value-range="fontRange.textls"
        >
          <span class="setting-attribute--title set-min-width">字间距</span>
        </font-letter-space>
      </li>
    </ul>
    <div class="row-top__dis">
      <text-align-group
        :model="model"
        :prefix="prefix"
      ></text-align-group>
    </div>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontColor from '@comp/font/font-color'
import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'
import TextAlignGroup from '@comp/contentAlign/text-align-group'

export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontLineHeight,
    FontLetterSpace,
    TextAlignGroup
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeName: '1',
      iconPopupFlag: false
    }
  },
  mounted() {},
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.font-section {
  .set-min-width {
    min-width: 60px !important;
  }
}
</style>
