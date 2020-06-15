<template>
  <div class="header-foot__select--area">
    <div
      class="header-area"
      :class="{selected: selectedArea == 'Header'}"
      :style="{display: (pageInfo && pageInfo.templateId) || pageInfo && pageInfo.pageType == 'Template' ? 'block' : 'none'}"
      @click="_handleSelectHeader"
    ></div>
    <div class="content-area" :style="{display: pageInfo && pageInfo.pageType !== 'Template' ? 'block' : 'none'}"></div>
    <div
      class="footer-area"
      :class="{selected: selectedArea == 'Footer'}"
      :style="{display: pageInfo && pageInfo.templateId}"
      @click="_handleSelectFooter"
    ></div>
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
      pageInfo: null
    }
  },
  computed: {
    selectedArea: {
      get: function() {
        return this.model.selectedAreaId
      },
      set: function() {}
    }
  },
  mounted() {
    if (window.smSite) {
      this.pageInfo = window.smSite.getCurrentPage()
    }
  },
  methods: {
    _handleSelectHeader() {
      const header = document
        .getElementById('site-frame')
        .contentWindow.document.getElementById('cmv_Header')
      if (header) {
        this.model.selectedAreaId = 'Header'
        header.click()
        this.$emit('changeArea', '1')
      }
    },
    _handleSelectFooter() {
      const footer = document
        .getElementById('site-frame')
        .contentWindow.document.getElementById('cmv_Footer')
      if (footer) {
        this.model.selectedAreaId = 'Footer'
        footer.click()
        this.$emit('changeArea', '2')
      }
    },
    onDataChange(action, oldData, data) {
      if (window.smSite.onDataChange) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-foot__select--area {
  padding: 23px 65px 33px;
  .header-area,
  .footer-area {
    width: 150px;
    height: 12px;
    cursor: pointer;
    background: $--panel-background-content-color;
  }
  .header-area {
    margin-bottom: 5px;
  }
  .content-area {
    margin-bottom: 5px;
    width: 150px;
    height: 64px;
    background: $--panel-background-content-color;
  }
  .selected {
    background: $--background-selected;
  }
}
</style>
