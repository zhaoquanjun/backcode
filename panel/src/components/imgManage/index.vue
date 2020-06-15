<template>
  <el-container id="content-manage">
    <el-aside class="tree-aside" style="width:220px">
      <p class="pic-type-title"><span>图片分类</span></p>
      <m-tree
        ref="myTree"
        :tree-result="treeResult"
        :list-options="picSearchOptions"
        :isexpand="true"
        @getList="getPicList"
        @create="newCategory"
        @batchRemove="batchRemoveCategory"
        @rename="renameCategory"
        @modifyNode="modifyNodeCategory"
      ></m-tree>
    </el-aside>
    <el-main style="overflow: hidden; padding: 0; border-left: 1px solid #e5e5e5;">
      <img-list-header
        :count-pic="countPic"
        :pic-search-options="picSearchOptions"
        :is-batch-header-show="isBatchHeaderShow"
        @switchUploadBoxShowStatus="switchUploadBoxShowStatus"
        @getPicList="getPicList"
        @batchMove="batchMove"
        @batchDelete="batchDelete"
        @showType="showType"
      ></img-list-header>
      <el-main style="padding: 24px 20px 20px; height: calc(100% - 100px);">
        <GridList
          ref="gridList"
          :img-page-result="imgPageResult"
          :pic-search-options="picSearchOptions"
          :tree-result="treeResult"
          :multiple="multiple"
          :limit="limit"
          :cur-limit="curLimit"
          @getPicList="getPicList"
          @changeCategory="changeCategoryPic"
          @rename="renamePic"
          @batchRemove="batchRemovePic"
          @moveClassify="moveClassify"
          @handleSelectionChange="handleSelectionChange"
        ></GridList>
        <el-dialog
          width="0"
          style="z-index:10"
          :close-on-click-modal="false"
          :show-close="false"
          :visible.sync="isInvitationPanelShow"
          :modal-append-to-body="false"
        ></el-dialog>
        <right-pannel
          :style="{width:isInvitationlWidth+'px'}"
          :tree-result="treeResult"
          @closeRightPanel="closeRightPanel"
        >
          <span slot="title-text">移动图片</span>
          <div class="category-content">
            <span name="cur-tip">移动至</span>
          </div>
          <SelectTree
            v-if="isInvitationPanelShow"
            :category-name="curImgInfo.categoryName"
            :category-id="curImgInfo.categoryId"
            :tree-result="treeResult"
            :isexpand="true"
            @chooseNode="chooseNode"
          ></SelectTree>
          <div slot="footer" class="pannle-footer" style="text-align: right;">
            <div class="ym-button--isplain" style="margin-right: 16px" @click="cancelUpdateCategor">取消</div>
            <div class="ym-button--primary" @click="updateCategoryPic">确定</div>
          </div>
        </right-pannel>
      </el-main>
      <el-footer style="height: 40px;">
        <slot name="modal-footer"></slot>
      </el-footer>
    </el-main>
    <el-dialog
      title="上传图片"
      width="90%"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <span slot="title">
        <span class="fs14" style="color: #262626; font-size: 14px;">
          上传图片
          <el-tooltip
            class="item"
            effect="dark"
            content="一次可上传60张图片，单张图片大小不超过10MB"
            placement="right"
          >
            <i class="iconfont iconyiwen" style="color: #A1A8B1;"></i>
          </el-tooltip>
        </span>
      </span>
      <upload-pic
        v-if="dialogTableVisible"
        :tree-result="treeResult"
        :upload-pic-url="uploadPicUrl"
        :node-data="nodeData"
        @switchUploadBoxShowStatus="switchUploadBoxShowStatus"
        @getTree="getTree"
      />
    </el-dialog>
  </el-container>
</template>
<script>
import MTree from './MTree'
import UploadPic from './UploadPic'
import ImgListHeader from './ImgListHeader'
import GridList from './GridList'
import RightPannel from './RightPannel'
import SelectTree from './SelectTree'
import * as imgManageApi from '@api/imgManageApi'
import * as imgCategoryManageApi from '@api/imgCategoryManageApi'
import environment from '@/environment/index.js'

export default {
  components: {
    MTree,
    ImgListHeader,
    GridList,
    UploadPic,
    RightPannel,
    SelectTree
  },
  props: {
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isFirst: {
      type: Boolean
    },
    limit: {
      type: Number,
      default: 30
    },
    curLimit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      nodeData: '', // 分类节点的名称
      componentId: '',
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
      uploadPicUrl: environment.uploadPicUrl,
      picSearchOptions: {
        pageSize: 10,
        pageIndex: 1,
        orderByType: 'CreateTime',
        isDescending: true,
        categoryIdList: [],
        keyword: '',
        isDelete: false
      }
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
  methods: {
    getPictureData() {
      this.getPicList()
    },
    // 获取列表
    async getPicList(node) {
      const loading = this.$loading({
        target: document.querySelector('#img-list'),
        lock: true,
        spinner: 'loading-icon',
        background: 'rgba(255, 255, 255, 0.75)'
      })
      if (node) this.nodeData = node // 上传图片所需
      const { data } = await imgManageApi.getPicList(this.picSearchOptions)
      loading.close()
      this.imgPageResult = data
      this.imgPageResult.list.forEach((item, index) => {
        item.createTimeStr = this.imgPageResult.list[index].createTimeStr.split(
          ' '
        )[0]
      })
      this.getTree()
    },
    // 批量删除列表
    async batchRemovePic(idlist) {
      this.$confirm(
        '删除后，图片将被移动到回收站，可在回收站中恢复，是否确定删除？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'medium',
          iconClass: 'icon-warning',

          callback: async action => {
            if (action === 'confirm') {
              const { status } = await imgManageApi.batchRemove(
                true,
                idlist
              )
              if (status === 200) {
                this.getTree()

                this.$notify({
                  customClass: 'notify-success', //  notify-success ||  notify-error
                  message: `删除成功`,
                  showClose: false,
                  duration: 1500
                })
                this.getPicList()
              }
            }
          }
        }
      )
    },
    resetCategoryId() {
      this.picSearchOptions.categoryIdList = []
      this.getPicList()
    },

    async changeCategoryPic(categoryId, idList) {
      const { status } = await imgManageApi.changeCategory(
        categoryId,
        idList
      )
      if (status === 200) {
        this.$notify({
          customClass: 'notify-success', //  notify-success ||  notify-error
          message: `移动成功`,
          showClose: false,
          duration: 1500
        })
        this.isInvitationPanelShow = false
        this.getPicList()
      }
    },
    async renamePic(id, newname) {
      await imgManageApi.rename(id, newname)
      this.getPicList()
    },
    async getTree() {
      const { data } = await imgCategoryManageApi.get()
      this.treeResult = data.treeArray
      this.totalSum = data.totalSum
      this.$refs.myTree.selectCategoryByNodeId(this.nodeData.id)
    },
    async newCategory(entity) {
      await imgCategoryManageApi.create(entity)
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
              const { status } = await imgCategoryManageApi.batchRemove(idList)
              if (status === 200) {
                this.getTree()

                this.$notify({
                  customClass: 'notify-success', //  notify-success ||  notify-error
                  message: `删除成功`,
                  showClose: false,
                  duration: 1500
                })
              }
            }
          }
        }
      )
    },
    async renameCategory(id, newName) {
      await imgCategoryManageApi.rename(id, newName)
      this.getTree()
    },
    async modifyNodeCategory(id, parentId, idOrderByArr) {
      await imgCategoryManageApi.modifyNode(id, parentId, idOrderByArr)
      this.getTree()
    },
    // 点击上传图片
    switchUploadBoxShowStatus(uploadImg) {
      this.dialogTableVisible = !this.dialogTableVisible
      if (uploadImg === 'uploadImg') {
        this.getPicList()
        this.picSearchOptions.keyword = ''
      }
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
      const categoryId = this.moveToClassiFy.id
      let idList = []
      if (this.idsList.length > 0) {
        idList = this.idsList
      } else {
        idList.push(this.curImgInfo.id)
      }
      this.changeCategoryPic(categoryId || 0, idList)
      return false
    },
    // 取消移动分类 关闭panel
    cancelUpdateCategor() {
      this.isInvitationPanelShow = false
      this.moveToClassiFy = this.curImgInfo = ''
    },
    // 批量移动
    batchMove() {
      this.isInvitationPanelShow = true
    },
    // 批量删除
    batchDelete() {
      this.batchRemovePic(this.idsList)
    },
    // 展示方式
    showType(val) {
      if (val === 'list') {
        this.componentId = 'ImgList'
        this.picSearchOptions.pageSize = 10
        this.getPicList()
      } else {
        this.componentId = 'GridList'
        this.picSearchOptions.pageSize = 20
        this.getPicList()
      }
    }
  }
}
</script>

