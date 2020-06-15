<template>
  <ul
    class="resize-section flex-between-center--area"
    @mouseleave="_handleOuterMouseleave"
    @mouseup="_handleMouseup"
    @mousemove="_handleMousemove($event)"
  >
    <li
      v-for="(it, i) in customize"
      :key="i"
      :style="{width: 232 / 12 * it.Percent + 'px'}"
    >
      {{ it.Percent }}
      <span class="gutter-space" @mousedown="_handleMousedown($event, i)">
        <b></b>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    customize: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      oldValue: null,
      originData: null,
      drag: false,
      dragIndex: null,
      startPos: 0,
      canMoveFront: true,
      canMoveBehind: true,
      timer: null
    }
  },
  methods: {
    _handleMousedown(ev, i) {
      this.drag = true
      this.dragIndex = i
      this.startPos = ev.pageX
      this.oldValue = this.customize[i].Percent
      this.originData = JSON.parse(JSON.stringify(this.customize))
      this.canMoveBehind = this.customize[i + 1].Percent !== 1
      this.canMoveFront = this.customize[i].Percent !== 1
    },
    _handleMouseup() {
      this.drag = false
    },
    _handleMousemove(ev) {
      const i = this.dragIndex
      if (!this.drag || (distance > 0 && !this.canMoveBehind) || (distance < 0 && !this.canMoveFront)) return
      const distance = ev.pageX - this.startPos
      if (
        distance > 0 &&
        Math.abs(distance) > 18 &&
        this.customize[i + 1].Percent > 1
      ) {
        this.startPos = ev.pageX
        this.customize[i].Percent += 1
        this.customize[i + 1].Percent -= 1
      }
      if (
        distance < 0 &&
        Math.abs(distance) > 18 &&
        this.customize[i].Percent > 1
      ) {
        this.startPos = ev.pageX
        this.customize[i].Percent -= 1
        this.customize[i + 1].Percent += 1
      }
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.oldValue !== this.customize[i].Percent) {
          const oldData = {}
          const data = {}
          oldData['childArea'] = this.originData
          data['childArea'] = this.customize
          this.onDataChange('changeAreaWidth', oldData, data)
        }
      }, 200)
    },
    _handleOuterMouseleave() {
      this.drag = false
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
.resize-section {
  border: 5px solid $--panel-background-color;
  li {
    position: relative;
    padding: 16px 0;
    font-size: 16px;
    text-align: center;
    background: $--usual-border-color;
    line-height: 1;
    .gutter-space {
      position: absolute;
      top: 0;
      right: -2.5px;
      display: block;
      width: 5px;
      height: 50px;
      cursor: col-resize;
      background: $--panel-background-color;
      z-index: 1;
      b {
        position : absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        width: 0;
        height: 50px;
        border-right: 2px dashed $--color-main;
      }
      &:hover {
        b {
          display: block;
        }
      }
    }
  }
  li:last-of-type {
    .gutter-space {
      display: none;
    }
  }
}
</style>
