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
        <data-pannel :model="model.data.dataModel" />
      </li>
      <li v-show="curIndex == 1">
        <style-panel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 2">
        <layout
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
        />
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import DataPannel from './components/data-panel'
import StylePanel from './components/style-panel'
import Layout from './components/layout'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Newscreatetime',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    Layout,
    DataPannel
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '文章创建时间',
      tabList: [tabConfig[0], tabConfig[1], tabConfig[4]],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange
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

