/**
 * ----------------------------------------
 * SmartUi(v0.1):line.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.line'
const templates = {}
templates['style1'] = '<div id="{{_Id}}" data-c-type="line"  class="c-line {{_SysClass}}"></div>';
templates['style2'] = '<div id="{{_Id}}" data-c-type="line"  class="c-line {{_SysClass}}"></div>';
templates['style3'] = '<div id="{{_Id}}" data-c-type="line"  class="c-line {{_SysClass}}"></div>';
class Line {
    constructor(id, style) {
        this._id = id
        this._type = 'line'
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
export default Line