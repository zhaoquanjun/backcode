<template>
  <div class="popupVideo-wrap">
    <el-header style="height:60px;padding:0">
      <div class="domain-menu">
        <el-tabs
          v-model="videoType"
          @tab-click="tabClick"
        >
          <el-tab-pane
            label="本地视频"
            name="local"
          ></el-tab-pane>
          <el-tab-pane
            label="阿里云视频"
            name="aliyun"
          ></el-tab-pane>
        </el-tabs>
        <i
          class="iconfont iconguanbi cl-iconfont is-circle"
          @click="cancelgetVideo"
        ></i>
      </div>
    </el-header>
    <el-container
      v-show="videoType == 'local'"
      id="content-manage"
      style="width:1000px"
    >
      <el-aside
        class="tree-aside"
        style="width:250px;height:500px;border-right:1px solid rgb(229, 229, 229);border-bottom:1px solid rgb(229, 229, 229);"
      >
        <p class="pic-type-title">视频分类</p>

        <m-tree
          ref="myTree"
          style="height: calc(100% - 50px);"
          :tree-result="treeResult"
          :list-options="picSearchOptions"
          @getList="getList"
          @chooseCategoryNode="chooseNode"
          @create="newCategory"
          @batchRemove="batchRemoveCategory"
          @rename="renameCategory"
          @modifyNode="modifyNodeCategory"
        ></m-tree>
      </el-aside>

      <el-main style="padding:0;border-bottom: 1px solid rgb(229, 229, 229);">
        <list-header
          :count-pic="countPic"
          :display-name="displayName"
          :pic-search-options="picSearchOptions"
          :is-batch-header-show="isBatchHeaderShow"
          :content-type="contentType"
          @switchUploadBoxShowStatus="switchUploadBoxShowStatus"
          @getList="getList"
          @batchDelete="batchDelete"
          @batchMove="batchMove"
        ></list-header>
        <el-main style="padding:0px 24px">
          <List
            ref="tableList"
            :img-page-result="imgPageResult"
            :pic-search-options="picSearchOptions"
            :tree-result="treeResult"
            @getChecked="getChecked"
            @getList="getList"
            @changeCategory="changeCategoryPic"
            @rename="renamePic"
            @batchRemove="batchRemoveItem"
            @moveClassify="moveClassify"
            @handleSelectionChange="handleSelectionChange"
          ></List>
        </el-main>
      </el-main>

      <el-dialog
        title="上传"
        :visible.sync="dialogTableVisible"
        :modal-append-to-body="false"
      >
        <span slot="title">
          <span class="fs14">
            上传{{ displayName }}
            <el-tooltip
              class="item"
              effect="dark"
              placement="right"
              content="一次最多可上传10个视频，单个视频大小不超过2G"
            >
              <i class="iconfont iconyiwen"></i>
            </el-tooltip>
          </span>
        </span>
        <chunk-upload
          v-if="dialogTableVisible"
          :tree-result="treeResult"
          :display-name="displayName"
          :upload-type="contentType"
          :node-data="nodeData"
          :api-host="apiHost"
          @getList="getList"
          @getTree="getTree"
          @closeDialog="closeDialog"
        />
        <!-- :accept="'video/*'" -->
      </el-dialog>
    </el-container>
    <div
      v-show="videoType == 'aliyun'"
      style="width:800px"
    >
      <aliyunVideo
        ref="aliyunVideo"
        @getChecked="getChecked"
      ></aliyunVideo>
    </div>
    <el-footer style="height:70px">
      <slot name="modal-footer"></slot>
    </el-footer>
    <loading v-show="loading" />
  </div>
</template>
<script>
import MTree from '@/components/imgManage/MTree'
import ListHeader from './ListHeader'
import ChunkUpload from './ChunkUpload'
import List from './List'
import AliyunVideo from './aliyunVideo'
import environment from '@/environment/index.js'
import * as videoManageApi from '@/api/videoManageApi'
import * as videoCategoryManageApi from '@/api/videoCategoryManageApi'
import Loading from '@comp/loading/loading'
export default {
  components: {
    MTree,
    ListHeader,
    List,
    ChunkUpload,
    AliyunVideo,
    Loading
  },
  props: {
    isGrid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      videoType: 'local',
      displayName: '视频',
      contentType: 'Video',
      nodeData: {
        label: '全部分类',
        id: 0
      },
      isImgList: false,
      countPic: 0,
      curImgInfo: {},
      moveToClassiFy: '',
      categoryName: '', // 当前选中的分类名字
      idsList: [],
      selectedImg: [],
      isInvitationPanelShow: false,
      imgPageResult: {},
      treeResult: null,
      dialogTableVisible: false,
      totalSum: 0,
      apiHost: environment.contentApiUri,
      picSearchOptions: {
        pageSize: 10,
        pageIndex: 1,
        orderByType: 1,
        isDescending: true,
        categoryIdList: [],
        keyword: '',
        isDelete: false
      },
      checkedList: []
    }
  },
  computed: {
    isInvitationlWidth() {
      return this.isInvitationPanelShow === true ? 331 : 0
    },
    isBatchHeaderShow() {
      return this.idsList.length > 0
    }
  },
  mounted() {
    this.getList()
    this.getTree()
    this.$refs.aliyunVideo.init()
  },
  methods: {
    tabClick(item) {
      if (item.name == 'aliyun') {

      }
    },
    cancelgetVideo() {
      this.closeDialog()
      this.$emit('cancelgetImg')
    },
    getChecked(checkedList) {
      this.checkedList = checkedList
      this.$emit('getCheckedList', this.checkedList)
    },
    // 获取列表
    async getList(node) {
      this.loading = true
      if (node) {
        this.nodeData = node // 上传图片所需
      }
      const { data } = await videoManageApi.getList(this.picSearchOptions)
      this.loading = false
      this.getTree()
      this.imgPageResult = data
    },
    // 批量删除列表
    async batchRemoveItem(idlist) {
      this.$confirm(
        `删除后，${this.displayName}将被移动到回收站，可在回收站中恢复，是否确定删除？`,
        '提示',
        {
          iconClass: 'icon-warning',
          callback: async action => {
            if (action === 'confirm') {
              const { status } = await videoManageApi.batchRemove(true, idlist)
              if (status === 200) {
                this.$notify({
                  customClass: 'notify-success',
                  message: `删除成功!`,
                  showClose: false,
                  duration: 1500
                })
                this.getList()
                this.getTree()
              }
            }
          }
        }
      )
    },
    resetCategoryId() {
      this.picSearchOptions.categoryIdList = []
      this.getList()
    },

    async renameCategory(id, newName) {
      await videoCategoryManageApi.rename(id, newName)
      this.getTree()
    },
    async modifyNodeCategory(id, parentId, idOrderByArr) {
      await videoCategoryManageApi.modifyNode(id, parentId, idOrderByArr)
      this.getTree()
    },

    switchUploadBoxShowStatus(uploadImg) {
      this.dialogTableVisible = !this.dialogTableVisible
      if (uploadImg === 'uploadImg') this.getList()
    },
    moveClassify(b, data) {
      this.isInvitationPanelShow = b
      this.curImgInfo = data
    },
    closeRightPanel(b) {
      this.isInvitationPanelShow = b
    },
    // 选择移动分类时的节点
    chooseNode(node) {
      this.moveToClassiFy = node
    },
    // 批量更新的选中数量
    handleSelectionChange(list) {
      this.idsList = []
      this.countPic = list.length
      if (list.length < 1) return
      list.forEach(item => {
        this.idsList.push(item.id)
      })
      this.selectedImg = list
      this.$emit('getImgInfo', list)
    },
    // 点击确定按钮 更新图片分类
    updateCategoryPic() {
      const categoryId = this.moveToClassiFy
        ? this.moveToClassiFy.id
        : this.curImgInfo.categoryId
      const idList =
        this.idsList.length > 0 ? this.idsList : [this.curImgInfo.id]
      this.changeCategoryPic(categoryId, idList)
    },
    // 取消移动分类 关闭panel
    cancelUpdateCategor() {
      this.isInvitationPanelShow = false
      this.moveToClassiFy = this.curImgInfo = ''
    },
    // 批量移动
    batchMove(isHeader) {
      if (isHeader) {
        this.curImgInfo = {
          categoryName: '全部分类',
          categoryId: 0
        }
      }
      this.isInvitationPanelShow = true
    },
    // 批量删除
    batchDelete() {
      this.batchRemoveItem(this.idsList)
    },
    async renamePic(id, newname) {
      await videoManageApi.rename(id, newname)
      this.getList()
    },

    async changeCategoryPic(categoryId, idList) {
      const { status } = await videoManageApi.changeCategory(categoryId, idList)
      if (status == 200) {
        this.$notify({
          customClass: 'notify-success',
          message: `移动成功!`,
          showClose: false,
          duration: 1500
        })
        this.isInvitationPanelShow = false
        this.getList()
        this.getTree()
      }
    },
    async getTree() {
      const { data } = await videoCategoryManageApi.get()
      this.treeResult = data.treeArray
      this.totalSum = data.totalSum

      this.$refs.myTree.selectCategoryByNodeId(this.nodeData.id)
    },
    async newCategory(entity) {
      await videoCategoryManageApi.create(entity)
      this.getTree()
    },
    async batchRemoveCategory(idList) {
      this.$confirm(
        '若该分类下存在数据，删除后数据将自动移动到“全部分类”中，是否确认删除该分类？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'medium',
          iconClass: 'icon-warning',
          callback: async action => {
            if (action === 'confirm') {
              const { status } = await videoCategoryManageApi.batchRemove(idList)
              if (status === 200) {
                this.getTree()
                this.$notify({
                  customClass: 'notify-success',
                  message: `删除成功!`,
                  showClose: false,
                  duration: 1500
                })
              }
            }
          }
        }
      )
    },
    // 关闭上传文件弹窗
    closeDialog() {
      this.dialogTableVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.popupVideo-wrap
  /depp/
  .aside-tree
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background: $--popup-background-main !important;
  border-left: 3px solid $--color-main !important;
}
.el-dialog__wrapper {
  /deep/ .el-dialog {
    width: 700px;
    position: absolute;
    margin: 0 !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
.popupVideo-wrap /deep/ .el-scrollbar {
  height: 100%;
}
.popupVideo-wrap {
  background: $--popup-background-main;
}
.domain-menu {
  position: relative;
  height: 60px;
  background: $--popup-background-main;
  border-radius: $--border-radius-base;
  border-bottom: $--popup-border-main;
  .iconguanbi {
    position: absolute;
    right: 16px;
    top: 23px;
    color: $--popup-font-color-main;
  }
}
.domain-menu /deep/ .el-tabs__nav-wrap::after {
  height: 0;
}
.domain-menu /deep/ .el-tabs__active-bar.is-top {
  width: 0 !important;
}
.el-tabs /deep/ .el-tabs__item {
  height: 60px;
  line-height: 60px;
  margin: 0 24px;
  padding: 0;
  color: $--usual-font-color-auxiliary;
}
.el-tabs /deep/ .el-tabs__item.is-active {
  border-bottom: 2px solid $--color-main;
}
// 文章 产品详情
// 设置的关键词
.keyword-list {
  display: inline-block;
  z-index: 1;
  top: 50px;
  left: 0;
  width: 100%;
  border: 1px solid $--popup-border-color;
  padding: 5px;
  box-sizing: border-box;
  li {
    position: relative;
    word-break: break-all;
    cursor: pointer;
    display: inline-block;
    margin: 0 4px 4px 0px;
    min-height: 23px;
    line-height: 21px;
    padding: 0 26px 0 10px;
    font-size: $--font-size-small;
    vertical-align: top;
    background-color: #609ee9;
    border-radius: 16px;
    color: $--popup-font-color-auxiliary;
    overflow: hidden;

    i {
      color: $--popup-font-color-auxiliary;
    }
    .el-icon-close {
      position: absolute;
      top: 2.5px;
      right: 0;
      bottom: 1px;
      min-height: 21px;
      height: 100%;

      margin-left: 6px;
      padding: 0px 10px;
      display: block;
      overflow: hidden;
      font-size: $--font-size-big;
    }
  }
}

// 侧边分类title样式
.pic-type-title {
  box-sizing: border-box;
  padding-left: 16px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  font-size: $--font-size-normal;
  color: $--popup-font-color-main;
  border-bottom: 1px solid $--popup-border-color;
}
.title-item {
  padding: 28px 0 12px 12px;
}

.article-content {
  .content-item {
    padding: 21px 16px 20px;
    background: $--popup-background-main;
    box-shadow: $--area-shadow-base;
    margin-bottom: 16px;
    // overflow: hidden;
  }
  .content-title {
    padding-bottom: 20px;
    font-size: $--font-size-normal;
    font-weight: 600;
    color: $--popup-font-color-auxiliary;
  }
  .set-article,
  .seo-key {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.select-sort {
  padding-left: 16px;
}
.category {
  width: 300px;
  height: auto;
}
.ql-container {
  height: 400px;
}
</style>

