<template>
  <div class="form-slider__section">
    <slot></slot>
    <el-slider
      v-model="sliderValue"
      class="slider-area"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      :show-tooltip="false"
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
    sliderValue: {
      get: function() {
        return parseInt(this.model[this.prefix + this.name])
      },
      set: function() {}
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
      if (newVal + '%' !== oldVal) {
        this.model[this.prefix + this.name] = newVal + '%'
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const oldData = {}

          const data = {}
          oldData[this.prefix + this.name] = oldVal
          data[this.prefix + this.name] = newVal + '%'
          this.onCssChange(oldData, data)
          this.oldValue = newVal + '%'
        }, 200)
      }
    },
    _handleInputValue(newVal) {
      this.model[this.prefix + this.name] = newVal + '%'
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
        // 多栏容器切换间隔刷新间隔线位置
        this.$emit('changeSpace')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-slider__section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .section-title {
    display: inline-block;
    min-width: 50px;
    padding-right: 12px;
    font-size: 14px;
    line-height: 20px;
  }
  .slider-area {
    width: 130px;
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
