<template>
  <div class="form-slider__section flex-between-center--area">
    <slot></slot>
    <el-slider
      v-model="sliderValue"
      class="slider-area"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      :show-tooltip="false"
      @change="_handleChangeValue"
    />
    <el-input-number
      v-model="inputValue"
      class="slider-input-number"
      controls-position="right"
      size="small"
      :precision="0"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      @change="_handleChangeValue"
    ></el-input-number>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    valueRange: {
      type: Object
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      timer: null,
      oldValue: null
    }
  },
  computed: {
    inputValue: {
      get: function() {
        const size = this.model[this.prefix + this.name]
        return parseInt(size)
      },
      set: function(newVal) {
        this.model[this.prefix + this.name] =
          (newVal < this.valueRange.minValue
            ? this.valueRange.minValue
            : newVal) + 'px'
      }
    },
    sliderValue: {
      get: function() {
        const size = this.model[this.prefix + this.name]
        return parseInt(size)
      },
      set: function(newVal) {
        this.model[this.prefix + this.name] =
          (newVal === this.valueRange.minValue ? newVal - 1 : newVal) + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oldValue = this.model[this.prefix + this.name]
    })
  },
  methods: {
    _handleChangeValue(newVal) {
      const oldVal = this.oldValue || this.model[this.prefix + this.name]
      newVal = Math.round(newVal) || this.valueRange.minValue
      this.model[this.prefix + this.name] = newVal + 'px'
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const oldData = {}
        const data = {}
        oldData[this.prefix + this.name] = oldVal
        data[this.prefix + this.name] = newVal + 'px'
        this.onCssChange(oldData, data)
        this.oldValue = newVal + 'px'

        if (
          newVal === this.valueRange.minValue &&
          parseInt(this.oldValue) === newVal
        ) {
          this.model[this.prefix + this.name] = newVal - 1 + 'px'
        }
      }, 200)
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
.form-slider__section {
  .form-title__area {
    display: inline-block;
    min-width: 50px;
    padding-right: 12px;
    font-size: 14px;
    line-height: 20px;
    color: $--usual-font-color-main;
  }
  .slider-area {
    width: 115px;
    padding-right: 18px;
  }
  .slider-input-number {
    width: 60px;
  }
}
.form-slider__section /deep/ .el-input-number--small {
  .el-input-number__decrease,
  .el-input-number__increase {
    width: 20px;
    line-height: 20px;
  }
  &:hover {
    .el-input-number__decrease,
    .el-input-number__increase {
      display: block;
    }
  }
}
</style>
