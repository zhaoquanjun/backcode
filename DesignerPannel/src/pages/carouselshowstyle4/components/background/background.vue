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
            <div class="slot-box">
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
            <div class="slot-box">
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
            <div class="slot-box">
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
            <div class="slot-box">
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
    },
    flag: {
      type: Boolean
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
        return this.model[this.prefix + 'BgColor']
      },
      set: function() {}
    },
    bgGradient: {
      get: function() {
        return this.model[this.prefix + 'Gradientstartcolor']
      },
      set: function() {}
    },
    bgImage: {
      get: function() {
        return this.model[this.prefix + 'Src']
      },
      set: function() {}
    }
  },
  watch: {
    bgColor(newVal, oldVal) {
      if (
        newVal !== 'transparent' &&
        (this.bgImage === '' || this.bgImage === "''")
      ) {
        this.activeName = '1'
      }
    },
    bgGradient(newVal, oldVal) {
      if (newVal !== 'none' && (this.bgImage === '' || this.bgImage === "''")) {
        this.activeName = '2'
      }
    },
    bgImage(newVal, oldVal) {
      if (newVal !== '' && newVal !== "''") {
        this.activeName = '3'
      }
    },
    flag(newVal, oldVal) {
      if (newVal) {
        if (
          this.bgColor === 'transparent' &&
          this.bgGradient === 'none' &&
          (this.bgImage === '' || this.bgImage === "''")
        ) {
          this.activeName = '1'
        }
      }
    }
  },
  methods: {
    handleTabClick(tab, event) {
      if (tab.name === '4') {
        this.$set(this.model, this.prefix + 'BgColor', 'transparent')
        this.$set(this.model, this.prefix + 'Gradientstartcolor', 'none')
        this.$set(this.model, this.prefix + 'Gradientendcolor', 'none')
        this.$set(this.model, this.prefix + 'Violet', '0deg')
        this.$set(this.model, this.prefix + 'Src', '')
        this.$set(this.model, this.prefix + 'BgPosition', '50% 50%')
        this.$set(this.model, this.prefix + 'BgSize', 'cover')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.background-section {
  .tab-slot {
    position: relative;
    width: 46px;
    height: 46px;
    background: $--popup-background-auxiliary;
    border-radius: $--border-radius-base;
    .slot-box {
      display: flex;
      justify-content: center;
      align-items: center;
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
    background: $--popup-background-main;
    box-shadow: $--area-shadow-base;
    border-radius: $--border-radius-base;
    padding: 10px 12px 32px;
  }
  .active {
    background: $--popup-background-main;
  }
}
</style>
