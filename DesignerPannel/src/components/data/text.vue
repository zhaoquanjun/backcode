<template>
  <div class="text-setting__section">
    <div class="setting-block--subtitle">{{ label }}</div>
    <el-input
      v-model="text"
      type="text"
      :placeholder="placeholder"
      :show-word-limit="isShowWordLimit"
      :maxlength="lengthLimit"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => {
        return '按钮文字'
      }
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    model: {
      type: Object
    },
    name: {
      type: String
    },
    lengthLimit: {
      type: Number
    },
    isShowWordLimit: {
      type: Boolean,
      default: false
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
        return this.model[this.name]
      },
      set: function(newVal) {
        if (this.lengthLimit) {
          newVal =
            newVal.length > this.lengthLimit
              ? newVal.slice(0, this.lengthLimit)
              : newVal
        }
        if (!this.oldRecord) {
          this.oldRecord = this.model[this.name]
        }
        if (this.oldRecord !== newVal) {
          this.model[this.name] = newVal
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const oldData = {}
            const data = {}
            oldData[this.name] = this.oldRecord
            data[this.name] = newVal
            this.oldRecord = null
            this.onDataChange('change' + this.name, oldData, data)
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

