<template>
  <el-collapse v-model="activeNames"
               :accordion="true">
    <el-collapse-item v-show="type === 'pc'"
                      name="1">
      <template slot="title">
        <span v-show="activeNames !== '1'"
              class="collapse-icon title-item text-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '1' }">图片设置</span>
      </template>
      <switch-area :prefix="'$img-'"
                   :model="model"
                   :name="'show'"
                   style="margin: 10px 0;"
                   @onCssChange="changeImgShow">
        <span class="setting-attribute--title">显示图片</span>
      </switch-area>
      <template v-if="model.styleModel.cssvars['$img-show'] == 'block'">
        <image-height class="row-top__dis"
                      :model="model.styleModel.cssvars"
                      :prefix="prefix"
                      :name="'imgHeight'"
                      :value-range="fontRange.newslistih">
          <span class="setting-attribute--title">高度</span>
        </image-height>
        <div class="divider"></div>
        <span class="setting-attribute--title row-top__dis"
              style="display: inline-block;">图文比例</span>
      </template>
      <template v-if="model.styleModel.cssvars['$img-show'] == 'block'">
        <percent :model="model.dataModel"
                 :left-percent="'leftPercent'"
                 :right-percent="'rightPercent'"
                 :action-key="'changeNewslistWidth'" />
      </template>
    </el-collapse-item>
    <el-collapse-item v-show="type === 'pc'"
                      name="2">
      <template slot="title">
        <span v-show="activeNames !== '2'"
              class="collapse-icon title-item background-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '2' }">行间距</span>
      </template>
      <list-space :model="model.styleModel.cssvars"
                  :prefix="'$child-'"
                  :name="'padding'"
                  :value-range="fontRange.newslistlh">
        <span class="setting-attribute--title">间距</span>
      </list-space>
    </el-collapse-item>
    <el-collapse-item name="3">
      <template slot="title">
        <span v-show="activeNames !== '3'"
              class="collapse-icon title-item border-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '3' }">分割线</span>
      </template>
      <divider :model="model.styleModel.cssvars"
               :prefix="prefix" />
    </el-collapse-item>
    <el-collapse-item name="4">
      <template slot="title">
        <span v-show="activeNames !== '4'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '4' }">标题</span>
      </template>
      <title-font :model="model.styleModel.cssvars"
                  :prefix="prefix"
                  :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="5">
      <template slot="title">
        <span v-show="activeNames !== '5'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '5' }">简介</span>
      </template>
      <desc-font :model="model"
                 :prefix="prefix"
                 :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="6">
      <template slot="title">
        <span v-show="activeNames !== '6'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '6' }">日期</span>
      </template>
      <date-font :model="model"
                 :prefix="prefix"
                 :font-range="fontRange" />
    </el-collapse-item>
    <el-collapse-item name="7">
      <template slot="title">
        <span v-show="activeNames !== '7'"
              class="collapse-icon title-item shadow-icon"></span>
        <span class="collapse-title title-item"
              :class="{ active: activeNames == '7' }">分页设置</span>
      </template>
      <pagitation :model="model"
                  :prefix="prefix"
                  :font-range="fontRange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import TitleFont from './title-font'
import DescFont from './desc-font'
import DateFont from './date-font'
import Pagitation from '@comp/pagitation/pagitation'
import SwitchArea from '@comp/form/form-switch'
import Percent from '@comp/font/font-percent'
import ImageHeight from '@comp/form/form-slider-css'
import ListSpace from '@comp/form/form-slider-css'
import Divider from './divider'
export default {
  components: {
    TitleFont,
    DescFont,
    DateFont,
    Pagitation,
    Percent,
    ImageHeight,
    ListSpace,
    Divider,
    SwitchArea
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
  data () {
    return {
      activeNames: '1',
      type: 'pc'
    }
  },
  created () {
    if(window.smSite) {
      this.type = window.smSite.getCurrentEquipmentType()
    }
    this._getCurrentEquipmentType()
  },
  methods: {
    onCssChange (oldData,data) {
      if(window.smSite) {
        window.smSite.onCssChange(oldData,data)
      }
    },
    onDataChange (action,oldData,data) {
      if(window.smSite) {
        window.smSite.onDataChange(action,oldData,data)
      }
    },
    changeImgShow (oldData,data) {
      this.onCssChange(oldData,data)
      this.onDataChange('changeNewsCoverShow',oldData,data)
    },
    _getCurrentEquipmentType () {
      const _this = this
      if(window.smSite) {
        window.smSite.setEquipmentType = function(c) {
          _this.type = c && c
        }
      }
    }
  }
}
</script>
