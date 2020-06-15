<template>
  <wrapper :top="32">
    <template slot="tab">
      <header-area :control-name="controlName"></header-area>
    </template>
    <div v-show="type === 'pc'" class="setting-block__section distance-top">
      <div class="setting-area__title setting-block--title">电脑端尺寸</div>
      <size
        :model="model.data.styleModel.cssvars"
        :prefix="prefix"
        :value-range="fontRange.whitespace"
        :size-setting="sizeSetting"
        @onCssChange="onCssChange"
      />
    </div>
    <div v-show="type === 'phone'" class="setting-block__section distance-top">
      <div class="setting-area__title setting-block--title">移动端尺寸</div>
      <size
        :model="model.data.styleModel.cssvars"
        :prefix="'$m_'"
        :value-range="fontRange.whitespace"
        :size-setting="sizeSetting"
        @onCssChange="onCssChange"
      />
    </div>
  </wrapper>
</template>

<script>
import Wrapper from '@comp/wrapper/wrap'
import Size from '@comp/layout/size'
import HeaderArea from '@comp/tab/header'
import modelData from './data.js'
import controlValueLimit from '@/config/controlValueLimit.config.js'
export default {
  name: 'Whitespace',
  components: {
    Wrapper,
    Size,
    HeaderArea
  },
  data() {
    return {
      controlName: '占位符',
      model: modelData,
      prefix: '$',
      fontRange: controlValueLimit.fontRange,
      sizeSetting: controlValueLimit.sizeSetting.whitespace,
      type: 'pc'
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
.distance-top {
  margin-top: 32px;
}
</style>
