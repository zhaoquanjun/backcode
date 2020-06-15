<template>
  <el-collapse v-model="activeNames" :accordion="false">
    <el-collapse-item name="1">
      <template slot="title">
        <span v-show="activeNames !== '1'" class="collapse-icon title-item border-icon"></span><span class="collapse-title title-item" :class="{active: activeNames == '3'}">边框</span>
      </template>
      <border :model="model" :prefix="prefix" :control-name="'line'" :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Border from './border'
export default {
  components: {
    Border
  },
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
      activeNames: '1'
    }
  },
  methods: {

  }
}
</script>
