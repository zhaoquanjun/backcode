<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '1'}">文字</span>
      </template>
      <font :model="model" :value="value" :prefix="prefix" :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '2'}">背景</span>
      </template>
      <background :model="model" :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span class="collapse-title title-item" :class="{active: activeNames == '3'}">边框</span>
      </template>
      <border :model="model" :prefix="prefix" :control-name="'newsprev'" :value-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Font from './font'
import Background from '@comp/background/background'
import Border from '@comp/border/border'
export default {
  components: {
    Font,
    Background,
    Border
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  },
  methods: {}
}
</script>
