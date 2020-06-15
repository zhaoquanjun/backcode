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
        <data-pannel :model="model.data.dataModel" />
      </li>
      <li v-show="curIndex == 1">
        <ul class="content-tab" v-if="curIndex == 1">
          <li
            class="tab-item"
            @click="_handleChangeStyleTab(index)"
            v-for="(it, index) in styleTabList"
            :key="index"
            :class="{active: curStyleIndex == index}"
          >{{it}}</li>
        </ul>
        <style-panel
          :model="model.data.styleModel.cssvars"
          :value="model.data.dataModel"
          :prefix="prefix"
          :fontRange="fontRange"
          v-show="curStyleIndex == 0"
        />
        <hover-style-panel
          :model="model.data.styleModel.cssvars"
          :value="model.data.dataModel"
           :fontRange="fontRange"
           :prefix="prefix"
          v-show="curStyleIndex == 1"
        />
      </li>
      <li v-show="curIndex == 2">
        <animate-area :model="model.data.animate"></animate-area>
      </li>
      <li v-show="curIndex == 3">
        <layout
          :model="model.data"
          :prefix="prefix"
          :valueRange="fontRange"
          :sizeSetting="sizeSetting"
        />
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from "@comp/wrapper/wrap";
import Tab from "@comp/tab/tab";
import StylePanel from "./components/style-panel";
import HoverStylePanel from "./components/hover-style-panel";
import DataPannel from "./components/data-panel";
import Layout from "./components/layout";
import modelData from "./data.js";
import AnimateArea from "@comp/animate";
import tabConfig from "@/config/tabConfig.js";
import controlValueLimit from "@/config/controlValueLimit.config.js";
export default {
  name: "button",
  data() {
    return {
      model: modelData,
      prefix: "$",
      controlName: "登录状态控件",
      curIndex: 0,
      tabList: [tabConfig[0], tabConfig[1], tabConfig[3], tabConfig[4]],
      styleTabList: ["默认", "悬停"],
      curStyleIndex: 0,
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.loginstatus
    };
  },
  components: {
    Wrapper,
    Tab,
    StylePanel,
    HoverStylePanel,
    DataPannel,
    Layout,
    AnimateArea
  },
  methods: {
    changeTab(i) {
      this.curIndex = i;
    },
    _handleChangeStyleTab(i) {
      this.curStyleIndex = i;
    }
  }
};
</script>

