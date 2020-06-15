<template>
  <div>
    <ul
      class="usual-animate__section flex-start-start--area setting-block__section"
    >
      <li
        v-for="(item, index) in usualList"
        :key="index"
        :class="{ selected: item.type == (model ? model.animationName : 'noValue') }"
        :style="{ marginRight: (index + 1) % 3 == 0 && '0px' }"
      >
        <span @click="_handleSelectAnimate(item)">
          <img :src="item.type == (model ? model.animationName : 'noValue') ? item.activeIcon : item.icon" alt="">
        </span>
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <ul
      v-if="controlName == 'text'"
      class="special-animate__section flex-start-start--area setting-block__section setting-block__top"
    >
      <li
        v-for="(item, index) in specialList"
        :key="index"
        :style="{ marginRight: (index + 1) % 3 == 0 && '0px' }"
        :class="{ selected: item.type == (model ? model.animationName : 'noValue') }"
      >
        <span
          @click="_handleSelectAnimate(item)"
        >
          <img :src="item.type == (model ? model.animationName : 'noValue') ? item.activeIcon : item.icon" alt>
        </span>
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    animateData: {
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
      usualList: [
        {
          title: '无动画',
          type: '',
          icon: require('@static/images/animate/no_animate.png'),
          activeIcon: require('@static/images/animate/no_animate_active.png')
        },
        {
          title: '飞入',
          type: 'slideIn',
          icon: require('@static/images/animate/slideIn_animate.png'),
          activeIcon: require('@static/images/animate/slideIn_animate_active.png')
        },
        {
          title: '弹入',
          type: 'bounceIn',
          icon: require('@static/images/animate/bounceIn_animate.png'),
          activeIcon: require('@static/images/animate/bounceIn_animate_active.png')
        },
        {
          title: '翻转',
          type: 'flip',
          icon: require('@static/images/animate/flip_animate.png'),
          activeIcon: require('@static/images/animate/flip_animate_active.png')
        },
        {
          title: '旋转',
          type: 'rotateIn',
          icon: require('@static/images/animate/rotateIn_animate.png'),
          activeIcon: require('@static/images/animate/rotateIn_animate_active.png')
        }
      ],
      specialList: [
        {
          title: '拉入',
          type: 'scaleInUp',
          icon: require('@static/images/animate/scaleInUp_animate.png'),
          activeIcon: require('@static/images/animate/scaleInUp_animate_active.png')
        },
        {
          title: '吹入',
          type: 'scaleInDown',
          icon: require('@static/images/animate/scaleInDown_animate.png'),
          activeIcon: require('@static/images/animate/scaleInDown_animate_active.png')
        },
        {
          title: '翻滚进入',
          type: 'txtRotate',
          icon: require('@static/images/animate/txtRotate_animate.png'),
          activeIcon: require('@static/images/animate/txtRotate_animate_active.png')
        },
        {
          title: '黑板擦',
          type: 'txtTyped',
          icon: require('@static/images/animate/txtTyped_animate.png'),
          activeIcon: require('@static/images/animate/txtTyped_animate_active.png')
        },
        {
          title: '动态数字',
          type: 'txtNumber',
          icon: require('@static/images/animate/txtNumber_animate.png'),
          activeIcon: require('@static/images/animate/txtNumber_animate_active.png')
        }
      ]
    }
  },
  computed: {
    animateName: {
      get: function() {
        const value = this.model
          ? this.model['animationName']
          : ''
        return value
      },
      set: function() {}
    }
  },
  mounted() {
    this.animateName = this.model
      ? this.model['animationName']
      : ''
  },
  methods: {
    _handleSelectAnimate(item) {
      if (this.model['animationName'] === item.type) return
      const oldValue = this.model['animationName']
        ? this.model['animationName']
        : ''
      let oldData = {}

      const data = JSON.parse(JSON.stringify(this.model))
      if (item.type === '') {
        oldData['delay'] = this.model['delay'] * 1000
        oldData['duration'] = this.model['duration'] * 1000
        oldData['animationName'] = this.model['animationName']
        oldData['direction'] = this.model['direction']
        oldData['infinite'] = this.model['infinite']
        oldData['autoReverse'] = this.model['autoReverse']
        data['animationName'] = ''
        this.model['animationName'] = ''
      } else {
        if (oldValue === '') {
          oldData = null
          data['delay'] = this.animateData[item.type]['delay'] * 1000
          data['duration'] = this.animateData[item.type]['duration'] * 1000
          data['animationName'] = item.type
          data['direction'] = this.animateData[item.type]['direction']
          data['infinite'] = this.animateData[item.type]['infinite']
          data['autoReverse'] = this.animateData[item.type]['autoReverse']
          this.model['animationName'] = item.type
          this.model['delay'] = this.animateData[item.type]['delay']
          this.model['duration'] = this.animateData[item.type]['duration']
          this.model['direction'] = this.animateData[item.type]['direction']
          this.model['infinite'] = this.animateData[item.type]['infinite']
          this.model['autoReverse'] = this.animateData[item.type]['autoReverse']
        } else {
          oldData['delay'] = this.model['delay'] * 1000
          oldData['duration'] = this.model['duration'] * 1000
          oldData['animationName'] = this.model['animationName']
          oldData['direction'] = this.model['direction']
          oldData['infinite'] = this.model['infinite']
          oldData['autoReverse'] = this.model['autoReverse']
          data['delay'] = this.model['delay'] * 1000
          data['duration'] = this.model['duration'] * 1000
          data['animationName'] = item.type
          data['direction'] = this.model['direction']
          data['infinite'] = this.model['infinite']
          data['autoReverse'] = this.model['autoReverse']
          this.model['animationName'] = item.type
          this.model['delay'] = this.model['delay']
          this.model['duration'] = this.model['duration']
          this.model['direction'] = this.model['direction']
          this.model['infinite'] = this.model['infinite']
          this.model['autoReverse'] = this.model['autoReverse']
        }
      }
      this.$emit('onDataChange', 'animate', oldData, data)
    }
  }
}
</script>
<style lang="scss" scoped>
.usual-animate__section,
.special-animate__section {
  flex-wrap: wrap;
  li {
    margin-bottom: 16px;
    margin-right: 16px;
    width: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    span {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6px;
      width: 54px;
      height: 54px;
      cursor: pointer;
      border-radius: $--border-radius-base;
      background-color: $--panel-background-color;

      img {
        width: 100%;
      }
    }
    p {
      margin-top: 10px;
      width: 100%;
      font-size: $--font-size-normal;
      line-height: 20px;
      text-align: center;
      color: $--usual-font-color-sub;
    }

    &:hover {
      span {
        background: $--background-hover;
      }

      p {
        color: $--font-color-hover;
      }
    }
  }
  .selected {
    span {
      background-color: $--background-selected;
    }
    p {
      color: $--font-color-selected;
    }
    &:hover {
      span {
        background: $--background-selected;
      }

      p {
        color: $--font-color-selected;
      }
    }
  }
}
.usual-animate__section li:first-of-type img {
  width: 70%;
}
</style>
