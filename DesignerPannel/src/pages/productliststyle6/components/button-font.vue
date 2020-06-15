<template>
  <div>
    <template>
      <div class="flex-between-center--area row-top__dis">
        <font-family
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'fontFamily'"
        ></font-family>
        <font-size
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'fontSize'"
          :value-range="fontRange.productlist4buttontextfs"
        ></font-size>
      </div>
      <div class="flex-between-center--area row-top__dis">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="prefix"
              :name="'fontWeight'"
              :model="model.styleModel.cssvars"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="prefix"
              :name="'fontStyle'"
              :model="model.styleModel.cssvars"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="prefix"
              :name="'textDecoration'"
              :model="model.styleModel.cssvars"
            ></font-underline>
          </li>
          <li>
            <font-align-group
              :prefix="prefix"
              :name="'textAlign'"
              :model="model.styleModel.cssvars"
            ></font-align-group>
          </li>
        </ul>
        <font-color
          :model="model.styleModel.cssvars"
          :prefix="prefix"
          :name="'fontColor'"
        ></font-color>
      </div>
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
import BorderColor from '@comp/border/border-color'
import BorderRadius from '@comp/form/form-slider-css'

import Background from '@comp/background/background'

export default {
  name: 'Font',
  components: {
    SwitchArea,
    Background,
    BorderColor,
    BorderRadius,
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
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
