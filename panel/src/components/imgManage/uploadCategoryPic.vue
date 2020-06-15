<template>
  <div class="uploadCategoryPic">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="76px"
      class="demo-ruleForm"
      @submit.native.prevent
    >
      <el-form-item label="分类名称" prop="name" class="category-name">
        <el-input
          v-model="ruleForm.name"
          size="small"
          autocomplete="off"
          placeholder="请输入分类名称"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isUpload" class="upload-item" label="分类图片">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content">
            分类图片用于分类控件带图片样式的展示，
            <br>建议上传尺寸为400✕400像素的图片
          </div>
          <span style="position: absolute;left: -13px;">
            <i class="iconfont iconyiwen"></i>
          </span>
        </el-tooltip>
        <el-upload
          class="ym-button--isplain"
          :action="uploadPicAction"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
        >
          <div v-if="imageUrl1" class="imgWrap">
            <img :src="imageUrl1" class="avatar">
            <span class="el-upload-list__item-actions">
              <i class="icon-change"></i>
              <i class="el-icon-delete" @click.stop="handleRemove"></i>
            </span>
          </div>

          <template v-else>
            <i style class="el-icon-plus avatar-uploader-icon"></i>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="pannle-footer">
      <div class="ym-button--isplain" style="margin-right: 16px;" @click="cancel">取消</div>
      <div class="ym-button--primary" @click="submitForm('ruleForm')">确定</div>
    </div>
  </div>
</template>
<script>
import environment from '@/environment/index.js'
export default {
  props: {
    isUpload: {
      type: Boolean,
      default: true
    },
    modifyCategoryData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    var checkInput = (rule, value, callback) => {
      if (!this.trim(value)) {
        return callback(new Error('请输入分类名称'))
      } else {
        callback()
      }
    }
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      activeName: '',
      uploadDisabled: true,
      fileList: [],
      upload2Category: { label: '全部分类', id: 0 },
      uploadPicAction: `${environment.uploadPicUrl}/0`,
      headers: {
        appId: '823EB3BD-93F4-4655-B833-D604A6EF2032',
        Authorization: ''
      },
      uploadSucess: false,
      imageUrl1: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          },
          { validator: checkInput, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    modifyCategoryData: {
      handler(newName, oldName) {
        this.ruleForm.name = newName.label
        this.imageUrl1 = newName.thumbnailPicUrl
      },
      immediate: true,
      deep: true
    }
    // modifyCategoryData() {
    //     alert(this.modifyCategoryData.label);
    //     this.ruleForm.name = this.modifyCategoryData.label;
    //     this.imageUrl1 = this.modifyCategoryData.thumbnailPicUrl;
    //     console.log(this.modifyCategoryData);
    // },
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
  },
  methods: {
    // 去左右空格;
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    },
    handleSucess(response, file, fileList) {
      this.imageUrl1 = file.response
    },
    handleRemove(file, fileList) {
      this.imageUrl1 = ''
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl1 = file.response
    },
    beforeAvatarUpload(file) {
      const token = this._getJwtToken()
      this.headers.Authorization = 'Bearer ' + token
      const isPic =
        ['image/png', 'image/jpeg', 'image/gif'].indexOf(file.type) !== -1
      const maxMb = 10
      const isSizeOk = file.size / 1024 / 1024 < maxMb

      if (!isPic) {
        this.$message.error('上传头像图片只能是 图片 格式!')
      }
      if (!isSizeOk) {
        this.$message.error(`上传图片大小不能超过 ${maxMb}MB!`)
      }
      return isPic && isSizeOk
    },
    // 新建保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confrim()
        } else {
          return false
        }
      })
    },
    // 确定按钮
    confrim() {
      const displayName = this.ruleForm.name
      this.$emit('createCategory', displayName, this.imageUrl1)
      this.ruleForm.name = ''
      this.imageUrl1 = ''
    },
    // 取消按钮
    cancel() {
      this.$refs.ruleForm.resetFields()
      this.$emit('closeUploadCategoryPic')
      this.ruleForm.name = ''
      this.imageUrl1 = ''
    },
    _getJwtToken() {
      var tk = window.sessionStorage.getItem('wzdesignxkoen')
      if (tk) {
        var jsonData = JSON.parse(tk)
        var currentTime = new Date()
        currentTime = currentTime.toISOString()
        var diff = Date.parse(jsonData.expiredTime) - Date.parse(currentTime)
        if (diff > 0) {
          return jsonData.token
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.uploadCategoryPic /deep/ .el-input .el-input__inner {
  padding-right: 50px;
  height: 32px;
  line-height: 32px;
  color: $--popup-font-color-main;
  border-color: $--popup-border-color;
  background-color: $--popup-background-main;
}
.uploadCategoryPic /deep/ .el-form {
  padding: 20px 16px 10px;
}
.uploadCategoryPic /deep/ .el-form .el-form-item__label {
  font-size: 12px;
  text-align: left;
}
.uploadCategoryPic /deep/ .el-form .el-form-item__error {
  padding-top: 0;
}
.uploadCategoryPic .category-name /deep/ .el-form-item__content {
  margin-left: 82px !important;
}
.uploadCategoryPic .upload-item /deep/ .el-form-item__label {
  margin-left: 10px;
}
.uploadCategoryPic /deep/ .el-form .el-form-item {
  margin-bottom: 15px;
}

.uploadCategoryPic /deep/ .el-form .el-form-item__error {
  background: $--popup-background-main;
  z-index: 1;
}
.avatar-uploader {
  margin: 0 auto;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed $--color-main;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 70px;
  width: 70px;
  line-height: 70px;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: 0;
}
.avatar-uploader /deep/ .el-upload i {
  color: $--color-main;
  cursor: pointer;
}
.avatar-uploader .el-upload:hover {
  border-color: $--font-color-hover;
}
.avatar-uploader-icon {
  font-size: 22px;
  color: $--popup-font-color-sub;
  text-align: center;
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
.el-upload-list__item-actions {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: $--popup-font-color-auxiliary;
  opacity: 0;
  font-size: 20px;
  background-color: $--popup-background-mask;
  transition: opacity 0.3s;
}
.avatar-uploader .el-upload-list__item-actions i {
  color: $--popup-font-color-auxiliary;
  font-size: 21px;
  margin-bottom: 15px;
}
.imgWrap:hover .el-upload-list__item-actions {
  opacity: 1;
}
.icon-change {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('~@static/images/imgpopup/change.png') no-repeat center;
  background-size: contain;
}
</style>
<style lang="scss" scoped>
.article-cover {
  color: $--popup-font-color-main;
  font-weight: 500;
  font-size: $--font-size-normal;
}
.uploadCategoryPic {
  .pannle-footer {
    text-align: right;
    margin-right: 16px;
    box-sizing: border-box;
    button {
      cursor: pointer;
      display: inline-block;
      width: 66px;
      height: 32px;
      line-height: 32px;
      background: $--color-main;
      margin-right: 8px;
      color: $--popup-font-color-auxiliary;
      text-align: center;
    }
    .cancel {
      border: 1px solid $--color-main;
      color: $--color-main;
      background: $--popup-background-main;
    }
  }
}
</style>
