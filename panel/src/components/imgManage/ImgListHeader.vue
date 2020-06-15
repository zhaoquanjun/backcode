<template>
  <el-header class="content-header flex-between-center--area">
    <template>
      <div class="seachInput head-item flex-between-center--area">
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
            @click="searchEnterFun"
          ></i>
        </el-input>
      </div>
      <div class="head-item flex-between-center--area">
        <span>排序</span>
        <span class="select-sort">
          <!-- <select id="imageSortKeyWord" name="sortword" @change="changeSelected">
            <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
          </select> -->
          <ym-select-box v-model="picSearchOptions.orderByType" :title="'label'" :option-list="options" @change="changeSelected"></ym-select-box>
          <!-- <el-select
            v-model="picSearchOptions.orderByType"
            size="mini"
            placeholder="请选择"
            @change="changeSelected"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select> -->
        </span>
        <div
          class="sort-btn flex-center-center--area"
          :class="{ active: descSort }"
          @click="switchIsDesc('dec')"
        >
          <i class="iconfont iconxiayi"></i>
        </div>
        <div
          class="sort-btn flex-center-center--area"
          style="margin-left:8px"
          :class="{ active: ascSort }"
          @click="switchIsDesc('asc')"
        >
          <i class="iconfont iconshangyi"></i>
        </div>
      </div>
      <div class="head-item  flex-between-center--area">
        <div class="ym-button--primary" @click="switchUploadBoxShowStatus">
          上传图片
        </div>
      </div>
    </template>
  </el-header>
</template>
<script>
import YmSelectBox from '@comp/ymDefined/select'
export default {
  components: {
    YmSelectBox
  },
  props: {
    picSearchOptions: {
      type: Object
    }
  },
  data() {
    return {
      ascSort: false,
      descSort: true,

      modeSelecte: true,
      options: [
        {
          value: 'CreateTime',
          label: '创建时间'
        },
        {
          value: 'FileSize',
          label: '文件大小'
        },
        {
          value: 'FileName',
          label: '文件名'
        }
      ]
    }
  },
  methods: {
    changeSelected(value) {
      this.picSearchOptions.orderByType = value
      this.getPicList()
    },
    getPicList() {
      this.$emit('getPicList')
    },
    searchEnterFun() {
      this.getPicList()
    },
    switchUploadBoxShowStatus() {
      this.$emit('switchUploadBoxShowStatus')
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
      this.$emit('batchMove')
    },
    batchDelete() {
      this.$emit('batchDelete')
    },
    showType(value) {
      if (value === 'list') {
        this.modeSelecte = false
      }
      if (value === 'grid') {
        this.modeSelecte = true
      }
      this.$emit('showType', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-header {
  border-bottom: $--popup-border-main;
  background: $--usual-font-color-main;
  height: 50px !important;
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
  background-color: $--popup-background-main;
  border-color: $--popup-border-color;
}

.seachInput /deep/ .el-icon-search {
  color: $--popup-font-color-sub;
  line-height: 32px;
}

.head-item {
  span:first-of-type {
    font-size: $--font-size-small;
  }

  .select-sort {
    width: 117px;
    box-sizing: border-box;
    height: 32px !important;
    margin: 0 16px 0 7px;
  }

  .select-sort /deep/ .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
    background-color: $--popup-background-main;
    border-color: $--popup-border-color;
    color: $--popup-font-color-main;
  }

  .sort-btn {
    width: 32px;
    height: 32px;
    border: $--popup-border-main;
    border-radius: $--border-radius-base;
    i {
      color: $--popup-font-color-main;
    }
    &:hover {
      border-color: $--font-color-hover;
      i {
        color: $--font-color-hover;
      }
    }
  }

  .sort-btn.active {
    border-color: $--font-color-selected;
    i {
      color: $--font-color-selected;
    }
  }
}
</style>
