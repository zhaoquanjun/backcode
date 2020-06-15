<template>
  <el-collapse
    v-model="activeNames"
    :accordion="true"
  >
    <el-collapse-item name="0">
      <template slot="title">
        <span
          v-show="activeNames !== '0'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '0' }"
        >间距</span>
      </template>
      <div>
        <list-space
          :model="model.styleModel.cssvars"
          prefix="$list-"
          name="space"
          :value-range="fontRange.atlas_4_listspace"
        >
          <span class="form-title__area">间距</span>
        </list-space>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import ListSpace from '@comp/form/form-slider-css'
export default {
  components: {
    ListSpace
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeNames: '0',
      type: 'pc'
    }
  },
  created() {
    if (window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    _getCurrentEquipmentType() {
      const _this = this
      if (window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.borderdashed-hr {
  margin: 15px 0;
  border-bottom: 1px dashed rgba(201, 217, 220, 1);
}
</style>
