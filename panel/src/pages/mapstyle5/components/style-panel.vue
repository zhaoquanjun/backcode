.no-address-wrap<template>
  <div class="setting-block__top setting-block__section">
    <h3 class="setting-block--title">显示设置</h3>
    <div class="switch-sction">
      <span class="setting-attribute--title">显示工具条</span>
      <el-switch v-model="switchShowToolBar"></el-switch>
    </div>
    <div class="divider"></div>
    <div class="switch-sction">
      <span class="setting-attribute--title">显示卫星混合地图</span>
      <el-switch v-model="switchShowMapTypes"></el-switch>
    </div>
    <div class="divider"></div>
    <div class="row-top__dis">
      <title-line-height
        :model="model"
        :name="'zoom'"
        :value-range="model.zoomRange"
        :event-name="'onDataChange'"
        @onDataChange="onDataChange"
      >
        <span class="setting-attribute--title">缩放</span>
      </title-line-height>
    </div>
  </div>
</template>

<script>
import TitleLineHeight from '@comp/form/form-slider-data'
export default {
  components: {
    TitleLineHeight
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      oldRecord: null
    }
  },
  computed: {
    switchShowToolBar: {
      get: function() {
        return Boolean(this.model['showToolBar'])
      },
      set: function(val) {
        this.oldRecord = Boolean(this.model['showToolBar'])
        if (this.oldRecord != Boolean(val)) {
          const oldData = {}; const data = {}
          oldData['showToolBar'] = this.oldRecord
          data['showToolBar'] = Boolean(val)
          this.model['showToolBar'] = Boolean(val)
          this.onDataChange('changeToolBar', oldData, data)
        }
      }
    },
    switchShowMapTypes: {
      get: function() {
        return Boolean(this.model['showMapTypes'])
      },
      set: function(val) {
        this.oldRecord = Boolean(this.model['showMapTypes'])
        if (this.oldRecord != Boolean(val)) {
          const oldData = {}; const data = {}
          oldData['showMapTypes'] = this.oldRecord
          data['showMapTypes'] = Boolean(val)
          this.model['showMapTypes'] = Boolean(val)
          this.onDataChange('changeMapType', oldData, data)
        }
      }
    }
  },
  mounted() {},
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
.title {
  font-size: 14px;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
  line-height: 20px;
}
.switch-sction {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
.text {
  font-size: 14px;
  font-weight: 400;
  color: rgba(38, 38, 38, 1);
  line-height: 20px;
}
</style>
