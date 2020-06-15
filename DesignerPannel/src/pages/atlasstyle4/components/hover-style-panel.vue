<template>
  <el-collapse
    v-model="activeNames"
    :accordion="true"
  >
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >标题</span>
      </template>
      <hover-font
        :model="model.styleModel.cssvars"
        :prefix="'$title-'
        "
        :font-range="fontRange. productfs"
      />
      <title-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$title-'"
        :name="'lineHeight'"
      >
        <span class="setting-attribute--title">行高</span>
      </title-line-height>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >线条</span>
      </template>
      <border-style
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :control-name="'productlist4'"
        :value-range="fontRange"
      />
    </el-collapse-item>
  </el-collapse>

</template>

<script>
import HoverFont from '@comp/font/font-group/font-style4'
import BorderStyle from '@comp/border/border-group/style3'
import TitleLineHeight from '@comp/font/font-line-height'
export default {
  components: {
    HoverFont,
    BorderStyle,
    TitleLineHeight
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  }
}
</script>
