<template>
  <div class="popup-content__main">
    <div
      v-scrollBar
      class="content-main__slider"
    >
      <el-tree
        ref="tree"
        :data="treeArray"
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
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
      <div
        v-show="productList.length"
        class="content-main__list--outer"
      >
        <ul
          v-scrollBar
          class="content-main__list--item"
        >
          <li
            v-for="(it, i) in productList"
            :key="i"
            :class="{active: isChecked(it)}"
            @click.stop="_handleSelectPage(it)"
          >
            <p class="single-line__overflow--hide ellipsis">{{ it.name }}</p>
            <p class="date single-line__overflow--hide ellipsis">
              <span>{{ it.publishTime && it.publishTime.slice(0, 10) }}</span>
              <i
                class="iconfont iconduihao"
                :style="{visibility: isChecked(it)? 'visible' : 'hidden'}"
              ></i>
            </p>
          </li>
        </ul>
        <!-- cl-pagination -->
        <div class="">
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
      <none-area
        v-show="!productList.length"
        :target="target"
      >
        <span v-if="!search" class="none-content__origin--tips">
          暂无产品，请先
          <span>
            <a
              :href="redirectUrl"
              target="_blank"
              class="none-content--tips"
            >添加产品</a>
          </span>
        </span>
        <span v-else>暂无搜索数据，请重新输入</span>
      </none-area>
      <loading v-show="loading" />
    </div>
  </div>
</template>
<script>
import * as productManageApi from '@/api/productApi'
import environment from '@environment/index'
import NoneArea from '@comp/link/none'
import Loading from '@comp/loading/loading'
const delay = (function() {
  let timer = 0
  return function(callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()
export default {
  components: {
    NoneArea,
    Loading
  },
  props: ['treeArray', 'limit'],
  data() {
    return {
      timer: null,
      pageSize: 6,
      pageIndex: 1,
      total: 6,
      productTitle: '',
      categoryIdList: [],
      defaultExpandedKeys: [0],
      productList: [],
      loading: false,
      target: 'createArticle',
      search: false,
      redirectUrl: environment.redirectUrl.createProduct,
      checkedList: []
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
  methods: {
    async contentTableList() {
      const productSearchOptions = {
        pageSize: this.pageSize, // 11
        pageIndex: this.pageIndex, // 1
        orderByType: 'publishtime', //
        isDescending: true, // 倒叙 或 正序
        keyword: this.productTitle, // 1
        isDelete: false, // 1
        isOnSell: true, // is 上架
        categoryIdList: this.categoryIdList, // 1,
        isTop: null,
        language: sessionStorage.getItem('language')
      }
      this.loading = true
      const { data } = await productManageApi.getProductList(
        productSearchOptions
      )
      this.productList = data.list
      this.total = data.totalRecord
      this.loading = false
    },
    // 获取被选中的数据
    getCheckedList(list) {
      this.checkedList = list
    },
    // 递归树子节点
    getAllNodeIds(node, isChildNode) {
      var idList = isChildNode ? [] : [node.id]
      for (var i in node.children) {
        const child = node.children[i]
        idList.push(child.id)
        idList = idList.concat(this.getAllNodeIds(child, true))
      }
      return idList
    },
    _handleNodeClick(data) {
      this.categoryIdList = this.getAllNodeIds(data)
      this.contentTableList()
    },
    // 判断是否被选中
    isChecked(item) {
      for (let i = 0; i < this.checkedList.length; i++) {
        if (item.id == this.checkedList[i]) {
          return true
        }
      }
      return false
    },
    _handleSelectPage(item) {
      for (let i = 0; i < this.checkedList.length; i++) {
        if (item.id == this.checkedList[i]) {
          this.checkedList.splice(i, 1)
          this.$emit('addCheckedList', this.checkedList)
          return false
        }
      }
      if (this.checkedList.length >= this.limit) {
        this.$notify({
          customClass: 'notify-error',
          message: `数据最多不能超过${this.limit}条`,
          showClose: false,
          duration: 2000
        })
        return false
      }
      this.checkedList.push(item.id)
      this.$emit('addCheckedList', this.checkedList)
    },
    _handleSearch(val) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.productList = []
        this.productTitle = val
        this.contentTableList()
      }, 500)
    },
    _handleChangeCurrent(val) {
      this.pageIndex = val
      this.contentTableList()
    }
  }
}
</script>
<style lang="scss" scoped>
.list-item /deep/ .el-checkbox .el-checkbox__label {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 120px;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 400;
  color: $--popup-font-color-main;
  line-height: 20px;
}
.pannel /deep/ .pannel-content .is-current > .el-tree-node__content::before {
  width: 0;
  height: 0;
}
.popup-content__main {
  display: flex;
  justify-content: flex-start;
  width: 554px;
  height: 334px;
  text-align: right;
  .content-main__slider {
    margin: 8px 10px 8px 0px;
    width: 162px;
    max-height: 327px;
    position: absolute;
  }
  .content-main__list {
    position: relative;
    border-left: $--popup-border-main;
    left: 167px;
    .content-main__search {
      display: flex;
      align-items: flex-end;
      margin-left: 12px;
      width: 374px;
      height: 32px;
    }
    .content-main__search /deep/ .el-icon-search {
      color: $--usual-font-color-sub;
    }
    .content-main__search /deep/ .el-input__inner {
      border: $--popup-border-main;
      font-size: $--font-size-small;
      color: $--popup-font-color-main;
      background-color: $--popup-background-main;
      height: 32px;
      line-height: 32px;
      text-align: left;
    }
    .content-main__list--outer {
      overflow: hidden;
      padding-bottom: 16px;
      .content-main__list--item {
        padding: 10px 6px 0;
        width: 385px;
        height: 240px;
        position: relative;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          padding: 0 8px 0 16px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          p {
            width: 210px;
            padding: 0;
            font-size: 14px;
            color: $--popup-font-color-main;
            text-align: left;
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
            p,
            p.date {
              color: $--font-color-hover;
              span,
              i {
                color: $--font-color-hover;
              }
            }
          }
        }
        .active {
          background: $--list-background-selected;
          p,
          p.date {
            color: $--font-color-selected;
            span,
            i {
              color: $--font-color-selected;
            }
          }
          &:hover {
            background: $--list-background-selected;
            p {
              color: $--font-color-selected;
              span,
              i {
                color: $--font-color-selected;
              }
            }
          }
        }
      }
    }
  }
}
</style>
