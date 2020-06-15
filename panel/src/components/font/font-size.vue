<template>
  <div class="size">
    <el-input-number
      v-model="fontSize"
      controls-position="right"
      :step="1"
      :min="valueRange.minValue"
      :max="valueRange.maxValue"
      style="width:66px"
      size="small"
      maxlength="2"
      @change="_handleChangeSize"
    ></el-input-number>
  </div>
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
    },
    valueRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      timer: null,
      oldValue: null
    }
  },
  computed: {
    fontSize: {
      get: function() {
        const size = this.model[this.prefix + 'fontSize']
        return parseInt(size)
      },
      set: function(newVal) {
        this.model[this.prefix + 'fontSize'] =
          (newVal < this.valueRange.minValue
            ? this.valueRange.minValue
            : newVal) + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oldValue = this.model[this.prefix + 'fontSize']
      this.oldLineHeight = this.model[this.prefix + 'lineHeight']
        ? this.model[this.prefix + 'lineHeight']
        : null
    })
  },
  methods: {
    _handleChangeSize(newVal) {
      const oldValue = this.oldValue || this.model[this.prefix + 'fontSize']
      newVal = Math.round(newVal) || this.valueRange.minValue
      this.model[this.prefix + 'fontSize'] = newVal + 'px'
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const data = {}
        const oldData = {}
        data[this.prefix + 'fontSize'] = newVal + 'px'
        oldData[this.prefix + 'fontSize'] = oldValue
        this.onCssChange(oldData, data)
        this.oldValue = newVal + 'px'

        if (
          newVal === this.valueRange.minValue &&
          parseInt(this.oldValue) === newVal
        ) {
          this.model[this.prefix + 'fontSize'] = newVal - 1 + 'px'
        }
      }, 200)
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
