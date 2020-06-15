<template>
  <div v-if="show" class="image-select--upload__area">
    <div class="mask"></div>
    <div id="content">
      <videoManage
        ref="imgList"
        :multiple="false"
        @getCheckedList="getCheckedList"
        @cancelgetImg="cancelgetImg"
      >
        <div slot="modal-footer" class="modal-footer">
          <div class="ym-button--isplain" style="margin-right: 16px;" @click="cancelgetImg">取消</div>
          <div class="ym-button--primary" @click="getImg">确定</div>
        </div>
      </videoManage>
    </div>
  </div>
</template>

<script>
import Bus from '@/bus.js'
import { Message } from 'element-ui'
import videoManage from '@comp/videoManage/index'
export default {
  components: {
    videoManage
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
      checkedList: []
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
    isFirst(newVal) {
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
    getCheckedList(info) {
      this.checkedList = info
    },
    getImg() {
      if (this.checkedList.length > 0) {
        this.$emit('closeDialog', '选择视频')
        this.$emit('selectVideo', this.checkedList)
        this.model['IsFirst'] = false
      } else {
        Message.warning('请选择视频')
      }
    },
    // 关闭图片选择弹窗
    cancelgetImg() {
      this.$emit('closeDialog')
      this.model['IsFirst'] = false
      Bus.$emit('closePopup')
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
@import '@static/styles/components/select-video-popup.scss';
.image-select--upload__area {
  #content {
    height: auto !important;

    .modal-footer {
      padding-right: 24px;
      padding-top: 16px;
    }

    #content-manage {
      height: auto !important;
    }
  }
}
</style>
