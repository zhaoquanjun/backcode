<template>
  <wrapper class="pannel">
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
        <data-panel v-show="curStyleIndex == 0" :model="model"></data-panel>
      </li>
      <li v-show="curIndex == 1">
        <style-pannel
          :model="model.data"
          :model-data="model.data.dataModel.childArea"
        ></style-pannel>
      </li>
      <li v-show="curIndex == 2">
        <animate-area :model="model.data.animate"></animate-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePannel from './components/style-panel'
import DataPanel from './components/data-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
export default {
  name: 'Columnsstyle1',
  components: {
    Wrapper,
    Tab,
    StylePannel,
    DataPanel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      curIndex: 0,
      controlName: '导航控件',
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3]],
      curStyleIndex: 0
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
