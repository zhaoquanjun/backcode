<template>
  <div>
    <div class="setting-block__section">
      <p class="setting-block--title">前景</p>
      <qrcode-color
        :model="model"
        :prefix="prefix"
        :name="'DarkColor'"
        :width="188"
        @onDataChange="onDataChange"
      />
    </div>
  </div>
</template>

<script>
import QrcodeColor from './qrCode-color'
export default {
  components: {
    QrcodeColor
  },
  props: {
    model: {
      type: Object
    },
    cssmodel: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      // activeNames: ["1", "2", "3"]
    }
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
