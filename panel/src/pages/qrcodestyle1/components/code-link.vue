<template>
  <div class="code-setting__section">
    <ul class="code-setting__header">
      <li
        v-for="(item, index) in headerList"
        :key="index"
        :class="{ selected: type == item.flag }"
        @click="_handleChangeContentArea(item)"
      >
        <i class="iconfont" :class="item.icon"></i>
        {{ item.title }}
      </li>
    </ul>
    <div v-show="type == 1" class="code-setting__content">
      <el-form ref="linkForm" :model="linkForm" :rules="rules">
        <el-form-item prop="link">
          <el-input
            v-model="linkForm.link"
            type="textarea"
            placeholder="http://"
            maxlength="100"
            @blur="generateQrCode"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="type == 2" class="code-setting__content">
      <el-form ref="textForm" :model="textForm" :rules="rules">
        <el-form-item prop="text">
          <el-input
            v-model="textForm.text"
            type="textarea"
            placeholder="请输入文本内容"
            maxlength="100"
            @blur="generateQrCode"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="type == 3" class="code-setting__content">
      <el-form ref="telForm" :model="telForm" :rules="rules">
        <el-form-item prop="tel">
          <el-input
            v-model="telForm.tel"
            type="textarea"
            placeholder="请输电话或手机号码
注：因系统原因，使用安卓手机扫码可能会无法唤起拨打电话程序"
            maxlength="100"
            @blur="generateQrCode"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    cssModel: {
      type: Object
    }
  },
  data() {
    return {
      headerList: [
        { title: '链接', icon: 'iconicon-des-lj', flag: 1 },
        { title: '文本', icon: 'iconicon-des-wenben', flag: 2 },
        { title: '电话', icon: 'iconicon-des-dianhua', flag: 3 }
      ],
      sourceData: null,
      linkForm: {
        link: ''
      },
      textForm: {
        text: ''
      },
      telForm: {
        tel: ''
      },
      rules: {
        link: [
          {
            required: true,
            pattern: /^(http:\/\/|https:\/\/){0,1}([a-z0-9\-\u4E00-\u9FA5]*[.])+([a-z\u4E00-\u9FA5]{2,10})$/,
            message: '请输入正确格式的链接地址',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            pattern: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,
            message: '请输入正确格式的电话或者手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    type: {
      get: function() {
        return this.model['QRType']
      },
      set: function() {}
    },
    text: {
      get: function() {
        return this.model['Text']
      },
      set: function(newValue) {
        return (this.model['Text'] = newValue)
      }
    },
    link: {
      get: function() {
        return this.model['Link']
      },
      set: function(newValue) {
        this.model['Link'] = newValue
      }
    },
    tel: {
      get: function() {
        return this.model['Tel']
      },
      set: function(newValue) {
        return (this.model['Tel'] = newValue)
      }
    }
  },
  watch: {
    link() {
      this.linkForm.link = this.model['Link']
    },
    text() {
      this.textForm.text = this.model['Text']
    },
    tel() {
      this.telForm.tel = this.model['Tel']
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sourceData = this.model
      this.linkForm.link = this.model['Link']
      this.textForm.text = this.model['Text']
      this.telForm.tel = this.model['Tel']
      this.generateQrCode()
    })
  },
  methods: {
    _handleChangeContentArea(item) {
      const oldValue = this.model['QRType']
      if (oldValue !== item.flag) {
        const oldData = {}
        const data = {}
        oldData['QRType'] = oldValue
        data['QRType'] = item.flag
        this.model['QRType'] = item.flag
        this.$emit('onDataChange', null, oldData, data)
      }
    },
    generateQrCode() {
      const oldData = JSON.parse(JSON.stringify(this.sourceData))
      switch (this.model['QRType']) {
        case 1: {
          const _this = this
          const linkData = JSON.parse(JSON.stringify(_this.model))
          if (_this.trim(_this.linkForm.link) == '') {
            _this.$emit('onDataChange', 'renderQRCode', oldData, linkData)
          } else {
            this.$refs['linkForm'].validate(valid => {
              if (valid) {
                const oldValue = oldData['Link']
                if (
                  _this.linkForm.link.indexOf('http') < 0 &&
                  _this.linkForm.link.indexOf('https') < 0
                ) {
                  _this.model['Link'] = 'http://' + _this.linkForm.link
                } else {
                  _this.model['Link'] = _this.linkForm.link
                }
                if (_this.linkForm.link !== oldValue) {
                  linkData['Link'] = _this.model['Link']
                  _this.sourceData = linkData
                  _this.$emit('onDataChange', 'renderQRCode', oldData, linkData)
                }
              }
            })
          }

          break
        }
        case 2: {
          const _this = this
          const textData = JSON.parse(JSON.stringify(this.model))
          if (_this.textForm.text.length == 0) {
            textData['Text'] = ''
            this.sourceData = textData
            this.$emit('onDataChange', 'renderQRCode', oldData, textData)
          }
          const oldTextValue = oldData['Text']
          if (_this.textForm.text !== oldTextValue) {
            textData['Text'] = _this.textForm.text
            this.sourceData = textData
            _this.$emit('onDataChange', 'renderQRCode', oldData, textData)
          }
          break
        }
        case 3: {
          const _this = this
          const telData = JSON.parse(JSON.stringify(this.model))
          if (_this.trim(_this.telForm.tel) == '') {
            _this.$emit('onDataChange', 'renderQRCode', oldData, telData)
          } else {
            this.$refs['telForm'].validate(valid => {
              if (valid) {
                const oldTelValue = oldData['Tel']
                if (_this.telForm.tel !== oldTelValue) {
                  telData['Tel'] = _this.telForm.tel
                  this.sourceData = telData
                  this.$emit('onDataChange', 'renderQRCode', oldData, telData)
                }
              }
            })
          }
          break
        }
        default:
          return
      }
    },
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
.code-setting__section {
  .code-setting__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      margin-right: 28px;
      font-size: $--font-size-small;
      color: $--usual-font-color-main;
      cursor: pointer;
      i {
        font-size: 12px;
        margin-right: 8px;
      }
    }

    li.selected {
      color: $--font-color-selected;
      i {
        color: $--font-color-selected;
      }
    }

    li:last-of-type {
      margin-right: 0;
    }
  }

  .code-setting__content {
    margin-top: 16px;
  }

  .code-setting__content /deep/ .el-textarea {
    width: 100%;
    .el-textarea__inner {
      height: 146px;
      color: $--usual-font-color-main;
      border-color: $--popup-border-color;
      resize: none;
      border-radius: 2px;
    }
  }
}
</style>
