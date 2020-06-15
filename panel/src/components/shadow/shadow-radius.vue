<template>
  <div class="stpanel-parcel shadow">
    <ul class="angle">
      <li class="title">角度</li>
      <li class="radius">
        <span
          class="deg-rotate"
          @mousedown="_handleRotateMousedown"
          @mousemove="_handleRotateMousemove($event)"
          @mouseleave.prevent="_handleRotateMouseleave"
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
            size="small"
            controls-position="right"
            :min="0"
            :max="360"
            style="max-width: 90px; margin: 0 10px;"
            @change="_handleChangeSize"
          />
        </span>
        <el-color-picker
          v-model="shadowBg"
          class="bordered"
          size="small"
          :predefine="predefineColors"
          show-alpha
        ></el-color-picker>
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
    }
  },
  data() {
    return {
      config: themeColorConfig,
      oldRadiusValue: null
    }
  },
  computed: {
    shadowBg: {
      get: function() {
        const color =
          this.model[this.prefix + 'shadowBg'] == 'none'
            ? 'rgba(255, 255, 255, 1)'
            : this.model[this.prefix + 'shadowBg']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'shadowBg']
        if (oldValue !== newVal) {
          this.model[this.prefix + 'shadowBg'] = newVal
          const data = {}
          data[this.prefix + 'shadowBg'] = newVal
          const oldData = {}
          oldData[this.prefix + 'shadowBg'] = oldValue
          this.$emit('onCssChange', oldData, data)
        }
      }
    },
    violet: {
      get: function() {
        return parseInt(this.model[this.prefix + 'shdowRadius'])
      },
      set: function() { }
    },
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() { }
    }
  },
  methods: {
    _handleRotateMousedown() {
      this.mouseFlag = true
    },
    _handleRotateMouseup() {
      this.mouseFlag && this._handleChangeSize(this.violet)
      this.mouseFlag = false
    },
    _handleRotateMouseleave(e) {
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

      if (mx == px && my > py) {
        // 鼠标在y轴负方向上
        angle = 180
      }

      if (mx > px && my == py) {
        // 鼠标在x轴正方向上
        angle = 90
      }

      if (mx < px && my > py) {
        // 鼠标在第三象限
        angle = 180 + angle
      }

      if (mx < px && my == py) {
        // 鼠标在x轴负方向
        angle = 270
      }

      if (mx < px && my < py) {
        // 鼠标在第二象限
        angle = 360 - angle
      }
      if (this.oldRadiusValue == null) {
        this.oldRadiusValue = this.model[this.prefix + 'shdowRadius']
      }
      this.model[this.prefix + 'shdowRadius'] = angle
    },
    _handleChangeSize(violet) {
      const data = {}
      const oldData = {}
      const angle = violet * (Math.PI / 180)
      let x, y
      if (angle > 180) {
        x = parseInt(this.model[this.prefix + 'shadowSize']) * Math.sin(angle)
      } else {
        x = -parseInt(this.model[this.prefix + 'shadowSize']) * Math.sin(angle)
      }
      if (angle > 90 && angle < 270) {
        y = -parseInt(this.model[this.prefix + 'shadowSize']) * Math.cos(angle)
      } else {
        y = parseInt(this.model[this.prefix + 'shadowSize']) * Math.cos(angle)
      }
      if (
        this.model[this.prefix + 'shadowHorizontal'] !== x + 'px' ||
        this.model[this.prefix + 'shadowVertical'] !== y + 'px'
      ) {
        oldData[this.prefix + 'shadowHorizontal'] = this.model[
          this.prefix + 'shadowHorizontal'
        ]
        oldData[this.prefix + 'shadowVertical'] = this.model[
          this.prefix + 'shadowVertical'
        ]
        oldData[this.prefix + 'shdowRadius'] = this.oldRadiusValue
        data[this.prefix + 'shadowHorizontal'] = x + 'px'
        data[this.prefix + 'shadowVertical'] = y + 'px'
        data[this.prefix + 'shdowRadius'] = violet
        this.model[this.prefix + 'shadowHorizontal'] = x + 'px'
        this.model[this.prefix + 'shadowVertical'] = y + 'px'
        this.oldRadiusValue = violet
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$emit('onCssChange', oldData, data)
        }, 200)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.shadow {
  .angle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      min-width: 40px;
    }
    .radius {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .deg-rotate {
        position: relative;
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #c9d9dc;
        &:hover {
          background: $--color-main;
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
            background: #fff;
            pointer-events: none;
          }
        }
      }
      .deg-num {
        position: relative;
        &::after {
          position: absolute;
          top: 8px;
          right: 20px;
          display: block;
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 50%;
          border: 1px solid #aaa;
        }
      }
    }
  }
  .angle .el-input-number {
    width: 56px;
  }
}
</style>
