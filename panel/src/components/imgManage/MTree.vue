<template>
  <div style="height: calc(100% - 108px);">
    <div
      id="asideTree"
      v-scrollBar
      class="aside-tree"
      style="position: relative;"
    >
      <el-tree
        ref="tree"
        :data="treeResult"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :draggable="true"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :highlight-current="true"
        @node-drag-end="handleDragEnd"
        @node-click="changeCategory"
        @node-drag-enter="dragEnter"
      >
        <div
          slot-scope="{ node, data }"
          class="custom-tree-node"
          @mouseover="handlerOver(data)"
          @mouseleave="handlerMouseLeave"
        >
          <img
            v-if="data.thumbnailPicUrl && isProduct"
            class="categoryPic"
            :src="
              data.thumbnailPicUrl +
              '?x-oss-process=image/resize,m_lfit,h_40,w_40'
            "
          />
          <button v-if="node.data.level > 0 && draggable" class="drop-btn">
            <i class="iconfont icontuodongdian"></i>
          </button>
          <div
            class="node-label-wrap"
            :class="{ 'label-weight': node.data.level <= 1 }"
          >
            <span class="node-label">{{ data.label }}</span>
            <span v-if="!isProduct">({{ data.inUseSum }})</span>
          </div>
          <span
            v-show="data.id === treeNodeId && draggable"
            class="set-tree-type"
            @click.stop="handleShow($event, node, data)"
          >
            <i class="iconfont iconsangedian"></i>
          </span>
        </div>
      </el-tree>
    </div>
    <div
      ref="operateSection"
      class="category-name-pic"
      :class="{ upload: isProduct }"
    >
      <UploadCategoryPic
        v-if="isHandlerCategoryMenuShow"
        :is-upload="isProduct ? true : false"
        :modify-category-data="modifyCategoryData"
        @createCategory="createCategory"
        @closeUploadCategoryPic="closeUploadCategoryPic"
      />
    </div>
    <div
      ref="operateSection1"
      class="tree-handle"
      @click="closeUploadCategoryPic1"
    >
      <button
        v-if="curClickNode.data.level < 3"
        type="text"
        size="mini"
        @click="create"
      >
        添加子分类
      </button>
      <button
        v-if="curClickNode.data.level > 0"
        type="text"
        size="mini"
        @click="rename"
      >
        修改名称
      </button>

      <button
        v-if="curClickNode.data.level > 0"
        type="text"
        size="mini"
        @click="batchRemove"
      >
        删除分类
      </button>
    </div>
  </div>
</template>
<script>
import UploadCategoryPic from './uploadCategoryPic'
import { trim } from '@utils/index'
export default {
  // 与产品分类不一致的地方 picSearchOptions
  components: {
    UploadCategoryPic
  },
  props: ['treeResult', 'listOptions', 'isArticle', 'isProduct'],
  data() {
    return {
      draggable: true, // 是否允许拖拽
      flag: false,
      curId: null,
      treeNodeId: null,
      renameShowId: null,
      isNewAdd: false, // false 允许创建子节点
      curlabelName: '',
      isRename: false,
      newAddNode: '',
      renameData: '',
      createCategoryData: '', // 当前点击的创建分类节点
      isAdd: false, // true 添加 false编辑
      modifyCategoryData: {}, // 编辑分类需要传当前节点的名称和imgurl,
      curClickNode: { data: { level: '' } },
      isHandlerCategoryMenuShow: false
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.$nextTick(() => {
        if (this.$refs.operateSection1) {
          this.$refs.operateSection1.style.display = 'none'
        }
      })
    })
  },
  methods: {
    // 去左右空格
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    },
    createCategory(displayName, thumbnailPicUrl) {
      if (this.isAdd) {
        if (this.isArticle) {
          this.$emit('create', {
            CategoryName: trim(displayName),
            ParentId: this.createCategoryData.id
          })
        } else {
          this.$emit('create', {
            DisplayName: trim(displayName),
            ParentId: this.createCategoryData.id,
            thumbnailPicUrl: thumbnailPicUrl
          })
        }
      } else {
        this.$emit(
          'rename', // 与产品分类不一致的地方
          this.createCategoryData.id,
          trim(displayName),
          thumbnailPicUrl
        )
      }
      this.closeUploadCategoryPic()
    },
    handlerOver(data) {
      if (!isNaN(data.id)) this.treeNodeId = data.id
      if (this.isNewAdd) this.treeNodeId = null
    },
    selectCategoryByNodeId(nodeId) {
      nodeId = nodeId || 0
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(nodeId)
      })
    },
    handlerMouseLeave() {
      this.treeNodeId = this.curId = null
    },
    cancelhadnleTreeInput(data, node) {
      if (this.isRename) {
        if (data.label == '') {
          this.$notify({
            customClass: 'notify-warning', //  notify-success ||  notify-error
            message: `分类名称不能为空!`,
            showClose: false,
            duration: 1500
          })
          return
        }
        if (this.curlabelName != '') {
          data.label = this.curlabelName
        }
      } else {
        node.parent.childNodes.splice(0, 1)
        this.isRename = false
        this.isNewAdd = false
      }
      // 点击取消按钮 关闭input框
      this.renameShowId = this.curId = null
    },
    handleDragEnd(draggingNodeDom, targetNodeDom, dropType, ev) {
      var draggingNode = draggingNodeDom.data
      var targetNode = targetNodeDom.data
      // let level = this.getLevel(draggingNodeDom, 1) + targetNodeDom.level;
      const eles = document.getElementsByClassName('el-tree-node__content')
      for (let i = 0; i < eles.length; i++) {
        const ele = eles[i]
        ele.style.background = ''
      }
      switch (dropType) {
        case 'inner': {
          draggingNode.parentId = targetNode.id
          break
        }
        case 'before':
        case 'after': {
          draggingNode.parentId = targetNode.parentId ? targetNode.parentId : 0
          break
        }
        case 'none':
          return
        default: {
          return
        }
      }

      var idOrderByArr = []
      for (var i = 0; i < targetNodeDom.parent.childNodes.length; i++) {
        var childNode = targetNodeDom.parent.childNodes[i]
        idOrderByArr.push(childNode.data.id)
      }
      this.modifyNode(draggingNode.id, draggingNode.parentId, idOrderByArr)
    },
    allowDrop(draggingNode, targetNode, dropType) {
      if (targetNode.data.level === 0) return
      draggingNode = draggingNode.data
      targetNode = targetNode.data
      // 判断是否大于三层
      if (
        dropType === 'inner' ||
        draggingNode.parentId !== targetNode.parentId
      ) {
        const level = this.getLevel(draggingNode, 1) + targetNode.level
        return level <= 3
      }
      return true
    },
    allowDrag(draggingNode) {
      return draggingNode.data.level !== 0
    },
    dragEnter(draggingNode, targetNode, ev) {
      if (targetNode.data.level === 0) return
      // document.querySelectorAll('.el-tree-node__content').style.background=""
      const eles = document.getElementsByClassName('el-tree-node__content')
      for (let i = 0; i < eles.length; i++) {
        const ele = eles[i]
        ele.style.background = ''
      }

      ev.srcElement.style.background = 'rgba(224,250,255,0.5)'
    },
    // 添加分类  0720
    create(ev, node, data) {
      this.modifyCategoryData = {} // 创建新分类 不需传
      this._handleShowMoreOperate(ev, node, data)
      this.isAdd = true
    },
    getAllNodeIds(node, isChildNode) {
      var idList = isChildNode ? [] : [node.id]
      for (var i in node.children) {
        const child = node.children[i]
        idList.push(child.id)
        idList = idList.concat(this.getAllNodeIds(child, true))
      }
      return idList
    },
    getLevel(node, level) {
      var localLevel = level
      for (var i in node.children) {
        const child = node.children[i]
        var childLevel = this.getLevel(child, localLevel + 1)
        level = level < childLevel ? childLevel : level
      }
      return level
    },
    // 编辑分类 0720
    rename(ev, node, data) {
      this.isAdd = false
      this.modifyCategoryData = this.curClickData
      this._handleShowMoreOperate(ev, node, data)
    },
    modifyNode(id, parentId, idOrderByArr) {
      this.$emit('modifyNode', id, parentId, idOrderByArr)
    },
    // 描述： 删除分类
    batchRemove(node, data) {
      data = this.curClickData
      this.$emit('batchRemove', this.getAllNodeIds(data))
    },
    // 点击节点的时候
    changeCategory(data) {
      this.closeUploadCategoryPic()
      this.closeUploadCategoryPic1()

      if (this.isArticle) {
        this.listOptions.categoryId = data.id // 与产品分类不一致的地方// 与产品分类不一致的地方
      } else {
        this.listOptions.categoryIdList = this.getAllNodeIds(data) // 与产品分类不一致的地方
      }
      this.listOptions.pageIndex = 1 // 与产品分类不一致的地方
      this.$emit('chooseCategoryNode', data) // 与产品分类不一致的地方
      this.$emit('getList', data)
    },
    // 取消第一个全部分类默认选中的样式
    setCss(obj, css) {
      for (var attr in css) {
        obj.style[attr] = css[attr]
      }
    },
    // 操作按钮出现 || 消失
    handleShow(ev, node, data) {
      if (this.curId === node.data.id) {
        node.checked = false
        this.curId = 1
      } else {
        node.checked = true
        this.curId = node.data.id
      }
      this.curClickData = data
      this.curClickNode = node
      this._handleShowMoreOperate1(ev, node)
    },
    // 分类上传图片
    _handleShowMoreOperate(ev, node, data) {
      // let content = document.getElementById("content");
      // let contentW = content.offsetWidth;
      // let contentH = content.offsetHeight;
      // let clientWidth =
      //     ((document.documentElement.clientWidth ||
      //         document.body.clientWidth) -
      //         contentW) /
      //     2;
      // let clientHeight =
      //     ((document.documentElement.clientHeight ||
      //         document.body.clientHeight) -
      //         contentH) /
      //     2;
      const location = this.handlerClicklocation()
      this.createCategoryData = this.curClickData
      this.$refs.operateSection.style.left =
        ev.pageX - location.clientWidth - ev.offsetX + 16 + 'px'
      this.$refs.operateSection.style.top =
        ev.pageY - location.clientHeight - ev.offsetY + 'px'
      this.$refs.operateSection.style.display = 'block'
      this.isHandlerCategoryMenuShow = true
    },
    // 关闭 分类操作菜单显示
    closeUploadCategoryPic() {
      this.$refs.operateSection.style.display = 'none'
      this.isHandlerCategoryMenuShow = false
    },
    // 新增 0730  关闭分类操作菜单
    closeUploadCategoryPic1() {
      this.$refs.operateSection1.style.display = 'none'
    },
    handleCategory1() {
      this.closeUploadCategoryPic1()
    },
    // 新增0730   分类操作菜单显示
    _handleShowMoreOperate1(ev, row) {
      const location = this.handlerClicklocation()
      this.$refs.operateSection1.style.left =
        ev.pageX - location.clientWidth - ev.offsetX + 46 + 'px'
      this.$refs.operateSection1.style.top =
        ev.pageY - location.clientHeight - ev.offsetY + 'px'
      if (this.$refs.operateSection1.style.display === 'block') {
        this.$refs.operateSection1.style.display = 'none'
      } else {
        this.$refs.operateSection1.style.display = 'block'
      }
    },
    handlerClicklocation() {
      const content = document.getElementById('content')
      const contentW = content.offsetWidth
      const contentH = content.offsetHeight
      const clientWidth =
        ((document.documentElement.clientWidth || document.body.clientWidth) -
          contentW) /
        2
      const clientHeight =
        ((document.documentElement.clientHeight || document.body.clientHeight) -
          contentH) /
        2
      return { clientWidth, clientHeight }
    }
  }
}
</script>

<style lang="scss" scoped>
.category-name-pic {
  width: 282px;
  height: 140px;
  background: $--popup-background-main;
  display: none;
  position: absolute;
  z-index: 19;
  box-shadow: $--area-shadow-base;
}
.upload {
  height: 200px;
}
.categoryPic {
  width: 16px;
  height: 16px;
  padding-right: 5px;
}
.label-weight {
  font-weight: 500;
}
</style>
