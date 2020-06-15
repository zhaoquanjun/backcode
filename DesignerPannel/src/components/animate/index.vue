<template>
  <div class="animate-section">
    <usual-animate
      :model="model"
      :animate-data="animateData"
      :control-name="controlName"
      @onDataChange="onDataChange"
    ></usual-animate>
    <div class="bg-container setting-block__top">
      <div v-if="animateName !== ''" class="set-animate__play">
        <img
          v-show="animateName !== ''"
          :src="curAnimateIcon"
          class="animate-icon"
          alt
        >
        <div class="animate-desc">{{ formatName(animateName) }}</div>
        <div class="animate-play" @click="_handlePlayAnimate">
          <i class="iconfont iconicon-des-bofang"></i>
        </div>
      </div>
      <div
        v-show="animateName == 'slideIn' || animateName == 'bounceIn'"
        class="set-animate__way row-top__dis"
      >
        <span>动画方向</span>
        <el-select
          v-model="direction"
          placeholder="请选择"
          style="width: 143px;"
        >
          <el-option
            v-for="item in animateDirections"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <animate-time
        v-if="this.animateName !== ''"
        :model="model"
        :name="'duration'"
        class="setting-block__top"
        @onDataChange="onDataChange"
      >
        <span class="setting-attribute--title title-min-width">持续时间</span>
      </animate-time>
      <animate-delay-time
        v-if="this.animateName !== ''"
        :model="model"
        :name="'delay'"
        class="setting-block__top"
        @onDataChange="onDataChange"
      >
        <span class="setting-attribute--title title-min-width">延迟时间</span>
      </animate-delay-time>
      <animate-only-once
        v-if="this.animateName !== ''"
        :model="model"
        class="setting-block__top"
        @onDataChange="onDataChange"
      ></animate-only-once>
    </div>
  </div>
</template>

<script>
import UsualAnimate from './animate-usual'
import AnimateTime from './animate-slider'
import AnimateDelayTime from './animate-slider'
import AnimateOnlyOnce from './animate-switch'
import animateData from '@/config/animateData.js'
export default {
  components: {
    UsualAnimate,
    AnimateTime,
    AnimateDelayTime,
    AnimateOnlyOnce
  },
  props: {
    model: {
      type: Object
    },
    controlName: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      animateData: animateData,
      animateDirections: [
        { label: '从上到下', value: 'Down' },
        { label: '从右到左', value: 'Right' },
        { label: '从下到上', value: 'Up' },
        { label: '从左到右', value: 'Left' }
      ]
    }
  },
  computed: {
    curAnimateIcon: {
      get: function() {
        const value = this.animateName
          ? require(`@static/images/animate/${this.animateName}_animate.png`)
          : ''
        return value
      },
      set: function() {}
    },
    animateName: {
      get: function() {
        const name = this.model ? this.model['animationName'] : ''
        return name
      },
      set: function() {}
    },
    direction: {
      get: function() {
        return this.model ? this.model['direction'] : ''
      },
      set: function(newVal) {
        const oldVal = this.model['direction']
        if (newVal !== oldVal) {
          const oldData = {}
          const data = {}
          oldData['direction'] = oldVal
          data['direction'] = newVal
          this.model['direction'] = newVal
          this.onDataChange('animate', oldData, data)
        }
      }
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    _handlePlayAnimate() {
      if (window.smSite) {
        const data = JSON.parse(JSON.stringify(this.model))
        data.delay = data.delay * 1000
        data.duration = data.duration * 1000
        window.smSite.prevAnima(data)
      }
    },
    formatName(animate) {
      switch (animate) {
        case '':
          return '无动画'
          break
        case 'slideIn':
          return '飞入'
          break
        case 'bounceIn':
          return '弹入'
          break
        case 'flip':
          return '翻转'
          break
        case 'rotateIn':
          return '旋转'
          break
        case 'txtRotate':
          return '翻滚进入'
          break
        case 'txtTyped':
          return '黑板擦'
          break
        case 'scaleInUp':
          return '拉入'
          break
        case 'scaleInDown':
          return '吹入'
          break
        case 'txtNumber':
          return '动态数字'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.animate-section {
  .bg-container {
    background: $--panel-background-content-color;

    .set-animate__play {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 50px;
      border-bottom: $--usual-border-main;
      .animate-icon {
        width: 36px;
      }
      .animate-desc {
        padding-left: 16px;
        font-size: $--font-size-normal;
        line-height: 20px;
        color: $--usual-font-color-main;
      }
      .animate-play {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $--usual-font-color-main;
        i {
          font-size: $--font-size-large;
        }
        &:hover {
          color: $--font-color-hover;
        }
      }
    }
    .set-animate__way {
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $--usual-font-color-main;
    }
    .title-min-width {
      min-width: 70px;
    }
  }
}
</style>
