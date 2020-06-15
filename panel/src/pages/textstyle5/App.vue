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
        <style-panel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 1">
        <animate-area :model="model.data.animate" :control-name="model.data.controlName"></animate-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePanel from './components/style-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Text5',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '文字控件',
      tabList: [tabConfig[1], tabConfig[3]],
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

