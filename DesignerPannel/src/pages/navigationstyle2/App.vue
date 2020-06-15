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
          :model="model.data"
          :prefix="prefix"
          :font-range="fontRange"
        />
        <hover-style-panel
          v-show="curStyleIndex == 1"
          :model="model.data"
          :prefix="prefix"
          :font-range="fontRange"
        />
        <selected-style-panel
          v-show="curStyleIndex == 2"
          :model="model.data"
          :prefix="prefix"
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
import selectedStylePanel from './components/selected-style-panel'
import DataPannel from './components/data-panel'
import AnimateArea from '@comp/animate'
import modelData from './data.js'
import tabConfig from '@/config/tabConfig.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Button',
  components: {
    Wrapper,
    Tab,
    StylePanel,
    HoverStylePanel,
    selectedStylePanel,
    DataPannel,
    AnimateArea
  },
  data() {
    return {
      model: modelData,
      prefix: '$',
      curIndex: 0,
      controlName: '导航控件',
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3]],
      styleTabList: ['默认', '悬停', '选中'],
      dataTabList: ['添加导航', '批量添加导航'],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      active: 0
    }
  },
  methods: {
    changeTab(i) {
      this.curIndex = i
    },
    _handleChangeStyleTab(i) {
      this.curStyleIndex = i
    },

    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

