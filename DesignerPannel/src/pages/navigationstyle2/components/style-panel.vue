<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >主导航</span>
      </template>
      <nav-range
        :model="model.styleModel.cssvars"
        :prefix="'$navitem-'"
        :name="'width'"
        :value-range="fontRange.navitemwidth"
        @onCssChange="onCssChangeNavitemwidth"
      >
        <span
          class="setting-attribute--title"
          style="width: 70px;"
        >最小宽度</span>
      </nav-range>
      <nav-range
        :model="model.styleModel.cssvars"
        :prefix="'$navitem-'"
        :name="'height'"
        :value-range="fontRange.navitemheigth"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">高度</span>
      </nav-range>
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">文字</div>
      <title-font
        :model="model.styleModel.cssvars"
        :prefix="'$navitem-'"
        :font-range="fontRange.navitemfs"
        @onCssChange="onCssChange"
      />
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          v-show="activeNames !== '2'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >子导航</span>
      </template>
      <!-- <div class="setting-block--subtitle">
            <switch-area @onDataChange="onDataChange"  :model="model">自定义尺寸(关闭则自适应)</switch-area>
        </div> -->
      <!-- <nav-range
          :model="model.styleModel.cssvars"
          :prefix="'$child-navitem-'"
          :name="'width'"
          :valueRange="fontRange.navitemchildwidth"
          @onCssChange="onCssChange"
        >
          <span class="fsetting-attribute--title">宽度</span>
        </nav-range>
        <div style="padding:10px 0"></div>   -->
      <nav-range
        :model="model.styleModel.cssvars"
        :prefix="'$child-navitem-'"
        :name="'height'"
        :value-range="fontRange.navitemchildheigth"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title">高度</span>
      </nav-range>
      <div class="divider"></div>
      <div class="setting-block--subtitle row-top__dis">文字</div>
      <title-font
        :model="model.styleModel.cssvars"
        :prefix="'$child-navitem-'"
        :font-range="fontRange.navitemchildfs"
        @onCssChange="onCssChange"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleFont from './title-font'
import NavRange from '@/pages/navigationstyle1/components/form-slider-css'

export default {
  components: {
    TitleFont,
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
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    onCssChangeNavitemwidth(oldData, data) {
      this.onCssChange(oldData, data)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.onDataChange('changeNavContainerWidth', oldData, data)
        clearTimeout(this.timer)
      }, 500)
    }
  }
}
</script>
