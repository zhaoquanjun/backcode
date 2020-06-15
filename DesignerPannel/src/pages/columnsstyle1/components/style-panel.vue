<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
          >填充方式</span
        >
      </template>
      <padding-area
        :model="model.styleModel.cssvars"
        :prefix="'$'"
        :list="[0, 2, 3]"
      />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
          >吸顶设置</span
        >
      </template>
      <switch-area
        :event-name="'toggleSticky'"
        :model-data="modelData"
        :name="'toggleSticky'"
      >
        <span class="setting-attribute--title">滚动吸顶</span>
      </switch-area>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
          >分割线设置</span
        >
      </template>
      <display-switch
        :prefix="'$'"
        :model="model"
        :name="'lineDisplay'"
        :attribute="'block'"
      >
        <span class="setting-attribute--title">显示分割线</span>
      </display-switch>
      <div v-show="model.styleModel.cssvars.$lineDisplay">
        <divider-width
          class="row-top__dis"
          :prefix="'$'"
          :model="model.styleModel.cssvars"
          :name="'lineWidth'"
          :value-range="fontRange.columnsDvw"
        >
          <span class="setting-attribute--title">宽度</span>
        </divider-width>
        <divider-margin
          class="row-top__dis"
          :prefix="'$'"
          :model="model.styleModel.cssvars"
          :name="'lineMargin'"
          :value-range="fontRange.columnsdvm"
        >
          <span class="setting-attribute--title">边距(%)</span>
        </divider-margin>
        <divider-background
          class="row-top__dis"
          :model="model.styleModel.cssvars"
          :prefix="'$'"
          :color-name="'lineBackground'"
        >
          <span class="setting-attribute--title">背景色</span>
        </divider-background>
      </div>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames !== '4'"
          class="collapse-icon title-item shadow-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
          >间距</span
        >
      </template>
      <margin-area
        :model="model.styleModel.cssvars"
        :prefix="'$'"
        :name="'innerMargin'"
        :value-range="fontRange.columnsmr"
      >
        <span class="setting-attribute--title" style="width: 80px;">间距(%)</span>
      </margin-area>
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span
          v-show="activeNames !== '5'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == 5 }"
          >容器背景</span
        >
      </template>
      <p class="setting-block--subtitle">背景</p>
      <background :model="model.styleModel.cssvars" :prefix="'$'" />
    </el-collapse-item>
    <el-collapse-item
      v-for="(item, index) in modelData.childArea"
      :key="index"
      :name="(index + 5).toString()"
    >
      <template slot="title">
        <span
          v-show="activeNames !== index + 5"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == index + 5 }"
          >第{{ _formatNumber(index + 1) }}栏</span
        >
      </template>
      <p class="setting-block--subtitle">对齐</p>
      <text-align-group
        :model="model.styleModel.cssvars"
        :prefix="'$l' + (index + 1) + '-'"
      />
      <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">背景</p>
      <background
        :model="model.styleModel.cssvars"
        :prefix="'$l' + (index + 1) + '-'"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TextAlignGroup from '@comp/contentAlign/text-align-group'
import Background from '@comp/background/background'
import PaddingArea from '@comp/layout/padding'
import MarginArea from '@comp/layout/margin'
import SwitchArea from '@comp/form/form-switch-data'
import DisplaySwitch from '@comp/form/form-switch'
import DividerBackground from '@comp/background/common-bg-color'
import DividerWidth from '@comp/form/form-slider-css'
import DividerMargin from '@comp/form/form-slider-css'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  components: {
    TextAlignGroup,
    Background,
    PaddingArea,
    MarginArea,
    SwitchArea,
    DisplaySwitch,
    DividerBackground,
    DividerWidth,
    DividerMargin
  },
  props: {
    model: {
      type: Object
    },
    modelData: {
      type: Array
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      fontRange: controlValueLimit.fontRange
    }
  },
  computed: {
    activeNames: {
      get: function() {
        return '1'
      },
      set: function() {}
    }
  },
  methods: {
    _formatNumber(i) {
      switch (i) {
        case 1:
          return '一'
          break
        case 2:
          return '二'
          break
        case 3:
          return '三'
          break
        case 4:
          return '四'
          break
        case 5:
          return '五'
          break
        case 6:
          return '六'
          break
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row-padding {
  padding: 0 24px 16px;
}

.row-pad__top {
  padding-top: 24px;
}

.row-margin__top {
  margin-top: 24px;
}

.row-pad__bottom--0 {
  padding-bottom: 0;
}

.font-size {
  font-size: 14px;
}
</style>
