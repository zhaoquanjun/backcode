<template>
  <div class="form-slider__section">
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
      v-model="sliderValue"
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
    valueRange: {
      type: Object
    },
    name: {
      type: String
    },
    actionKey: {
      type: String,
      default: () => {
        return null
      }
    },
    eventName: {
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
        return parseInt(this.model[this.name])
      },
      set: function(newVal) {
        this.model[this.name] = newVal
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oldValue = parseInt(this.model[this.name])
    })
  },
  methods: {
    _handleChangeValue(newVal) {
      const oldVal = this.oldValue || parseInt(this.model[this.name])
      this.model[this.name] = newVal
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (newVal !== oldVal) {
          const oldData = {}
          const data = {}
          oldData[this.name] = oldVal
          data[this.name] = newVal
          this.oldValue = newVal
          this._playEvents(oldData, data)
        }
      }, 200)
    },
    _playEvents(oldData, data) {
      if (this.eventName === 'onQueryDataChange') {
        this.onQueryDataChange(this.actionKey, oldData, data)
      }
      if (this.eventName === 'onDataChange') {
        this.onDataChange(this.actionKey, oldData, data)
      }
      if (this.eventName === 'onCssChange') {
        this.onCssChange(this.actionKey, oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    onQueryDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onQueryDataChange(action, oldData, data)
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
