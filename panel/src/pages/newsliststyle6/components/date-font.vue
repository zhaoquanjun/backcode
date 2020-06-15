<template>
  <div class="font-section">
    <div class="">
      <switch-area :prefix="'$date-'" :model="model" :name="'dateShow'">
        <span class="setting-attribute--title">显示日期</span>
      </switch-area>
    </div>
    <template v-if="model.styleModel.cssvars['$date-dateShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <font-family
          :model="model.styleModel.cssvars"
          :prefix="'$date-'"
        ></font-family>
        <font-size
          :model="model.styleModel.cssvars"
          :prefix="'$date-'"
          :value-range="fontRange.newslistdatefs"
        ></font-size>
      </div>
      <div class="flex-between-center--area row-top__dis">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="'$date-'"
              :model="model.styleModel.cssvars"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="'$date-'"
              :model="model.styleModel.cssvars"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="'$date-'"
              :model="model.styleModel.cssvars"
            ></font-underline>
          </li>
          <li>
            <font-align-group
              :prefix="'$date-'"
              :model="model.styleModel.cssvars"
            ></font-align-group>
          </li>
        </ul>
        <!-- 字体颜色选择器 begin -->
        <font-color
          :model="model.styleModel.cssvars"
          :prefix="'$date-'"
        ></font-color>
        <!-- 字体颜色选择器 end -->
      </div>
      <div class="divider"></div>
      <date-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$date-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </date-line-height>
      <div class="divider"></div>
      <date-style
        class="row-top__dis"
        :model="model.dataModel"
        :name="'dateStyle'"
        :action-key="'changeDateStyle'"
        :width-value="160"
        :option-list="dateOptionList"
        :default-select="dateOptionList[0].value"
      >
        <span class="setting-attribute--title">日期格式</span>
      </date-style>
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

import DateLineHeight from '@comp/font/font-line-height'

import DateStyle from '@comp/form/form-select-data'

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
    DateLineHeight,
    FontAlignGroup,
    DateStyle
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
      dateOptionList: [
        { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
        { label: 'YY-MM-DD', value: 'YY-MM-DD' },
        { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
        { label: 'MM-DD', value: 'MM-DD' },
        { label: 'MM月-DD日', value: 'MM月-DD日' }
      ]
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
