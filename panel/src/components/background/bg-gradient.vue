<template>
  <div class="gradient-area">
    <div class="section-title setting-block--title">渐变</div>
    <ul class="bg-gradient flex-start-center--area">
      <li class="title setting-attribute--title">颜色</li>
      <li class="start">
        <el-color-picker
          v-model="gradientStartColor"
          size="small"
          :style="{
            border:
              gradientStartColor == 'rgba(255, 255, 255, 1)'
                ? '1px solid #ccc'
                : 'none'
          }"
          show-alpha
          :predefine="predefineColors"
        ></el-color-picker>
      </li>
      <li class="arrow"></li>
      <li class="end">
        <el-color-picker
          v-model="gradientEndColor"
          size="small"
          :style="{
            border:
              gradientEndColor == 'rgba(255, 255, 255, 1)'
                ? '1px solid #ccc'
                : 'none'
          }"
          show-alpha
          :predefine="predefineColors"
        ></el-color-picker>
      </li>
    </ul>
    <ul class="bg-violet flex-start-center--area">
      <li class="title setting-attribute--title">角度</li>
      <li class="radius flex-start-center--area">
        <span
          class="deg-rotate"
          @mousedown="_handleRotateMousedown"
          @mousemove="_handleRotateMousemove($event)"
          @mouseleave.prevent="_handleRotateMouseleave()"
          @mouseup="_handleRotateMouseup"
        >
          <span
            class="value-box"
            :style="{ transform: `rotate(${violet}deg)` }"
          >
            <span class="rotate-value"></span>
          </span>
        </span>
        <span class="deg-num">
          <el-input-number
            v-model="violet"
            controls-position="right"
            :min="0"
            :max="360"
            size="small"
          ></el-input-number>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    activeName: {
      type: String
    }
  },
  data() {
    return {
      mouseFlag: false,
      timer: null,
      oldStartColor: '',
      oldEndColor: ''
    }
  },
  computed: {
    gradientStartColor: {
      get: function() {
        const color =
          this.model[this.prefix + 'gradientstartcolor'] === 'none'
            ? null
            : this.model[this.prefix + 'gradientstartcolor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'gradientstartcolor']

        const bgEndColor =
          this.oldEndColor || this.model[this.prefix + 'gradientendcolor']
        const curBgEndColor = this.model[this.prefix + 'gradientendcolor']
        this.oldStartColor = this.model[this.prefix + 'gradientstartcolor']
        this.model[this.prefix + 'gradientstartcolor'] = newVal
        if (
          oldValue !== newVal &&
          curBgEndColor !== 'none' &&
          this.activeName === '2'
        ) {
          this.model[this.prefix + 'bgColor'] = 'transparent'
          this.model[this.prefix + 'bgImage'] = ''
          this.model[this.prefix + 'bgPosition'] = '50% 50%'
          this.model[this.prefix + 'bgSize'] = 'cover'
          var data = {}
          var oldData = {}
          data[this.prefix + 'gradientstartcolor'] = newVal
          data[this.prefix + 'gradientendcolor'] = curBgEndColor
          data[this.prefix + 'bgColor'] = 'transparent'
          data[this.prefix + 'bgImage'] = ''
          data[this.prefix + 'bgPosition'] = '50% 50%'
          data[this.prefix + 'bgSize'] = 'cover'
          oldData[this.prefix + 'gradientstartcolor'] = oldValue
          oldData[this.prefix + 'gradientendcolor'] = bgEndColor
          oldData[this.prefix + 'bgColor'] = this.model[this.prefix + 'bgColor']
          oldData[this.prefix + 'bgImage'] = this.model[this.prefix + 'bgImage']
          oldData[this.prefix + 'bgPosition'] = this.model[
            this.prefix + 'bgPosition'
          ]
          oldData[this.prefix + 'bgSize'] = this.model[this.prefix + 'size']
          this.onCssChange(oldData, data)
        }
      }
    },
    gradientEndColor: {
      get: function() {
        const color =
          this.model[this.prefix + 'gradientendcolor'] === 'none'
            ? null
            : this.model[this.prefix + 'gradientendcolor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'gradientendcolor']
        const oldBgColor = this.model[this.prefix + 'bgColor']
        const oldBgImg = this.model[this.prefix + 'bgImage']
        const oldBgPos = this.model[this.prefix + 'bgPosition']
        const oldSize = this.model[this.prefix + 'bgSize']

        const bgStartColor =
          this.oldStartColor || this.model[this.prefix + 'gradientstartcolor']
        const curBgStartColor = this.model[this.prefix + 'gradientstartcolor']
        this.oldEndColor = this.model[this.prefix + 'gradientendcolor']
        this.model[this.prefix + 'gradientendcolor'] = newVal
        if (
          oldValue !== newVal &&
          curBgStartColor !== 'none' &&
          this.activeName === '2'
        ) {
          this.model[this.prefix + 'bgColor'] = 'transparent'
          this.model[this.prefix + 'bgImage'] = ''
          this.model[this.prefix + 'bgPosition'] = '50% 50%'
          this.model[this.prefix + 'size'] = 'cover'
          const data = {}
          const oldData = {}
          data[this.prefix + 'gradientendcolor'] = newVal
          data[this.prefix + 'gradientstartcolor'] = curBgStartColor
          data[this.prefix + 'bgColor'] = 'transparent'
          data[this.prefix + 'bgImage'] = ''
          data[this.prefix + 'bgPosition'] = '50% 50%'
          data[this.prefix + 'bgSize'] = 'cover'
          oldData[this.prefix + 'gradientendcolor'] = oldValue
          oldData[this.prefix + 'gradientstartcolor'] = bgStartColor
          oldData[this.prefix + 'bgColor'] = oldBgColor
          oldData[this.prefix + 'bgImage'] = oldBgImg
          oldData[this.prefix + 'bgPosition'] = oldBgPos
          oldData[this.prefix + 'bgSize'] = oldSize
          this.onCssChange(oldData, data)
        }
      }
    },
    violet: {
      get: function() {
        const _violet = isNaN(parseInt(this.model[this.prefix + 'violet']))
          ? ''
          : parseInt(this.model[this.prefix + 'violet'])
        return _violet
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'violet']
        const oldBgColor = this.model[this.prefix + 'bgColor']
        const oldBgImg = this.model[this.prefix + 'bgImage']
        const oldBgPos = this.model[this.prefix + 'bgPosition']
        const oldSize = this.model[this.prefix + 'bgSize']

        const bgStartColor = this.model[this.prefix + 'gradientstartcolor']
        const bgEndColor = this.model[this.prefix + 'gradientendcolor']
        this.model[this.prefix + 'violet'] = newVal + 'deg'
        if (
          oldValue !== newVal + 'deg' &&
          bgStartColor !== 'none' &&
          bgEndColor !== 'none' &&
          this.activeName === '2'
        ) {
          this.model[this.prefix + 'bgColor'] = 'transparent'
          this.model[this.prefix + 'bgImage'] = ''
          this.model[this.prefix + 'bgPosition'] = '50% 50%'
          this.model[this.prefix + 'size'] = 'cover'
          const data = {}
          const oldData = {}
          data[this.prefix + 'violet'] =
            newVal === '' ? 0 + 'deg' : newVal + 'deg'
          data[this.prefix + 'bgColor'] = 'transparent'
          data[this.prefix + 'bgImage'] = ''
          data[this.prefix + 'bgPosition'] = '50% 50%'
          data[this.prefix + 'size'] = 'cover'
          oldData[this.prefix + 'violet'] = oldValue
          oldData[this.prefix + 'bgColor'] = oldBgColor
          oldData[this.prefix + 'bgImage'] = oldBgImg
          oldData[this.prefix + 'bgPosition'] = oldBgPos
          oldData[this.prefix + 'size'] = oldSize
          clearTimeout(this.timer)
          const _this = this
          this.timer = setTimeout(() => {
            _this.onCssChange(oldData, data)
          }, 200)
        }
      }
    },
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    }
  },
  methods: {
    _handleRotateMousedown() {
      this.mouseFlag = true
    },
    _handleRotateMouseup() {
      this.mouseFlag = false
    },
    _handleRotateMouseleave() {
      this.mouseFlag = false
    },
    _handleRotateMousemove(e) {
      if (!this.mouseFlag) {
        return
      }
      var mx = e.offsetX
      var my = e.offsetY
      var px = 25
      var py = 25
      var x = Math.abs(px - mx)
      var y = Math.abs(py - my)
      var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      var cos = y / z
      var radina = Math.acos(cos) // 用反三角函数求弧度
      var angle = Math.floor(180 / (Math.PI / radina)) // 将弧度转换成角度

      if (mx > px && my > py) {
        // 鼠标在第四象限
        angle = 180 - angle
      }

      if (mx === px && my > py) {
        // 鼠标在y轴负方向上
        angle = 180
      }

      if (mx > px && my === py) {
        // 鼠标在x轴正方向上
        angle = 90
      }

      if (mx < px && my > py) {
        // 鼠标在第三象限
        angle = 180 + angle
      }

      if (mx < px && my === py) {
        // 鼠标在x轴负方向
        angle = 270
      }

      if (mx < px && my < py) {
        // 鼠标在第二象限
        angle = 360 - angle
      }
      this.model[this.prefix + 'violet'] = angle
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        if (
          this.prefix === '$content-' ||
          this.prefix === '$header-' ||
          this.prefix === '$footer-'
        ) {
          window.smSite.onPageCssChange(oldData, data)
        } else {
          window.smSite.onCssChange(oldData, data)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gradient-area {
  .section-title {
    padding-bottom: 16px;
  }
  .bg-gradient {
    padding-left: 10px;
    li.arrow {
      transform: rotate(270deg);
      margin: 8px 12px;
      width: 6px;
      height: 22px;
      background: url('~@static/images/range.png') no-repeat center center;
      background-size: 100% 100%;
    }
    li.title {
      font-size: $--font-size-small;
      line-height: 16px;
      padding-right: 8px;
    }
  }
  .bg-gradient /deep/ .el-color-picker--small {
    width: 56px;
  }
  .bg-violet {
    margin-top: 16px;
    padding-left: 10px;
    .title {
      padding-right: 8px;
    }
    .radius {
      margin-top: 8px;
      .deg-rotate {
        position: relative;
        display: block;
        margin-right: 16px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: $--color-main;
        &:hover {
          background: $--background-hover;
        }
        .value-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: transparent;
          pointer-events: none;
          .rotate-value {
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            display: block;
            width: 8px;
            height: 8px;
            cursor: pointer;
            border-radius: 50%;
            background: $--usual-background-auxiliary;
            pointer-events: none;
          }
        }
      }
      .deg-num {
        position: relative;
        &::after {
          position: absolute;
          top: 8px;
          right: 24px;
          display: block;
          content: '';
          width: 2px;
          height: 2px;
          border-radius: 50%;
          border: 1px solid $--popup-border-color;
        }
      }

      .deg-num /deep/ .el-input__inner {
        color: $--popup-font-color-main;
        background: $--popup-background-main;
      }
    }
  }
  .bg-violet /deep/ .el-input-number--small {
    width: 70px;
    &:hover {
      .el-input-number__decrease,
      .el-input-number__increase {
        display: block;
      }
    }
  }
}
</style>
