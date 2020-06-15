<template>
  <el-collapse v-model="activeNames" :accordion="false">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames == '1'"
          class="collapse-icon title-item border-icon"
        ></span><span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >边框</span>
      </template>
      <border
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
        :control-name="'image'"
      />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames == '2'"
          class="collapse-icon title-item shadow-icon"
        ></span><span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >阴影</span>
      </template>
      <shadow-area-new
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import Border from './border'
import ShadowAreaNew from '@comp/shadow/new-shadow'
export default {
  components: {
    Border,
    ShadowAreaNew
  },
  props: {
    model: {
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
      activeNames: ['1', '2']
    }
  },
  methods: {}
}
</script>
