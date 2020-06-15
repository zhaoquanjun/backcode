<template>
  <div>
    <div class="add-icon__area">
      <div class="setting-attribute--title">图标</div>
      <div class="icon-container">
        <div v-show="icon" class="icon-show" @click="_handleAddButtonIcon">
          <i class="iconfont" :class="icon" :style="{ color: color }"></i>
        </div>
        <div v-show="!icon" class="add-icon" @click="_handleAddButtonIcon">
          +
        </div>
      </div>
    </div>
    <icon
      :icon="icon"
      :icon-popup-flag="iconPopupFlag"
      @handleClosePopup="_handleClosePopup"
      @handleChooseIcon="_handleChooseIcon"
    />
  </div>
</template>

<script>
import Icon from '@comp/iconSelect/icon'
export default {
  components: {
    Icon
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconPopupFlag: false
    }
  },
  computed: {
    icon: {
      get: function() {
        return this.value['icon']
      },
      set: function() {}
    },
    color: {
      get: function() {
        return this.model.styleModel.cssvars[this.prefix]
      },
      set: function() {}
    }
  },
  methods: {
    _handleAddButtonIcon() {
      this.iconPopupFlag = true
    },
    _handleMinusButtonIcon() {
      const oldVal = this.value['icon']
      const oldData = {}
      const data = {}
      oldData['icon'] = oldVal
      data['icon'] = ''
      this.value['icon'] = ''
      oldData['iconDisplay'] = 'block'
      data['iconDisplay'] = 'none'
      this.onIconChange('none')
      this.onDataChange('changeIconDisplay', oldData, data)
    },
    _handleClosePopup() {
      this.iconPopupFlag = false
    },
    _handleChooseIcon(val) {
      const oldVal = this.value['icon']
      if (val !== oldVal) {
        this.value['icon'] = val
        const oldData = {}
        const data = {}
        oldData['icon'] = oldVal
        data['icon'] = val
        oldData['iconDisplay'] = 'none'
        data['iconDisplay'] = 'block'
        this.onIconChange('block')
        this.onDataChange('changeIconDisplay', oldData, data)
        this.iconPopupFlag = false
      }
    },
    onIconChange(showIcon) {
      const oldData = {}
      const data = {}
      oldData[this.prefix + 'icon-show'] = this.model.styleModel.cssvars[
        this.prefix + 'icon-show'
      ]
      data[this.prefix + 'icon-show'] = showIcon
      this.model.styleModel.cssvars[this.prefix + 'icon-show'] = showIcon
      this.onCssChange(oldData, data)
    },
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

<style lang="scss" scoped></style>
