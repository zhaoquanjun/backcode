<template>
  <div class="font-size__setting" @click.stop>
    <div class="corner"></div>
    <div class="form-slider__section">
      <span class="form-title__area">字号</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueRange: {
        minValue: 12,
        maxValue: 72
      },
      model: {
        fontSize: '14px'
      },
      timer: null
    }
  },
  computed: {
    sliderValue: {
      get: function() {
        return parseInt(this.model['fontSize'])
      },
      set: function() {}
    }
  },
  created() {
    if (window.smSite) {
      const _this = this
      window.smSite.setFontsizeData = function(d) {
        _this.model.fontSize = d
      }
    }
  },
  methods: {
    _handleChangeValue(newVal) {
      this.model['fontSize'] = newVal + 'px'
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (window.smSite) {
          window.smSite.editorSetFontsize(newVal + 'px')
        }
      }, 200)
    },
    _handleInputValue(newVal) {
      this.model['fontSize'] = newVal + 'px'
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
  .slider-area /deep/ .el-slider__runway {
    background-color: $--popup-font-color-sub;
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
    color: $--popup-font-color-sub;
    border-color: $--popup-border-color;
    background: $--popup-background-main;
  }
  &:hover {
    .el-input-number__decrease,
    .el-input-number__increase {
      display: block;
    }
  }
}

.font-size__setting {
  position: absolute;
  top: 38px;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;
  width: 226px;
  height: 40px;
  border-radius: $--border-radius-base;
  background: $--usual-font-color-main;
  box-shadow: $--area-shadow-base;
  .corner {
    position: absolute;
    top: -6px;
    left: 8px;
    width: 0;
    height: 0;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-bottom: 6px solid $--usual-font-color-main;
  }
  .form-slider__section /deep/ .el-slider__button {
    width: 18px;
    height: 18px;
    background-color: $--popup-background-main;
  }
  .form-slider__section /deep/ .el-input__inner {
    height: 32px;
    line-height: 32px;
    color: $--popup-font-color-main;
    border-color: $--popup-border-color;
    background-color:$--popup-background-main;
  }

  .form-slider__section /deep/ .el-input-number {
    span[role='button'] {
      height: 16px !important;
      line-height: 16px !important;
    }
  }

  .form-slider__section /deep/ .slider-area {
    width: 100px;
  }
  .form-title__area {
    min-width: 42px;
  }
}
</style>
