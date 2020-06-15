<template>
  <ul class="percent-section flex-between-center--area">
    <li v-for="(item, index) in percentList" :key="index" @click="_handleSelectPercent(item, index)">
      <span class="percent-item" :class="{active: selectItem == item.percent}">
        <img :src="selectItem == item.percent ? item.activeSrc : item.src" alt>
        <span v-show="selectItem == item.percent" class="select-icon"></span>
      </span>
      <p :class="{active: selectItem == item.percent}">{{ item.percent }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    },
    leftPercent: {
      type: String
    },
    rightPercent: {
      type: String
    },
    actionKey: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      percentList: [
        { percent: '2 : 10', src: require('@static/images/percent/percent2_10.png'), activeSrc: require('@static/images/percent/percent2_10_active.png') },
        { percent: '3 : 9', src: require('@static/images/percent/percent3_9.png'), activeSrc: require('@static/images/percent/percent3_9_active.png') },
        { percent: '4 : 8', src: require('@static/images/percent/percent4_8.png'), activeSrc: require('@static/images/percent/percent3_9_active.png') }
      ]
    }
  },
  computed: {
    selectItem: {
      get: function() {
        return String(this.model[this.leftPercent]) + ' : ' + String(this.model[this.rightPercent])
      },
      set: function() {}
    }
  },
  methods: {
    _handleSelectPercent(it, index) {
      const oldLeftP = String(this.model[this.leftPercent])
      const oldRightP = String(this.model[this.rightPercent])
      const newLeftP = it.percent.split(':')[0].trim()
      const newRightP = it.percent.split(':')[1].trim()
      if (oldLeftP !== newLeftP && oldRightP !== newRightP) {
        const oldData = {}
        const data = {}
        oldData[this.leftPercent] = oldLeftP
        oldData[this.rightPercent] = oldRightP
        data[this.leftPercent] = newLeftP
        data[this.rightPercent] = newRightP
        this.model[this.leftPercent] = newLeftP
        this.model[this.rightPercent] = newRightP
        this.onDataChange(this.actionKey, oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.percent-section {
  padding-top: 16px;
  .percent-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: $--panel-background-color;
    border-radius: $--border-radius-base;
    cursor: pointer;
    .select-icon {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 18px;
      height: 18px;
      background: url('~@static/images/success_icon.png') no-repeat center center;
        background-size: 100% 100%;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .active {
    background: $--background-selected;
  }
  p {
    padding-top: $--font-size-normal;
    font-size: $--font-size-normal;
    color: $--usual-font-color-sub;
    line-height: 20px;
    text-align: center;
  }
  p.active {
    color: $--font-color-selected;
    background: transparent;
  }
}
</style>
