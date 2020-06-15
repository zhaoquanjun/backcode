<template>
  <div>
    <button-font
      :model="model.styleModel.cssvars"
      :prefix="prefix"
      :font-range="fontRange.productfs"
    />
    <AddIcon :value="value" :model="model" :prefix="prefix" />
  </div>
</template>
<script>
import AddIcon from '@comp/iconSelect/addIcon'
import ButtonFont from '@comp/font/font-group/font-style4'
export default {
  components: {
    ButtonFont,
    AddIcon
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
    },
    fontRange: {
      type: Object,
      default: () => ({})
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
    _handleClosePopup(msg) {
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
