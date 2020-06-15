<template>
  <div class="font-section">
    <switch-area prefix="$desc-" :model="model" name="descShow">
      <span class="setting-attribute--title">显示简介</span>
    </switch-area>
    <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <font-family
          :model="model.styleModel.cssvars"
          :prefix="'$desc-'"
        ></font-family>
        <font-size
          :model="model.styleModel.cssvars"
          :prefix="'$desc-'"
          :value-range="fontRange.productfs"
        ></font-size>
      </div>
      <div class="flex-between-center--area row-top__dis">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="'$desc-'"
              :model="model.styleModel.cssvars"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="'$desc-'"
              :model="model.styleModel.cssvars"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="'$desc-'"
              :model="model.styleModel.cssvars"
            ></font-underline>
          </li>
          <li>
            <font-align-group
              :prefix="'$desc-'"
              :model="model.styleModel.cssvars"
            ></font-align-group>
          </li>
        </ul>
        <font-color
          :model="model.styleModel.cssvars"
          prefix="$desc-"
        ></font-color>
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

import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'

import DescLineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'

export default {
  name: 'Font',
  components: {
    SwitchArea,
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    DescLineHeight,
    DescLineNum,
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
