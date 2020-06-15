<template>
  <div class="desc-section">
    <switch-area :prefix="'$desc-'" :model="model" :name="'descShow'">
      <span class="setting-attribute--title">显示简介</span>
    </switch-area>
    <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <DescFont
          :model="model.styleModel.cssvars"
          :prefix="'$desc-'"
          :font-range="fontRange.newslistdescfs"
        />
      </div>

      <div class="divider"></div>
      <desc-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </desc-line-height>
    </template>
  </div>
</template>
<script>
import DescFont from '@comp/font/font-group/font-style3'
import SwitchArea from '@comp/form/form-switch'
import DescLineHeight from '@comp/font/font-line-height'

export default {
  name: 'Font',
  components: {
    DescFont,
    SwitchArea,
    DescLineHeight
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
