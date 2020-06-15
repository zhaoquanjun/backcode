<template>
  <ul class="display-section">
    <li
      v-for="(it, index) in ways"
      :key="index"
      :class="{ active: it.type == display }"
      @click="_handleChangeDisplay(it.type)"
    >
      <span class="display-icon">
        <span
          class="center-icon"
          :style="`background-image: url(${it.type == display ? it.activeUrl : it.url})`"
        ></span>
        <span v-show="display == it.type" class="selected-icon__area"></span>
      </span>
      <span class="title">{{ it.name }}</span>
    </li>
  </ul>
</template>

<script>
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
      ways: [
        {
          name: '块状布局',
          url: require('@static/images/display/block.png'),
          activeUrl: require('@static/images/display/block_active.png'),
          type: 'block'
        },
        {
          name: '内联布局',
          url: require('@static/images/display/inline_block.png'),
          activeUrl: require('@static/images/display/inline_block_active.png'),
          type: 'inline-block'
        }
      ]
    }
  },
  computed: {
    display: {
      get: function() {
        return this.model[this.prefix + 'display']
      },
      set: function() {}
    }
  },
  methods: {
    _handleChangeDisplay(ty) {
      var oldVal = this.model[this.prefix + 'display']
      if (oldVal !== ty) {
        this.model[this.prefix + 'display'] = ty
        const oldData = {}
        const data = {}
        oldData[this.prefix + 'display'] = oldVal
        oldData[this.prefix + 'text-width'] = oldVal
        data[this.prefix + 'display'] = ty
        if (ty === 'block') {
          data[this.prefix + 'ele-width'] = '100%'
        } else {
          data[this.prefix + 'ele-width'] = 'auto'
        }
        this.onCssChange(oldData, data)
      }
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
.display-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  li {
    margin-right: 24px;
    &:last-of-type {
      margin-right: 0;
    }
    span {
      display: block;
    }
    .display-icon {
      position: relative;
      margin-bottom: 8px;
      width: 60px;
      height: 60px;
      background: $--panel-background-color;
      border-radius: $--border-radius-base;
      .center-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 16px;
        background-repeat: no-repeat;
        background-origin: center;
        background-size: 100% 100%;
      }
    }
    .title {
      font-size: $--font-size-small;
      text-align: center;
      line-height: 17px;
      color: $--usual-font-color-sub;
    }
  }
  li.active {
    .display-icon {
      margin-bottom: 8px;
      width: 60px;
      height: 60px;
      background: $--background-selected;
    }
    .title {
      color: $--font-color-selected;
    }
  }
}
</style>
