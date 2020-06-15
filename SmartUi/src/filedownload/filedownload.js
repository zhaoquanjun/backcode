/**
 * ----------------------------------------
 * SmartUi(v0.1):filedownload.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import HttpRequest from '../util/httpRequest'

import { getjQuery } from '../util'
const $ = getjQuery()
const DATA_KEY = 'st.filedownload'
const EVENT_KEY = `.${DATA_KEY}`
const templates = {}
templates['style1'] = ` <div class="download-file">
                          <div class="download-pwd">
                            <div style="overflow: hidden;"><i class="iconfont iconguanbi close"></i></div>
                            <h4 class="title">{{Title}}</h4>
                            <div class="input-wrap">
                              <input class="pwd-code input-border" type="password" autocomplete="off"></input>
                              <button class="download-btn">{{ConfirmText}}</button>
                            </div>
                            <div class="file-tip__error"></div>
                          </div>
                        </div>`
const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}`,
  ONINPUT: `input propertychange${EVENT_KEY}`
}

class FileDownload {
  constructor(option) {
    this._element = $('body')
    this._style = 'style1'
    this.option = option
  }
  _init() {
    this.addEventListenter()
  }
  _render() {
    const cacheKey = DATA_KEY + '_' + this._style
    const content = template(cacheKey, templates[this._style], this.option)
    this._element.append(content)
    this._init()
  }
  addEventListenter() {
    this._element
      .find('.download-file')
      .find('.download-btn')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._downloadFile, this))
    this._element
      .find('.download-file')
      .find('.close')
      .off(Event.CLICK_DATA_API)
      .on(Event.CLICK_DATA_API, $.proxy(this._close, this))
    this._element
      .find('.download-file')
      .find('.pwd-code')
      .on(Event.ONINPUT, $.proxy(this.onInput, this))
  }

  _downloadFile(e) {
    e.stopPropagation()
    e.preventDefault()
    const url = this.option.downloadUrl
    let pwd = this._element.find('.pwd-code').val()
    let that = this
    let queryData = {
      code: pwd
    }
    HttpRequest.get(
      url,
      queryData,
      function(res) {
        if (res.isGetDownloadUrlSuccess) {
          that._close()
          var a = document.createElement('a')
          a.href = res.downloadUrl
          a.target = '_self'

          a.style.display = 'none'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        } else {
          that._element
            .find('.download-file')
            .find('.file-tip__error')
            .show()
            .text(res.msg)
        }
      },
      function(err) {
        console.log(err)
      }
    )
  }
  _close() {
    this._element.find('.download-file').remove()
  }
  onInput() {
    this._element
      .find('.download-file')
      .find('.file-tip__error')
      .hide()
  }
}
export default FileDownload
