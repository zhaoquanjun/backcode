<template>
  <div>
    <div class="setting-block__section">
      <p class="setting-block--title">箭头</p>
      <switch-area
        :model="model"
        :name="'arrowShow'"
        :prefix="prefix"
      >
        <span class="setting-attribute--title">显示箭头</span>
      </switch-area>
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-block--title">数量图标</p>
      <div class="num-icon__area">
        <p class="setting-attribute--title">显示数量图标</p>
        <div class="add-minus__icon" @click="_handleIsShowBullets">
          <i v-show="indicator == 0" class="iconfont iconicon-add"></i>
          <span v-show="indicator == 1">-</span>
        </div>
      </div>
      <bg-color-area
        class="tow-rop__dis"
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :color-name="'bulletColor'"
      >
        <span class="setting-attribute--title">图标</span>
      </bg-color-area>
      <bg-color-area
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="prefix"
        :color-name="'bulletActiveColor'"
      >
        <span class="setting-attribute--title">选中图标</span>
      </bg-color-area>
    </div>
  </div>
</template>

<script>
import SwitchArea from '@comp/form/form-switch'
import BgColorArea from '@comp/background/common-bg-color'
export default {
  components: {
    SwitchArea,
    BgColorArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
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
    }
  }
}
</script>
