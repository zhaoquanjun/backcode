/**
 * ----------------------------------------
 * SmartUi(v0.1):button.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import {getSysClass} from '../util'
const DATA_KEY = 'st.whitespace'
const templates = {}
templates['style1'] = '<div id="{{_Id}}" data-c-type="whitespace"  class="c-whitespace {{_SysClass}}"></div>';
class WhiteSpace {
    constructor(id,style) {
        this._id = id
        this._type = 'whitespace'
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
export default WhiteSpace