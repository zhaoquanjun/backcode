<template>
  <ul class="margin-section">
    <li class="top" data-pos="top" :style="{zIndex: topSelectBoxShow ? 99 : 1}">
      <span :class="{colorful: topSelectBoxShow}"></span>
      <b :class="{active: topSelectBoxShow}"></b>
      <el-input-number
        v-model="marginTop"
        controls-position="right"
        :step="1"
        :max="200"
        :min="-200"
        style="width:66px"
        size="small"
        :disabled="marginSetting.marginTopDisabled"
        @focus="_handleTopInputFocus"
        @blur="_handleTopInputBlur"
        @change="_handleChangeTopValue"
      ></el-input-number>
      <ul v-show="topSelectBoxShow" class="top-select__box select-box__area">
        <li
          v-for="(item, index) in marginRange"
          :key="index"
          class="select-box__item"
          :class="{selected: item == marginTop}"
          @mousedown="_handleSelectTopValue(item)"
        >{{ item }}</li>
      </ul>
    </li>
    <li class="right" data-pos="right" :style="{zIndex: rightSelectBoxShow ? 99 : 1}">
      <span :class="{colorful: rightSelectBoxShow}"></span>
      <b :class="{active: rightSelectBoxShow}"></b>
      <el-input-number
        v-model="marginRight"
        controls-position="right"
        :step="1"
        :max="200"
        :min="-200"
        style="width:66px"
        size="small"
        :disabled="marginSetting.marginRightDisabled"
        @focus="_handleRightInputFocus"
        @blur="_handleRightInputBlur"
        @change="_handleChangeRightValue"
      ></el-input-number>
      <ul v-show="rightSelectBoxShow" class="right-select__box select-box__area">
        <li
          v-for="(item, index) in marginRange"
          :key="index"
          class="select-box__item"
          :class="{selected: item == marginRight}"
          @mousedown="_handleSelectRightValue(item)"
        >{{ item }}</li>
      </ul>
    </li>
    <li class="bottom" data-pos="bottom" :style="{zIndex: bottomSelectBoxShow ? 99 : 1}">
      <span :class="{colorful: bottomSelectBoxShow}"></span>
      <b :class="{active: bottomSelectBoxShow}"></b>
      <el-input-number
        v-model="marginBottom"
        controls-position="right"
        :step="1"
        :max="200"
        :min="-200"
        style="width:66px"
        size="small"
        :disabled="marginSetting.marginBottomDisabled"
        @focus="_handleBottomInputFocus"
        @blur="_handleBottomInputBlur"
        @change="_handleChangeBottomValue"
      ></el-input-number>
      <ul v-show="bottomSelectBoxShow" class="bottom-select__box select-box__area">
        <li
          v-for="(item, index) in marginRange"
          :key="index"
          class="select-box__item"
          :class="{selected: item == marginBottom}"
          @mousedown="_handleSelectBottomValue(item)"
        >{{ item }}</li>
      </ul>
    </li>
    <li class="left" data-pos="left" :style="{zIndex: leftSelectBoxShow ? 99 : 1}">
      <span :class="{colorful: leftSelectBoxShow}"></span>
      <b :class="{active: leftSelectBoxShow}"></b>
      <el-input-number
        v-model="marginLeft"
        controls-position="right"
        :step="1"
        :max="200"
        :min="-200"
        style="width:66px"
        size="small"
        :disabled="marginSetting.marginLeftDisabled"
        @focus="_handleLeftInputFocus"
        @blur="_handleLeftInputBlur"
        @change="_handleChangeLeftValue"
      ></el-input-number>
      <ul v-show="leftSelectBoxShow" class="left-select__box select-box__area">
        <li
          v-for="(item, index) in marginRange"
          :key="index"
          class="select-box__item"
          :class="{selected: item == marginLeft}"
          @mousedown="_handleSelectLeftValue(item)"
        >{{ item }}</li>
      </ul>
    </li>
    <li
      v-show="moveIconFlag !== null"
      class="rorate-icon"
      :class="{'icon-left': moveIconFlag == 'left', 'icon-top': moveIconFlag == 'top', 'icon-right': moveIconFlag == 'right', 'icon-bottom': moveIconFlag == 'bottom'}"
    >
      <span></span>
    </li>
    <li class="margin-section-background"></li>
  </ul>
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
    marginSetting: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      show: false,
      drag: false,
      dragStart: 0,
      curValue: 0,
      curWidth: 0,
      curItem: '',
      timer: null,
      marginLeftOld: null,
      marginTopOld: null,
      marginBottomOld: null,
      marginRightOld: null,
      topSelectBoxShow: false,
      bottomSelectBoxShow: false,
      leftSelectBoxShow: false,
      rightSelectBoxShow: false,
      moveIconFlag: null,
      marginRange: [-20, 20, 40, 80, 200]
    }
  },
  computed: {
    marginTop: {
      get: function() {
        return parseInt(this.model[this.prefix + 'marginTop'])
      },
      set: function() {}
    },
    marginRight: {
      get: function() {
        const right =
          this.model[this.prefix + 'marginRight'] == 'auto'
            ? 'auto'
            : parseInt(this.model[this.prefix + 'marginRight'])
        return right
      },
      set: function() {}
    },
    marginBottom: {
      get: function() {
        return parseInt(this.model[this.prefix + 'marginBottom'])
      },
      set: function() {}
    },
    marginLeft: {
      get: function() {
        const left =
          this.model[this.prefix + 'marginLeft'] == 'auto'
            ? 'auto'
            : parseInt(this.model[this.prefix + 'marginLeft'])
        return left
      },
      set: function() {}
    }
  },
  watch: {
    model() {
      this.marginLeftOld = this.model[this.prefix + 'marginLeft']
      this.marginTopOld = this.model[this.prefix + 'marginTop']
      this.marginRightOld = this.model[this.prefix + 'marginRight']
      this.marginBottomOld = this.model[this.prefix + 'marginBottom']
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.marginLeftOld = this.model[this.prefix + 'marginLeft']
      this.marginTopOld = this.model[this.prefix + 'marginTop']
      this.marginRightOld = this.model[this.prefix + 'marginRight']
      this.marginBottomOld = this.model[this.prefix + 'marginBottom']
    })
  },
  methods: {
    _handleTopInputFocus() {
      this.moveIconFlag = 'top'
      this.topSelectBoxShow = true
    },
    _handleTopInputBlur() {
      this.topSelectBoxShow = false
    },
    _handleRightInputFocus() {
      this.moveIconFlag = 'right'
      this.rightSelectBoxShow = true
    },
    _handleRightInputBlur() {
      this.rightSelectBoxShow = false
    },
    _handleBottomInputFocus() {
      this.moveIconFlag = 'bottom'
      this.bottomSelectBoxShow = true
    },
    _handleBottomInputBlur() {
      this.bottomSelectBoxShow = false
    },
    _handleLeftInputFocus() {
      this.moveIconFlag = 'left'
      this.leftSelectBoxShow = true
    },
    _handleLeftInputBlur() {
      this.leftSelectBoxShow = false
    },
    _handleSelectTopValue(val) {
      if (val + 'px' !== this.marginTopOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginTop'] = this.marginTopOld
        data[this.prefix + 'marginTop'] = val + 'px'
        this.model[this.prefix + 'marginTop'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginTopOld = val + 'px'
      }
      this.topSelectBoxShow = false
    },
    _handleSelectRightValue(val) {
      if (val + 'px' !== this.marginRightOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginRight'] = this.marginTopOld
        data[this.prefix + 'marginRight'] = val + 'px'
        this.model[this.prefix + 'marginRight'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginRightOld = val + 'px'
      }
      this.rightSelectBoxShow = false
    },
    _handleSelectBottomValue(val) {
      if (val + 'px' !== this.marginBottomOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginBottom'] = this.marginTopOld
        data[this.prefix + 'marginBottom'] = val + 'px'
        this.model[this.prefix + 'marginBottom'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginBottomOld = val + 'px'
      }
      this.rightSelectBoxShow = false
    },
    _handleSelectLeftValue(val) {
      if (val + 'px' !== this.marginLeftOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginLeft'] = this.marginTopOld
        data[this.prefix + 'marginLeft'] = val + 'px'
        this.model[this.prefix + 'marginLeft'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginLeftOld = val + 'px'
      }
      this.leftSelectBoxShow = false
    },
    _handleChangeTopValue(val) {
      this.model[this.prefix + 'marginTop'] = val
      if (val + 'px' !== this.marginTopOld) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const oldData = {}
          const data = {}
          oldData[this.prefix + 'marginTop'] = this.marginTopOld
          data[this.prefix + 'marginTop'] = val + 'px'
          this.$emit('onCssChange', oldData, data)
          this.marginTopOld = val + 'px'
        })
      }
    },
    _handleChangeRightValue(val) {
      if (val + 'px' !== this.marginRightOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginRight'] = this.marginTopOld
        data[this.prefix + 'marginRight'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginRightOld = val + 'px'
      }
      this.rightSelectBoxShow = false
    },
    _handleChangeBottomValue(val) {
      if (val + 'px' !== this.marginBottomOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginBottom'] = this.marginTopOld
        data[this.prefix + 'marginBottom'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginBottomOld = val + 'px'
      }
    },
    _handleChangeLeftValue(val) {
      if (val + 'px' !== this.marginLeftOld) {
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'marginLeft'] = this.marginTopOld
        data[this.prefix + 'marginLeft'] = val + 'px'
        this.$emit('onCssChange', oldData, data)
        this.marginLeftOld = val + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.margin-section {
  position: relative;
  margin: 64px auto;
  width: 112px;
  height: 112px;
  background: url("~@static/images/margin_circle_bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  li {
    position: absolute;
    span.colorful {
      background: #ff6a00 !important;
    }
    .select-box__area {
      position: absolute;
      width: 67px;
      height: 130px;
      overflow-y: auto;
      box-shadow: 0px 0px 8px 2px rgba(202, 203, 202, 0.52);
      border: 1px solid rgba(201, 217, 220, 1);
      background: #fff;
      li.select-box__item {
        position: static;
        margin: 0 4px;
        padding: 6px;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        &:hover {
          background: #f8fafc;
        }
      }
      li.selected {
        color: #ff6a00;
        background: #f0f3f7;
      }
    }
  }
  li /deep/ .el-input-number {
    span[role="button"] {
      display: none;
    }
    .el-input__inner {
      padding: 0 8px !important;
      border: 1px solid transparent;
      outline: none;
      border-radius: 4px;
      background: #f8fafc;
    }
  }
  li /deep/ .el-input-number .el-input__inner:hover,
  li /deep/ .el-input-number .el-input__inner:focus {
    background: #fff;
  }
  li /deep/ .el-input-number.is-disabled .el-input__inner:hover {
    border-color: transparent;
    background: #f8fafc;
  }
  li.left,
  li.right {
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 32px;
  }
  li.top,
  li.bottom {
    width: 1px;
    height: 7px;
    left: 50%;
    transform: translateX(-50%);
  }
  li.top {
    top: 0;
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -8px;
      transform: translateY(-50%);
      width: 1px;
      height: 7px;
      background: #eaf0f2;
    }
    b {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-bottom: 7px solid #dee8ea;
    }
    .active {
      border-bottom-color: #ff6a00;
    }
    .select-box__area {
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  li.top /deep/ .el-input-number {
    position: absolute;
    top: -52px;
    left: 50%;
    transform: translateX(-50%);
    .el-input__inner {
      text-align: center;
    }
  }
  li.bottom {
    bottom: 0;
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -12px;
      transform: translateY(-50%);
      width: 1px;
      height: 7px;
      background: #eaf0f2;
    }
    b {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-top: 7px solid #dee8ea;
    }
    .active {
      border-top-color: #ff6a00;
    }
    .select-box__area {
      top: 58px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  li.bottom /deep/ .el-input-number {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    .el-input__inner {
      text-align: center;
    }
  }
  li.left {
    left: 0;
    span {
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 7px;
      height: 1px;
      background: #eaf0f2;
    }
    b {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 7px solid #eaf0f2;
    }
    .active {
      border-right-color: #ff6a00;
    }
    .select-box__area {
      top: 38px;
      left: -74px;
    }
  }
  li.left /deep/ .el-input-number {
    position: absolute;
    left: -74px;
    top: 50%;
    transform: translateY(-50%);
    .el-input__inner {
      text-align: right;
    }
  }
  li.right {
    right: 0;
    span {
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 7px;
      height: 1px;
      background: #eaf0f2;
    }
    b {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 7px solid #eaf0f2;
    }
    .active {
      border-left-color: #ff6a00;
    }
    .select-box__area {
      top: 38px;
      right: -74px;
    }
  }
  li.right /deep/ .el-input-number {
    position: absolute;
    right: -74px;
    top: 50%;
    transform: translateY(-50%);
  }
  li.rorate-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    z-index: 9;
    transition: transform 0.3s ease-in-out;
    span {
      position: absolute;
      bottom: -3px;
      left: 30%;
      transform: translateX(-50%);
      width: 41px;
      height: 32px;
      background: url("~@static/images/margin_circle_icon.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
  }
  li.rorate-icon.icon-right {
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  li.rorate-icon.icon-top {
    transform: translate(-50%, -50%) rotate(-180deg);
  }

  li.rorate-icon.icon-left {
    transform: translate(-50%, -50%) rotate(-270deg);
  }

  li.rorate-icon.icon-bottom {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  .margin-section-background{
     display: inline-block;
    width: 62px;
    height: 62px;
    background-color: #ff6a00;
    position: absolute;
    left: 25px;
    top: 25px;
    border-radius: 50%;

  }
}
</style>
