<template>
  <div class="setting-block__section row-top__dis">
    <p class="setting-block--title">代码</p>
    <el-input
      v-model="text"
      style="min-height: 300px;"
      type="textarea"
      maxlength="4096"
      show-word-limit
      placeholder="请输入代码"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      timer: null,
      oldRecord: null
    }
  },
  computed: {
    text: {
      get: function() {
        return this.model['Text']
      },
      set: function(val) {
        this.oldRecord = this.model['Text']
        if (val !== this.oldRecord) {
          this.model['Text'] = val
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const oldData = {}
            const data = {}
            oldData['Text'] = this.oldRecord
            data['Text'] = val
            this.onDataChange(null, oldData, data)
          }, 200)
        }
      }
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-block__section /deep/ .el-textarea {
  width: 100%;
  .el-textarea__inner {
    min-height: 300px !important;
    color: $--usual-font-color-main;
    background: $--popup-background-main;
    resize: none;
    border-radius: $--border-radius-base;
  }
}
</style>
