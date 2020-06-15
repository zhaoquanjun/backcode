<template>
  <div class="box-shadow">
    <div class="shape">
      <div class="setting-attribute--title">形状</div>
      <ul class="shape-list flex-between-center--area">
        <li
          v-for="(item, index) in fixedShadowValue"
          :key="index"
          class="shape-item flex-center-center--area"
          :class="{ active: parseInt(shadowType) === item.type }"
          @click="chooseShape(item)"
        >
          <i v-if="item.type === 0" class="iconfont iconguanbi"></i>
          <div v-else :style="boxShadowStyle(item)"></div>
        </li>
      </ul>
    </div>
    <div class="size">
      <div class="setting-attribute--title">大小</div>
      <ul class="size-list flex-between-center--area">
        <li
          v-for="item in shadowSizeData"
          :key="item.value"
          class="size-item"
          :class="{ active: parseInt(shadowSize) === item.value }"
          @click="chooseSize(item)"
        >
          <div>{{ item.text }}</div>
        </li>
      </ul>
    </div>
    <div class="bg-color flex-start-center--area">
      <div class="setting-attribute--title">颜色</div>
      <el-color-picker
        v-model="shadowBg"
        style="width:100%"
        class="bordered"
        size="small"
        :predefine="predefineColors"
        show-alpha
      ></el-color-picker>
    </div>
  </div>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
import { shadowValue } from './index'
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
      shadowSizeData: [
        {
          size: 2,
          text: '小',
          value: 5
        },
        {
          size: 7,
          text: '中',
          value: 15
        },
        {
          size: 12,
          text: '大',
          value: 25
        },
        {
          size: 18,
          text: '特大',
          value: 35
        }
      ],
      fixedShadowValue: [
        {
          type: 0,
          shadowHorizontal: 0,
          shadowVertical: 0
        },
        {
          type: 1,
          shadowHorizontal: -2,
          shadowVertical: 2
        },
        {
          type: 2,
          shadowHorizontal: 0,
          shadowVertical: 2
        },
        {
          type: 3,
          shadowHorizontal: 2,
          shadowVertical: 2
        },
        {
          type: 4,
          shadowHorizontal: 0,
          shadowVertical: 0
        },
        {
          type: 5,
          shadowHorizontal: 0,
          shadowVertical: -2
        }
      ],
      shadowValue: shadowValue,
      shape: [],
      curSelectedShape: {},
      curSelectedColor: ''
    }
  },
  computed: {
    shadowBg: {
      get() {
        const color =
          this.model[this.prefix + 'shadowBg'] === 'none'
            ? 'rgba(255, 255, 255, 1)'
            : this.model[this.prefix + 'shadowBg']
        return color
      },
      set(newVal) {
        const oldValue = this.model[this.prefix + 'shadowBg']
        if (oldValue !== newVal) {
          this.model[this.prefix + 'shadowBg'] = newVal
          const data = {}
          data[this.prefix + 'shadowBg'] = newVal
          const oldData = {}
          oldData[this.prefix + 'shadowBg'] = oldValue
          this.onCssChange(oldData, data)
        }
      }
    },
    shadowSize() {
      const shadowSize = parseInt(this.model[this.prefix + 'shadowSize'])
      if (shadowSize <= 5) {
        this.shape = this.shadowValue[0]
      } else if (shadowSize > 5 && shadowSize <= 15) {
        this.shape = this.shadowValue[1]
      } else if (shadowSize > 15 && shadowSize <= 25) {
        this.shape = this.shadowValue[2]
      } else if (shadowSize > 25) {
        this.shape = this.shadowValue[3]
      }
      return shadowSize
    },
    shadowType() {
      return this.model[this.prefix + 'shadowType']
    },

    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    }
  },

  methods: {
    /**
     * 选择形状
     */
    chooseShape(item) {
      this.curSelectedShape = item

      const data = {}
      const oldData = {}
      const oldX = this.model[this.prefix + 'shadowHorizontal']
      const oldY = this.model[this.prefix + 'shadowVertical']
      const oldType = this.model[this.prefix + 'shadowType']
      oldData[this.prefix + 'shadowHorizontal'] = oldX
      oldData[this.prefix + 'shadowVertical'] = oldY
      oldData[this.prefix + 'shadowType'] = oldType

      data[this.prefix + 'shadowHorizontal'] =
        this.curSelectedShape.shadowHorizontal + 'px'
      data[this.prefix + 'shadowVertical'] =
        this.curSelectedShape.shadowVertical + 'px'
      data[this.prefix + 'shadowType'] = this.curSelectedShape.type

      this.model[this.prefix + 'shadowHorizontal'] =
        this.curSelectedShape.shadowHorizontal + 'px'
      this.model[this.prefix + 'shadowVertical'] =
        this.curSelectedShape.shadowVertical + 'px'
      this.model[this.prefix + 'shadowType'] = this.curSelectedShape.type

      // 清空阴影
      if (this.curSelectedShape.type === 0) {
        const oldSize = this.model[this.prefix + 'shadowSize']
        oldData[this.prefix + 'shadowSize'] = oldSize
        data[this.prefix + 'shadowSize'] = 0 + 'px'
        this.model[this.prefix + 'shadowSize'] = 0 + 'px'
      }

      this.onCssChange(oldData, data)
    },

    /**
     * 选择模糊大小
     */
    chooseSize(item) {
      this.setShape(item)
      const data = {}
      const oldData = {}
      const oldSize = this.model[this.prefix + 'shadowSize']
      oldData[this.prefix + 'shadowSize'] = oldSize
      data[this.prefix + 'shadowSize'] = item.value + 'px'
      this.model[this.prefix + 'shadowSize'] = item.value + 'px'
      this.onCssChange(oldData, data)
    },
    /**
     * 选择大小后 重置 阴影的x y
     */
    setShape(item) {
      // let curShadowTypeData = this.shape[this.shadowType - 1];
      const shadowHorizontal = this.curSelectedShape.shadowHorizontal
      const shadowVertical = this.curSelectedShape.shadowVertical

      const shadowShape = {
        shadowHorizontal,
        shadowVertical,
        type: this.curSelectedShape.type
      }
      if (shadowHorizontal && shadowVertical) {
        this.chooseShape(shadowShape)
      }
    },
    /**
     * 面板的框的阴影
     */
    boxShadowStyle(item) {
      const shadow = `${item.shadowHorizontal}px ${item.shadowVertical}px 2px ${this.shadowBg}`
      const styleObject = {
        boxShadow: shadow
      }
      return styleObject
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
.box-shadow {
  > div {
    margin-bottom: 20px;
  }
  .shape,
  .size,
  .bg-color {
    display: flex;
  }
  .title {
    min-width: 40px;
  }
  .shape-list,
  .size-list {
    flex-wrap: wrap;
  }

  .shape-item {
    cursor: pointer;
    width: 50px;
    height: 40px;
    border: 1px solid $--usual-border-color;
    margin-bottom: 8px;
    box-sizing: border-box;

    &:nth-of-type(n + 4) {
      margin-bottom: 0px;
    }

    &:hover {
      div {
        background: $--background-hover;
      }

      i {
        color: $--font-color-hover;
      }
    }

    div {
      display: inline-block;
      width: 28px;
      height: 20px;
      background: $--popup-background-main;
    }

    i {
      color: $--usual-font-color-main;
    }
  }
  .size-item {
    cursor: pointer;
    width: 43px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    border: 1px solid $--usual-border-color;
    color: $--usual-font-color-main;
    font-size: $--font-size-small;
    background: $--panel-background-color;
    & + .size-item {
      border-left: 0;
    }

    &:hover {
      background: $--background-hover;
    }
  }

  .shape-item.active,
  .size-item.active {
    border: 1px solid $--font-color-selected;
    div {
      background: $--background-selected;
    }
  }
}
</style>
