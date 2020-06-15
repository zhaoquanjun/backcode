<template>
  <div>
    <div v-show="type === 'phone'" :data-type="type" class="setting-block__section">
      <p class="setting-attribute--title">移动端排列</p>
      <set-columns-mobile-pos class="row-top__dis" :model="model.data.dataModel"></set-columns-mobile-pos>
    </div>
    <div v-show="type === 'pc'" :data-type="type" class="setting-block__section">
      <p class="setting-block--title">布局设置</p>
      <p class="setting-attribute--title">电脑端排列</p>
      <set-columns-num :id="model.data.controlId" class="row-top__dis" :model="model.data.dataModel" @onDataChange="onDataChange" />
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-attribute--title">比例设置</p>
      <customize
        class="row-top__dis"
        :customize="model.data.dataModel.childArea"
        @onDataChange="onDataChange"
      />
    </div>
    <div class="setting-block__section setting-block__top">
      <p class="setting-attribute--title">栏目设置</p>
      <set-columns-pos class="row-top__dis" :model="model.data" @onDataChange="onDataChange"></set-columns-pos>
    </div>
  </div>
</template>

<script>
import Customize from '@comp/layout/customize'
import SetColumnsNum from '@comp/layout/set-columns-num'
import SetColumnsPos from '@comp/layout/set-columns-pos'
import SetColumnsMobilePos from '@comp/data/set-columns-mobile-pos'
export default {
  components: {
    Customize,
    SetColumnsNum,
    SetColumnsPos,
    SetColumnsMobilePos
  },
  props: {
    model: {
      type: Object
    },
    customize: {
      type: Object
    }
  },
  data() {
    return {
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
    onDataChange(action, oldData, data) {
      if (window.smSite.onDataChange) {
        window.smSite.onDataChange(action, oldData, data)
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
