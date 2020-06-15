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
        <data-panel :model="model.data.dataModel"></data-panel>
      </li>
      <li v-show="curIndex == 1">
        <style-panel
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
          :font-range="fontRange"
        />
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
import StylePanel from './components/style-panel'
import AnimateArea from '@comp/animate'
import DataPanel from './components/data-panel'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Video',
  components: {
    Wrapper,
    Tab,
    DataPanel,
    StylePanel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '视频控件',
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3]],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.video
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

