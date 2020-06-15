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
        <data-pannel :id="model.data.controlId" :model="model" />
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
          :length="model.data.dataModel.childArea.length"
          :font-range="fontRange"
        />
        <hover-style-panel
          v-show="curStyleIndex == 1"
          :model="model.data.styleModel.cssvars"
          :prefix="'$hov_'"
          :font-range="fontRange"
        />
        <selected-style-panel
          v-show="curStyleIndex == 2"
          :model="model.data.styleModel.cssvars"
          :prefix="'$sel-'"
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
import HoverStylePanel from './components/hover-style-panel'
import SelectedStylePanel from './components/selected-style-panel'
import DataPannel from './components/data-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  components: {
    Wrapper,
    Tab,
    StylePanel,
    HoverStylePanel,
    SelectedStylePanel,
    DataPannel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      controlName: '标签控件',
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3]],
      styleTabList: ['常态', '悬停', '选中'],
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

<style lang="scss" scoped>
.content-tab li {
  width: 77px !important;
}
</style>
