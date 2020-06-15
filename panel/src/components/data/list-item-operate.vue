<template>
  <div>
    <draggable
      v-model="model.dataModel.imgList"
      tag="ul"
      :options="{
        animation: 150,
        ghostClass: '',
        dragClass: '111',
        scroll: true,
        scrollSensitivity: 200,
        handle: '.handler-move'
      }"
      @end="_handleSortEnd"
    >
      <li
        v-for="(item, index) in model.dataModel.imgList"
        :key="index"
        class="setting-item__area"
        :class="{ 'setting-item_selected': index == active }"
        @click="_handleSelect(item, index)"
      >
        <i class="iconfont icontuodongdian handler-move"></i>
        <span class="select-area"></span>
        <span class="picture-area">
          <img
            :src="item.Src"
            alt
          >
          <b @click="_handleChangePicture">
            <i class="iconfont iconqiehuanxingshiyi switch-picture__icon"></i>
          </b>
        </span>
        <p>{{ item.Name }}</p>
        <div class="icon-wrap">
          <i
            class="iconfont iconshanchu delete-icon"
            @click="_handleDeletePicture(index, item)"
          ></i>
          <i
            class="iconfont iconicon-dash-edit edit-icon"
            @click="_handleEditPicture"
          ></i>
        </div>
      </li>
    </draggable>
    <!-- 幻灯片图片组件 -->
    <banner-picture
      v-if="isPopupShow"
      :replace-img="replaceImg"
      :img-data-list="imgDataList"
      :model="model.dataModel"
      :atlas="atlas"
      :cur-active="active"
      @changeImgList="changeImgList"
      @batchAddPicture="batchAddPicture"
      @closeBannerPictureModul="closeBannerPictureModul"
      @changeImgLink="changeImgLink"
    ></banner-picture>

    <!-- 图片素材库组件 -->
    <div
      v-show="isModalShow"
      class="image-select--upload__area"
    >
      <div class="mask"></div>
      <div id="content">
        <el-header class="modal-header">
          <span style="font-size: 16px;">我的图片</span>
          <span @click="cancelgetImg"><i class="iconfont iconguanbi"></i></span>
        </el-header>

        <img-manage
          ref="imgList"
          :multiple="multiple"
          :limit="limit"
          :cur-limit="curLimit"
          @getImgInfo="getImgInfo"
        >
          <div
            slot="modal-footer"
            class="modal-footer"
          >
            <div
              class="ym-button--isplain"
              style="margin-right: 16px;"
              @click="cancelgetImg"
            >
              取消
            </div>
            <div
              class="ym-button--primary"
              @click="getImg"
            >确定</div>
          </div>
        </img-manage>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BannerPicture from '@comp/bannerPicture/index.vue'
import imgManage from '@comp/imgManage/index'
export default {
  components: {
    draggable,
    BannerPicture,
    imgManage
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    atlas: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      multiple: false,
      isModalShow: false, //  图片素材库弹窗 : true 打开 | false 关闭
      isPopupShow: false, // 当前选择的图片弹层显示隐藏控制
      replaceImg: '',
      imgDataList: [],
      curLimit: 0,
      isGetImgList: true,
      active: 0
    }
  },
  computed: {
    imgList: {
      get() {
        return this.model.dataModel.imgList
      }
    },
    controlId: {
      get() {
        return this.model.controlId
      }
    }
  },
  watch: {
    imgDataList() {}
  },
  methods: {
    changeImgList(data) {
      this.$set(this.model.dataModel, 'imgList', data)
    },
    changeImgLink(link) {},
    // 设置图片
    handleSetPicture() {
      this.imgDataList = this.model.dataModel.imgList
      this.isPopupShow = true
    },
    // 切换图片
    _handleChangePicture() {
      this.isModalShow = true
      this.batchAddPicture(true)
      this.changePicture = true
    },
    // 编辑图片
    _handleEditPicture() {
      this.imgDataList = this.model.dataModel.imgList
      this.isPopupShow = true
    },
    // 选中
    _handleSelect(item, index) {
      if (this.active === index) return
      var oldData = {}

      var data = {}
      oldData['index'] = this.active
      data['index'] = index
      this.active = index
      this.onDataChange('setCurrentPageIndex', oldData, data)
    },
    // 删除图片
    _handleDeletePicture(index, item) {
      if (this.model.dataModel.imgList.length <= 1) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: '至少保留张图片',
          showClose: false,
          duration: 1500
        })
        return
      }
      var oldData = {
        imgList: JSON.parse(JSON.stringify(this.model.dataModel.imgList))
      }
      this.model.dataModel.imgList.splice(index, 1)
      var data = { imgList: this.model.dataModel.imgList }

      this.imgDataList = this.imgDataList.filter((cur) => cur !== item)

      this.onDataChange('changeListData', oldData, data)
      this.$notify({
        customClass: 'notify-success', //  notify-success ||  notify-error
        message: '删除成功',
        showClose: false,
        duration: 1500
      })
    },
    // 排序
    _handleSortEnd(evt) {
      const oldArea = this.model.dataModel.imgList
      const newArea = JSON.parse(JSON.stringify(this.model.dataModel.imgList))
      this.onDataChange(
        'changeListData',
        { imgList: oldArea },
        { imgList: newArea }
      )
    },
    // /////////////
    // 点击添加图片
    batchAddPicture(flag) {
      if (this.imgDataList.length < 1) {
        // 如果图片删除为空 清空选中状态的图片
        this.isGetImgList = true
        this.$refs.imgList.$refs.gridList.emptySelected()
      }
      if (!flag) {
        // 如果点击更换图片 清空已选中的
        this.$refs.imgList.$refs.gridList.emptySelected()
      }
      this.isModalShow = true
      this.multiple = flag
      if (this.isGetImgList) {
        this.$nextTick(() => {
          this.$refs.imgList.getPictureData()
        })
        this.isGetImgList = false
      }
    },
    handleAddPicture() {
      if (this.model.dataModel.imgList.length === 20) {
        this.$notify({
          customClass: 'notify-error', //  notify-success ||  notify-error
          message: '图片已经到达上限',
          showClose: false,
          duration: 1500
        })
        return false
      }
      this.isModalShow = true
    },

    uploadImg() {
      this.isModalShow = true
    },
    getImgInfo(info) {
      const chooseList = []
      info.forEach((item) => {
        //  Id: item.id,
        chooseList.push({
          Uid: item.id,
          Title: '设置链接',
          Name: item.title,
          Src: item.fullOssUrl,
          Alt: item.title,
          Type: 'none',
          Href: 'javascript:;',
          Target: '_self',
          DetailPageId: '',
          CategoryId: null,
          Id: '',
          Ctype: 'none'
        })
      })
      this.chooseImgList = chooseList
    },
    // 点击图片素材库选中的图片
    getImg() {
      if (this.changePicture) {
        var oldData = {
          imgList: JSON.parse(JSON.stringify(this.model.dataModel.imgList))
        }

        const detailPageId = this.model.dataModel.imgList[this.active]
          .DetailPageId
        this.model.dataModel.imgList[this.active] = this.chooseImgList[0]
        this.model.dataModel.imgList[this.active].DetailPageId = detailPageId
        var data = { imgList: this.model.dataModel.imgList }
        this.onDataChange('changeListData', oldData, data)
        this.changePicture = false
      } else {
        if (this.multiple) {
          const imgDataList = [...this.imgDataList, ...this.chooseImgList]
          this.imgDataList = this.unique(imgDataList)

          if (this.imgDataList.length > this.limit) {
            this.$notify({
              customClass: 'notify-error', //  notify-success ||  notify-error
              message: '图片已经到达上限',
              showClose: false,
              duration: 1500
            })
            this.imgDataList = this.imgDataList.slice(0, this.limit)
          }
        } else {
          this.replaceImg = this.chooseImgList[0]
        }
      }

      this.isModalShow = false
    },

    // 关闭幻灯片弹窗
    closeBannerPictureModul() {
      this.isPopupShow = false
    },
    // 关闭图片选择弹窗
    cancelgetImg() {
      this.isModalShow = false
    },
    // 去重 去除重复的图片
    unique(ary) {
      const result = []
      const obj = {}
      for (let i = 0; i < ary.length; i++) {
        if (!obj[ary[i].Uid]) {
          result.push(ary[i])
          obj[ary[i].Uid] = true
        }
      }
      return result
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
@import '@static/styles/components/select-picture-popup.scss';
ul {
  background-color: $--panel-background-content-color;
  padding: 15px;
  li.setting-item__area {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 16px;
    height: 44px;
    background: $--panel-background-block-color;
    border-radius: $--border-radius-base;
    font-size: $--font-size-normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 3px;
    cursor: pointer;

    i {
      color: $--usual-font-color-sub;
      font-size: $--font-size-large;
    }

    span.select-area {
      position: relative;
      margin-left: 8px;
      width: 14px;
      height: 14px;
      border: 1px solid $--usual-font-color-sub;
      border-radius: 50%;
      cursor: pointer;
      flex: none;

      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: $--panel-background-color;
      }
    }
    span.picture-area {
      position: relative;
      margin: 0 8px;
      width: 36px;
      height: 26px;
      border-radius: $--border-radius-base;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        z-index: 0;
      }
      b {
        position: absolute;
        top: 0;
        left: 0;
        display: none;
        width: 100%;
        height: 100%;
        border-radius: $--border-radius-base;
        background: rgba(38, 38, 38, 0.56);
        cursor: pointer;
        z-index: 1;
        i.switch-picture__icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $--usual-font-color-main;
        }
      }
      &:hover {
        b {
          display: block;
        }
      }
    }
    p {
      padding: 14px 0;
      font-size: $--font-size-normal;
      font-weight: 400;
      line-height: 16px;
      max-width: 190px;
      color: $--usual-font-color-main;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit-icon,
    .delete-icon {
      color: $--color-main;
      &:hover {
        color: $--font-color-hover;
      }
    }
    .edit-icon {
      margin-left: 10px;
    }
    .icon-wrap {
      display: none;
      background: transparent;
      position: absolute;
      right: 10px;
      padding: 0 10px;
    }
    &:hover {
      background-color: $--list-background-hover;
      .icon-wrap {
        display: block;
      }
      p {
        max-width: 90px;
        color: $--font-color-hover;
      }
      .handler-move {
        color: $--font-color-hover;
        cursor: move;
      }
      .select-area {
        border-color: $--font-color-hover;
        &::after {
          background-color: $--font-color-hover;
        }
      }
    }
  }
  li.setting-item_selected {
    background-color: $--list-background-selected;
    box-shadow: $--area-shadow-base;
    .handler-move {
      color: $--font-color-selected;
    }
    span.select-area {
      border-color: $--font-color-selected;
      &::after {
        display: block;
        background: $--font-color-selected;
      }
    }
    p {
      color: $--font-color-selected;
    }
  }
}
</style>
