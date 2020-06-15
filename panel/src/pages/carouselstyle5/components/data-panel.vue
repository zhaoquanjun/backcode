<template>
  <div class="data-section">
    <div class="add-data__area">
      <div
        class="ym-button--column"
        :class="{ disabled: disabled }"
        @click="_handleSetPicture"
      >
        设置图片
      </div>
    </div>
    <set-banner-picture-attribute
      ref="imgConponent"
      :model="model"
      :limit="20"
      @onDataChange="onDataChange"
      @handleSetAddButtonStatus="handleSetAddButtonStatus"
    ></set-banner-picture-attribute>
  </div>
</template>

<script>
import SetBannerPictureAttribute from '@comp/data/list-item-operate'
export default {
  components: {
    SetBannerPictureAttribute
  },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    handleSetAddButtonStatus() {
      this.disabled = true
    },
    _handleSetPicture() {
      this.$refs.imgConponent.handleSetPicture()
    }
  }
}
</script>

<style lang="scss" scoped>
.data-section {
  .add-data__area {
    margin: 24px 24px;
  }
}
</style>
