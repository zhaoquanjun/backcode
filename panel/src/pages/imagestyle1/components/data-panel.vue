<template>
  <div class>
    <div class="setting-block__section">
      <background-image :model="model"></background-image>
    </div>
    <div class="setting-block__section setting-block__top">
      <h3 class="setting-block--title">图片标题</h3>
      <el-input v-model="text" placeholder="请输入图片标题"></el-input>
    </div>
    <div class="setting-block__section setting-block__top">
      <h3 class="setting-block--title">图片链接</h3>
      <link-area :model="model" :action-key="'changeLink'" />
    </div>
  </div>
</template>

<script>
import BackgroundImage from './bg-image'
import linkArea from '@comp/link/index'
export default {
  components: {
    BackgroundImage,
    linkArea
  },
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
        val = val.length > 32 ? val.slice(0, 32) : val
        if (!this.oldRecord) this.oldRecord = this.model['Text']
        if (val !== this.oldRecord) {
          this.model['Text'] = val
          if (this.timer) clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            const oldData = {}
            const data = {}
            oldData['Text'] = this.oldRecord
            data['Text'] = val
            this.onDataChange('changeImageText', oldData, data)
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

