<template>
  <div class="size-section flex-between-center--area">
    <div class="size-section__width flex-between-center--area">
      宽
      <el-input
        v-model="width"
        size="small"
        placeholder="自适应"
        @input="_handleWidthInputChange"
        @focus="_handleGetWidthFocus"
        @blur="_handleGetWidthBlur"
      ></el-input>
      <div v-show="widthAutoShow" class="div-select" @mousedown="_handleWidthValueSelect">自适应</div>
    </div>
    <div class="size-section__height flex-between-center--area">
      高
      <el-input
        v-model="height"
        size="small"
        placeholder="自适应"
        @input="_handleHeightInputChange"
        @focus="_handleGetHeightFocus"
        @blur="_handleGetHeightBlur"
      ></el-input>
      <div v-show="heightAutoShow" class="div-select" @mousedown="_handleHeightValueSelect">自适应</div>
    </div>
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
    dataModel: {
      type: Object
    },
    id: {
      type: String
    },
    sizeRange: {
      type: Object,
      default: () => {
        return {
          minValue: 16,
          maxValue: 2560
        }
      }
    }
  },
  data() {
    return {
      timer: function() {},
      oldWidthRecord: null,
      oldHeightRecord: null,
      widthAutoShow: false,
      heightAutoShow: false
    }
  },
  computed: {
    width: {
      get: function() {
        const width =
          this.model[this.prefix + 'width'] === 'auto' ||
          this.model[this.prefix + 'width'] === ''
            ? ''
            : parseInt(this.model[this.prefix + 'width'])
        return width
      },
      set: function() {}
    },
    height: {
      get: function() {
        const height =
          this.model[this.prefix + 'height'] === 'auto' ||
          this.model[this.prefix + 'height'] === ''
            ? ''
            : parseInt(this.model[this.prefix + 'height'])
        return height
      },
      set: function() {}
    }
  },
  methods: {
    _handleWidthInputChange(val) {
      if (/^\d+$/.test(val) || val === '') {
        if (!this.oldWidthRecord) { this.oldWidthRecord = this.model[this.prefix + 'width'] }
        const newVal = val === '' ? 'auto' : val + 'px'
        this._handleChangeValue(this.oldWidthRecord, newVal, 'width')
      }
    },
    _handleWidthValueSelect() {
      this.model[this.prefix + 'width'] = ''
      this.widthAutoShow = false
      const newVal = 'auto'
      const oldValue = this.model[this.prefix + 'width']
      this._handleChangeValue(oldValue, newVal, 'width')
    },
    _handleHeightInputChange(val) {
      if (/^\d+$/.test(val) || val === '') {
        if (!this.oldHeightRecord) { this.oldHeightRecord = this.model[this.prefix + 'height'] }
        const newVal = val === '' ? 'auto' : val + 'px'
        this._handleChangeValue(this.oldHeightRecord, newVal, 'height')
      }
    },
    _handleHeightValueSelect() {
      this.model[this.prefix + 'height'] = ''
      this.heightAutoShow = false
      const newVal = 'auto'
      const oldValue = this.model[this.prefix + 'height']
      this._handleChangeValue(oldValue, newVal, 'height')
    },
    _handleChangeValue(oldValue, newVal, key) {
      if (oldValue !== newVal) {
        this._handleCascaderChange(oldValue, newVal, key)
      }
    },
    _handleCascaderChange(oldValue, newVal, key) {
      const data = {}
      const oldData = {}
      let curHeight = 'auto'
      let curWidth = 'auto'
      const ratio = this._getImgRatio()
      if (key === 'width') {
        curHeight = newVal === 'auto' ? newVal : parseInt(newVal) / ratio + 'px'
        this.model[this.prefix + 'height'] = curHeight
        data[this.prefix + 'height'] = curHeight
        oldData[this.prefix + 'height'] = oldValue
      }
      if (key === 'height') {
        curWidth = newVal === 'auto' ? newVal : parseInt(newVal) * ratio + 'px'
        this.model[this.prefix + 'width'] = curWidth
        data[this.prefix + 'width'] = curWidth
        oldData[this.prefix + 'width'] = this.oldWidthRecord
      }
      this.model[this.prefix + key] = newVal
      oldData[this.prefix + key] = oldValue
      data[this.prefix + key] = newVal
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let limitWidth = 'auto'
        let limitHeight = 'auto'
        if (newVal !== '' && newVal !== 'auto') {
          if (parseInt(newVal) < this.sizeRange.minValue) {
            if (key === 'width') {
              limitWidth = this.sizeRange.minValue + 'px'
              limitHeight = this.sizeRange.minValue / ratio + 'px'
            } else {
              limitHeight = this.sizeRange.minValue + 'px'
              limitWidth = this.sizeRange.minValue * ratio + 'px'
            }
            data[this.prefix + 'width'] = limitWidth
            data[this.prefix + 'height'] = limitHeight
            this.model[this.prefix + 'width'] = limitWidth
            this.model[this.prefix + 'height'] = limitHeight
          }
          if (parseInt(newVal) > this.sizeRange.maxValue) {
            if (key === 'width') {
              limitWidth = this.sizeRange.maxValue + 'px'
              limitHeight = this.sizeRange.maxValue / ratio + 'px'
            } else {
              limitHeight = this.sizeRange.maxValue + 'px'
              limitWidth = this.sizeRange.maxValue * ratio + 'px'
            }
            data[this.prefix + 'width'] = limitWidth
            data[this.prefix + 'height'] = limitHeight
            this.model[this.prefix + 'width'] = limitWidth
            this.model[this.prefix + 'height'] = limitHeight
          }
        }
        this.onCssChange(oldData, data)
        this.oldWidthRecord = null
        this.oldHeightRecord = null
      }, 1000)
    },
    _getImgRatio() {
      let ratio = 1
      const el = window.frames['site-frame'].contentDocument.getElementById(
        this.id
      )
      ratio = el.offsetWidth / el.offsetHeight
      return ratio
    },
    _handleGetWidthFocus() {
      this.widthAutoShow = true
    },
    _handleGetWidthBlur() {
      this.widthAutoShow = false
    },
    _handleGetHeightFocus() {
      this.heightAutoShow = true
    },
    _handleGetHeightBlur() {
      this.heightAutoShow = false
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
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
.size-section {
  div.size-section__width,
  div.size-section__height {
    position: relative;
    font-size: $--font-size-small;
    color: $--usual-font-color-sub;
    .div-select {
      position: absolute;
      right: 12px;
      bottom: -32px;
      font-size: 12px;
      color: $--usual-font-color-main;
      width: 60px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      background: $--panel-background-color;
      box-shadow: $--area-shadow-base;
      border-radius: $--border-radius-base;
      border: 1px solid $--usual-border-color;
      &:hover {
        color: $--font-color-hover;
      }
    }
  }
}
.size-section /deep/ .el-input--small {
  margin: 0 12px;
  width: 60px;
}
.size-section /deep/ .el-input__inner {
  padding-left: 8px !important;
  padding-right: 8px !important;
  text-align: left;
  cursor: auto;
}
</style>
