/**
 * ----------------------------------------
 * SmartUi(v0.1):block.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.block'
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="block" class="c-block {{_SysClass}}" >
    {{each childArea item i}}
    <div class="Area {{if item.Html==''}}dashed-line{{/if}} " id="{{item.Id}}_{{_Id}}">
        {{@item.Html}}
    </div>
    {{/each}}
</div>`;

class Section {
    constructor(id, style) {
        this._id = id
        this._type = 'block'
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
export default Section