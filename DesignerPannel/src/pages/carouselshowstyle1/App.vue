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
        <data-pannel :model="model.data" />
      </li>

      <li v-show="curIndex == 1">
        <stylePanel
          v-show="curStyleIndex == 0"
          :model="model.data"
          :prefix="prefix"
          :font-range="fontRange"
          :effect-list="effectList"
          :carousel-pagination-type-list="carouselPaginationTypeList"
        />
      </li>
      <li v-show="curIndex == 2">
        <trigger-area
          :model="model.data"
          :font-range="fontRange"
          :effect-list="effectList"
        ></trigger-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePanel from './components/style-panel'
import DataPannel from './components/data-panel'
import TriggerArea from './components/trigger'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Button',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    DataPannel,
    TriggerArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '幻灯秀控件',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[2]],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.banner,
      effectList: controlValueLimit.effectList,
      carouselPaginationTypeList: controlValueLimit.carouselPaginationTypeList
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
