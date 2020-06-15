<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >箭头</span>
      </template>
      <switch-area
        :model="model"
        :name="'display'"
        :prefix="'$arrow-'"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">显示箭头</span>
      </switch-area>
      <div v-show="model.styleModel.cssvars['$arrow-display'] == 'block'">
        <size-area
          class="row-top__dis"
          :model="model.styleModel.cssvars"
          :prefix="'$arrow-'"
          :name="'fontSize'"
          :value-range="fontRange.carouselArrowFontsize"
        >
          <span class="setting-attribute--title">尺寸</span>
        </size-area>
        <div class="row-top__dis flex-between-center--area">
          <span class="setting-attribute--title">按钮颜色</span>
          <font-color
            :model="model.styleModel.cssvars"
            :prefix="'$arrow-'"
            :width="166"
          />
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item name="3">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >动效切换</span>
      </template>
      <effect-switch
        :model="model.dataModel"
        :name="'effect'"
        :width-value="240"
        :action-key="'changeEffect'"
        :option-list="effectList"
        :default-select="model.dataModel.effect"
      ></effect-switch>
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >分页器</span>
      </template>

      <switch-area
        :model="model"
        :name="'display'"
        :prefix="'$pagination-'"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">显示数量图标</span>
      </switch-area>
      <div v-show="model.styleModel.cssvars['$pagination-display'] == 'block'">
        <effect-switch
          class="row-top__dis"
          :model="model.dataModel"
          :name="'paginationType'"
          :width-value="240"
          :action-key="'changePaginationType'"
          :option-list="carouselPaginationTypeList"
          :default-select="model.dataModel.paginationType"
        ><span class="setting-attribute--title">类型</span></effect-switch>
        <template v-if="model.dataModel.paginationType === 'bullets'">
          <size-area
            class="row-top__dis"
            :model="model.styleModel.cssvars"
            :prefix="'$pagination-'"
            :name="'width'"
            :value-range="fontRange.carouselPaginationSize"
          >
            <span class="setting-attribute--title">大小</span>
          </size-area>
          <bg-color-area
            class="row-top__dis"
            :model="model.styleModel.cssvars"
            :prefix="'$pagination-'"
            :color-name="'bgColor'"
            @onCssChange="onCssChange"
          >
            <span class="setting-attribute--title">默认颜色</span>
          </bg-color-area>
        </template>

        <bg-color-area
          class="row-top__dis"
          :model="model.styleModel.cssvars"
          :prefix="'$pagination-'"
          :color-name="'activeBgColor'"
          @onCssChange="onCssChange"
        >
          <span class="setting-attribute--title">{{ model.dataModel.paginationType === 'bullets'?"选中颜色":"颜色" }}</span>
        </bg-color-area>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import SwitchArea from '@comp/form/form-switch'
import BgColorArea from '@comp/background/common-bg-color'
import SizeArea from '@comp/form/form-slider-css'
import FontColor from '@comp/font/font-color'
import EffectSwitch from '@comp/form/form-select-data'
export default {
  components: {
    SwitchArea,
    BgColorArea,
    SizeArea,
    FontColor,
    EffectSwitch
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
    },
    effectList: {
      type: Array,
      default: () => []
    },
    carouselPaginationTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      type: 'pc',
      activeNames: '1'
    }
  },
  computed: {
    indicator: {
      get: function() {
        return this.model.styleModel.cssvars[this.prefix + 'indicator']
      },
      set: function() {}
    }
  },
  created() {
    if (window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    _handleIsShowBullets() {
      var oldData = {}
      var data = {}
      var newVal = this.indicator === 1 ? 0 : 1
      oldData[this.prefix + 'indicator'] = this.indicator
      data[this.prefix + 'indicator'] = newVal
      this.model.styleModel.cssvars['$indicator'] = newVal
      this.onCssChange(oldData, data)
    },
    _getCurrentEquipmentType() {
      const _this = this
      if (window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  .add-minus__icon {
    width: 24px;
    height: 24px;
    background: $--panel-background-color;
    border-radius: 2px;
    cursor: pointer;
    i,
    span {
      font-size: 12px;
      color: $--usual-font-color-main;
    }
    span {
      margin-top: -2px;
      line-height: 1px;
    }
  }
}
</style>
