<template>
  <ul class="padding-content__area flex-start-center--area">
    <li
      v-if="plr"
      :class="{ selected: selected == 'lr' }"
      @click="_handleSelectPaddingValue('lr')"
    >
      <span class="padding-box__outer">
        <span class="padding-box__inner"></span>
      </span>
      <span v-show="selected == 'lr'" class="selected-icon__area"></span>
    </li>
    <li
      v-if="ptb"
      :class="{ selected: selected == 'tb' }"
      @click="_handleSelectPaddingValue('tb')"
    >
      <span class="padding-box__outer vertical-padding">
        <span class="padding-box__inner"></span>
      </span>
      <span v-show="selected == 'tb'" class="selected-icon__area"></span>
    </li>
    <li
      v-if="plrtb"
      :class="{ selected: selected == 'lrtb' }"
      @click="_handleSelectPaddingValue('lrtb')"
    >
      <span class="padding-box__outer around-padding">
        <span class="padding-box__inner"></span>
      </span>
      <span v-show="selected == 'lrtb'" class="selected-icon__area"></span>
    </li>
    <li
      v-if="pnone"
      :class="{ selected: selected == 'none' }"
      @click="_handleSelectPaddingValue('none')"
    >
      <span class="padding-box__outer none-padding">
        <span class="padding-box__inner"></span>
      </span>
      <span v-show="selected == 'none'" class="selected-icon__area"></span>
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
      type: String
    },
    list: {
      type: Array,
      default: () => {
        return [1, 3]
      }
    }
  },
  computed: {
    paddinglr: {
      get: function() {
        return (
          this.model[this.prefix + 'paddingHorizontal'] &&
          parseInt(this.model[this.prefix + 'paddingHorizontal'])
        )
      },
      set: function() {}
    },
    paddingtb: {
      get: function() {
        return (
          this.model[this.prefix + 'paddingVertical'] &&
          parseInt(this.model[this.prefix + 'paddingVertical'])
        )
      },
      set: function() {}
    },
    plr: {
      get: function() {
        let flag = false
        if (this.list.indexOf(1) > -1) flag = true
        return flag
      },
      set: function() {}
    },
    ptb: {
      get: function() {
        let flag = false
        if (this.list.indexOf(0) > -1) flag = true
        return flag
      },
      set: function() {}
    },
    plrtb: {
      get: function() {
        let flag = false
        if (this.list.indexOf(2) > -1) flag = true
        return flag
      },
      set: function() {}
    },
    pnone: {
      get: function() {
        let flag = false
        if (this.list.indexOf(3) > -1) flag = true
        return flag
      },
      set: function() {}
    },
    selected: {
      get: function() {
        let id = ''
        if (
          this.paddinglr > 0 &&
          (this.paddingtb === 0 || this.paddingtb == undefined)
        ) {
          id = 'lr'
        }
        if (
          this.paddingtb > 0 &&
          (this.paddinglr === 0 || this.paddinglr == undefined)
        ) {
          id = 'tb'
        }

        if (this.paddinglr > 0 && this.paddingtb > 0) id = 'lrtb'
        if (
          (this.paddingtb === 0 && this.paddinglr === 0) ||
          (this.paddinglr === 0 && this.paddingtb == undefined) ||
          (this.paddinglr === undefined && this.paddingtb == undefined)
        ) {
          id = 'none'
        }
        return id
      },
      set: function() {}
    }
  },
  methods: {
    _handleSelectPaddingValue(type) {
      if (type === this.selected) return
      const oldCss = {}
      const css = {}

      switch (type) {
        case 'lr':
          oldCss[this.prefix + 'paddingHorizontal'] = this.model[
            this.prefix + 'paddingHorizontal'
          ]
          css[this.prefix + 'paddingHorizontal'] = '2%'
          this.model[this.prefix + 'paddingHorizontal'] = '2%'
          if (this.model[this.prefix + 'paddingVertical'] !== undefined) {
            oldCss[this.prefix + 'paddingVertical'] = this.model[
              this.prefix + 'paddingVertical'
            ]
            css[this.prefix + 'paddingVertical'] = 0
            this.model[this.prefix + 'paddingVertical'] = 0
            this.$set(this.model, this.prefix + 'paddingVertical', '0')
          }
          break
        case 'tb':
          oldCss[this.prefix + 'paddingVertical'] = this.model[
            this.prefix + 'paddingVertical'
          ]
          css[this.prefix + 'paddingVertical'] = '2%'
          this.model[this.prefix + 'paddingVertical'] = '2%'
          if (this.model[this.prefix + 'paddingHorizontal'] !== undefined) {
            oldCss[this.prefix + 'paddingHorizontal'] = this.model[
              this.prefix + 'paddingHorizontal'
            ]
            css[this.prefix + 'paddingHorizontal'] = 0
            this.model[this.prefix + 'paddingHorizontal'] = 0
            this.$set(this.model, this.prefix + 'paddingHorizontal', '0')
          }
          break
        case 'lrtb':
          oldCss[this.prefix + 'paddingHorizontal'] = this.model[
            this.prefix + 'paddingHorizontal'
          ]
          oldCss[this.prefix + 'paddingVertical'] = this.model[
            this.prefix + 'paddingVertical'
          ]
          css[this.prefix + 'paddingHorizontal'] = '2%'
          css[this.prefix + 'paddingVertical'] = '2%'
          this.model[this.prefix + 'paddingHorizontal'] = '2%'
          this.$set(this.model, this.prefix + 'paddingVertical', '2%')
          break
        case 'none':
          oldCss[this.prefix + 'paddingHorizontal'] = this.model[
            this.prefix + 'paddingHorizontal'
          ]
          css[this.prefix + 'paddingHorizontal'] = '0'
          this.model[this.prefix + 'paddingHorizontal'] = '0'
          if (this.model[this.prefix + 'paddingVertical'] !== undefined) {
            oldCss[this.prefix + 'paddingVertical'] = this.model[
              this.prefix + 'paddingVertical'
            ]
            css[this.prefix + 'paddingVertical'] = 0
            this.$set(this.model, this.prefix + 'paddingVertical', '0')
          }
          break
        default:
          break
      }

      this.onCssChange(oldCss, css)
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
.padding-content__area {
  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 26px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: $--border-radius-base;
    background: #373d41;
    .padding-box__outer {
      box-sizing: border-box;
      display: block;
      padding: 0 6px;
      width: 40px;
      height: 34px;
      border: 2px solid #fff;
      background: #596368;
      .padding-box__inner {
        display: block;
        width: 100%;
        height: 100%;
        background: #373d41;
      }
    }
    .vertical-padding {
      padding: 6px 0;
    }
    .around-padding {
      padding: 6px;
    }

    .none-padding {
      padding: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
  li.selected {
    background: $--color-main;
    .padding-box__outer {
      background: $--background-hover;
      .padding-box__inner {
        background: $--color-main;
      }
    }
  }
}
</style>
