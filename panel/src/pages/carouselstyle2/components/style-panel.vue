<template>
  <div class="arrow">
    <div class="setting-block__section" v-show="type == 'pc'">
      <p class="setting-block--title">箭头</p>
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
    </div>
    <div
      class="setting-block__section setting-block__top"
      v-show="type == 'pc'"
    >
      <p class="setting-block--title">数量图标</p>
      <bg-color-area
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$pagination-'"
        :color-name="'bgColor'"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">遮罩颜色</span>
      </bg-color-area>
    </div>
  </div>
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
      type: 'pc'
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
