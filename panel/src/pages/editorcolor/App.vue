<template>
  <div class="editor-color__section" @click.stop>
    <el-color-picker
      v-model="textColor"
      size="small"
      :predefine="predefineColors"
      :show-alpha="true"
      @change="_handleChangeColor"
    ></el-color-picker>
  </div>
</template>

<script>
import themeConfig from '@/config/themeData'
export default {
  data() {
    return {
      textColor: 'rgba(38, 38, 38, 1)',
      timer: null,
      prefix: 'blue_color1',
      themeConfig: themeConfig
    }
  },
  computed: {
    predefineColors: {
      get: function() {
        return Object.values(themeConfig[this.prefix])
      },
      set: function() {}
    }
  },
  created() {
    if (window.smSite) {
      const _this = this
      window.smSite.setCurrentColor = function(d) {
        _this.textColor = d
      }
      window.smSite.getCurrentColorPreficx = function(c) {
        _this.prefix = c
      }
    }
  },
  methods: {
    _handleChangeColor(newVal) {
      this.textColor = newVal
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (window.smSite) {
          window.smSite.editorSetColor(newVal)
        }
      }, 200)
      return newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-color__section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
  .popup-content__box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
.editor-color__section /deep/ .el-color-picker--small {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  .el-color-picker__trigger {
    border: none;
    .el-color-picker__color {
      border: none;
    }
  }
}
</style>
