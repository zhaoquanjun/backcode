<template>
  <div class="font-section">
    <font-area :model="model" :prefix="prefix" :value-range="fontRange.detailfs"></font-area>
    <font-line-height
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'lineHeight'"
    >
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.newscreatetimels"
      @onCssChange="onCssChange"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
  </div>
</template>
<script>
import FontArea from '@comp/font/font-group/font-style3'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'
import FontAlignGroup from '@comp/font/font-align-group'
export default {
  name: 'Font',
  components: {
    FontArea,
    FontLineHeight,
    FontLetterSpace,
    FontUnderline,
    FontItalic,
    FontAlignGroup
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
    },
    controlName: {
      type: String
    }
  },
  data() {
    return {
      activeName: '1',
      iconPopupFlag: false
    }
  },
  computed: {
    color: {
      get: function() {
        return this.model[this.prefix + 'ftColor']
      },
      set: function() {}
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
