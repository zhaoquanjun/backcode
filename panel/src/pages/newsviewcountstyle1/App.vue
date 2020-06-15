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
          :model="model.data.styleModel.cssvars"
          :value="model.data.dataModel"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 2">
        <layout
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :size-setting="sizeSetting"
        />
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePanel from './components/style-panel'
import DataPannel from './components/data-panel'
import Layout from './components/layout'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Newsviewcount',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    DataPannel,
    Layout
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '文章浏览量',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[4]],
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.button
    }
  },
  methods: {
    changeTab(i) {
      this.curIndex = i
    }
  }
}
</script>

