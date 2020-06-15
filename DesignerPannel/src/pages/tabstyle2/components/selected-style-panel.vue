<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >标签</span>
      </template>
      <p class="setting-block--subtitle">文字</p>
      <div class="font-section flex-between-center--area">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="'$sel-'"
              :model="model"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="'$sel-'"
              :model="model"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="'$sel-'"
              :model="model"
            ></font-underline>
          </li>
        </ul>
        <font-color
          :model="model"
          :prefix="'$sel-'"
        ></font-color>
      </div>
      <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">背景</p>
      <background-area :model="model" :prefix="'$sel-'"></background-area>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'
import FontColor from '@comp/font/font-color'
import backgroundArea from '@comp/background/background'
export default {
  components: {
    FontWeight,
    FontItalic,
    FontUnderline,
    FontAlignGroup,
    FontColor,
    backgroundArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {
      activeNames: '1'
    }
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
