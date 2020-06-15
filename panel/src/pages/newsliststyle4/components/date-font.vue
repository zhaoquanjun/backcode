<template>
  <div class="font-section">
    <div class="">
      <switch-area
        :prefix="'$date-'"
        :model="model"
        :name="'dateShow'"
      >
        <span class="setting-attribute--title">显示日期</span>
      </switch-area>
    </div>
    <template v-if="model.styleModel.cssvars['$date-dateShow'] == 'block'">
      <div class="flex-between-center--area row-top__dis">
        <DateFont
          :model="model.styleModel.cssvars"
          :prefix="'$date-'"
          :font-range="fontRange.newslistdatefs"
        />
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
import DateFont from '@comp/font/font-group/font-style4'
import DateLineHeight from '@comp/font/font-line-height'
import DateStyle from '@comp/form/form-select-data'

export default {
  name: 'Font',
  components: {
    SwitchArea,
    DateFont,
    DateLineHeight,
    DateStyle
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
<style lang="scss" scoped>
.font-style {
  width: 166px !important;
  li {
    width: 27px !important;
  }
}
</style>
