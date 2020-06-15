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
        <ul v-if="curIndex == 1" class="content-tab">
          <li
            v-for="(it, index) in styleTabList"
            :key="index"
            class="tab-item"
            :class="{active: curStyleIndex == index}"
            @click="_handleChangeStyleTab(index)"
          >{{ it }}</li>
        </ul>
        <style-panel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :value="model.data.dataModel"
          :prefix="prefix"
          :font-range="fontRange"
        />
        <hover-style-panel
          v-show="curStyleIndex == 1"
          :model="model.data.styleModel.cssvars"
          :prefix="'$hov_'"
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
import HoverStylePanel from './components/hover-style-panel'
import DataPannel from './components/data-panel'
import Layout from './components/layout'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Newsnext',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    HoverStylePanel,
    DataPannel,
    Layout
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '下一篇文章',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[4]],
      styleTabList: ['默认', '悬停'],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.button
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

