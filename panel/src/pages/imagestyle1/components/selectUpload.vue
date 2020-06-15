<template>
  <div v-show="show" class="image-select--upload__area">
    <div class="mask"></div>
    <div id="content">
      <el-header class="modal-header">
        <span>我的图片</span>
        <span @click="cancelgetImg"><i class="iconfont iconguanbi"></i></span>
      </el-header>
      <img-manage ref="imgList" :multiple="false" @getImgInfo="getImgInfo">
        <div slot="modal-footer" class="modal-footer">
          <div class="ym-button--isplain" style="margin-right: 16px;" @click="cancelgetImg">取消</div>
          <div class="ym-button--primary" @click="getImg">确定</div>
        </div>
      </img-manage>
    </div>
  </div>
</template>

<script>
import Bus from '@/bus.js'
import imgManage from '@comp/imgManage/index'
export default {
  components: {
    imgManage
  },
  props: {
    model: {
      type: Object
    },
    show: {
      type: Boolean
    },
    getDataFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      imgData: []
    }
  },
  methods: {
    getChildData() {
      this.$refs.imgList.getPictureData()
    },
    getImgInfo(info) {
      this.imgData = info
    },
    getImg() {
      if (this.imgData.length > 0) {
        this.setBgImage(this.imgData[0].fullOssUrl)
        this.$emit('handleCloseModal', '更换图片', this.imgData[0])
        this.$refs.imgList.$refs.gridList.emptySelected()
      } else {
        if (window.smSite) {
          window.smSite.message(2, '请选择图片')
        }
      }
    },
    // 关闭图片选择弹窗
    cancelgetImg() {
      this.$emit('handleCloseModal')
      Bus.$emit('closePopup')
    },
    setBgImage(newValue) {
      const oldValue = this.model['Src']
      if (oldValue !== newValue) {
        this.model['Src'] = newValue
        const oldData = {}

        const data = {}
        oldData['Src'] = oldValue
        data['Src'] = newValue
        this.onDataChange('changeImageSrc', oldData, data)
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
<style lang="scss" scoped>
@import "@static/styles/components/select-picture-popup.scss";
</style>
