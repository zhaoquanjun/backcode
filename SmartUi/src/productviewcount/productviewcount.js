/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import {
    getSysClass,
    getjQuery
} from '../util'
import HttpRequest from '../util/httpRequest'
import {
    contentQueryProductUrl,
    isDesign
} from '../env/index';
const NAME = 'productviewcount';
const DATA_KEY = 'st.productviewcount'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" class="c-productviewcount {{_SysClass}}" data-ride="productviewcount"><i class="iconfont {{Icon}}"></i><strong>{{Desc}}</strong><span>{{Hits}}</span></div>`;
const $ = getjQuery()

class ProductViewCount {
    constructor(id, style) {
        this._id = id
        this._type = 'productviewcount'
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
            var productId = $('#product-id').val();
            var _this = this;
            HttpRequest.get(contentQueryProductUrl + "GetHits/" + productId, null, function (data) {
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
    static productViewCountInterface(element, options, args) {
        const $this = $(element);
        let data = $this.data(DATA_KEY)
        if (!data) {
            data = new ProductViewCount($this.attr('id'), 'style1');
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
            ProductViewCount.productViewCountInterface(this, config, args)
        })
    }
}
export default ProductViewCount

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = ProductViewCount.jQueryInterface
$.fn[NAME].Constructor = ProductViewCount
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ProductViewCount.jQueryInterface
}
$(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]();
})