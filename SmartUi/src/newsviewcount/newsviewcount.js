/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import {
    getSysClass,
    getjQuery } from '../util'
import HttpRequest from '../util/httpRequest'
import {
    contentQueryNewsUrl,
    isDesign
} from '../env/index';
const NAME = 'newsviewcount';
const DATA_KEY = 'st.newsviewcount'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" class="c-newsviewcount {{_SysClass}}" data-ride="newsviewcount"><i class="iconfont {{Icon}}"></i><span>{{ Text }}</span><span>{{ Hits }}</span></div>`;
const $ = getjQuery()

class NewsViewCount {
    constructor(id, style) {
        this._id = id
        this._type = 'newsviewcount'
        this._style = style;
    }

    _init() {
        this.getViewCount();
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }

    getViewCount() {
        if (!isDesign()) {
            var newsId = $('#news-id').val();
            var _this = this;
            HttpRequest.get(contentQueryNewsUrl + "GetHits/" + newsId, null, function (data) {
                if (data) {
                    $('#' + _this._id + ' span').last().text(data);
                } else {
                    $('#' + _this._id + ' span').last().text(0);
                }

            }, function () {
                // data
                // alert(data);
            });
        }
    }

    // Static
    static newsViewCountInterface(element, options, args) {
        const $this = $(element);
        let data = $this.data(DATA_KEY)
        if (!data) {
            data = new NewsViewCount($this.attr('id'), 'style1');
            data._init();
        }
        if (typeof options === 'string') {
            if (typeof data[options] === 'undefined') {
                throw new TypeError(`No method named "${options}"`)
            }
            data[options].apply(data, args);
        }
    }

    static jQueryInterface(config) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            NewsViewCount.newsViewCountInterface(this, config, args)
        })
    }
}
export default NewsViewCount

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = NewsViewCount.jQueryInterface
$.fn[NAME].Constructor = NewsViewCount
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return NewsViewCount.jQueryInterface
}
$(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]();
})