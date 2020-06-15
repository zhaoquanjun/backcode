<template>
  <div class="font-section">
    <switch-area prefix="$desc-" :model="model" name="descShow">
      <span class="setting-attribute--title">显示简介</span>
    </switch-area>
    <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <title-font
          :font-range="fontRange.newslistdescfs"
          :model="model.styleModel.cssvars"
          :prefix="prefix + 'desc-'"
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
      <desc-line-num
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineClamp'"
        :value-range="fontRange.productdesccol"
      >
        <span class="setting-attribute--title">行数</span>
      </desc-line-num>
    </template>
  </div>
</template>
<script>
import SwitchArea from '@comp/form/form-switch'
import DescLineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'
import TitleFont from '@comp/font/font-group/font-style3'
export default {
  name: 'Font',
  components: {
    SwitchArea,
    DescLineHeight,
    DescLineNum,
    TitleFont
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
      activeName: '1'
    }
  },
  methods: {
    _handleAddButtonIcon() {},
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
