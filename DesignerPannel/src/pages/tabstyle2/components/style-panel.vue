<template>
  <el-collapse v-model="activeNames" :accordion="true">
    <el-collapse-item name="1">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '1' }"
        >标签</span>
      </template>
      <height-area
        :model="model"
        :prefix="prefix"
        :name="'height'"
        :value-range="fontRange.tabh"
      >
        <span class="setting-attribute--title">高度</span>
      </height-area>
      <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">文字</p>
      <div class="flex-between-center--area">
        <!-- 字体下拉框 begin -->
        <font-family
          :model="model"
          :prefix="prefix"
          @onCssChange="onCssChange"
        ></font-family>
        <!-- 字体下拉框 end -->
        <!-- 字体尺寸输入框 begin -->
        <font-size
          :model="model"
          :prefix="prefix"
          :value-range="fontRange.newslisttitlefs"
          @onCssChange="onCssChange"
        ></font-size>
        <!-- 字体尺寸输入框 end -->
      </div>
      <div class="font-section flex-between-center--area row-top__dis">
        <ul class="font-style">
          <li>
            <font-weight
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-weight>
          </li>
          <li>
            <font-italic
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-italic>
          </li>
          <li>
            <font-underline
              :prefix="prefix"
              :model="model"
              @onCssChange="onCssChange"
            ></font-underline>
          </li>
          <li>
            <font-align-group
              :prefix="'$title-'"
              :model="model"
              @onCssChange="onCssChange"
            ></font-align-group>
          </li>
        </ul>
        <font-color
          :model="model"
          :prefix="prefix"
          @onCssChange="onCssChange"
        ></font-color>
      </div>
      <div class="divider"></div>
      <line-background class="row-top__dis" :model="model" :prefix="'$line-'">
        <span class="setting-attribute--title">线条颜色</span>
      </line-background>
      <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">背景</p>

      <background-area :model="model" :prefix="prefix"></background-area>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span
          class="collapse-title title-item"
          :class="{ active: activeNames == '2' }"
        >内容</span>
      </template>
      <p class="setting-block--subtitle">
        对齐方式
      </p>
      <text-align-group
        class="row-top__dis"
        :model="model"
        :prefix="'$con-'"
      ></text-align-group>
      <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">背景</p>
      <background-area :model="model" :prefix="'$con-'">

      </background-area>
      <!-- <div class="divider"></div>
      <p class="setting-block--subtitle row-top__dis">边框</p>
      <border-width
        :model="model"
        :prefix="'$con-'"
        :name="'bdWidth'"
        :value-range="fontRange.tabbw"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title ">线宽</span>
      </border-width>
      <border-color
        :model="model"
        :prefix="'$con-'"
        :width="232"
        @onCssChange="onCssChange"
      >
        <span class="setting-attribute--title ">颜色</span>
      </border-color> -->
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import HeightArea from '@comp/form/form-slider-css'
import TextAlignGroup from '@comp/contentAlign/text-align-group'
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'
import FontColor from '@comp/font/font-color'
import LineBackground from '@comp/background/common-bg-color'
import backgroundArea from '@comp/background/background'
export default {
  components: {
    FontFamily,
    FontSize,
    HeightArea,
    TextAlignGroup,
    FontWeight,
    FontItalic,
    FontUnderline,
    FontAlignGroup,
    FontColor,
    LineBackground,
    backgroundArea
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    length: {
      type: Number
    },
    fontRange: {
      type: Object
    }
  },
  data() {
    return {
      activeNames: ['1', '2'],
      timer: null,
      oldValue: null,
      oldOuterWidthValue: null
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
  mounted() {
    this.$nextTick(() => {
      this.oldWidthValue = this.model[this.prefix + 'width']
      this.oldOuterWidthValue = this.model[this.prefix + 'outer-width']
    })
  },
  methods: {
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    },
    _handleChangeValue(newVal) {
      const oldWidthVal =
        this.oldWidthValue || this.model[this.prefix + 'width']
      if (newVal + 'px' !== oldWidthVal) {
        this.model[this.prefix + 'width'] = newVal + 'px'
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const oldData = {}
          const data = {}
          oldData[this.prefix + 'width'] = oldWidthVal
          oldData['$cwidth'] = this.model['$cwidth']
          data[this.prefix + 'width'] = newVal + 'px'
          data['$cwidth'] =
            newVal * this.length + parseInt(this.length - 1) + 'px'
          this.onCssChange(oldData, data)
          this.oldWidthValue = newVal + 'px'
          this.oldOuterWidthValue =
            newVal * this.length + parseInt(this.length - 1) + 'px'
        }, 200)
      }
    },
    _handleInputValue(newVal) {
      this.model[this.prefix + 'width'] = newVal + 'px'
    }
  }
}
</script>
