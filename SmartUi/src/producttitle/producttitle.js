/**
 * ----------------------------------------
 * SmartUi(v0.1):producttitle.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.producttitle'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="producttitle" contenteditable="false"  class="c-producttitle {{_SysClass}}">{{@Text}}</div>`;

class ProductTitle {
    constructor(id, style) {
        this._id = id
        this._type = 'producttitle'
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
export default ProductTitle