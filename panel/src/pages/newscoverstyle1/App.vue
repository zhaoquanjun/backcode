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
        <style-pannel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 1">
        <layout
          :model="model.data"
          :prefix="prefix"
          :size-setting="sizeSetting"
          :value-range="fontRange"
        />
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePannel from './components/style-panel'
import Layout from './components/layout'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Newscover',
  components: {
    Wrapper,
    Tab,
    StylePannel,
    Layout
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '文章封面',
      tabList: [tabConfig[1], tabConfig[4]],
      styleTabList: ['默认', '悬停'],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.productcover
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
