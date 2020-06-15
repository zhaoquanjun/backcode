/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass } from '../util'
const DATA_KEY = 'st.newscover'
const templates = {}
templates['style1'] = `<a id="{{_Id}}" data-c-type="{{_Name}}" class="{{_SysClass}} c-image" href="{{CoverUrl}}" target="_self">    <img src="{{CoverUrl}}" alt="" class="c-newscover-space" /></a>
`;

class NewsCover {
    constructor(id, style) {
        this._id = id
        this._type = 'newscover'
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
export default NewsCover 