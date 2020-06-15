<template>
  <el-collapse v-model="activeNames" :accordion="false">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >主导航</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font-style2
        :model="model.styleModel.cssvars"
        :prefix="'$hov_navitem-'"
      />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">滑块背景</div>
      <background :model="model.styleModel.cssvars" :prefix="'$sliding-'" />
      <div class="divider"></div>
      <nav-range
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$sliding-'"
        :name="'height'"
        :value-range="fontRange.navslidingheight"
        @onCssChange="onCssChange"
      >
        <span
          class="setting-attribute--title"
          style="width: 70px;"
        >滑块高度</span>
      </nav-range>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >子导航</span>
      </template>
      <div class="setting-block--subtitle">文字</div>
      <font-style2
        :model="model.styleModel.cssvars"
        :prefix="'$hov_child-navitem-'"
      />
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">背景</div>
      <background
        :model="model.styleModel.cssvars"
        :prefix="'$hov_child-navitem-'"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import FontStyle2 from '@comp/font/font-group/font-style2'
import Background from '@comp/background/background'
import NavRange from '@comp/form/form-slider-css'
export default {
  components: {
    FontStyle2,
    Background,
    NavRange
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
      activeNames: '1'
    }
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
