<template>
  <div class="font-section flex-between-center--area">
    <ul class="font-style">
      <li>
        <el-tooltip class="item" effect="dark" content="加粗" placement="top">
          <font-weight :prefix="prefix" :model="model"></font-weight>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="dark" content="斜体" placement="top">
          <font-italic :prefix="prefix" :model="model"></font-italic>
        </el-tooltip>
      </li>
      <li>
        <el-tooltip class="item" effect="dark" content="下划线" placement="top">
          <font-underline :prefix="prefix" :model="model"></font-underline>
        </el-tooltip>
      </li>
      <li>
        <font-align-group :prefix="prefix" :model="model"></font-align-group>
      </li>
    </ul>
    <font-color :model="model" :prefix="prefix"></font-color>
  </div>
</template>
<script>
import FontColor from '@comp/font/font-color'
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'

export default {
  name: 'Font',
  components: {
    FontColor,
    FontWeight,
    FontItalic,
    FontUnderline,
    FontAlignGroup
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    }
  }
}
</script>
