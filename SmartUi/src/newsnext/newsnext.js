/**
 * ----------------------------------------
 * SmartUi(v0.1):newsnext.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.newsnext'
const templates = {}
templates['style1'] = '<a id="{{_Id}}" href="/news/{{SwitchModel.PageId}}/{{SwitchModel.NextId}}.html" data-c-type="newsnext"  class="c-button {{_SysClass}}"  target="{{Target}}" style="display:{{SwitchModel.DisplayNext}}" ><i class="iconfont {{Icon}}" ></i><span>{{Text}}</span></a>';
class NewsNext {
    constructor(id, style) {
        this._id = id
        this._type = 'newsnext'
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
export default NewsNext