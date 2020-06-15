<template>
 <wrapper>
    <template slot="tab">
      <tab :controlName="controlName" :tabList="tabList" :curIndex="curIndex" @changeTab="changeTab"></tab>
    </template>
    <ul>
      <li v-show="curIndex == 0">
        <ul class="content-tab" v-if="curIndex == 1">
          <li
            class="tab-item"
            @click="_handleChangeStyleTab(index)"
            v-for="(it, index) in styleTabList"
            :key="index"
            :class="{active: curStyleIndex == index}"
          >{{it}}</li>
        </ul>
        <style-pannel
          :model="model.data.styleModel.cssvars"
          :prefix="prefix"
           :fontRange="fontRange"
          v-show="curStyleIndex == 0"
        />
      </li>
       <li v-show="curIndex == 1">
        <animate-area :model="model.data.animate" :controlName="model.data.controlName"></animate-area>
      </li>
    </ul>
  </wrapper>
</template>

<script>
import Wrapper from "@comp/wrapper/wrap";
import Tab from "@comp/tab/tab";
import StylePannel from "./components/stylePanel";
import AnimateArea from "@comp/animate";
import modelData from "./data.js";
import tabConfig from "@/config/tabConfig.js";
import controlValueLimit from "@/config/controlValueLimit.config.js";
export default {
  name: "block",
  data() {
    return {
      model: modelData,
      prefix: "$",
      curIndex: 0,
      controlName: "区块",
      tabList: [tabConfig[1],tabConfig[3]],
      styleTabList: ["默认", "悬停"],
      curStyleIndex: 0,
       fontRange: controlValueLimit.fontRange,
    };
  },
  components: {
    Wrapper,
    Tab,
    StylePannel,
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

