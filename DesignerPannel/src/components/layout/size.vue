<template>
  <div class="size-section flex-between-center--area">
    <div class="size-section__width flex-between-center--area">
      宽
      <el-input
        v-model="widthValue"
        size="small"
        placeholder="自适应"
        :disabled="sizeSetting.widthDisabled"
        @input="_handleWidthInputChange"
        @blur="_handleWidthInputBlur"
        @focus="_handleWidthInputFocus"
      ></el-input>
      <div v-show="widthAutoShow" class="div-select" @mousedown="_handleWidthValueSelect">自适应</div>
    </div>
    <div class="size-section__height flex-between-center--area">
      高
      <el-input
        v-model="heightValue"
        size="small"
        placeholder="自适应"
        :disabled="sizeSetting.heightDisabled"
        @input="_handleHeightInputChange"
        @blur="_handleHeightInputBlur"
        @focus="_handleHeightInputFocus"
      ></el-input>
      <div v-show="heightAutoShow" class="div-select" @mousedown="_handleHeightValueSelect">自适应</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    sizeSetting: {
      type: Object
    },
    valueRange: {
      type: Object,
      default: () => {
        return {
          minValue: 0,
          maxValue: 2560
        }
      }
    }
  },
  data() {
    return {
      widthValue: 0,
      heightValue: 0,
      widthAutoShow: false,
      heightAutoShow: false,
      timer: function() {}
    }
  },
  computed: {
    width: {
      get: function() {
        if (this.sizeSetting.widthDisabled) return ''
        const width =
          this.model[this.prefix + 'width'] === 'auto'
            ? ''
            : parseInt(this.model[this.prefix + 'width'])
        return width
      },
      set: function() {}
    },
    height: {
      get: function() {
        if (this.sizeSetting.heightDisabled) return ''
        const height =
          this.model[this.prefix + 'height'] === 'auto'
            ? ''
            : parseInt(this.model[this.prefix + 'height'])
        return height
      },
      set: function() {}
    }
  },
  watch: {
    width() {
      this.widthValue = this.width
    },
    height() {
      this.heightValue = this.height
    }
  },
  created() {
    this.widthValue = this.width
    this.heightValue = this.height
  },
  methods: {
    _handleWidthInputChange(val) {
      this.widthValue = val
      if (this.timer) clearTimeout(this.timer)
      setTimeout(() => {
        if (/^\d+$/.test(this.widthValue) || this.widthValue === '') {
          const oldValue = this.model[this.prefix + 'width']
          const newVal =
            this.widthValue === '' ? 'auto' : parseInt(this.widthValue) + 'px'
          this._handleChangeValue(oldValue, newVal, 'width')
        } else {
          this.widthValue = this.width
          return false
        }
      }, 1000)
    },
    _handleWidthValueSelect() {
      this.widthValue = ''
      this.widthAutoShow = false
      const newVal = 'auto'
      const oldValue = this.model[this.prefix + 'width']
      this._handleChangeValue(oldValue, newVal, 'width')
    },
    _handleWidthInputBlur() {
      this.widthAutoShow = false
    },
    _handleWidthInputFocus() {
      this.widthAutoShow = true
    },
    _handleHeightInputChange(val) {
      this.heightValue = val
      if (this.timer) clearTimeout(this.timer)
      setTimeout(() => {
        if (/^\d+$/.test(this.heightValue) || this.heightValue === '') {
          const oldValue = this.model[this.prefix + 'height']
          let newVal = null
          if (this.heightValue === '' || parseInt(this.heightValue) < this.valueRange.minValue) {
            newVal = this.valueRange.minValue + 'px'
          } else if (parseInt(this.heightValue) > this.valueRange.maxValue) {
            newVal = this.valueRange.maxValue + 'px'
          } else {
            newVal = parseInt(this.heightValue) + 'px'
          }
          this.heightValue = parseInt(newVal)
          this._handleChangeValue(oldValue, newVal, 'height')
        } else {
          this.heightValue = this.width
          return false
        }
      }, 1000)
    },
    _handleHeightValueSelect() {
      this.heightAutoShow = false
      this.heightValue = ''
      const newVal = 'auto'
      const oldValue = this.model[this.prefix + 'height']
      this._handleChangeValue(oldValue, newVal, 'height')
    },
    _handleHeightInputBlur() {
      this.heightAutoShow = false
    },
    _handleHeightInputFocus() {
      if (this.valueRange.minValue || this.valueRange.maxValue) return
      this.heightAutoShow = true
    },
    _handleChangeValue(oldValue, newVal, key) {
      if (oldValue !== newVal) {
        const oldData = {}
        const data = {}
        this.model[this.prefix + key] = newVal
        oldData[this.prefix + key] = oldValue
        data[this.prefix + key] = newVal
        this.onCssChange(oldData, data)
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
.size-section {
  div.size-section__width,
  div.size-section__height {
    position: relative;
    font-size: $--font-size-small;
    color: $--usual-font-color-main;
    .div-select {
      position: absolute;
      right: 12px;
      bottom: -27px;
      font-size: 12px;
      color: $--usual-font-color-main;
      width: 60px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      cursor: pointer;
      background: $--panel-background-color;
      box-shadow: $--area-shadow-base;
      border-radius: $--border-radius-base;
      border: 1px solid $--usual-border-color;
      &:hover {
        color: $--font-color-hover;
      }
    }
  }
}
.size-section /deep/ .el-input--small {
  margin: 0 12px;
  width: 60px;
}
.size-section /deep/ .el-input__inner {
  padding-left: 8px !important;
  padding-right: 8px !important;
  text-align: left;
  cursor: auto;
}
</style>
