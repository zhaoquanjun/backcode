/**
 * ----------------------------------------
 * SmartUi(v0.1):productsummary.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.productsummary'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="productsummary" contenteditable="false"  class="c-productsummary {{_SysClass}}">{{@Text}}</div>`;

class ProductSummary {
    constructor(id, style) {
        this._id = id
        this._type = 'productsummary'
        this._style = style;
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }
}
export default ProductSummary