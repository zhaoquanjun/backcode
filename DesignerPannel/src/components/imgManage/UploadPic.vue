<template>
  <div id="upload-img" class="upload-img">
    <!-- 一次可上传60张图片，单张图片大小不超过10MB -->
    <!-- 图片上传弹窗 header -->
    <el-row class="upload-head" type="flex" justify="space-between">
      <el-col :span="12">
        <span style="padding-right:8px; font-size: 12px;">上传至:</span>
        <SelectTree
          ref="treeX"
          style="width:140px"
          :tree-result="treeResult"
          node-key="id"
          accordion
          :expand-on-click-node="true"
          :category-name="nodeData.label"
          @chooseNode="chooseNode"
        />
      </el-col>
      <div></div>
    </el-row>
    <!-- 图片上传组件 begin-->
    <el-upload
      ref="upload"
      class="upload-pic"
      :action="uploadPicAction"
      :headers="headers"
      :on-remove="handleRemove"
      :on-success="handleSucess"
      :on-change="handleChange"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      list-type="picture-card"
      :auto-upload="false"
      :multiple="true"
      drag
      :is-folder="isFolder"
      :before-upload="beforeUpload"
    >
      <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
      <div
        v-show="fileList.length < 1"
        class="el-upload__text"
        @click="setFolder(false)"
      >
        将文件拖到此处，或
        <em>点击上传</em>
        <!-- {{fileList.length}} -->
      </div>
      <!--  style=" position: absolute;top: 60px; right: 136px; " -->
      <div
        class="ym-button--isplain"
        style="position: absolute;top: 65px; right: 22px;"
        @click="setFolder(false)"
      >
        选择图片
      </div>
      <!-- <el-button
        class="choose-img upload-btn"
        size="small"
        @click="setFolder(true)"
        type="default"
        style="position: absolute;top: 60px; right: 6px;"
      >选择文件夹</el-button> -->
    </el-upload>
    <el-row class="footer-upload-btn">
      <button
        :disabled="uploadDisabled"
        class="handle-upload"
        :class="[{ 'handle-upload-disabled': uploadDisabled }]"
        style="float:right cursor: pointer;"
        size="small"
        @click="submitUpload"
      >
        {{ isUploading ? '上传中…' : '开始上传' }}
      </button>
    </el-row>
    <!-- 图片上传组件 end-->
    <!-- 图片预览 begin -->
    <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <!-- 图片预览 end -->
  </div>
</template>

<script>
import SelectTree from './SelectTree'
import { isImgFile, imgSize } from '@utils/index.js'

export default {
  components: {
    SelectTree
  },
  props: ['treeResult', 'uploadPicUrl', 'nodeData'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      isFolder: false,
      uploadDisabled: true,
      isUploading: false,
      fileList: [],
      upload2Category: { label: '全部分类', id: 0 },
      uploadPicAction: `${this.uploadPicUrl}/0`,
      headers: {
        appId: '',
        Authorization: ''
      },
      uploadSucess: false,
      count: 0,
      limit: 60 // 自定义允许上传的个数
    }
  },
  mounted() {
    let appid = null
    const token = this._getJwtToken()
    if (window.smSite.getAppIdByCookie) {
      appid = window.smSite.getAppIdByCookie()
    }
    this.headers = {
      appId: appid,
      Authorization: 'Bearer ' + token
    }
    if (this.nodeData) {
      this.uploadPicAction = `${this.uploadPicUrl}/${this.nodeData.id}`
    }
  },
  methods: {
    // 预览大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 选择图片时触发
    handleChange(file, fileList) {
      fileList.filter((item, index) => {
        if (!imgSize(item.size, 10)) {
          fileList.splice(index, 1)
        }
        if (!isImgFile(item.raw.type)) {
          fileList.splice(index, 1)
        }
        if (imgSize(item.size, 10) && isImgFile(item.raw.type)) {
          this.uploadDisabled = false
        }
      })
      //
      if (fileList && fileList.length > this.limit) {
        this.onExceed(fileList)
      }
    },
    // 上传图片超出数量限制时触发
    onExceed(fileList) {
      if (fileList.length > this.limit) {
        fileList = fileList.splice(this.limit)
      }
      this.$notify({
        customClass: 'notify-error', //  notify-success ||  notify-error
        message: `上传图片文件超过数量限制`,
        showClose: false,
        duration: 1500
      })
    },
    // 图片上传成功时触发
    handleSucess(response, file, fileList) {
      if (++this.count == fileList.length) {
        setTimeout(() => {
          this.$emit('switchUploadBoxShowStatus', 'uploadImg')
          this.uploadDisabled = true
          this.isUploading = false
          // this.$emit("getTree");
          this.$refs.upload.clearFiles()
          this.$notify({
            customClass: 'notify-success', //  notify-success ||  notify-error
            message: `成功上传${fileList.length}图片`,
            showClose: false,
            duration: 1500
          })
        }, 500)
      }
    },
    // 移除图片时触发
    handleRemove(file, fileList) {
      if (fileList < 1) this.uploadDisabled = true
    },
    setFolder(isFolder) {
      this.isFolder = isFolder
    },
    // 选择分类节点
    chooseNode(data) {
      this.upload2Category = data
      this.uploadPicAction = `${this.uploadPicUrl}/${this.upload2Category.id}`
    },
    // 点击上传按钮
    submitUpload() {
      this.hideImgName()
      this.isUploading = true
      this.uploadDisabled = true
      this.count = 0
      if (this.nodeData) {
        this.uploadPicAction = `${this.uploadPicUrl}/${this.nodeData.id}`
      }
      const token = this._getJwtToken()
      this.headers.Authorization = 'Bearer ' + token
      this.$refs.upload.submit()
    },
    // 上传图片时
    beforeUpload(file) {
      const isPic = isImgFile(file.type)
      const isSizeOk = imgSize(file.size)
      const maxMb = 10
      if (!isPic) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: `上传图片只能是 图片 格式!`,
          showClose: false,
          duration: 2000
        })
        return false
      }
      if (!isSizeOk) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: `上传图片大小不能超过 ${maxMb}MB!`,
          showClose: false,
          duration: 2000
        })
        return false
      }
      return isPic && isSizeOk
    },
    hideImgName() {
      // 点击上传时隐藏图片名称避免样式错乱
      const imgName = document.querySelectorAll('.el-upload-list__item-name')
      for (let i = 0; i < imgName.length; i++) {
        imgName[i].style.display = 'none'
      }
    },
    _getJwtToken() {
      var tk = window.localStorage.getItem('wzdesignxkoen')
      return tk
    }
  }
}
</script>
<style scoped lang="scss">
.upload-pic /deep/ .el-upload-dragger {
  position: static;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.upload-pic .upload-btn:hover /deep/ span {
  color: $--popup-font-color-auxiliary;
}
.upload-pic /deep/ .el-upload-dragger .el-upload__text em {
  display: block;
  color: $--color-main;
  padding-top: 10px;
}
.upload-pic /deep/ .el-upload--picture-card {
  display: inline-block;
  border: none;
  line-height: 1;
}

.upload-pic /deep/ .el-upload-list--picture-card .el-upload-list__item {
  /* overflow: visible; */
  height: 181px;
  border: none;
  border-radius: 0;
}

.upload-pic /deep/ .el-upload-list__item .el-upload-list__item-actions {
  height: 148px;
  cursor: pointer;
}

.upload-pic /deep/ .el-upload-list__item-actions > span {
  position: absolute;
  right: 17px;
  bottom: 19px;
  top: auto;
  width: 27px;
  border: 1px solid $--popup-border-color;
  height: 27px;
  border-radius: 50%;
}

.upload-pic /deep/ .el-upload-list__item-actions .el-upload-list__item-preview {
  left: 17px;
  bottom: 20px;
  border: none;
}

.upload-pic /deep/ .el-upload-list__item-actions .el-icon-delete {
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
}

.upload-pic /deep/ .el-upload-list__item-actions .el-icon-zoom-in:before {
  content: '';
}

.upload-pic /deep/ .el-upload-list__item-actions .el-upload-list__item-preview {
  left: 17px;
  bottom: 20px;
  border: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 1px solid $--popup-border-color;
  background: url('~@static/images/imgpopup/eye.png') no-repeat center;
  background-size: 60%;
  box-sizing: border-box;
}
.upload-pic
  /deep/
  .el-upload-list__item-actions
  .el-upload-list__item-delete:hover {
  background: $--background-hover;
  border: 1px solid $--background-hover;
}

.upload-pic
  /deep/
  .el-upload-list__item-actions
  .el-upload-list__item-preview:hover {
  color: $--font-color-hover;
}

.upload-pic
  /deep/
  .el-upload-list--picture-card
  .el-upload-list__item
  .el-upload-list__item-thumbnail {
  height: 148px;
  object-fit: cover;
}

.upload-pic
  /deep/
  .el-upload-list--picture-card
  .el-upload-list__item-status-label {
  display: none;
}

.upload-pic /deep/ .el-upload-list--picture-card .el-upload-list__item-name {
  display: block;
  text-align: center;
  margin-right: 0;
}

.upload-pic
  /deep/
  .el-upload-list--picture-card
  .el-upload-list__item-name
  .el-icon-document {
  display: none;
}
.upload-pic /deep/ .el-upload-dragger:hover {
  border-color: $--color-main;
}
.upload-pic /deep/ .el-upload:focus .el-upload-dragger {
  border-color: $--color-main;
}
.upload-img /deep/ .el-progress-circle__path {
  stroke: $--color-main;
}
</style>
<style scoped lang="scss">
.upload-img {
  .upload-head {
    padding-top: 12px;
    border-top: 1px solid $--popup-border-color;
  }

  .el-upload-dragger {
    position: none;
  }

  .upload-tree {
    width: 240px;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    z-index: 10;
    box-shadow: $--area-shadow-base;
  }

  .upload-btn {
    width: 98px;
    height: 32px;
    font-weight: 400;
    border: none;
    border: 1px solid $--color-main;
    color: $--color-main;

    &:hover {
      border-color: $--background-hover;
      background-color: $--background-hover;
    }
  }

  .upload-btn span {
    color: $--popup-font-color-auxiliary;
  }

  .choose-img {
    margin-right: 13px;
    color: $--popup-font-color-auxiliary;
    background: $--color-main;
  }

  .upload-pic {
    max-height: 320px;
    min-height: 320px;
    border: 1px solid $--popup-border-color;
    margin: 13px 0 16px 0;
    padding: 18px 20px;
    overflow-y: auto;
  }

  .footer-upload-btn {
    text-align: right;
    .handle-upload {
      width: 76px;
      height: 32px;
      background: $--color-main;
      border: none;
      color: $--popup-font-color-auxiliary;
    }

    .handle-upload-disabled {
      background: $--popup-background-auxiliary;
      font-weight: 400;
      color: $--popup-font-color-disabled;
    }
  }
}
</style>
<style lang="scss" scoped>
.upload-img .upload-btn {
  height: 36px;
}
.upload-btn /deep/ span {
  color: $--color-main;
  font-size: $--font-size-normal;
}
.upload-img /deep/ .el-select--small .el-select-dropdown {
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
}

.upload-img .choose-img /deep/ span {
  color: $--popup-background-auxiliary;
}

.upload-img /deep/ .handle-upload {
  height: 36px;
}
</style>
