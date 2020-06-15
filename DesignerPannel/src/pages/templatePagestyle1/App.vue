<template>
  <wrapper :top="48">
    <template slot="tab">
      <header-area
        :control-name="controlName"
        @changeArea="changeArea"
      ></header-area>
    </template>
    <header-footer-select :model="model.data"></header-footer-select>
    <el-collapse
      v-model="activeNames"
      :accordion="false"
    >
      <el-collapse-item name="1">
        <template slot="title">
          <span
            class="collapse-title title-item"
            :class="{active: activeNames == '1'}"
          >页头背景</span>
        </template>
        <background
          :model="model.data.styleModel.cssvars"
          :prefix="'$header-'"
        />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span
            class="collapse-title title-item"
            :class="{active: activeNames == '2'}"
          >页尾背景</span>
        </template>
        <background
          :model="model.data.styleModel.cssvars"
          :prefix="'$footer-'"
        />
      </el-collapse-item>
    </el-collapse>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import HeaderArea from '@comp/tab/header'
import Background from '@comp/background/background'
import HeaderFooterSelect from './components/header-footer-select'
import modelData from './data.js'
export default {
  name: 'TemplatePage',
  components: {
    Wrapper,
    HeaderArea,
    Background,
    HeaderFooterSelect
  },
  data() {
    return {
      activeNames: ['1', '2'],
      model: modelData,
      controlName: '页头页尾区域'
    }
  },
  methods: {
    changeArea(val) {
      this.activeNames = val
    }
  }
}
</script>

