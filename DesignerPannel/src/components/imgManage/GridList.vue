<template>
  <div
    id="img-list"
    class="table-wrap"
    style="overflow: auto;
    height: 100%;"
  >
    <ul
      v-if="
        imgPageResult && imgPageResult.list && imgPageResult.list.length > 0
      "
      v-scrollBar
      class="img-list"
    >
      <li
        v-for="(item, index) in imgPageResult.list"
        :key="item.id"
        class="item"
      >
        <grid-list-item
          :is-selected="isSelected(item)"
          :cur-item="item"
          :multiple="multiple"
          @handleSelected="handleSelected"
          @viewPic="viewPic(item, index)"
          @handleMove="handleMove"
          @batchRemovePic="batchRemovePic"
          @rename="rename"
        ></grid-list-item>
      </li>
    </ul>
    <div
      v-if="
        imgPageResult && imgPageResult.list && imgPageResult.list.length < 1
      "
      class="empty-table"
      style="height: 100%; display: flex; justify-content: center; align-content: center; flex-wrap: wrap;"
    >
      <div
        style="display: flex; justify-content: center; align-content: center; flex-wrap: wrap; width: 100px; "
      >
        <img src="~@static/images/table-empty.png">
        <span>无数据</span>
      </div>
    </div>
    <div
      v-if="
        imgPageResult && imgPageResult.list && imgPageResult.list.length > 0
      "
      class="pageing"
    >
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :total="imgPageResult.totalRecord"
        :page-count="imgPageResult.totalPage"
        :page-size="picSearchOptions.pageSize"
        :page-sizes="[10, 20, 50]"
        @current-change="changePage"
        @size-change="changeSize"
      ></el-pagination>
    </div>
    <div id="img-list-dialog">
      <el-dialog
        :visible.sync="imgVisible"
        :modal-append-to-body="false"
        @close="closeDialog"
      >
        <el-carousel
          ref="carousel"
          :autoplay="false"
          :initial-index="initial"
          arrow="always"
          indicator-position="none"
          :loop="true"
        >
          <el-button
            class="el-carousel__arrow el-carousel__arrow--left left-prev"
            @click="prev"
          >左</el-button>
          <el-carousel-item>
            <h3>
              <img :src="fullOssUrl">
            </h3>
          </el-carousel-item>
          <el-button
            class="el-carousel__arrow el-carousel__arrow--right right-next"
            @click="next"
          ></el-button>
        </el-carousel>
        <div slot="footer" class="dislog-footer">
          <span>{{ picInfo.title }}</span>
          <span>分类: {{ picInfo.categoryName }}</span>
          <span>大小: {{ picInfo.sizeStr }}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import GridListItem from './GridListItme'
export default {
  components: {
    GridListItem
  },
  props: {
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    imgPageResult: {
      type: Object
    },
    picSearchOptions: {
      type: Object
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
      imgVisible: false,
      seletedList: [],
      imgList: '',
      fullOssUrl: '',
      picInfo: {},
      initial: -1,
      changeIndex: -1,
      selectedIndex: -1
    }
  },
  watch: {
    imgPageResult() {
      this.selectedIndex = -1
    }
  },
  methods: {
    handleSelected(item, index) {
      if (this.multiple) {
        let flag = true
        for (let i = 0; i < this.seletedList.length; i++) {
          if (item.id == this.seletedList[i].id) {
            this.seletedList.splice(i, 1)
            flag = false
          }
        }
        if (flag) {
          this.seletedList.push(item)
        }
      } else {
        if (this.seletedList.length) {
          if (item.id == this.seletedList[0].id) {
            this.seletedList.splice(0, 1)
          } else {
            this.$set(this.seletedList, 0, item)
          }
        } else {
          this.$set(this.seletedList, 0, item)
        }
      }
      this.$emit('handleSelectionChange', this.seletedList)
    },
    emptySelected() {
      this.seletedList = []
    },
    // 判断是否被选中
    isSelected(item) {
      for (let i = 0; i < this.seletedList.length; i++) {
        if (item.id == this.seletedList[i].id) {
          return true
        }
      }
      return false
    },
    changePage(page) {
      this.picSearchOptions.pageIndex = page
      this.$emit('getPicList')
    },
    changeSize(size) {
      this.picSearchOptions.pageSize = size
      this.$emit('getPicList')
    },
    /**
     * 查看大图
     */
    viewPic(row, index) {
      this.fullOssUrl = ''
      this.fullOssUrl = row.fullOssUrl
      this.imgList = this.imgPageResult.list
      this.imgVisible = true
      this.changeIndex = index
      this.picInfo = this.imgList[this.changeIndex]
    },
    prev() {
      this.$refs.carousel.prev()
      if (this.changeIndex > 0) {
        this.changeIndex = this.changeIndex - 1
      } else {
        this.changeIndex = this.picSearchOptions.pageSize - 1
      }
      this.fullOssUrl = this.imgList[this.changeIndex].fullOssUrl
      this.picInfo = this.imgList[this.changeIndex]
    },
    next() {
      this.$refs.carousel.next()
      this.changeIndex = this.changeIndex + 1
      if (this.changeIndex >= this.picSearchOptions.pageSize) {
        this.changeIndex = 0
      }
      this.fullOssUrl = this.imgList[this.changeIndex].fullOssUrl
      this.picInfo = this.imgList[this.changeIndex]
    },
    closeDialog() {
      this.fullOssUrl = ''
    },
    /**
     * 移动分类
     */
    handleMove(item) {
      this.$emit('moveClassify', true, item)
    },
    batchRemovePic(item) {
      this.$emit('batchRemove', [item.id])
    },
    rename(id, newName) {
      this.$emit('rename', id, newName)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap {
  position: relative;
}
.left-prev,
.right-next {
  opacity: 0;
}
.img-list {
  width: 100%;
  height: calc(100% - 64px);
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
  li.item {
    display: inline-block;
    // width: 141px;
    width: 20%;
    padding: 10px;
    box-sizing: border-box;
    vertical-align: top;
  }
}
.empty-table img {
  width: 54px;
  vertical-align: middle;
  padding: 18px 28px;
}
</style>
