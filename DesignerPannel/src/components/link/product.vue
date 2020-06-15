<template>
  <div class="popup-content__area">
    <div class="popup-content__add">
      <p>请选择所需链接的产品</p>
      <a :href="redirectUrl" target="_blank">
        <div class="ym-button--primary">添加产品</div>
      </a>
    </div>
    <div class="popup-content__main">
      <div class="content-main__slider">
        <el-tree
          :data="treeArray"
          node-key="id"
          :data-category="nodeIdArr"
          :default-expanded-keys="nodeIdArr"
          :current-node-key="categoryId"
          @node-click="_handleNodeClick"
        ></el-tree>
      </div>
      <div class="content-main__list">
        <div class="content-main__search">
          <el-input
            v-model="productTitle"
            placeholder="搜索产品标题"
            prefix-icon="el-icon-search"
            size="small"
            @input="_handleSearch"
          ></el-input>
        </div>
        <div class="content-main__list--outer">
          <div v-show="productList.length">
            <ul class="content-main__list--item">
              <li
                v-for="(it, i) in productList"
                :key="i"
                class="ellipsis"
                :class="{
                  active: dataIndex == i && slider == 'product' && id === it.id
                }"
                @click.stop="_handleSelectPage(i)"
              >
                <p class="single-line__overflow--hide">{{ it.name }}</p>
                <p class="date single-line__overflow--hide">
                  <span>{{ it.createTime && it.createTime.slice(0, 10) }}</span>
                  <i
                    class="iconfont iconduihao"
                    :style="{
                      visibility:
                        dataIndex == i && slider == 'product' && id == it.id
                          ? 'visible'
                          : 'hidden'
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
          <none-area v-show="!productList.length" :target="target">
            <span v-if="!search" class="none-content__origin--tips">
              暂无产品，请先
              <span style="cursor: pointer;">
                <a
                  class="none-content--tips"
                  :href="redirectUrl"
                  target="_blank"
                  >添加产品</a
                >
              </span>
            </span>
            <span v-else>暂无搜索数据，请重新输入</span>
          </none-area>
          <loading v-show="loading" />
        </div>
      </div>
    </div>
    <target
      :target="target"
      @handleChangeLinkTarget="handleChangeLinkTarget"
    ></target>
    <detail
      ref="detailPageContent"
      :page-type="'productDetail'"
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
import noneArea from './none'
import Loading from '@comp/loading/loading'
import Target from './target'
import Detail from './detail'
export default {
  components: {
    noneArea,
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
      pageIndex: 1,
      productTitle: '',
      total: 6,
      treeArray: [],
      productList: [],
      nodeIdArr: [],
      oldPageIndex: 1,
      oldDataIndex: 0,
      dataIndexFlag: false,
      dataIndex: 0,
      oldId: '',
      loading: false,
      search: false,
      target: 'createProduct',
      redirectUrl: environment.redirectUrl.createProduct,
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
        if (this.model['Ctype'] === 'product') {
          categoryId = this.model['CategoryId'] ? this.model['CategoryId'] : 0
        }
        return categoryId
      },
      set: function() {}
    }
  },
  watch: {
    productList() {
      if (!this.productList.length && this.productTitle !== '') {
        this.search = true
      }
      if (!this.productList.length && this.productTitle == '') {
        this.search = false
      }
    }
  },
  created() {
    this.getProductTree()
  },
  mounted() {
    this.oldId = this.id
    this.$refs.detailPageContent.getPageDetailData()
  },
  methods: {
    _handleNodeClick(data) {
      this.nodeIdArr = [data.id]
      const id = this.cType === 'product' ? this.id : ''
      if (data.id >= 0) {
        this._cycleForCategoryIds(data.children, this.nodeIdArr)
        this.getProductList(this.nodeIdArr, id, id >= 0)
      } else {
        this.getProductList(data.language, id, id >= 0)
      }
    },
    async getProductList(param, id, flag) {
      let options
      if (flag) {
        options = {
          pageSize: this.pageSize, // 11
          pageIndex: this.pageIndex, // 1
          orderByType: 'publishtime',
          isDescending: true, // 倒叙 或 正序
          keyword: this.productTitle, // 1
          isDelete: false, // 1
          isOnSell: null, // is 上架
          categoryIdList: param, // 1,
          id: id
        }
      } else {
        options = {
          pageSize: this.pageSize, // 11
          pageIndex: this.pageIndex, // 1
          orderByType: 'publishtime',
          isDescending: true, // 倒叙 或 正序
          keyword: this.productTitle, // 1
          isDelete: false, // 1
          isOnSell: null, // is 上架
          language: param, // 1,
          id: id
        }
      }
      this.loading = true
      const { data } = await linkApi.getProductList(options)
      this.total = data.totalRecord
      this.productList = data.list
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
    async getProductTree() {
      const { data } = await linkApi.getProductCategory()
      this.treeArray = data.treeArray
      this.nodeIdArr = [0]
      this._getCurrentIds(data.treeArray)
      this.getProductList(this.nodeIdArr, this.id)
    },
    _getCurrentIds(arr) {
      if (this.cType === 'product') {
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
      this.model['Id'] = this.productList[i].id
      const productCategoryList = this.productList[i].productCategoryList
      this.$emit('handleChangeUrl', {
        url: this.productList[i].url,
        title: this.productList[i].name,
        cType: 'product',
        id: this.productList[i].id,
        categoryId: productCategoryList[productCategoryList.length - 1].id,
        detailPageId: this.detailPageId
      })
    },
    _handleSearch(val) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.productList = []
        this.productTitle = val
        this.getProductList(this.nodeIdArr, this.id)
      }, 500)
    },
    _handleChangeCurrent(val) {
      var id = this.id
      if (val !== this.oldPageIndex) id = ''
      this.pageIndex = val
      this.getProductList(this.nodeIdArr, id)
    },
    _handleChageLinkTarget(val) {
      this.$emit('handleChangeTarget', val)
    },
    handleCancle() {
      this.dataIndex = this.oldDataIndex
      this.pageIndex = this.oldPageIndex
      this.id = this.oldId
    },
    selectDetailPage(val) {
      this.detailPageId = val
      this.$emit('handleChangeDetailPageId', val)
    },
    handleChangeLinkTarget(val) {
      this.$emit('handleChangeTarget', val)
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
      color: $--popup-font-color-main;
      line-height: 20px;
      cursor: auto;
    }
  }

  .popup-content__main {
    display: flex;
    justify-content: flex-start;
    width: 558px;
    text-align: right;
    border-top: $--popup-border-main;
    .content-main__slider {
      padding: 16px 12px;
      width: 172px;
      max-height: 362px;
      overflow-y: auto;
    }
    .content-main__list {
      position: relative;
      width: 100%;
      border-left: $--popup-border-main;
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
