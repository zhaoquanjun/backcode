<template>
  <wrapper>
    <template slot="tab">
      <tab :control-name="controlName" :tab-list="tabList" :cur-index="curIndex" @changeTab="changeTab"></tab>
    </template>
    <ul>
      <li v-show="curIndex == 0">
        <ul v-if="curIndex == 1" class="content-tab">
          <li
            v-for="(it, index) in styleTabList"
            :key="index"
            class="tab-item"
            :class="{active: curStyleIndex == index}"
            @click="_handleChangeStyleTab(index)"
          >{{ it }}</li>
        </ul>
        <style-pannel
          v-show="curStyleIndex == 0"
          :model="model.data.styleModel.cssvars"
          :model-data="model.data.dataModel"
          :prefix="prefix"
          :font-range="fontRange"
        />
      </li>
      <li v-show="curIndex == 1">
        <animate-area :model="model.data.animate"></animate-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Tab from '@comp/tab/tab'
import StylePannel from './components/style-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Button',
  components: {
    Wrapper,
    Tab,
    StylePannel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '容器控件',
      tabList: [tabConfig[1], tabConfig[3]],
      styleTabList: ['默认', '悬停'],
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

