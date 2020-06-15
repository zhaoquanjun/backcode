<template>
  <div class="arrow">
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">分页器</p>
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
    },
    carouselPaginationTypeList: {
      type: Array,
      default: () => []
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
