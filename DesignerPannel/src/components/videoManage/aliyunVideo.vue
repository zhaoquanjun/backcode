<template>
  <div>
    <div v-if="!configured" class="notConfigured-wrap">
      <div style="text-align:center">
        <div class="notConfigured-img"></div>
        <div class="notConfigured-text">未配置阿里云视频，请先配置后使用</div>
        <a class="notConfigured-link">如何使用阿里云视频？</a>
      </div>
    </div>
    <div v-if="configured" class="configured-wrap">
      <div class="configured-header">
        <el-input
          v-model="picSearchOptions.keyword"
          size="medium"
          placeholder="输入视频名称搜索"
          style="width:270px"
          @keyup.enter.native="getListOfAli"
        >
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            style="cursor: pointer;"
            @click="getListOfAli"
          ></i>
        </el-input>
        <div class="ym-button--primary" @click="uploadVideo">上传视频</div>
      </div>
      <div class="configured-table">
        <el-table
          ref="multipleTable"
          :data="aliyunVideoData.list"
          tooltip-effect="dark"
          :height="tableHeight"
          :highlight-current-row="true"
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
          <el-table-column label="视频名称" min-width="350">
            <template slot-scope="scope">
              <div class="cover">
                <img width="100%" height="100%" :src="scope.row.coverUrl">
                <span class="play" @click="viewPic(scope.row)">
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
                  <div class="sizeStr">{{ scope.row.durationStr }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="sizeStr"
            sortable="custom"
            min-width="80"
            label="大小"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="createTimeStr"
            sortable="custom"
            label="上传时间"
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="上传"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <span slot="title">
        <span class="fs14" style="color: #262626;">
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
        :display-name="displayName"
        :upload-type="contentType"
        :node-data="nodeData"
        :api-host="apiHost"
        :no-category="true"
        @getList="getListOfAli"
        @closeDialog="closeDialog"
      />
      <!-- :accept="'video/*'" -->
    </el-dialog>
    <div id="img-list-dialog">
      <el-dialog
        :visible.sync="videoVisible"
        :modal-append-to-body="false"
        @close="closeVideoVisible"
      >
        <video
          ref="video"
          class="video"
          :src="fullOssUrl"
          controls="controls"
        />
      </el-dialog>
    </div>
    <loading v-show="loading" />
  </div>
</template>
<script>
import * as videoManageApi from '@/api/videoManageApi'
import environment from '@/environment/index.js'
import ChunkUpload from './ChunkUpload'
import Loading from '@comp/loading/loading'
export default {
  components: {
    ChunkUpload,
    Loading
  },
  props: [],
  data() {
    return {
      loading: false,
      configured: false,
      searchInput: '',
      tableHeight: 400,
      aliyunVideoData: {},
      picSearchOptions: {
        pageSize: 10,
        pageIndex: 1,
        orderByType: 'createtime',
        isDescending: true,
        categoryIdList: [],
        keyword: '',
        isDelete: false
      },
      displayName: '视频',
      contentType: 'Video',
      nodeData: {
        label: '全部分类',
        id: 0
      },
      apiHost: environment.contentApi,
      dialogTableVisible: false,
      fullOssUrl: '',
      videoVisible: false,
      deleteIdList: [],
      checkedList: []
    }
  },
  mounted() {},
  methods: {
    currentChange(currentRow, oldCurrentRow) {
      this.checkedList = [currentRow]
      this.$emit('getChecked', this.checkedList)
    },
    init() {
      this.getAksk()
    },
    async getAksk() {
      const { data } = await videoManageApi.getAksk()
      if (data.vodAuthorization) {
        this.configured = true
        this.getListOfAli()
      } else {
        this.configured = false
      }
    },
    // 获取列表
    async getListOfAli() {
      this.loading = true
      const { data } = await videoManageApi.getListOfAli(this.picSearchOptions)
      this.aliyunVideoData = data
      this.loading = false
    },
    handleSelectionChange(list) {
      this.deleteIdList = []
      list.forEach(item => {
        this.deleteIdList.push(item.id)
      })
    },
    sortChange(row) {
      if (row.prop === 'sizeStr') {
        this.picSearchOptions.orderByType = 'filesize'
      } else if (row.prop === 'createTimeStr') {
        this.picSearchOptions.orderByType = 'createtime'
      }
      if (row.order === 'ascending') {
        this.picSearchOptions.isDescending = false
      } else {
        this.picSearchOptions.isDescending = true
      }
      this.getListOfAli()
    },
    async viewPic(row) {
      if (!row.isLoadFinish) {
        this.$notify({
          customClass: 'notify-error',
          message: `视频正在加载中,请稍后点击播放`,
          showClose: false,
          duration: 2000
        })
        return
      }
      const { data } = await videoManageApi.getVideoPlayUrl(row.id)
      this.fullOssUrl = data
      this.videoVisible = true
      this.$nextTick(() => {
        this.$refs.video.play()
      })
    },
    closeVideoVisible() {
      this.videoVisible = false
    },
    uploadVideo() {
      this.dialogTableVisible = true
    },
    // 关闭上传文件弹窗
    closeDialog() {
      this.dialogTableVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.configured-table /deep/ {
  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background-color: $--popup-background-main;
  }
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
.el-input /deep/ .el-input__inner {
  padding-right: 50px;
}
.el-table /deep/ .el-table__row .el-input .el-input__suffix {
  display: flex;
  align-items: center;
}
// .el-table /deep/ .ascending .sort-caret.ascending {
//   border-bottom-color: $--color-primary;
// }
// .el-table /deep/ .descending .sort-caret.descending {
//   border-top-color: $--color-primary;
// }
// .el-table--enable-row-hover .el-table__body tr:hover > td {
//   background: $--background-color-hover;
// }
.file-title {
  font-size: $--font-size-normal;
  font-weight: 400;
  color: $--popup-font-color-main;
  line-height: 20px;
  overflow: hidden;
  max-width: 290px;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
  margin-bottom: 30px;
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
      background: url('~@static/images/play.png') no-repeat center;
    }
  }
}
.closeBtn {
  position: absolute;
  top: 20px;
  right: 57px;
  .icon-close {
    font-size: 24px;
    color: $--popup-font-color-auxiliary;
    padding: 4px;
    &:hover {
      background: rgba(0, 0, 0, 1);
      border-radius: $--border-radius-circle;
    }
  }
}
.video {
  cursor: pointer;
  outline: none;
  height: 50%;
  width: 780px;
  margin-top: 150px;
}
.notConfigured-wrap {
  margin: 24px 24px 0 24px;
  border: $--popup-border-main;
  width: calc(100% - 48px);
  height: 285px;
  background: $--popup-background-main;
  display: flex;
  justify-content: center;
  align-items: center;
  .notConfigured-img {
    width: 280px;
    height: 140px;
    background: url('~@static/images/noConfigAliyun.png') no-repeat center;
    background-size: contain;
    margin: auto;
  }
  .notConfigured-text {
    font-size: $--font-size-small;
    color: $--usual-font-color-auxiliary;
    font-weight: 400;
    line-height: 1;
    margin-top: 24px;
  }
  .notConfigured-link {
    font-size: $--font-size-small;
    color: $--color-main;
    font-weight: 400;
    margin-top: 8px;
    line-height: 1;
    display: inline-block;
  }
}
.configured-wrap {
  margin: 0 16px;
  width: calc(100% - 32px);
  .configured-header {
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    background: $--popup-background-main;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 0 16px;
    /deep/ .el-input__inner {
      height: 32px;
      line-height: 32px;
      color: $--popup-font-color-main;
      border-color: $--popup-border-color;
      background-color: $--popup-background-main;
    }
    .el-input__icon {
      color: $--usual-font-color-sub;
      line-height: 32px;
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
    color: #8c8c8c;
  }
}
</style>
