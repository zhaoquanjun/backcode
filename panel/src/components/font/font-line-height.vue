<template>
  <div class="form-slider__section flex-between-center--area">
    <slot></slot>
    <el-slider v-model="sliderValue"
               class="slider-area"
               :step="0.1"
               :min="valueRange.minValue"
               :max="valueRange.maxValue"
               :show-tooltip="false"
               @change="_handleChangeValue" />
    <el-input-number v-model="inputValue"
                     class="slider-input-number"
                     controls-position="right"
                     size="small"
                     :precision="1"
                     :step="0.1"
                     :min="valueRange.minValue"
                     :max="valueRange.maxValue"
                     @change="_handleChangeValue"></el-input-number>
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
    name: {
      type: String
    }
  },
  data () {
    return {
      timer: null,
      oldValue: null,
      valueRange: {
        minValue: 1,
        maxValue: 3
      }
    }
  },
  computed: {
    inputValue: {
      get: function() {
        const size = this.model[this.prefix + this.name]
        return parseFloat(size,1)
      },
      set: function(newVal) {
        this.model[this.prefix + this.name] = (newVal < this.valueRange.minValue ? this.valueRange.minValue : newVal)
      }
    },
    sliderValue: {
      get: function() {
        const size = this.model[this.prefix + this.name]
        return parseFloat(size,1)
      },
      set: function(newVal) {
        this.model[this.prefix + this.name] = (newVal === this.valueRange.minValue ? newVal - 1 : newVal)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.oldValue = this.model[this.prefix + this.name]
    })
  },
  methods: {
    _handleChangeValue (newVal) {
      const oldVal = this.oldValue || this.model[this.prefix + this.name]
      newVal = parseFloat(newVal,1) || this.valueRange.minValue
      this.model[this.prefix + this.name] = newVal
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const oldData = {}
        const data = {}
        oldData[this.prefix + this.name] = oldVal
        data[this.prefix + this.name] = newVal
        this.onCssChange(oldData,data)
        this.onDataChange('changeLineHeight',oldData,data)
        this.oldValue = newVal

        if(newVal === this.valueRange.minValue && parseFloat(this.oldValue,1) === newVal) {
          this.model[this.prefix + this.name] = (newVal - 1)
        }
      },200)
    },
    onDataChange (action,oldData,data,type) {
      if(window.smSite) {
        window.smSite.onDataChange(action,oldData,data)
      }
    },
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-slider__section {
  .slider-area {
    width: 130px;
    padding-right: 18px;
  }
  .slider-input-number {
    width: 60px;
  }
}
</style>
