<template>
  <div
    v-show="linkPopupShow"
    id="createPopup"
    class="link-popup__container"
    @click="_handleClosePopup($event)"
  >
    <div class="link-popup__section">
      <div class="popup-header__area">
        <span>设置链接</span>
        <span @click.stop="_handleCancle"><i class="iconfont iconguanbi"></i></span>
      </div>
      <div class="popup-content__box flex-start-start--area">
        <ul class="popup-content__slider">
          <li v-for="(it ,i) in sliderList" :key="i" @click.stop="_handleSliderChange(it.label)">
            <el-radio v-model="slider" :label="it.label">{{ it.name }}</el-radio>
          </li>
        </ul>
        <none-area v-show="slider == 'none'" :tips="tips" />
        <page-area
          v-if="slider == 'page'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <news-area
          v-if="slider == 'news'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <product-area
          v-if="slider == 'product'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <url-area
          v-if="slider == 'link'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <email-area
          v-if="slider == 'email'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <tel-area
          v-if="slider == 'tel'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <file-area
          v-if="slider == 'file'"
          :model="model"
          :selected-url="selectedUrl"
          :way="way"
          :slider="slider"
          :cur-type="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
        />
        <!-- <mask-area
          :model="model"
          :selectedUrl="selectedUrl"
          :way="way"
          :type="type"
          :curType="curType"
          @handleChangeUrl="handleChangeUrl"
          @handleChangeTarget="handleChangeTarget"
          v-if="slider == 'popup'"
        /> -->
      </div>
      <div class="popup-footer__area">
        <div class="ym-button--isplain" style="margin-right: 16px;" @click.stop="_handleCancle">取消</div>
        <div class="ym-button--primary" @click.stop="_handleConfirm">确认</div>
      </div>
    </div>
    {{ slider }}
  </div>
</template>

<script>
import NoneArea from '@comp/link/none'
import PageArea from '@comp/link/page'
import NewsArea from '@comp/link/news'
import ProductArea from '@comp/link/product'
import UrlArea from '@comp/link/url'
import EmailArea from '@comp/link/email'
import TelArea from '@comp/link/tel'
import FileArea from '@comp/link/file'
export default {
  components: {
    NoneArea,
    PageArea,
    NewsArea,
    ProductArea,
    UrlArea,
    EmailArea,
    TelArea,
    FileArea
  },
  data() {
    return {
      sliderList: [
        { name: '无链接', label: 'none' },
        { name: '页面', label: 'page' },
        { name: '文章', label: 'news' },
        { name: '产品', label: 'product' },
        { name: '链接', label: 'link' },
        { name: '邮件', label: 'email' },
        { name: '文件', label: 'file' },
        { name: '电话', label: 'tel' }
      ],
      model: {
        Href: '',
        Target: '_self',
        Ctype: 'none',
        CategoryId: null,
        Id: ''
      },
      linkPopupShow: false,
      slider: 'none',
      curType: 'none',
      selectedUrl: '',
      way: '_self',
      categoryId: null,
      id: '',
      tips: '无链接',
      title: ''
    }
  },
  created() {
    if (window.smSite) {
      window.smSite.showCreateLinkPopup = () => {
        this.linkPopupShow = true
      }
      window.smSite.setLinkData = (data) => {
        this._setModelData(data)
        this.slider = this.model['Ctype']
        this.curType = this.model['Ctype']
        this.way = this.model['Target']
        this.selectedUrl = this.model['Href']
        this.categoryId = this.model['CategoryId']
        this.id = this.model['Id']
      }
    }
  },
  methods: {
    _setModelData(data) {
      for (var k in this.model) {
        this.$set(this.model, k, data[k])
      }
    },
    _handleSliderChange(val) {
      this.slider = val
      if (val === 'none') {
        this.selectedUrl = 'javascript:;'
        this.way = '_self'
        this.categoryId = null
        this.id = ''
        this.slider = 'none'
      }
      return false
    },
    _handleConfirm() {
      var flag = this._handleNext(this.slider)
      if (!flag) return
      const oldUrl = this.model['Href']
      const oldTarget = this.model['Target']
      const oldCType = this.model['Ctype']
      const oldCategoryId = this.model['CategoryId']
      const oldId = this.model['Id']
      if (oldUrl !== this.selectedUrl || oldTarget !== this.way) {
        this.$set(this.model, 'Href', this.selectedUrl)
        this.$set(this.model, 'Target', this.way)
        this.$set(this.model, 'Ctype', this.slider)
        this.$set(this.model, 'CategoryId', this.categoryId)
        this.$set(this.model, 'Id', this.id)
        const oldData = {
          href: oldUrl,
          target: oldTarget,
          ctype: oldCType,
          categoryId: oldCategoryId,
          id: oldId
        }
        const data = {
          href: this.selectedUrl,
          target: this.way,
          ctype: this.slider,
          categoryId: this.categoryId,
          id: this.id
        }

        this._handleCreateLink(oldData, data)
      }
      this.linkPopupShow = false
    },
    _handleCancle() {
      this.selectedUrl = this.model['Href']
      this.curType = this.model['Ctype']
      this.way = this.model['Target']
      this.slider = this.model['Ctype']
      this.linkPopupShow = false
    },
    _handleClosePopup(e) {
      if (e.target.id === 'createPopup') {
        this._handleCancle()
      }
    },
    _handleNext(type) {
      let flag = null
      let emailValue = null
      let telValue = null
      const phoneReg = /^1[3456789]\d{9}$/
      const emailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
      const linkReg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
      switch (type) {
        case 'email':
          emailValue = this.selectedUrl
            ? this.selectedUrl.slice(7)
            : this.selectedUrl
          flag = !!emailReg.test(emailValue)
          break
        case 'link':
          flag = !!linkReg.test(this.selectedUrl)
          break
        case 'tel':
          telValue = this.selectedUrl
            ? this.selectedUrl.slice(4)
            : this.selectedUrl
          flag = !!phoneReg.test(telValue)
          break
        default:
          flag = true
          break
      }
      return flag
    },
    handleChangeUrl(val) {
      this.selectedUrl = val.url
      this.curType = val.cType
      this.title = val.title
      this.categoryId = val.categoryId
      this.id = val.id
      return false
    },
    handleChangeTarget(val) {
      this.way = val
    },
    _handleCreateLink(oldVal, newVal) {
      if (window.smSite) {
        window.smSite.editorCreateLink(oldVal, newVal)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.link-popup__container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $--popup-background-mask;
  z-index: 1019;
  .link-popup__section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    background: $--popup-background-main;
    border-radius: 2px;
    .popup-header__area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 16px 0 24px;
      height: 62px;
      color: $--popup-font-color-main;
      border-bottom: 1px solid $--popup-border-color;
      cursor: auto;
      span:first-of-type {
        font-size: $--font-size-big;
        margin-bottom: 12px;
      }
      span:last-of-type {
        cursor: pointer;
      }
    }
    .popup-content__box {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      overflow: hidden;
      .popup-content__slider {
        width: 116px;
        height: 320px;
        padding: 20px 16px 20px 36px;
        cursor: auto;
        li {
          font-size: $--font-size-normal;
          padding-bottom: 16px;
        }
      }

      .popup-content__slider /deep/ .el-radio__inner {
        border-color: $--popup-border-color;
        background-color: $--popup-background-main;
      }

      .popup-content__slider /deep/ .el-radio__label {
        color: $--popup-font-color-main;
      }

      .popup-content__slider /deep/ .el-radio.is-checked .el-radio__inner {
        border-color: $--font-color-selected;
      }

      .none-data__divider {
        width: 1px;
        height: 100%;
        background: $--usual-border-color;
      }
    }
    .popup-footer__area {
      margin: 0 16px 0 24px;
      padding: 20px 0 32px;
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid $--popup-border-color;
    }
  }
}
</style>
<style>
.popup-content__area .content-main__slider .el-tree__empty-text {
  min-width: 60px;
}
</style>

