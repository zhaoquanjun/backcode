<template>
  <div class="data-section">
    <div class="setting-block__section">
      <div class="setting-block--title">文字内容</div>
      <text-area
        :model="model"
        :name="'Text'"
        :length-limit="30"
      />
    </div>
    <div class="setting-block__section setting-block__top">
      <div class="setting-block--title">页面打开方式</div>
      <div>
        <el-radio
          v-model="way"
          label="_self"
          @change="handleChageLinkTarget('_self')"
        >当前窗口打开</el-radio>
      </div>
      <div class="row-top__dis">
        <el-radio
          v-model="way"
          label="_blank"
          @change="handleChageLinkTarget('_blank')"
        >新窗口打开</el-radio>
      </div>
    </div>
  </div>
</template>

<script>
import TextArea from '@comp/data/text'
export default {
  components: {
    TextArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    Text: {
      get: function() {
        return this.model['Text']
      },
      set: function(val) {
        const oldVal = this.model['Text']
        this.model['Text'] = val
        if (val != oldVal) {
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const oldData = {}
            const data = {}
            oldData['Text'] = this.model['Text']
            data['Text'] = val
            this.onDataChange('changeText', oldData, data)
          }, 500)
        }
      }
    },
    way: {
      get: function() {
        return this.model['Target']
      },
      set: function() {}
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    handleChageLinkTarget(val) {
      this.way = val
      const oldVal = this.model['Target']
      if (val != oldVal) {
        this.model['Target'] = val
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const oldData = {}
          const data = {}
          oldData['Target'] = this.model['Target']
          data['Target'] = val
          this.onDataChange('changeWay', oldData, data)
        }, 500)
      }
    }
  }
}
</script>
