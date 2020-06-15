<template>
  <el-collapse v-model="activeNames" :accordion="false">
    <el-collapse-item  name="1">
      <template slot="title">
        <span class="collapse-icon title-item border-icon"  v-show="activeNames !== '1'"></span><span class="collapse-title title-item" :class="{active: activeNames == '3'}">边框</span>
      </template>
      <border :model="model" :prefix="prefix" :controlName="'line'" :fontRange="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Border from './border';
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: "1"
    };
  },
  components: {
    Border
  },
  methods: {
    
  }
};
</script>
