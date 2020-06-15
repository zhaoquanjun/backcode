<template>
  <div class="border-section">
    <!-- 颜色 begin -->
    <border-color style="margin-top: 0;"
                  :model="model"
                  :width="232"
                  :prefix="prefix"
                  class="border-padding">颜色</border-color>
    <!-- 颜色 end -->

    <!-- 线宽 begin -->
    <div class="form-slider__section flex-between-center--area">
      <span class="form-title__area">线宽</span>
      <el-slider v-model="sliderValue"
                 class="slider-area"
                 :min="fontRange.productlistbw.minValue"
                 :max="fontRange.productlistbw.maxValue"
                 :show-tooltip="false"
                 @input="_handleInputValue"
                 @change="_handleChangeValue" />
      <el-input-number v-model="sliderValue"
                       class="slider-input-number"
                       controls-position="right"
                       size="small"
                       :min="fontRange.productlistbw.minValue"
                       :max="fontRange.productlistbw.maxValue"
                       @change="_handleChangeValue"></el-input-number>
    </div>
    <!-- 线宽 end -->
  </div>
</template>
<script>
import BorderColor from '@comp/border/border-color'
export default {
  name: 'Border',
  components: {BorderColor},
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    },
    name: {
      type: String,
      default: 'bdWidth'
    }
  },
  data () {
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
  mounted () {
    this.$nextTick(() => {
      this.oldValue = this.model[this.prefix + this.name]
    })
  },
  methods: {
    _handleChangeValue (newVal) {
      const oldVal = this.oldValue || this.model[this.prefix + this.name]
      if(newVal + 'px' !== oldVal) {
        this.model[this.prefix + this.name] = newVal + 'px'
        clearTimeout(this.timer)
        const _this = this
        this.timer = setTimeout(() => {
          const oldData = {}
          const data = {}
          oldData[this.prefix + this.name] = oldVal
          data[this.prefix + this.name] = newVal + 'px'
          _this.onCssChange(oldData,data)
          this.onDataChange('changeBorderWidth',oldData,data)
          _this.oldValue = newVal + 'px'
        },200)
      }
    },
    _handleInputValue (newVal) {
      this.model[this.prefix + this.name] = newVal + 'px'
    },
    onDataChange (action,oldData,data) {
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
  margin-top: 16px;
  .form-title__area {
    display: inline-block;
    min-width: 50px;
    padding-right: 12px;
    font-size: 12px;
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

