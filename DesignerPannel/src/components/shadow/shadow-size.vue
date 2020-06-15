<template>
  <div class="direction">
    <span class="title">大小</span>
    <el-slider
      v-model="size"
      style="width: 100px;"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      :show-tooltip="false"
      @input="_handleInputSize"
      @change="_handleChangeSize"
    />
    <el-input-number
      v-model="size"
      size="small"
      controls-position="right"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      style="max-width: 95px;"
      @change="_handleChangeSize"
    />
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
    valueRange: {
      type: Object
    }
  },
  data() {
    return {
      timer: null,
      oldValue: null
    }
  },
  computed: {
    size: {
      get: function() {
        return parseInt(this.model[this.prefix + 'shadowSize'])
      },
      set: function() {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oldValue = this.model[this.prefix + 'shadowSize']
    })
  },
  methods: {
    _handleChangeSize(newVal) {
      const oldValue = this.oldValue || this.model[this.prefix + 'shadowSize']
      this.model[this.prefix + 'shadowSize'] = newVal + 'px'
      this._handleChangeRadius(newVal, oldValue)
    },
    _handleChangeRadius(newVal, oldValue) {
      const data = {}
      const oldData = {}
      const radius = parseInt(this.model[this.prefix + 'shdowRadius'])
      const angle = Math.sin((radius * Math.PI) / 180)
      let x, y
      if (radius > 180) {
        x = parseInt(newVal) * angle
      } else {
        x = -parseInt(newVal) * angle
      }
      if (radius > 90 && radius < 270) {
        y = -parseInt(newVal) * angle
      } else {
        y = parseInt(newVal) * angle
      }
      const oldX = this.model[this.prefix + 'shadowHorizontal']
      const oldY = this.model[this.prefix + 'shadowVertical']

      if (oldValue !== newVal + 'px') {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          oldData[this.prefix + 'shadowHorizontal'] = oldX
          oldData[this.prefix + 'shadowVertical'] = oldY
          oldData[this.prefix + 'shadowSize'] = oldValue
          data[this.prefix + 'shadowHorizontal'] = x + 'px'
          data[this.prefix + 'shadowVertical'] = y + 'px'
          data[this.prefix + 'shadowSize'] = newVal + 'px'
          this.model[this.prefix + 'shadowHorizontal'] = x + 'px'
          this.model[this.prefix + 'shadowVertical'] = y + 'px'
          this.model[this.prefix + 'shadowSize'] = newVal + 'px'
          this.$emit('onCssChange', oldData, data)
        }, 200)
      }
    },
    _handleInputSize(newVal) {
      this.model[this.prefix + 'shadowSize'] = newVal + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.direction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 40px;
  }
}
.direction .el-input-number--small {
  width: 48px;
}
</style>
