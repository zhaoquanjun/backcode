import HttpRequest from '../../util/httpRequest'
import { contentQueryUrl } from '../../env/index'
import { getjQuery } from '../../util'
const $ = getjQuery()
class Base {
  constructor() {
    this.pageIndex = 0
  }
  _setPageTotal(pageCount) {
    this._control.attr('data-total', pageCount)
    $('#' + this._pgRelId).attr('data-total', pageCount)
    $('#' + this._pgRelId).pagination('setTotal', pageCount)
  }
  changeNewsDetailPageId(data) {
    this._dataConf.newsDetailPageId = data.newsDetailPageId
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }
  changePageNumberLimit(data) {
    this._query.limit = data.limit
    this._control.attr('data-query', JSON.stringify(this._query))
  }
  _resetPaginationTotalSizeFromList() {
    const total = this._control.attr('data-total')
    this._control.find('.pagination').attr('data-total', total)
  }

  changeNewslistColumnWidth(data) {
    const domArr = this._control.children('.c-newslist__inner').children()
    const $first = domArr.find('.c-newslist-item-picture')
    const $last = domArr.find('.c-newslist-item-info')
    $first.attr('class', 'c-newslist-item-picture c-col-' + data.leftPercent)
    $last.attr('class', 'c-newslist-item-info c-col-' + data.rightPercent)
  }
  //调整一行显示多少个
  changeNewslistRowWidth(data) {
    const productList = this._control.find('.c-newslist__inner')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-item${data.percent}`)
    this._dataConf.percent = data.percent
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }

  changeMobileNewslistRowWidth(data) {
    const productList = this._control.find('.c-newslist__inner')
    const $listItem = productList.find('.list-item')
    $listItem.removeClass(function (index, className) {
      return (className.match(/(^|\s)col-md-item\S+/g) || []).join(' ')
    })
    $listItem.addClass(`col-md-item${data.mobilePercent}`)
  }

  changeNewslistTarget(data) {
    let eles = $('#' + this._id).find('.list-item')
    for (var i = 0; i < eles.length; i++) {
      $(eles[i]).find('a').attr('target', data.target)
    }
  }
  loadData(pageIndex, callback, mode) {
    if (pageIndex < 1) {
      throw new Error('pageIndex incorrect')
    }
    const _this = this
    let queryData = this._query
    const paginationId = this._pgRelId

    queryData.skip = pageIndex - 1
    this.pageIndex = queryData.skip
    let dataBasic = this._dataConf
    HttpRequest.post(
      contentQueryUrl,
      queryData,
      function (data) {
        if (data.data != null && data.data.length > 0) {
          let model = dataBasic
          model.listData = data.data
          model.pageCount = data.pageCount
          mode == 'mobile'
            ? _this._appendInnerHtml(model)
            : _this._renderInnerHtml(model)
          if (typeof callback === 'function') {
            callback(_this._id, data)
          }
        }
        $('#' + paginationId).pagination('setTotal', data.pageCount)
      },
      function () {
        // data
        // alert(data);
      }
    )
  }
  changeMobileMoreBtnName(value) {
    this._control.find('.mb-pagination').text(value.paginationName)
  }

  formatDataStyle(dateStyle, data, mode) {
    this._control.attr('data-date-style', dateStyle)
    let element = this._control.find('.date')
    if (mode === 'mobile') {
      element = [...element].slice(this.pageIndex * this._query.limit)
    } else {
      element = [...element]
    }
    element.map((item, index) => {
      var date = data && data.length > 0 ? data[index].PublishTime : ''
      var newDate = this.dateFormat(dateStyle, date)
      let publishTime = $(item).attr('data-date')
      if (publishTime && !data) {
        let reg = /[\u4e00-\u9fa5]/g
        // publishTime = publishTime.replace(/\//g, '-')
        publishTime = publishTime.replace(reg, '')
        newDate = this.dateFormat(dateStyle, publishTime)
      }
      if (this._style === 'style5') {
        $(item).find('.date-day').html(newDate.slice(8, 10))
        $(item).find('.date-year').html(newDate.slice(0, 7))
        return
      } else {
        $(item).text(newDate)
      }
    })
    return true
  }
  changeIconDisplay(data) {
    var display = data && data['iconDisplay'] ? data['iconDisplay'] : 'block'
    var icon = data && data['icon'] ? data['icon'] : ''
    this._control.find('.c-list-content i.iconfont').map((i, it) => {
      $(it).css({
        display: display
      })
      $(it)
        .removeClass()
        .addClass('iconfont ' + icon)
    })
    this._dataConf.icon = icon
    this._control.attr('data-conf', JSON.stringify(this._dataConf))
  }
  changeNewsCoverShow(val) {
    if (val['$img-show'] === 'none') {
      this._control.find('.c-newslist-item-info').addClass('newslistCol')
    } else {
      this._control.find('.c-newslist-item-info').removeClass('newslistCol')
    }
  }
  dateFormat(fmt, date) {
    if (date === '') {
      date = new Date()
    } else {
      date = new Date(date)
    }
    var o = {
      'Y+': date.getFullYear(), // 年
      'M+': date.getMonth() + 1, //月份
      'D+': date.getDate(), // 天
      'H+': date.getHours(), //小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear().slice(RegExp.$1.length) + '').substr(
          4 - RegExp.$1.length
        )
      )
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 || RegExp.$1.length == 4
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    return fmt
  }
}
export default Base
