<template>
  <div class="animate-slider__section flex-start-center--area">
    <slot></slot>
    <el-slider
      v-model="sliderValue"
      class="slider-area"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      :show-tooltip="false"
      :step="0.1"
      @input="_handleInputValue"
      @change="_handleChangeValue"
    />
    <el-input-number
      v-model="sliderValue"
      class="slider-input-number"
      controls-position="right"
      size="small"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      :step="0.1"
      @change="_handleChangeValue"
    ></el-input-number>
  </div>
</template>
<script>
import animateRange from '@/config/controlValueLimit.config.js'
export default {
  props: {
    model: {
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
    sliderValue: {
      get: function() {
        const value = this.model[this.name]
          ? this.model[this.name]
          : animateRange.animateRange[this.name].minValue
        return value
      },
      set: function() {}
    },
    valueRange: {
      get: function() {
        return animateRange.animateRange[this.name]
      }
    }
  },
  methods: {
    _handleChangeValue(newVal) {
      const newValue = newVal * 1000
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const oldData = {}
        const data = {}
        oldData[this.name] = this.oldValue
        data[this.name] = newValue
        this.model[this.name] = newVal
        this.sliderValue = newValue
        this.$emit('onDataChange', 'animate', oldData, data)
        this.oldValue = null
      }, 200)
    },
    _handleInputValue(newVal) {
      this.model[this.name] = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.animate-slider__section {
  padding: 0 24px;
  .slider-area {
    width: 110px;
    padding: 0 8px;
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
