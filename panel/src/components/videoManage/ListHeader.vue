<template>
  <el-header class="content-header">
    <template v-if="!isBatchHeaderShow">
      <div class="seachInput head-item">
        <el-input
          v-model="picSearchOptions.keyword"
          size="medium"
          placeholder="输入名称搜索"
          class="input-with-select"
          @keyup.enter.native="searchEnterFun"
        >
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            style="cursor: pointer;"
            @click="getPicList"
          ></i>
        </el-input>
      </div>
      <!-- <div class="head-item head-middle">
        <template v-if="contentType==='File'">
          <span>文件类型</span>
          <span class="select-sort">
            <el-select size="small"
                       v-model="fileTypeLabel"
                       placeholder="请选择"
                       @change="changeType">
              <el-option v-for="item in fileTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </span>
          <span>置顶</span>
          <span class="select-sort select-item">
            <el-select size="small"
                       v-model="topValue"
                       placeholder="请选择"
                       @change="changeStickStatus">
              <el-option v-for="item in topOptions"
                         :key="item.topValue"
                         :label="item.topLabel"
                         :value="item.topValue"></el-option>
            </el-select>
          </span>
        </template>
        <span>排序</span>
        <span class="select-sort">
          <el-select size="small"
                     v-model="orderByLabel"
                     placeholder="请选择"
                     @change="changeSelected">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </span>
        <button @click="switchIsDesc('dec')"
                class="desBtn"
                style="margin-left:24px">
          <i class="iconfont iconicon-Arrow1"
             :style="{'color':(descSort?'#00c1de':'#262626')}"></i>
        </button>
        <button @click="switchIsDesc('asc')"
                class="desBtn"
                style="margin-left:8px">
          <i class="iconfont iconicon-Arrow"
             :style="{'color':(ascSort?'#00c1de':'#262626')}"></i>
        </button>
      </div> -->
      <div class="head-item head-right">
        <div class="ym-button--primary" @click="switchUploadBoxShowStatus">上传{{ displayName }}</div>
      </div>
    </template>
    <template v-else>
      <div class="handle-batch">
        <span>
          已选
          <i>{{ countPic }}</i> 个文件
        </span>
        <div>
          <button class="btn-small btn-lightblue-notboard" @click="batchMove">
            移动
          </button>
          <button
            v-if="contentType != 'Video'"
            class="btn-small btn-lightblue-notboard"
            @click="batchDownLoad"
          >
            下载
          </button>
          <button class="btn-small btn-red-notboard" @click="batchDelete">
            删除
          </button>

          <el-dropdown
            v-if="contentType == 'File'"
            trigger="click"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <button class="btn-small btn-notboard">
                <i class="iconfont iconsangedian"></i>
              </button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="top">置顶</el-dropdown-item>
              <el-dropdown-item command="cancelTop">取消置顶</el-dropdown-item>
              <!-- <el-dropdown-item command="delete">删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
  </el-header>
</template>
<script>
export default {
  props: [
    'picSearchOptions',
    'isBatchHeaderShow',
    'countPic',
    'displayName',
    'contentType'
  ],
  data() {
    return {
      ascSort: false,
      descSort: true,

      modeSelecte: true,
      options: [
        {
          value: 'CreateTime',
          label: '上传时间'
        },
        {
          value: 'FileName',
          label: '文件名称'
        },
        {
          value: 'DownloadCount',
          label: '下载次数'
        },
        {
          value: 'FileSize',
          label: '文件大小'
        }
      ],
      orderByLabel: 'CreateTime',
      topOptions: [
        {
          topValue: '',
          topLabel: '全部'
        },
        {
          topValue: 1,
          topLabel: '是'
        },
        {
          topValue: 0,
          topLabel: '否'
        }
      ],
      topValue: '',
      fileTypeOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'Document',
          label: '文档'
        },
        {
          value: 'Image',
          label: '图片'
        },
        {
          value: 'Video',
          label: '视频'
        },
        {
          value: 'Audio',
          label: '音乐'
        },
        {
          value: 'Rar',
          label: '压缩包'
        },
        {
          value: 'Others',
          label: '其他'
        }
      ],
      fileTypeLabel: ''
    }
  },
  mounted() {
    this.sortType()
  },
  methods: {
    sortType() {
      if (this.contentType === 'Video') {
        this.options = [
          {
            value: 'CreateTime',
            label: '上传时间'
          },
          {
            value: 'FileSize',
            label: '视频大小'
          }
        ]
      } else if (this.contentType === '') {
        this.options = [
          {
            value: 'CreateTime',
            label: '上传时间'
          },
          {
            value: 'FileSize',
            label: '音频大小'
          }
        ]
      }
    },
    changeSelected(value) {
      this.picSearchOptions.orderByType = value
      this.getPicList()
    },
    changeType(value) {
      this.picSearchOptions.fileExtensionType = value
      this.getPicList()
    },
    getPicList() {
      this.$emit('getList')
    },
    searchEnterFun() {
      this.getPicList()
    },
    switchUploadBoxShowStatus() {
      this.$emit('switchUploadBoxShowStatus')
    },
    changeStickStatus(value) {
      if (isNaN(parseInt(value))) {
        value = null
      } else {
        value = !!value
      }
      this.picSearchOptions.isTop = value
      this.getPicList()
    },
    switchIsDesc(flag) {
      if (flag === 'asc') {
        this.ascSort = true
        this.descSort = !this.ascSort
        this.picSearchOptions.isDescending = false.isDescending
      } else {
        this.descSort = true
        this.ascSort = !this.descSort
        this.picSearchOptions.isDescending = true
      }

      this.getPicList()
    },
    batchMove() {
      this.$emit('batchMove', true)
    },
    batchDelete() {
      this.$emit('batchDelete')
    },
    batchDownLoad() {
      this.$confirm(`您确定要下载所选文件吗？`, '提示', {
        iconClass: 'icon-warning',
        callback: async action => {
          if (action === 'confirm') {
            this.$emit('batchDownLoad')
          }
        }
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'top':
          this.$emit('batchTop', true)
          break
        case 'cancelTop':
          this.$emit('batchTop', false)
          break
        case 'delete':
          this.batchDelete()
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $--popup-background-main;
  height: 70px !important;
  border-bottom: none;
  padding: 0 24px !important;
}

.seachInput {
  display: inline-block;
  height: 32px !important;
  line-height: 32px !important;
  box-sizing: border-box;
}
.seachInput /deep/ .el-input__inner {
  height: 32px !important;
  line-height: 32px !important;
  color: $--popup-font-color-main;
  border-color: $--popup-border-color;
  background-color: $--popup-background-main;
}

.select-sort {
  display: inline-block;
  width: 117px;
  box-sizing: border-box;
  height: 32px !important;
  margin: 0 16px 0 7px;
}

.select-sort /deep/ .el-input__inner {
  height: 32px !important;
  line-height: 32px !important;
}

.head-item {
  display: inline-block;
  flex: none;
}

.mode-item {
  display: inline-block;
  width: 45px;
  padding: 8px 0;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid $--popup-border-color;
  border-radius: 2px;

  .mode-icon {
    display: inline-block;
    width: 16px;
    height: 14px;
  }
}

.list-mode {
  border-right: none;
  margin-left: 16px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  .list-icon {
    background: url('~@static/images/imgpopup/list-mode.png') no-repeat center;
    background-size: 100%;
  }

  .list-iconOn {
    background: url('~@static/images/imgpopup/list-modeOn.png') no-repeat center;
    background-size: 100%;
  }
}

.grid-mode {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  .mode-icon {
    background: url('~@static/images/imgpopup/grid-mode.png') no-repeat center;
    background-size: 100%;
  }

  .mode-iconOn {
    background: url('~@static/images/imgpopup/grid-modeOn.png') no-repeat center;
    background-size: 100%;
  }
}

.head-right,
.head-middle {
  float: right;
  display: flex;
  align-items: center;
}

.head-middle {
  margin-left: auto;
  padding-right: 82px;

  .sort-icon {
    display: inline-block;
    width: 16px;
    height: 14px;
  }

  .asc {
    background: url('~@static/images/imgpopup/asc.png') no-repeat center;
    background-size: contain;
  }

  .asc-icon-on {
    background: url('~@static/images/imgpopup/asc-on.png') no-repeat center;
    background-size: contain;
  }

  .dec {
    background: url('~@static/images/imgpopup/desc.png') no-repeat center;
    background-size: contain;
  }

  .dec-icon-on {
    background: url('~@static/images/imgpopup/desc-on.png') no-repeat center;
    background-size: contain;
  }
}

.upload-wrap {
  padding: 8px 16px;
  background: $--color-main;
  color: $--popup-font-color-auxiliary;
}

// IMG 批量操作的头部样式
.handle-batch {
  display: flex;
  align-items: center;

  width: 100%;

  > div {
    margin-left: 16px;
  }

  .handle-btn {
    margin: 0 8px;
  }
}

// 文章 产品
.bach-header {
  display: flex;
  align-items: center;

  width: 100%;

  .bach-hanlder {
    padding-left: 24px;
  }
}
</style>
