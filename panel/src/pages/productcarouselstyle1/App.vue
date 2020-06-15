<template>
  <wrapper>
    <template slot="tab">
      <tab
        :control-name="controlName"
        :tab-list="tabList"
        :cur-index="curIndex"
        @changeTab="changeTab"
      ></tab>
    </template>
    <ul>
      <li v-show="curIndex == 0">
        <data-panel v-show="curStyleIndex == 0" :model="model.data" :prefix="prefix" />
      </li>
      <li v-show="curIndex == 1">
        <layout
          :model="model.data.styleModel.cssvars"
          :prefix="'$pc-'"
          :size-setting="sizeSetting"
          :value-range="valueRange"
        />
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import DataPanel from './components/data-panel'
import Layout from './components/layout'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Productcarousel',
  components: {
    Wrapper,
    Tab,
    DataPanel,
    Layout
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '产品幻灯片控件',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[4]],
      curStyleIndex: 0,
      sizeSetting: controlValueLimit.sizeSetting.productcarousel,
      valueRange: controlValueLimit.fontRange.productcarousel
    }
  },
  methods: {
    changeTab(i) {
      this.curIndex = i
    },
    _handleChangeStyleTab(i) {
      this.curStyleIndex = i
    }
  }
}
</script>

