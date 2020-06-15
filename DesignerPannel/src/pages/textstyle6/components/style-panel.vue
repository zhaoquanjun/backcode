<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >内容设置</span>
      </template>
      <div>
        <font-family :model="model" :prefix="prefix" :width="232">
          <span class="setting-attribute--title">字体</span>
        </font-family>
        <font-color
          class="row-top__dis"
          :width="182"
          :model="model"
          :prefix="prefix"
        ><span class="setting-attribute--title">颜色</span></font-color>
        <font-line-height
          class="row-top__dis"
          :model="model"
          :prefix="prefix"
          :name="'lineHeight'"
        >
          <span class="setting-attribute--title">行高</span>
        </font-line-height>
        <div class="row-top__dis">
          <text-align-group :model="model" :prefix="prefix"></text-align-group>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >线条设置</span>
      </template>
      <div>
        <double-border-style
          :model="model"
          :prefix="prefix"
          prefix2="$container-"
        >
          <span class="setting-attribute--title">线型</span>
        </double-border-style>
        <border-color
          class="row-top__dis"
          :width="100"
          unit="%"
          :model="model"
          :prefix="prefix"
        >主色</border-color>
        <border-color
          class="row-top__dis"
          :model="model"
          :prefix="'$container-'"
        >辅色</border-color>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import BorderColor from '@comp/border/border-color'
import DoubleBorderStyle from '@comp/border/double-border-style'
import FontFamily from '@comp/font/font-family'
import FontColor from '@comp/font/font-color'
import FontLineHeight from '@comp/font/font-line-height'
import TextAlignGroup from '@comp/contentAlign/text-align-group'
export default {
  components: {
    FontColor,
    BorderColor,
    DoubleBorderStyle,
    FontFamily,
    FontLineHeight,
    TextAlignGroup
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
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel .form-row-top {
  margin-top: 23px;
}
.text-font__area {
  padding: 16px 0 24px;
  margin-bottom: 16px;
  p {
    font-size: 14px;
    padding: 0 24px 24px;
  }
}
.cutline {
  display: block;
  margin: 15px;
  border-top: 1px dashed #c9d9dc;
}
.componet-title {
  padding: 16px 24px;
}
.el-collapse /deep/ .el-collapse-item .border-style .el-color-picker--small {
  width: 100%;
}
</style>
