<template>
  <wrapper>
    <template slot="tab">
      <tab
        :controlName="controlName"
        :tabList="tabList"
        :curIndex="curIndex"
        @changeTab="changeTab"
      ></tab>
    </template>
    <ul>
      <li v-show="curIndex == 0">
        <data-pannel :model="model.data" />
      </li>
      <li v-show="curIndex == 1">
        <ul class="content-tab" v-if="curIndex == 1">
          <li
            class="tab-item"
            @click="_handleChangeStyleTab(index)"
            v-for="(it, index) in styleTabList"
            :key="index"
            :class="{ active: curStyleIndex == index }"
          >
            {{ it }}
          </li>
        </ul>
        <style-panel
          :model="model.data"
          :prefix="prefix"
          :fontRange="fontRange"
          v-show="curStyleIndex == 0"
        />
        <hover-style-panel
          :model="model.data"
          :prefix="prefix"
          v-show="curStyleIndex == 1"
        />
        <selected-style-panel
          :model="model.data"
          :prefix="prefix"
          v-show="curStyleIndex == 2"
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
  name: 'Navigation',
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
  mounted() {},
  components: {
    Wrapper,
    Tab,
    StylePanel,
    HoverStylePanel,
    selectedStylePanel,
    DataPannel,
    AnimateArea
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
