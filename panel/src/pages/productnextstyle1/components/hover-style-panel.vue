<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-icon title-item text-icon" v-show="activeNames !== '1'"></span><span class="collapse-title title-item" :class="{active: activeNames == '1'}">文字</span>
      </template>
      <hover-font :model="model" :prefix="prefix"/>
    </el-collapse-item>
    <el-collapse-item  name="2">
      <template slot="title">
        <span class="collapse-icon title-item background-icon" v-show="activeNames !== '2'"></span><span class="collapse-title title-item" :class="{active: activeNames == '2'}">背景</span>
      </template>
      <background :model="model" :prefix="prefix"  />
    </el-collapse-item>
    <el-collapse-item  name="3">
      <template slot="title">
        <span class="collapse-icon title-item border-icon"  v-show="activeNames !== '3'"></span><span class="collapse-title title-item" :class="{active: activeNames == '3'}">边框</span>
      </template>
      <hover-border :model="model" :prefix="prefix"  />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import HoverFont from "./hover-font";
import Background from '@comp/background/background';
import HoverBorder from './hover-border';
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    borderRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeNames: "1"
    };
  },
  components: {
    HoverFont,
    Background,
    HoverBorder
  },
  methods: {
    
  }
};
</script>

