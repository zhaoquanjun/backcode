<template>
  <div class="font-section">
    <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <font-family
          :model="model.styleModel.cssvars"
          :prefix="'$desc-'"
          :name="'fontFamily'"
        ></font-family>
        <font-size
          :model="model.styleModel.cssvars"
          :prefix="'$desc-'"
          :name="'fontColor'"
          :value-range="fontRange.productfs"
        ></font-size>
      </div>
      <div class="flex-between-center--area row-top__dis">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="'$desc-'"
              :name="'fontWeight'"
              :model="model.styleModel.cssvars"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="'$desc-'"
              :name="'fontStyle'"
              :model="model.styleModel.cssvars"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="'$desc-'"
              :name="'textDecoration'"
              :model="model.styleModel.cssvars"
            ></font-underline>
          </li>
          <li>
            <font-align-group
              :prefix="'$desc-'"
              :name="'textAlign'"
              :model="model.styleModel.cssvars"
            ></font-align-group>
          </li>
        </ul>
        <font-color
          :model="model.styleModel.cssvars"
          :name="'fontColor'"
          prefix="$desc-"
        ></font-color>
      </div>
      <div class="divider"></div>
      <desc-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineHeight'"
        :value-range="fontRange.productlist4pricelh"
      >
        <span class="setting-attribute--title">行高</span>
      </desc-line-height>
      <desc-line-num
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineClamp'"
        :value-range="fontRange.productlist4descln"
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
  }
}
</script>
