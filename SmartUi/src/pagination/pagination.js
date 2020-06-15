/**
 * ----------------------------------------
 * SmartUi(v0.1):pagination.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getjQuery } from '../util'
const $ = getjQuery()
const DATA_KEY = 'st.pagination'
const NAME = 'pagination'
const templates = {}
templates[
  'style1'
] = `<div class="pc-pagination"><button type="button" class="btn-prev {{if prevEnable==false}}disabled{{/if}}"><i class="iconfont iconicon-des-Arrow"></i></button>
            <ul class="ym-pager" id="ymPager">
                {{each items item i}}
                    {{if item.type=='normal'}}
                        <li class="number {{if item.active}}active{{/if}}">{{item.val}}</li>
                    {{else if item.type=='quickprev'}}
                        <li class="el-icon more btn-quickprev el-icon-more">{{item.val}}</li>
                     {{else if item.type=='quicknext'}}
                      <li class="el-icon more btn-quicknext el-icon-more">{{item.val}}</li>
                    {{/if}}
                    
                {{/each}}
            </ul>
            <button type="button" class="btn-next {{if nextEnable==false}}disabled{{/if}}" ><i class="iconfont iconicon-des-Arrow"></i></button>
            </div><button class="mb-pagination load-more">{{moreTitle}}</button>`
class Pagination {
  constructor(element, name) {
    this._ele = element
    this._type = 'pagination'
    this._style = 'style1'
    this.curIndex = 1
    this.total = 1
    this._prevTitle = '上一页'
    this._nextTitle = '下一页'
    this._moreTitle = name || '查看更多'
  }
  //public methods
  _init() {
    const total = parseInt(this._ele.attr('data-total'))
    const prevTitle = this._ele.attr('data-prevTitle')
    const nextTitle = this._ele.attr('data-nextTitle')
    const moreTitle = this._ele.attr('data-moreTitle')
    if (typeof prevTitle !== 'undefined' && prevTitle != '') {
      this._prevTitle = prevTitle
    }
    if (typeof nextTitle !== 'undefined' && nextTitle != '') {
      this._nextTitle = nextTitle
    }
    if (typeof moreTitle !== 'undefined' && moreTitle != '') {
      this._moreTitle = moreTitle
    }
    this.total = total
    if (total > 0) {
      this.show(this.curIndex)
    } else {
      this._ele[0].style.cssText = 'display: none;'
    }
  }
  reinit() {
    this.curIndex = 1
    this._init()
  }
  _builderPgModel(total, curIdx) {
    if (total < 1 || total < curIdx || curIdx < 1) {
      throw new Error('Page is incorrect.')
    }
    let model = {}
    model.curIndex = curIdx
    let prevEnable = true,
      nextEnable = true
    if (total == 1) {
      prevEnable = false
      nextEnable = false
    } else if (curIdx == 1) {
      prevEnable = false
    } else if (curIdx == total) {
      nextEnable = false
    }
    model.prevEnable = prevEnable
    model.nextEnable = nextEnable
    model.prevTitle = this._prevTitle
    model.nextTitle = this._nextTitle
    model.moreTitle = this._moreTitle
    model.items = this._buildItemArray(total, curIdx)
    return model
  }
  _buildItemArray(total, curIdx) {
    let array = []
    if (total < 8) {
      for (let i = 1; i <= total; i++) {
        var item = {
          type: 'normal',
          val: i,
          active: i == curIdx ? true : false
        }
        array.push(item)
      }
    } else {
      let showPrevMore = false,
        showNextMore = false
      array.push({
        type: 'normal',
        val: 1,
        active: 1 == curIdx ? true : false
      })
      let prevStartIndex = curIdx - 3
      let prevEndIndex = curIdx < 5 ? 5 : curIdx

      if (prevStartIndex > 0 && curIdx > 4) {
        prevStartIndex = prevStartIndex + 1
        showPrevMore = true
      } else {
        prevStartIndex = 2
      }
      let nextEndIndex = curIdx < 5 ? prevEndIndex + 2 : prevEndIndex + 3
      if (nextEndIndex < total) {
        showNextMore = true
      } else {
        nextEndIndex = total
      }
      if (showPrevMore) {
        array.push({
          type: 'quickprev',
          val: '...',
          active: false
        })
      }
      for (let k = prevStartIndex; k < prevEndIndex; k++) {
        array.push({
          type: 'normal',
          val: k,
          active: k == curIdx ? true : false
        })
      }
      if (prevEndIndex != 1 && prevEndIndex != total) {
        array.push({
          type: 'normal',
          val: prevEndIndex,
          active: prevEndIndex == curIdx ? true : false
        })
      }
      for (let k = prevEndIndex + 1; k < nextEndIndex; k++) {
        array.push({
          type: 'normal',
          val: k,
          active: false
        })
      }
      if (showNextMore) {
        array.push({
          type: 'quicknext',
          val: '...',
          active: false
        })
      }
      array.push({
        type: 'normal',
        val: total,
        active: total == curIdx ? true : false
      })
    }
    return array
  }
  show(curIdx) {
    const $display = this._ele.css('display')
    if ($display == 'block') this._ele[0].cssText = 'display: block;'
    if (this.total <= 1) {
      this._ele[0].cssText = 'display: none;'
    }
    if (curIdx < 1 || curIdx > this.total) {
      throw new Error('Page is incorrect.')
    }
    this.curIndex = curIdx
    this._render(
      curIdx,
      $.proxy(function () {
        var parentProductControl = this._ele.parents('.c-productlist')
        if (
          parentProductControl[0] &&
          parentProductControl.attr('data-c-style') === 'style7'
        ) {
          $('.mb-pagination').hide()
          $('.pc-pagination').hide()
        }
      }, this)
    )
    this._setupEvents()
  }
  loadRelData(curIdx, empty, mode) {
    const relId = this._ele.attr('data-relid')
    const relType = this._ele.attr('data-reltype')
    if (relId != '' && relType != '') {
      // console.log('loadData', curIdx, empty, mode)
      $('#' + relId)[relType]('loadData', curIdx, empty, mode)
    }
  }
  showMobile(curIdx) {
    this.curIndex = curIdx
    this.loadRelData(curIdx, null, 'mobile')
  }
  _render(curIdx, callback) {
    const cacheKey = DATA_KEY + '_' + this._style
    const data = this._builderPgModel(this.total, curIdx)
    var content = template(cacheKey, templates[this._style], data)
    this._ele.html(content)
    typeof callback === 'function' && callback()
  }
  _setupEvents() {
    const _this = this
    this._ele.off('click').on('click', 'li', function (e) {
      e.cancelBubble = true
      e.stopPropagation()
      var $this = $(this)
      if ($this.hasClass('active')) {
        return false
      }
      let curIdx = 1
      if ($this.hasClass('number')) {
        curIdx = parseInt($this.html())
      } else if ($this.hasClass('btn-quickprev')) {
        curIdx = _this.curIndex - 5
      } else if ($this.hasClass('btn-quicknext')) {
        curIdx = _this.curIndex + 5
      }
      if (curIdx < 1) {
        curIdx = 1
      }
      if (curIdx > _this.total) {
        curIdx = _this.total
      }
      _this.show(curIdx)
      _this.loadRelData(curIdx)
      return false
    })
    this._ele.on('click', 'button', function (e) {
      e.cancelBubble = true
      e.stopPropagation()
      const mode = 'mobile'
      const $this = $(this)
      if ($this.hasClass('disabled')) {
        return false
      }
      if ($this.hasClass('btn-prev')) {
        let curIdx = _this.curIndex - 1
        if (curIdx < 1) {
          curIdx = 1
        }
        _this.show(curIdx)
        _this.loadRelData(curIdx, mode)
      } else if ($this.hasClass('btn-next')) {
        let curIdx = _this.curIndex + 1
        if (curIdx > _this.total) {
          curIdx = _this.total
        }
        _this.show(curIdx)
        _this.loadRelData(curIdx)
      } else if ($this.hasClass('mb-pagination')) {
        if (_this._ele.attr('data-c-style') === 'style9') {
          _this.curIndex = parseInt(_this._ele.attr('data-pageIndex'))
        }
        let curIdx = _this.curIndex + 1
        if (curIdx > _this.total) {
          curIdx = _this.total
        }
        if (curIdx == _this.total) {
          $this.hide()
        }
        _this.showMobile(curIdx)
      }
    })
  }
  setTotal(total) {
    if (total < 1) {
      throw new Error('total page is incorrect.')
    }
    if (total != this.total) {
      const oldTotal = this.total
      this.total = total
      if (oldTotal > total) {
        if (this.curIndex > total) {
          this.curIndex = total
        }
      }
      this.show(this.curIndex)
    }
  }
  // Static

  static paginationInterface(element, options, args) {
    const $this = $(element)
    let data = $this.data(DATA_KEY)
    if (!data) {
      var name = $this.attr('data-name')
      data = new Pagination($this, name)
      data._init()
      $this.data(DATA_KEY, data)
    }
    if (typeof options === 'string') {
      if (typeof data[options] === 'undefined') {
        throw new TypeError(`No method named "${options}"`)
      }
      data[options].apply(data, args)
    }
  }

  static jQueryInterface(config) {
    var args = Array.prototype.slice.call(arguments, 1)
    return this.each(function () {
      Pagination.paginationInterface(this, config, args)
    })
  }
}
const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = Pagination.jQueryInterface
$.fn[NAME].Constructor = Pagination
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Pagination.jQueryInterface
}
$(window).on('load', function () {
  $('[data-ride="pagination"]')[NAME]()
})
export default Pagination
