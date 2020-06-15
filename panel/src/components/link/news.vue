<template>
  <div class="popup-content__area">
    <div class="popup-content__add">
      <p>请选择所需链接的文章</p>
      <a :href="redirectUrl" target="_blank">
        <button class="ym-button--primary">添加文章</button>
      </a>
    </div>
    <div class="popup-content__main">
      <div class="content-main__slider">
        <el-tree
          ref="tree"
          :data="treeArray"
          node-key="id"
          :empty-text="'暂无分类'"
          :data-ids="nodeIdArr"
          :default-checked-keys="nodeIdArr"
          :default-expanded-keys="nodeIdArr"
          :current-node-key="categoryId"
          @node-click="_handleNodeClick"
        ></el-tree>
      </div>
      <div class="content-main__list">
        <div class="content-main__search">
          <el-input
            v-model="newsTitle"
            placeholder="搜索文章标题"
            prefix-icon="el-icon-search"
            size="small"
            @input="_handleSearch"
          ></el-input>
        </div>
        <div v-show="newsList.length" class="content-main__list--outer">
          <ul class="content-main__list--item">
            <li
              v-for="(it, i) in newsList"
              :key="i"
              class="ellipsis"
              :itid="it.id"
              :curType="curType"
              :data-index="dataIndex"
              :class="{
                active: dataIndex == i && slider == 'news' && id == it.id,
              }"
              @click.stop="_handleSelectPage(i)"
            >
              <p class="single-line__overflow--hide">{{ it.title }}</p>
              <p class="date single-line__overflow--hide">
                <span>{{
                  it.createTimePrt && it.createTimePrt.slice(0, 10)
                }}</span>
                <i
                  class="iconfont iconduihao"
                  :style="{
                    visibility:
                      dataIndex == i && slider == 'news' && id == it.id
                        ? 'visible'
                        : 'hidden',
                  }"
                ></i>
              </p>
            </li>
          </ul>
          <div class="cl-pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
              :current-page="pageIndex"
              style="margin-top: 12px"
              @current-change="_handleChangeCurrent"
            ></el-pagination>
          </div>
        </div>
        <none-area v-show="!newsList.length" :target="target">
          <span v-if="!search" class="none-content__origin--tips">
            暂无文章，请先
            <span style="cursor: pointer;">
              <a
                :href="redirectUrl"
                target="_blank"
                class="none-content--tips"
              >添加文章</a>
            </span>
          </span>
          <span v-else>暂无搜索数据，请重新输入</span>
        </none-area>
        <loading v-show="loading" />
      </div>
    </div>
    <target
      :target="target"
      @handleChangeLinkTarget="handleChangeLinkTarget"
    ></target>
    <detail
      ref="detailPageContent"
      :page-type="'newsDetail'"
      :model="model"
      :page-size="pageSize"
      :page-index="pageIndex"
      @selectDetailPage="selectDetailPage"
    ></detail>
  </div>
</template>

<script>
import * as linkApi from '@api/linkApi'
import environment from '@environment/index'
import NoneArea from './none'
import Loading from '@comp/loading/loading'
import Target from './target'
import Detail from './detail'
export default {
  components: {
    NoneArea,
    Loading,
    Target,
    Detail
  },
  props: {
    model: {
      type: Object
    },
    target: {
      type: String
    },
    curType: {
      type: String
    },
    slider: {
      type: String
    }
  },
  data() {
    return {
      timer: null,
      pageSize: 6,
      total: 6,
      newsTitle: '',
      treeArray: [],
      newsList: [],
      nodeIdArr: [],
      pageIndex: 1,
      oldPageIndex: 1,
      oldDataIndex: 0,
      dataIndexFlag: false,
      dataIndex: 0,
      oldId: '',
      loading: false,
      target: 'createArticle',
      search: false,
      slotWords: {
        prev: '暂无文章，请先',
        last: '添加文章'
      },
      redirectUrl: environment.redirectUrl.createArticle,
      detailPageId: ''
    }
  },
  computed: {
    id: {
      get: function() {
        return this.model['Id']
      },
      set: function() {}
    },
    cType: {
      get: function() {
        return this.model['Ctype']
      },
      set: function() {}
    },
    categoryId: {
      get: function() {
        let categoryId = 0
        if (this.model['Ctype'] === 'news') {
          categoryId = this.model['CategoryId'] ? this.model['CategoryId'] : 0
        }
        return categoryId
      },
      set: function() {}
    }
  },
  watch: {
    newsList() {
      if (!this.newsList.length && this.newsTitle !== '') {
        this.search = true
      }
      if (!this.newsList.length && this.newsTitle === '') {
        this.search = false
      }
    }
  },
  created() {
    this.getCategorytree()
  },
  mounted() {
    this.oldId = this.id
    this.$refs.detailPageContent.getPageDetailData()
  },
  methods: {
    _handleNodeClick(data) {
      this.nodeIdArr = [data.id]
      const id = this.cType === 'news' ? this.id : ''
      if (data.id >= 0) {
        this._cycleForCategoryIds(data.children, this.nodeIdArr)
        this.getNewsList(this.nodeIdArr, id, (data.id < 0))
      } else {
        this.getNewsList(data.language, id, (data.id >= 0))
      }
    },
    async getNewsList(param, id, flag) {
      let options
      if (flag) {
        options = {
          title: this.newsTitle,
          newsOrderColumns: 'publishtime',
          topStatus: null,
          publishStatus: null,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          isDescending: true,
          id: id,
          language: param
        }
      } else {
        options = {
          title: this.newsTitle,
          categoryIdList: param,
          newsOrderColumns: 'publishtime',
          topStatus: null,
          publishStatus: null,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          isDescending: true,
          id: id
        }
      }
      this.loading = true
      const { data } = await linkApi.getArticleList(options)
      this.total = data.totalRecord
      this.newsList = data.list
      this.pageIndex = data.pageIndex
      this.loading = false
      if (!this.dataIndexFlag) {
        this.dataIndexFlag = true
        this.dataIndex = data.dataIndex
        this.oldDataIndex = data.dataIndex
        this.oldPageIndex = data.pageIndex
      } else {
        if (this.pageIndex === this.oldPageIndex) {
          this.dataIndex = data.dataIndex
        } else {
          this.dataIndex = -1
        }
      }
    },
    async getCategorytree() {
      const { data } = await linkApi.getArticleCategory()
      this.treeArray = data
      this.nodeIdArr = [0]
      this._getCurrentIds(data)
      this.getNewsList(this.nodeIdArr, this.id)
    },
    _getCurrentIds(arr) {
      if (this.cType === 'news') {
        if (
          this.model['CategoryId'] === 0 ||
          this.model['CategoryId'] == null
        ) {
          this.nodeIdArr = []
          this._cycleForCategoryIds(arr, this.nodeIdArr)
        } else {
          this.nodeIdArr = [this.model['CategoryId']]
        }
      }
    },
    _cycleForCategoryIds(data, arr) {
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        arr.push(item.id)
        if (item.children && item.children.length > 0) {
          this._cycleForCategoryIds(data[i].children, arr)
        }
      }
    },
    _handleSelectPage(i) {
      this.dataIndex = i
      this.model['Id'] = this.newsList[i].id
      this.$emit('handleChangeUrl', {
        url: this.newsList[i].url,
        title: this.newsList[i].title,
        cType: 'news',
        id: this.newsList[i].id,
        categoryId: this.newsList[i].categoryId,
        detailPageId: this.detailPageId
      })
    },
    handleChangeLinkTarget(val) {
      this.$emit('handleChangeTarget', val)
    },
    _handleSearch(val) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.newsList = []
        this.newsTitle = val
        this.getNewsList(this.nodeIdArr, this.id)
      }, 500)
    },
    _handleChangeCurrent(val) {
      var id = this.id
      if (val !== this.oldPageIndex) id = ''
      this.pageIndex = val
      this.getNewsList(this.nodeIdArr, id)
    },
    handleCancle() {
      this.dataIndex = this.oldDataIndex
      this.pageIndex = this.oldPageIndex
      this.model['Id'] = this.oldId
    },
    selectDetailPage(val) {
      this.detailPageId = val
      this.$emit('handleChangeDetailPageId', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-content__area {
  width: 582px;
  border-left: 1px solid $--popup-border-color;
  .popup-content__add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    p {
      font-size: $--font-size-normal;
      line-height: 20px;
      color: $--popup-font-color-main;
      cursor: auto;
    }
  }
  .popup-content__main {
    display: flex;
    justify-content: flex-start;
    width: 558px;
    text-align: right;
    border-top: 1px solid $--popup-border-color;
    .content-main__slider {
      padding: 16px 12px;
      width: 172px;
      max-height: 362px;
      overflow-y: auto;
    }
    .content-main__list {
      position: relative;
      width: 100%;
      border-left: 1px solid $--popup-border-color;
      .content-main__search {
        display: flex;
        align-items: flex-end;
        margin-top: 12px;
        margin-left: 12px;
        width: calc(100% - 12px);
        height: 40px;
      }
      .content-main__search /deep/ .el-icon-search {
        color: $--usual-font-color-sub;
      }
      .content-main__search /deep/ .el-input__inner {
        border: $--popup-border-main;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        color: $--popup-font-color-main;
        background-color: $--popup-background-main;
      }
      .content-main__list--outer {
        overflow: hidden;
        padding-bottom: 16px;
        .content-main__list--item {
          padding: 10px 0 0 12px;
          width: 100%;
          height: 270px;
          overflow-y: hidden;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 4px;
            padding: 0 8px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            p {
              width: 210px;
              padding: 0;
              font-size: 14px;
              color: $--popup-font-color-sub;
              text-align: left;
              line-height: 40px;
            }
            p.date {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              width: 144px;
              span {
                color: $--popup-font-color-sub;
                margin-right: 16px;
              }
            }
            &:hover {
              background: $--list-background-hover;
            }
          }
          .active {
            background: $--list-background-selected;
            p,
            p.date {
              color: $--color-main;
              span,
              i {
                color: $--color-main;
              }
            }
            &:hover {
              background: $--list-background-hover;
              p {
                color: $--color-main;
                span,
                i {
                  color: $--color-main;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
