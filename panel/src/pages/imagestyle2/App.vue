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
        <style-pannel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 2">
        <animate-area :model="model.data.animate"></animate-area>
      </li>
      <li v-show="curIndex == 3">
        <layout
          :model="model.data"
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
import StylePannel from './components/style-panel'
import DataPannel from './components/data-panel'
import Layout from './components/layout'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Image',
  components: {
    Wrapper,
    Tab,
    StylePannel,
    DataPannel,
    Layout,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '图片控件',
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3], tabConfig[4]],
      styleTabList: ['默认', '悬停'],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.image
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
