/**
 * ----------------------------------------
 * SmartUi(v0.1):newsprev.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.newsprev'
const templates = {}
templates['style1'] = '<a id="{{_Id}}" href="/news/{{SwitchModel.PageId}}/{{SwitchModel.PrevId}}.html" data-c-type="newsprev"  class="c-button {{_SysClass}}"  target="{{Target}}" style="display:{{SwitchModel.DisplayPrev}}" ><i class="iconfont {{Icon}}" ></i><span>{{Text}}</span></a>';
class NewsPrev {
    constructor(id, style) {
        this._id = id
        this._type = 'newsprev'
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
export default NewsPrev