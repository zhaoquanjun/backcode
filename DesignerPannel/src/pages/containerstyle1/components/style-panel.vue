<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item v-show="type === 'pc'" name="1">
      <template slot="title">
        <span
          v-show="activeNames !== '1'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >通栏</span>
      </template>
      <section-is-full
        :model="model"
        :model-data="modelData"
        :prefix="prefix"
      />
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
        >吸顶设置</span>
      </template>
      <switch-area :event-name="'toggleSticky'" :model-data="modelData" :name="'toggleSticky'">
        <span class="setting-attribute--title">滚动吸顶</span>
      </switch-area>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span
          v-show="activeNames !== '3'"
          class="collapse-icon title-item text-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '3' }"
        >内容对齐</span>
      </template>
      <text-align-group :model="model" :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span
          v-show="activeNames !== '4'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '4' }"
        >内容区背景</span>
      </template>
      <background :model="model" :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc' && width === 1160" name="5">
      <template slot="title">
        <span
          v-show="activeNames !== '5'"
          class="collapse-icon title-item background-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '5' }"
        >通栏背景</span>
      </template>
      <background :model="model" :prefix="'$outer-'" />
    </el-collapse-item>
    <el-collapse-item name="6">
      <template slot="title">
        <span
          v-show="activeNames !== '6'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '6' }"
        >填充方式</span>
      </template>
      <padding-area :model="model" :prefix="prefix" :list="[0, 2, 3]" />
    </el-collapse-item>
    <el-collapse-item name="7">
      <template slot="title">
        <span
          v-show="activeNames !== '7'"
          class="collapse-icon title-item border-icon"
        ></span>
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '7' }"
        >间距</span>
      </template>
      <margin-area
        :model="model"
        :prefix="'$'"
        :name="'innerMargin'"
        :value-range="fontRange.columnsmr"
      >
        <span class="setting-attribute--title" style="width: 80px;">间距(%)</span>
      </margin-area>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import SectionIsFull from './set-section-isfull'
import TextAlignGroup from '@comp/contentAlign/text-align-group'
import Background from '@comp/background/background'
import PaddingArea from '@comp/layout/padding'
import MarginArea from '@comp/layout/margin'
import SwitchArea from '@comp/form/form-switch-data'
export default {
  components: {
    SectionIsFull,
    TextAlignGroup,
    Background,
    PaddingArea,
    MarginArea,
    SwitchArea
  },
  props: {
    model: {
      type: Object
    },
    modelData: {
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
      activeNames: '1',
      type: 'pc'
    }
  },
  computed: {
    width: {
      get: function() {
        return parseInt(this.model[this.prefix + 'width'])
      },
      set: function() {}
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
          if (_this.type === 'phone') {
            this.activeNames = '2'
          }
          if (_this.type === 'pc') {
            this.activeNames = '1'
          }
        }
      }
    }
  }
}
</script>
