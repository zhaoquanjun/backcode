<template>
  <div>
    <div v-show="articlePopupShow" class="mask"></div>
    <div v-show="articlePopupShow" class="list-content">
      <header class="title">
        <div class="titleWrap">
          <span class="title-text">请选择文章</span>
          <i class="iconfont iconguanbi" @click="cancel"></i>
        </div>
      </header>
      <section style="position:relative">
        <header style="padding:24px 30px">
          <span
            :class="{ categoryChosed: !isData, categoryNoChosed: isData }"
            @click="changeTab('category')"
          >
            <i
              v-show="!isData"
              class="iconfont iconxingzhuangjiehe"
              style="font-size:18px;color:#fff;vertical-align:top;margin-right:12px"
            ></i>
            从分类选择
          </span>
          <span
            :class="{ dataChosed: isData, dataNoChosed: !isData }"
            @click="changeTab('data')"
          >
            <i
              v-show="isData"
              class="iconfont iconxingzhuangjiehe"
              style="font-size:18px;color:#fff;vertical-align:top;margin-right:12px"
            ></i>
            从数据选择
          </span>
        </header>
        <a class="addArticle" :href="redirectUrl" target="_blank">
          <i class="iconfont iconicon-add addIcon"></i>
          新增文章
        </a>
        <main>
          <div v-show="!isData" v-scrollBar class="categoryList">
            <CheckTree
              ref="checkTree"
              :limit="categoryCountLimit"
              :isright-pannel="true"
              :default-checked-keys="defaultCheckedKeys"
              :tree-result="treeArray"
              @selectedCategory="selectedCategory"
            ></CheckTree>
          </div>
          <div v-show="isData" class="dataList">
            <SelectCheckbox
              ref="selectCheckbox"
              :limit="dataCountLimit"
              :tree-array="treeArray"
              @addCheckedList="addCheckedList"
              v-on="$listeners"
            />
          </div>
        </main>
      </section>
      <footer class="footer">
        <div class="btn-wrap">
          <div
            class="ym-button--isplain"
            style="margin-right: 16px;"
            @click="cancel"
          >
            取消
          </div>
          <div class="ym-button--primary" @click="submit">确定</div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
const el_scrollBar = el => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    // el上挂一份属性
    el._ps_ = new PerfectScrollbar(el, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}
// 接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive('scrollBar', {
  // 使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted(el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    try {
      vnode.context.$nextTick(() => {
        el_scrollBar(el)
      })
    } catch (error) {
      console.error(error)
      el_scrollBar(el)
    }
  }
})
import SelectCheckbox from './select-checkbox'
import CheckTree from './check-tree'
import environment from '@environment/index'
import * as articleManageApi from '@/api/articleApi'
export default {
  components: {
    SelectCheckbox,
    CheckTree
  },
  inheritAttrs: false,
  data() {
    return {
      articlePopupShow: false,
      isData: false,
      treeArray: null,
      redirectUrl:
        environment.redirectUrl.createArticle +
        '?categoryName=全部分类&categoryId=0&language=' +
        sessionStorage.getItem('language'),
      categoryIdList: [],
      checkedList: [],
      defaultCheckedKeys: [],
      dataCountLimit: 50,
      categoryCountLimit: 10
    }
  },
  methods: {
    showArticlePopup(checkedList, defaultCheckedKeys) {
      this.articlePopupShow = true
      this.getTreeAsync()
      this.$refs.selectCheckbox.getNewsList()
      this.defaultCheckedKeys = defaultCheckedKeys
      this.$refs.selectCheckbox.getCheckedList(checkedList)
    },
    // 获取文章分类的树菜单
    async getTreeAsync() {
      const { data } = await articleManageApi.getArticleCategory()
      this.treeArray = data
    },
    changeTab(flag) {
      if (flag === 'data') {
        this.isData = true
      } else if (flag === 'category') {
        this.isData = false
      }
    },
    selectedCategory(categoryIdList) {
      this.categoryIdList = categoryIdList
    },
    addCheckedList(list) {
      this.checkedList = list
    },
    cancel() {
      this.articlePopupShow = false
    },
    async submit() {
      let listData = []
      if (this.isData) {
        listData = this.checkedList
        this.categoryIdList = []
        if (listData.length > this.dataCountLimit) {
          this.$notify({
            customClass: 'notify-error',
            message: `数据最多不能超过${this.limit}条`,
            showClose: false,
            duration: 2000
          })
          return false
        }
      } else {
        if (this.categoryIdList.indexOf(0) == -1) {
          if (this.categoryIdList.length > this.categoryCountLimit) {
            this.$notify({
              customClass: 'notify-error',
              message: `分类最多不能超过${this.limit}个`,
              showClose: false,
              duration: 2000
            })
            return false
          }
        }
        if (this.categoryIdList.length) {
          const options = {
            title: null,
            categoryIdList: this.categoryIdList,
            newsOrderColumns: 'publishtime',
            topStatus: null,
            publishStatus: true,
            pageSize: 100, // 11
            pageIndex: 1, // 1
            isDescending: true,
            language: sessionStorage.getItem('language')
          }
          const { data } = await articleManageApi.getArticleList(options)
          listData = data.list
        }
      }
      this.$emit('getListData', {
        type: this.isData,
        list: listData,
        categoryIdList: this.categoryIdList
      })
      this.articlePopupShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@static/styles/components/article-product-popup.scss';
</style>
