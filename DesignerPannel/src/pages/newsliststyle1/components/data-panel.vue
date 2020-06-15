<template>
  <div class="data-section setting-block__section">
    <div class="news-data-source panel-open__area">
      <div
        v-if="categoryIdList.length == 0"
        class="source-data__none flex-center-center--area"
      >
        <div class="source-data__none-icon">
          <i></i>
        </div>
        <p>
          暂未选择数据，请先
          <span @click="_handleSelectData">选择数据</span>
        </p>
      </div>
      <div v-else class="source-data__list">
        <p v-show="categoryName == 'CategoryId'">
          当前已选择
          <span :data-list="categoryIdList">{{
            categoryIdList.join(',') == -1
              ? '全部'
              : categoryIdList.length + '个'
          }}</span>
          分类的文章
        </p>
        <p v-show="categoryName == 'Id'">
          当前已选择
          <span>{{ categoryIdList.length }}</span> 个文章
        </p>
        <div class="source-choose__area flex-between-center--area">
          按
          <el-select v-model="sortTime" placeholder="请选择" size="mini">
            <el-option
              v-for="item in orderSelectList1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="sortOrder" placeholder="请选择" size="mini">
            <el-option
              v-for="item in orderSelectList2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> </el-select>排列
        </div>
        <div class="divider"></div>
        <div class="news-choose__data">
          <div
            class="ym-button--primary"
            style="width: 100%;"
            @click="_handleSelectData"
          >
            <i class="el-icon-plus"></i>
            <span>选择数据</span>
          </div>
        </div>
      </div>
    </div>
    <div class="news-detail-link panel-open__area">
      <h3 class="setting-block--subtitle">文章详情页选择</h3>
      <div class="link-select__area">
        <el-select
          v-model="newsDetailPageId"
          placeholder="请选择"
          style="width: 100%;"
        >
          <el-option
            v-for="item in newsPageList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="divider"></div>
      <div class="page-open__way">
        <p class="setting-block--subtitle row-top__dis">页面打开方式</p>
        <div class="way-choose__area">
          <el-radio
            v-model="pageOpenTarget"
            label="_self"
            size="mini"
            @change="_handleChangeNewPageOpenTarget('_self')"
          >当前窗口打开
          </el-radio>
          <el-radio
            v-model="pageOpenTarget"
            label="_blank"
            size="mini"
            @change="_handleChangeNewPageOpenTarget('_blank')"
          >新窗口打开</el-radio>
        </div>
      </div>
    </div>
    <article-popup ref="popup" @getListData="getListData"></article-popup>
  </div>
</template>

<script>
import ArticlePopup from '@comp/list/articlePopup/index'
import * as articleApi from '@/api/articleApi'
export default {
  components: {
    ArticlePopup
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: () => ({})
    }
  },
  data() {
    return {
      orderSelectList1: [
        { value: 'PublishTime', label: '创建时间' },
        { value: 'UpdateTime', label: '修改时间' },
        { value: 'Hits', label: '点击次数' }
      ],
      orderSelectList2: [
        { value: 0, label: '降序' },
        { value: 1, label: '升序' }
      ],
      newsPageList: [],
      target: '_self'
    }
  },
  computed: {
    pageOpenTarget: {
      get: function() {
        return this.model.dataModel['target']
      },
      set: function() {}
    },
    sortTime: {
      get: function() {
        return this.model.query.orderBy[0]['columnName']
      },
      set: function(val) {
        const timeOldVal = this.model.query.orderBy[0]['columnName']
        if (timeOldVal !== val) {
          const oldData = {
            orderBy: JSON.parse(JSON.stringify(this.model.query.orderBy))
          }
          const data = {
            orderBy: JSON.parse(JSON.stringify(this.model.query.orderBy))
          }
          data.orderBy[0]['columnName'] = val
          this.model.query.orderBy[0]['columnName'] = val
          this.onQueryDataChange('changeSortTime', oldData, data)
        }
      }
    },
    sortOrder: {
      get: function() {
        return this.model.query.orderBy[0]['orderBy']
      },
      set: function(val) {
        const orderOldVal = this.model.query.orderBy[0]['orderBy']
        if (orderOldVal !== val) {
          const oldData = {
            orderBy: JSON.parse(JSON.stringify(this.model.query.orderBy))
          }
          const data = {
            orderBy: JSON.parse(JSON.stringify(this.model.query.orderBy))
          }
          data.orderBy[0]['orderBy'] = val
          this.model.query.orderBy[0]['orderBy'] = val
          this.onQueryDataChange('changeSortOrder', oldData, data)
        }
      }
    },
    categoryIdList: {
      get: function() {
        return this.model.query.filters[0]['value'].length &&
          this.model.query.filters[0]['value'].length > 0
          ? this.model.query.filters[0]['value'].split(',')
          : []
      },
      set: function() {}
    },
    categoryName: {
      get: function() {
        return this.model.query.filters[0]['columnName']
      },
      set: function() {}
    },
    newsDetailPageId: {
      get: function() {
        return this.model.dataModel['newsDetailPageId']
      },
      set: function(val) {
        const oldVal = this.model.dataModel['newsDetailPageId']
        if (oldVal !== val) {
          const oldData = {}
          const data = {}
          oldData['newsDetailPageId'] = oldVal
          data['newsDetailPageId'] = val
          this.model.dataModel['newsDetailPageId'] = val
          if (this.model.query.filters[0]['value'].length <= 0) {
            this.onDataChange('changeNewsDetailPageId', oldData, data)
          } else {
            this.onDataChange('changeListData', oldData, data)
          }
        }
      }
    },
    articleList: {
      get: function() {
        var list = []
        if (this.model.query.filters[0]['columnName'] === 'Id') {
          list =
            this.model.query.filters[0]['value'].length > 0
              ? this.model.query.filters[0]['value'].split(',')
              : []
        }
        return list
      }
    },
    allCategoryId: {
      get: function() {
        return this.model.dataModel['allCategoryId']
      },
      set: function() {}
    }
  },
  created() {
    this.getNewsDetailPageList()
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    onQueryDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onQueryDataChange(action, oldData, data)
      }
    },
    _handleSelectData() {
      const articleList = this.allCategoryId.length > 0 ? [] : this.articleList
      this.$refs.popup.showArticlePopup(
        articleList,
        this.model.dataModel['allCategoryId']
      )
    },
    getListData(val) {
      const oldArr =
        this.model.query.filters[0]['value'].length > 0
          ? this.model.query.filters[0]['value'].split(',')
          : []
      const newArr = val.list
      const flag = this._checkDataDiff(oldArr, newArr)
      if (!flag) {
        const oldData = {
          filters: JSON.parse(JSON.stringify(this.model.query.filters))
        }
        const data = {
          filters: JSON.parse(JSON.stringify(this.model.query.filters))
        }
        this.model.dataModel['allCategoryId'] = val.categoryIdList
        this.onDataChange(
          null,
          { allCategoryId: this.model.dataModel['allCategoryId'] },
          { allCategoryId: val.categoryIdList }
        )
        const newList =
          val.categoryIdList.indexOf(0) > -1 ? ['-1'] : val.categoryIdList
        if (!val.type) {
          oldData.filters[0]['columnName'] = this.model.query.filters[0][
            'columnName'
          ]
          oldData.filters[0]['valType'] = this.model.query.filters[0]['valType']
          oldData.filters[0]['value'] = this.model.query.filters[0]['value']
          data.filters[0]['columnName'] = 'CategoryId'
          data.filters[0]['valType'] = 'Int'
          data.filters[0]['value'] = newList.join(',')
        } else {
          var idsList = []
          for (var i = 0; i < newArr.length; i++) {
            idsList.push(newArr[i])
          }
          oldData.filters[0]['columnName'] = this.model.query.filters[0][
            'columnName'
          ]
          oldData.filters[0]['valType'] = this.model.query.filters[0]['valType']
          oldData.filters[0]['value'] = this.model.query.filters[0]['value']
          data.filters[0]['columnName'] = 'Id'
          data.filters[0]['valType'] = 'String'
          data.filters[0]['value'] = idsList.join(',')
        }
        this.model.query.filters[0]['columnName'] =
          data.filters[0]['columnName']
        this.model.query.filters[0]['valType'] = data.filters[0]['valType']
        this.model.query.filters[0]['value'] = data.filters[0]['value']
        this.onQueryDataChange('changeListData', oldData, data)
      }
    },
    _checkDataDiff(oldArr, newArr) {
      const oldStr = oldArr.toString()
      const newStr = newArr.toString()
      return oldStr === newStr
    },
    _handleChangeNewPageOpenTarget(val) {
      const oldVal = this.model.dataModel['target']
      if (oldVal !== val) {
        const oldData = {}

        const data = {}
        oldData['target'] = oldVal
        data['target'] = val
        this.model.dataModel['target'] = val
        this.onDataChange('changeDetailPageTarget', oldData, data)
      }
    },
    async getNewsDetailPageList() {
      const params = {
        pageType: 'NewsDetail',
        siteId: this._getUrlParam('siteId')
      }
      const { data } = await articleApi.getArticleDetailPageList(params)
      this.newsPageList = data
    },
    _getUrlParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg) // search,查询？后面的参数，并匹配正则
      if (r != null) {
        return unescape(r[2])
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-data-source {
  .source-data__none {
    flex-wrap: wrap;
    .source-data__none-icon {
      width: 52px;
      height: 42px;
      background: url('~@static/images/none_tips.png') no-repeat center center;
      background-size: 100% 100%;
    }
    p {
      padding-top: 16px;
      width: 100%;
      text-align: center;
      font-size: $--font-size-small;
      line-height: 17px;
      color: $--usual-font-color-main;
      span {
        color: $--color-main;
        cursor: pointer;
      }
    }
  }
  .source-data__list {
    p {
      font-size: $--font-size-small;
      line-height: 17px;
      color: $--usual-font-color-main;
      span {
        color: $--color-main;
      }
    }
    .source-choose__area {
      padding-top: 16px;
      font-size: $--font-size-small;
      color: $--usual-font-color-main;
    }
    .source-choose__area /deep/ .el-select--mini {
      width: 85px;
      height: 32px;
      .el-input__inner {
        height: 32px;
        line-height: 32px;
        padding-left: 8px;
        padding-right: 24px;
      }
    }
    .news-choose__data {
      padding-top: 16px;
    }
    .news-choose__data /deep/ span,
    .news-choose__data /deep/ i {
      color: #fff;
    }
    .news-choose__data /deep/ .cl-button {
      width: 100%;
    }
  }
}
.news-detail-link {
  margin-top: 16px;
  h3 {
    font-weight: 400;
    padding-bottom: 16px;
    font-size: $--font-size-small;
    color: $--usual-font-color-main;
    line-height: 20px;
  }
  .link-select__area /deep/ .el-input--mini .el-input__inner {
    font-size: 14px;
  }
  .divider {
    margin-top: 16px;
    border-top: 1px dotted #c9d9dc;
  }
  .page-open__way {
    .way-choose__area /deep/ .el-radio {
      width: 100%;
      padding-bottom: 10px;
    }
    .way-choose__area /deep/ .el-radio__label {
      font-size: $--font-size-small;
    }
  }
}
.news-detail-link /deep/ .el-select--mini {
  width: 100%;
  max-width: 100%;
}
</style>
