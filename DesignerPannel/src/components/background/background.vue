<template>
  <div class="background-section">
    <el-tabs
      v-model="activeName"
      type="card"
      class="stplane-background"
      @tab-click="handleTabClick"
    >
      <el-tab-pane name="1">
        <div
          slot="label"
          class="tab-slot"
          :data-type="bgColor"
          :class="{ active: activeName == '1' }"
        >
          <el-tooltip
            class
            effect="dark"
            content="纯色填充"
            placement="top-start"
          >
            <div class="slot-box flex-center-center--area">
              <span class="pure"></span>
              <span v-show="activeName == '1'" class="selected"></span>
            </div>
          </el-tooltip>
        </div>
        <div class="fill-content">
          <bg-color
            :model="model"
            :prefix="prefix"
            :active-name="activeName"
          ></bg-color>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <div
          slot="label"
          class="tab-slot"
          :data-type="bgGradient"
          :class="{ active: activeName == '2' }"
        >
          <el-tooltip
            class
            effect="dark"
            content="渐变色填充"
            placement="top-start"
          >
            <div class="slot-box flex-center-center--area">
              <span class="gradient"></span>
              <span v-show="activeName == '2'" class="selected"></span>
            </div>
          </el-tooltip>
        </div>
        <div class="fill-content">
          <bg-gradient
            :model="model"
            :prefix="prefix"
            :active-name="activeName"
          ></bg-gradient>
        </div>
      </el-tab-pane>
      <el-tab-pane name="3">
        <div
          slot="label"
          class="tab-slot"
          :data-type="bgImage"
          :class="{ active: activeName == '3' }"
        >
          <el-tooltip
            class
            effect="dark"
            content="图片填充"
            placement="top-start"
          >
            <div class="slot-box flex-center-center--area">
              <span class="images"></span>
              <span v-show="activeName == '3'" class="selected"></span>
            </div>
          </el-tooltip>
        </div>
        <div class="fill-content">
          <bg-image
            :model="model"
            :prefix="prefix"
            :active-name="activeName"
          ></bg-image>
        </div>
      </el-tab-pane>
      <el-tab-pane name="4">
        <div
          slot="label"
          class="tab-slot"
          :class="{ active: activeName == '4' }"
        >
          <el-tooltip
            class
            effect="dark"
            content="清除填充"
            placement="top-start"
          >
            <div class="slot-box flex-center-center--area">
              <span class="clear"></span>
              <span v-show="activeName == '4'" class="selected"></span>
            </div>
          </el-tooltip>
        </div>
        <div class="fill-content">
          <bg-clear
            :model="model"
            :prefix="prefix"
            :active-name="activeName"
          ></bg-clear>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BgColor from './bg-color'
import BgGradient from './bg-gradient'
import BgImage from './bg-Image'
import BgClear from './bg-clear'

export default {
  name: 'Background',
  components: { BgColor, BgGradient, BgImage, BgClear },
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
      activeName: '1'
    }
  },
  computed: {
    bgColor: {
      get: function() {
        return this.model[this.prefix + 'bgColor']
      },
      set: function() {}
    },
    bgGradient: {
      get: function() {
        return this.model[this.prefix + 'gradientstartcolor']
      },
      set: function() {}
    },
    bgImage: {
      get: function() {
        return this.model[this.prefix + 'bgImage']
      },
      set: function() {}
    }
  },
  watch: {
    bgColor(newVal, oldVal) {
      if (newVal !== 'transparent') {
        this.activeName = '1'
      }
    },
    bgGradient(newVal, oldVal) {
      if (newVal !== 'none') {
        this.activeName = '2'
      }
    },
    bgImage(newVal, oldVal) {
      if (newVal !== 'none' && newVal !== '') {
        this.activeName = '3'
      }
    }
  },
  methods: {
    handleTabClick(tab, event) {
      if (tab.name === '4') {
        const oldData = {}
        const data = {}

        const oldBgColor = this.model[this.prefix + 'bgColor']
        const oldBgStartColor = this.model[this.prefix + 'gradientstartcolor']
        const oldBgEndColor = this.model[this.prefix + 'gradientendcolor']
        const oldVolit = this.model[this.prefix + 'violet']
        const oldBgImg = this.model[this.prefix + 'bgImage']
        const oldBgPos = this.model[this.prefix + 'bgPosition']
        const olgSize = this.model[this.prefix + 'bgSize']

        this.model[this.prefix + 'bgColor'] = 'transparent'
        this.model[this.prefix + 'gradientstartcolor'] = 'none'
        this.model[this.prefix + 'gradientendcolor'] = 'none'
        this.model[this.prefix + 'violet'] = 0
        this.model[this.prefix + 'bgImage'] = ''
        this.model[this.prefix + 'bgPosition'] = '50% 50%'
        this.model[this.prefix + 'bgSize'] = 'cover'

        oldData[this.prefix + 'bgColor'] = oldBgColor
        oldData[this.prefix + 'gradientstartcolor'] = oldBgStartColor
        oldData[this.prefix + 'gradientendcolor'] = oldBgEndColor
        oldData[this.prefix + 'violet'] = oldVolit

        oldData[this.prefix + 'bgImage'] = oldBgImg
        oldData[this.prefix + 'bgPosition'] = oldBgPos
        oldData[this.prefix + 'bgSize'] = olgSize

        data[this.prefix + 'bgColor'] = 'transparent'
        data[this.prefix + 'gradientstartcolor'] = 'none'
        data[this.prefix + 'gradientendcolor'] = 'none'
        data[this.prefix + 'biolet'] = 0
        data[this.prefix + 'bgImage'] = ''
        data[this.prefix + 'bgPosition'] = '50% 50%'
        data[this.prefix + 'bgSize'] = 'cover'
        this.onCssChange(oldData, data)
      }
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
.background-section {
  margin-top: -8px;
  .tab-slot {
    position: relative;
    width: 46px;
    height: 46px;
    background: $--panel-background-color;
    border-radius: $--border-radius-base;
    .slot-box {
      flex-wrap: wrap;
      height: 100%;
      span.pure {
        width: 18px;
        height: 18px;
        background: url('~@static/images/background/pure.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
      span.gradient {
        width: 29px;
        height: 18px;
        background: url('~@static/images/background/gradient.png') no-repeat
          center center;
        background-size: 100% 100%;
      }
      span.images {
        width: 30px;
        height: 18px;
        background: url('~@static/images/background/image.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
      span.clear {
        width: 22px;
        height: 18px;
        background: url('~@static/images/background/clear.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
      span.selected {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 18px;
        height: 18px;
        background: url('~@static/images/success_icon.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
  }
  .tab-slot.active {
    span.pure {
        width: 18px;
        height: 18px;
        background: url('~@static/images/background/pure_active.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
      span.gradient {
        width: 29px;
        height: 18px;
        background: url('~@static/images/background/gradient_active.png') no-repeat
          center center;
        background-size: 100% 100%;
      }
      span.images {
        width: 30px;
        height: 18px;
        background: url('~@static/images/background/image_active.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
      span.clear {
        width: 22px;
        height: 18px;
        background: url('~@static/images/background/clear_active.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
  }
  .fill-content {
    background: $--panel-background-color;
    box-shadow: $--area-shadow-base;
    border-radius: $--border-radius-base;
    padding: 10px 12px 32px;
  }
  .active {
    background: $--background-selected;
    box-shadow: $--area-shadow-base;
  }
}
</style>
