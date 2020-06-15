<template>
  <div
    id="table-list"
    class="table-wrap"
  >
    <el-table
      ref="multipleTable"
      :data="imgPageResult.list"
      tooltip-effect="dark"
      class="content-table table-content"
      :height="tableHeight"
      :highlight-current-row="true"
      row-key="id"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @current-change="currentChange"
    >
      <template slot="empty">
        <div class="empty-table">
          <img src="~@static/images/table-empty.png">
          <p>无数据</p>
        </div>
      </template>
      <el-table-column
        label="视频名称"
        min-width="350"
      >
        <template slot-scope="scope">
          <div class="cover">
            <img
              width="100%"
              height="100%"
              :src="scope.row.coverUrl"
            >
            <span
              class="play"
              @click="viewPic(scope.row,scope.$index)"
            >
              <div class="play-btn">
                <span></span>
              </div>
            </span>
          </div>
          <div>
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.title"
              placement="top"
            >
              <div class="file-title cursor-p">{{ scope.row.title }}</div>
            </el-tooltip>
            <div class="format">
              <div>格式： {{ formatterFileExt(scope.row.fileExtension) }}</div>
              <div class="sizeStr">{{ scope.row.sizeStr }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="sizeStr" sortable='custom' label="大小" show-overflow-tooltip></el-table-column> -->
      <el-table-column
        prop="durationStr"
        label="时长"
        min-width="80"
      ></el-table-column>
      <el-table-column
        prop="createTimeStr"
        sortable="custom"
        label="上传时间"
        min-width="130"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <div class="list-footer">
      <div class="list-footerLeft">
        <div class="storage-wrap">
          <div style="display:flex;justify-content: space-between;">
            <span class="title">已用空间</span>
            <span class="storage-content">{{ storageUsage.currentUsage }} / {{ storageUsage.maxSize }}</span>
          </div>
          <div class="use-storage">
            <div
              class="progress-bar"
              :style="{'width':storageUsage.prograss+'%'}"
            ></div>
          </div>
        </div>
        <div class="storage-wrap">
          <div style="display:flex;justify-content: space-between;">
            <span class="title">已用流量</span>
            <span class="storage-content">{{ usageTraffic.currentUsage }} / {{ usageTraffic.maxSize }}</span>
          </div>
          <div class="use-storage">
            <div
              class="progress-bar"
              :style="{'width':usageTraffic.prograss+'%'}"
            ></div>
          </div>
        </div>
      </div>
      <div
        id="pageing"
        class="pageing"
      >
        <slot name="paging"></slot>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="imgPageResult.totalRecord"
          :page-count="imgPageResult.totalPage"
          :pager-count="5"
          :page-size="picSearchOptions.pageSize"
          @current-change="changePage"
          @size-change="changeSize"
        ></el-pagination>
      </div>
    </div>
    <div id="img-list-dialog">
      <el-dialog
        :visible.sync="imgVisible"
        :modal-append-to-body="false"
        @close="closeDialog"
      >
        <video
          ref="video"
          class="video"
          :src="fullOssUrl"
          controls="controls"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  adminDownload,
  getStorageUsage,
  getCurrentUsageTraffic
} from '@/api/contentCommonApi.js'
export default {
  props: ['imgPageResult', 'picSearchOptions', 'treeResult'],
  data() {
    return {
      picInfo: {},
      index: -1, //
      isRename: true, // 重命名图片名称
      initial: 0,
      imgVisible: false,
      multipleSelection: [],
      picUrl: null,
      picTitle: null,
      categoryVisable: false,
      changeCategoryPicId: null,
      imgList: '',
      fullOssUrl: '',
      tableHeight: 350,
      storageUsage: {},
      usageTraffic: {},
      checkedList: []
    }
  },

  mounted() {
    this._getStorageUsage()
    this._getCurrentUsageTraffic()
  },
  methods: {
    check(item) {
      if (this.checkedList.length > 0) {
        if (item.id == this.checkedList[0].id) {
          this.checkedList.splice(0, 1)
        } else {
          this.checkedList.splice(0, 1)
          this.checkedList.push(item)
        }
      } else {
        this.checkedList.push(item)
      }
      this.$emit('getChecked', this.checkedList)
    },
    isChecked(item) {
      if (this.checkedList.length > 0) {
        if (item.id == this.checkedList[0].id) {
          return true
        }
      }
      return false
    },
    currentChange(currentRow, oldCurrentRow) {
      this.checkedList = [currentRow]
      this.$emit('getChecked', this.checkedList)
    },
    // 改变排序
    sortChange(row) {
      // value: "CreateTime",
      // label: "创建时间"
      // value: "FileSize",
      // label: "文件大小"
      if (row.prop == 'sizeStr') {
        this.picSearchOptions.orderByType = 'FileSize'
      } else {
        this.picSearchOptions.orderByType = 'CreateTime'
      }
      if (row.order == 'ascending') {
        this.picSearchOptions.isDescending = false
      } else {
        this.picSearchOptions.isDescending = true
      }
      this.$emit('getList')
    },
    bytesToSize(bytes, flag) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      let b = bytes / Math.pow(k, i)
      if (flag === 1) {
        b = b.toFixed(2)
      }
      const storage = b + sizes[i]
      return storage
    },
    // 获取使用的内存
    async _getStorageUsage() {
      const { data } = await getStorageUsage('Video')
      this.storageUsage = {
        maxSize: this.bytesToSize(data.maxSize),
        currentUsage: this.bytesToSize(data.currentUsage, 1),
        prograss: (data.currentUsage / data.maxSize) * 100
      }
    },
    // 获取使用的流量
    async _getCurrentUsageTraffic() {
      const { data } = await getCurrentUsageTraffic('Video')

      this.usageTraffic = {
        maxSize: this.bytesToSize(data.maxSize),
        currentUsage: this.bytesToSize(data.currentUsage, 1),
        prograss: (data.currentUsage / data.maxSize) * 100
      }
      if (data.currentUsage >= data.maxSize) {
        this.$notify({
          customClass: 'notify-error',
          message: `您的视频流量剩余量为0，为不影响您的网站效果，请及时联系管理员！!`,
          duration: 1500
        })
      }
    },
    /**
     * 单选或全选操作
     */
    handleSelectionChange(list) {
      this.multipleSelection = list
      this.$emit('handleSelectionChange', list)
    },
    /**
     * 移动分类
     */
    changeCategory(data) {
      this.$emit('changeCategory', data.id, [this.changeCategoryPicId])
      this.categoryVisable = false
    },
    // 去左右空格;
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    },
    // 重命名图片名称
    rename(id, row, index) {
      //   debugger;
      if (row.title) this.newName = row.title
      if (!this.trim(row.title)) {
        row.title = this.newName
        this.$notify({
          customClass: 'notify-error',
          message: `视频名称不能为空`,
          showClose: false,
          duration: 2000
        })
        return false
      }
      if (isNaN(index)) {
        this.index = -1
        this.$emit('rename', id, row.title)
        return
      }
      this.index = index
      this.$nextTick(() => {
        this.$refs.renameInput[0].focus()
      })
    },
    /**
     *
     */
    viewPic(row, index) {
      if (!row.isLoadFinish) {
        this.$notify({
          customClass: 'notify-error',
          message: `视频正在加载中,请稍后点击播放`,
          showClose: false,
          duration: 2000
        })
        return
      }
      this.imgList = this.imgPageResult.list
      this.picInfo = this.imgList[index]
      this._adminDownload(row)
    },
    async _adminDownload(row) {
      const type = row.fileType
      const id = row.id
      const { data } = await adminDownload(type, id)
      this.fullOssUrl = data
      this.imgVisible = true
      this.$nextTick(() => {
        this.$refs.video.play()
      })
    },
    changePage(page) {
      this.picSearchOptions.pageIndex = page
      this.$emit('getList')
    },
    changeSize(size) {
      this.picSearchOptions.pageSize = size
      this.$emit('getList')
    },
    closeDialog() {
      this.$refs.video.pause()
    },
    formatterFileExt(fileExt) {
      if (fileExt) {
        if (fileExt.substring(0, 1) == '.') return fileExt.substring(1)
        return fileExt
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.table-content /deep/ {
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: $--popup-background-auxiliary;
  }
}
.el-input /deep/ .el-input__inner {
  padding-right: 50px;
}
.el-table /deep/ .el-table__row .el-input .el-input__suffix {
  display: flex;
  align-items: center;
}
.titleWrap /deep/ .el-input {
  margin-top: -10px;
}
.table {
  height: 537px;
  border: 1px solid $--popup-border-color;
  .tableTitle {
    width: 100%;
    height: 51px;
    border-bottom: 1px solid $--popup-border-color;
    div {
      display: inline-block;
      font-size: $--font-size-normal;
      font-weight: 400;
      color: $--popup-font-color-sub;
      line-height: 51px;
      box-sizing: border-box;
    }
    div:nth-child(1) {
      padding-left: 30px;
      width: 475px;
    }
    div:nth-child(2) {
      width: 80px;
    }
    div:nth-child(3) {
      width: 130px;
    }
    div:nth-child(4) {
      width: 178px;
    }
  }
  .tableList {
    height: 486px;
    margin-right: -15px;
    overflow-y: auto;
    .tableListItem {
      height: 160px;
      border: 2px solid transparent;
      border-bottom: $--popup-border-main;
    }
    .checked {
      border: 2px solid $--background-selected;
    }
  }
}
.file-title {
  font-size: $--font-size-normal;
  font-weight: 400;
  color: r$--popup-font-color-main;
  line-height: 20px;
  overflow: hidden;
  max-width: 260px;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
  margin-bottom: 30px;
}
.titleWrap {
  display: inline-block;
  padding-top: 24px;
}
.format {
  font-size: $--font-size-small;
  font-weight: 400;
  color: $--popup-font-color-sub;
  line-height: 20px;
  white-space: unset !important;
  margin-top: 24px;
  div {
    display: inline-block;
  }
  .sizeStr {
    margin-left: 8px;
  }
}
.cover {
  position: relative;
  width: 150px !important;
  height: 100px !important;
  margin-right: 10px;
  img {
    object-fit: cover;
  }
  .play {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 2px;
    background: $--popup-background-mask;
    text-align: center;
    .play-btn {
      width: 34px;
      height: 34px;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: url("~@static/images/play.png") no-repeat center;
    }
  }
}
.video {
  cursor: pointer;
  outline: none;
  height: 50%;
  width: 800px;
  margin-top: 150px;
}
.table-content {
  margin-right: 16px;
  border-radius: 2px;
  .handle-btn-wrap {
    justify-content: flex-start;
    span {
      i {
        color: $--popup-font-color-sub;
      }
    }
    .edit-icon {
      margin-right: 32px;
      cursor: pointer;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
      }
    }
    .edit-icon:hover i,
    .more-operate:hover i {
      color: $--font-color-hover;
    }
    .more-operate {
      position: relative;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: -10px;
        bottom: -10px;
        left: -10px;
      }
    }
  }
}
.img-name {
  cursor: pointer;
  width: 80%;
}
.storage-wrap {
  margin-right: 28px;
  line-height: 25px;
  .use-storage {
    display: inline-block;
    width: 186px;
    background: $--popup-background-auxiliary;
    padding: 4px;
    border-radius: 30px;

    .progress-bar {
      height: 5px;
      width: 100%;
      border-radius: 30px;
      background: $--color-main;
    }
  }
  .title {
    font-size: $--font-size-small;
  }
  .storage-content {
    font-size: $--font-size-small;
    color: $--usual-font-color-sub;
  }
}
.list-footer {
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .list-footerLeft {
    display: flex;
  }
}
/* table 头部颜色 和 高度 */
#table-list /deep/ .el-table thead th {
  padding: 0;
  height: 50px;
  background: $--popup-background-main !important;
  .cell {
    color: $--usual-font-color-sub;
    font-weight: 400;
    font-size: $--font-size-normal;
  }
}
#table-list /deep/ .el-table td {
  border-bottom: 1px solid $--popup-border-color;
}
#table-list {
  .el-table td {
    padding: 19px 0;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: $--popup-background-auxiliary;
  }
  .el-table-column--selection {
    .el-checkbox__inner {
      width: 18px;
      height: 18px;
    }
    .el-checkbox__inner::after {
      left: 6px;
      top: 3px;
    }
  }
}
// table 无内容时的样式
.empty-table {
  padding: 50px;
  text-align: center;
  height: 251px;

  img {
    vertical-align: middle;
    padding: 18px 28px;
    display: inline-block;
    width: 50px;
    height: 35px;
    margin-top: 50px;
  }

  p {
    color: $--usual-font-color-sub;
  }
}
</style>
