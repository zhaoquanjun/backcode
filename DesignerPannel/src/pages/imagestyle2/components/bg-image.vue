<template>
  <div class="stpanel-parcel">
    <div class="row">
      <div
        class="upload-box"
        :style="{ backgroundImage: `url(${src})` }"
        @click="uploadImg"
      >
        <div class="image-operate">
          <div @click.stop="uploadImg">{{ btnName }}</div>
          <div @click.stop="beautifyImg">美化图片</div>
          <span class="line"></span>
        </div>
      </div>
    </div>
    <div>
      <image-manage
        ref="imageManageArea"
        :model="model"
        :show="show"
        @uploadImg="uploadImg"
        @handleCloseModal="handleCloseModal"
      />
    </div>

    <div class="beautify-img-editor">
      <el-dialog
        :visible.sync="isTuiImageEditorShow"
        :modal-append-to-body="false"
        class="imageDialog"
      >
        <div class="imageEditorApp">
          <tui-image-editor
            ref="tuiImageEditor"
            :include-ui="useDefaultUI"
            :model="model"
            :src="src"
            @uploadBase64Img="uploadBase64Img"
          ></tui-image-editor>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { uploadPictureBase64 } from '@api/imgManageApi'
import { ImageEditor } from '@comp/beautifyImageEditor/index'
import ImageManage from './selectUpload'
export default {
  components: {
    ImageManage,
    'tui-image-editor': ImageEditor
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    activeName: {
      type: String
    }
  },
  data() {
    return {
      btnName: '上传图片',
      show: false,
      getDataFlag: true,
      useDefaultUI: true,
      defaultImage: require('@static/images/image_default.png'),
      isTuiImageEditorShow: false,
      categoryId: 0,
      fileExtension: '.jpeg',
      oldRecord: null
    }
  },
  computed: {
    src: {
      get: function() {
        return this.model['Src']
      },
      set: function() {}
    }
  },
  created() {
    this._initUpdateImg()
    this._initBeautifyImage()
  },
  methods: {
    _initUpdateImg() {
      if (window.smSite) {
        window.smSite.updateImgControl = () => {
          this.uploadImg()
        }
      }
    },
    _initBeautifyImage() {
      if (window.smSite) {
        window.smSite.beautifyImgControl = () => {
          this.beautifyImg()
        }
      }
    },
    uploadImg() {
      this.show = true
      if (this.getDataFlag) {
        this.$refs.imageManageArea.getChildData()
        this.getDataFlag = false
      }
    },
    async uploadBase64Img(imgData, fileName) {
      var { data } = await uploadPictureBase64(
        imgData,
        fileName + this.fileExtension,
        this.categoryId
      )
      var ossImgUrl = data
      if (ossImgUrl) {
        this.oldRecord = this.model['Src']
        if (ossImgUrl !== this.oldRecord) {
          this.model['Src'] = ossImgUrl
          const oldData = {}

          const data = {}
          oldData['Src'] = this.oldRecord
          data['Src'] = ossImgUrl
          this.onDataChange('changeImageSrc', oldData, data)
        }
        this.isTuiImageEditorShow = false
        this.$refs.tuiImageEditor.close()
      }
    },
    beautifyImg() {
      this.isTuiImageEditorShow = true
    },
    handleCloseModal(msg, data) {
      if (msg) {
        this.btnName = msg
      }
      if (data) {
        this.categoryId = data.categoryId
        this.fileExtension = data.fileExtension
      }
      this.show = false
    },
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    }
  }
}
</script>
<style scoped>
.imageDialog /deep/ .el-dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1200px;
  transform: translate(-50%, -50%);
  margin-top: 0 !important;
}
</style>
<style lang="scss" scoped>
.stpanel-parcel {
  padding-top: 8px;
  .upload-box {
    position: relative;
    width: 230px;
    height: 115px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }

    .image-operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(38, 38, 38, 0.7);
      div {
        width: 50%;
        height: 100%;
        text-align: center;
        line-height: 32px;
        color: #fff;
        font-size: 12px;
      }

      .line {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 16px;
        background: #fff;
      }
    }
  }
}
</style>

<style lang="scss">
.imageEditorApp {
  // width: 1000px;
  height: 600px;
}
</style>
