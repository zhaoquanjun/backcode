<template>
  <div v-show="show" class="image-select--upload__area">
    <div class="mask"></div>
    <div id="content">
      <el-header class="modal-header">
        <span style="font-size: 16px;">我的图片</span>
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
import { Message } from 'element-ui'
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
  computed: {
    isFirst: {
      get: function() {
        const first = this.model['IsFirst']
        return first
      },
      set: function() {}
    }
  },
  watch: {
    isFirst(newVal, oldVal) {
      if (newVal) {
        this.$emit('uploadImg')
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isFirst) {
        this.$emit('uploadImg')
      }
    })
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
        this.model['IsFirst'] = false
        this.$refs.imgList.$refs.gridList.emptySelected()
      } else {
        Message.warning('请选择图片')
      }
    },
    // 关闭图片选择弹窗
    cancelgetImg() {
      this.$emit('handleCloseModal')
      this.model['IsFirst'] = false
      Bus.$emit('closePopup')
    },
    setBgImage(newValue) {
      const oldValue = this.model['Cover']
      if (oldValue !== newValue) {
        this.model['Cover'] = newValue
        const oldData = {}
        const data = {}
        oldData['Cover'] = oldValue
        data['Cover'] = newValue
        this.onDataChange('changeCover', oldData, data)
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
