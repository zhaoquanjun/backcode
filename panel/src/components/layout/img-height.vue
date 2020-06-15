<template>
  <div class="img-height__section flex-start-center--area">
    <slot></slot>
    <el-slider
      v-model="sliderValue"
      class="slider-area"
      :show-tooltip="false"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      @input="_handleInputValue"
      @change="_handleChangeValue"
    />
    <span class="input-area">
      <el-input
        v-model="inputValue"
        placeholder="自适应"
        class="slider-input"
        size="small"
        :min="valueRange.minValue"
        :max="valueRange.maxValue"
        @input="_handleChangeValue"
      ></el-input>
    </span>
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
      timer: function() {},
      oldValue: null
    }
  },
  computed: {
    inputValue: {
      get: function() {
        return this.model[this.prefix + this.name] === 'auto' ||
          this.model[this.prefix + this.name] === '' ||
          this.model[this.prefix + this.name] === '0px'
          ? ''
          : parseInt(this.model[this.prefix + this.name])
      },
      set: function() {}
    },
    sliderValue: {
      get: function() {
        return this.model[this.prefix + this.name] === 'auto' ||
          this.model[this.prefix + this.name] === '' ||
          this.model[this.prefix + this.name] === '0px'
          ? ''
          : parseInt(this.model[this.prefix + this.name])
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
    _handleChangeValue(val) {
      if (/^\d+$/.test(val) || val === '') {
        const oldVal = this.oldValue || this.model[this.prefix + this.name]
        if (val !== oldVal) {
          this.model[this.prefix + this.name] = val
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            let newValue = val + 'px'
            if (val === '') {
              newValue = 'auto'
            } else {
              if (parseInt(val) < this.valueRange.minValue) {
                newValue = this.valueRange.minValue + 'px'
              }
              if (parseInt(val) > this.valueRange.maxValue) {
                newValue = this.valueRange.maxValue + 'px'
              }
            }
            this.model[this.prefix + this.name] = newValue
            const oldData = {}

            const data = {}
            oldData[this.prefix + this.name] = oldVal
            data[this.prefix + this.name] = newValue
            this.onCssChange(oldData, data)
            this.oldValue = newValue
          }, 1000)
        }
      }
    },
    _handleInputValue(newVal) {
      this.model[this.prefix + this.name] = newVal + 'px'
    },
    formatString(val) {
      return val === '' ? 0 : val
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
.input-area /deep/ .el-input__inner {
  padding: 0;
  text-align: center;
}
.img-height__section {
  .slider-area {
    width: 130px;
    padding-right: 18px;
  }

  .input-area {
    position: relative;
    .slider-input {
      width: 60px;
    }
    .div-select {
      position: absolute;
      right: 0px;
      bottom: -32px;
      font-size: 12px;
      color: #262626;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
      border-radius: 2px;
      border: 1px solid rgba(225, 236, 239, 1);
      &:hover {
        color: #fff;
        background: #00c1de;
      }
    }
  }
}
</style>
