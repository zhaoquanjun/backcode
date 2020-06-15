/**
 * ----------------------------------------
 * SmartUi(v0.1):columns.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
const DATA_KEY = 'st.navcontainer'
const INNER_TEM = `{{each childArea item i}}
    <div class="Area fmcontrol {{if item.Html==''}}sm-empty{{/if}} c-col-navcontainer c-col-{{item.Percent}}" data-title="{{item.Title}}" id="{{item.Id}}_{{_Id}}">
        {{@item.Html}}
    </div>
    {{/each}}`;
const templates = {}
templates['style1'] = `<div id="{{_Id}}" data-c-type="navcontainer" class="c-row {{_SysClass}}" >
    ${INNER_TEM}
</div>`;
templates['style2'] = `<div id="{{_Id}}" data-c-type="navcontainer" class="c-row {{_SysClass}}" >
    ${INNER_TEM}
</div>`;
templates['style3'] = `<div id="{{_Id}}" data-c-type="navcontainer" class="c-row {{_SysClass}}" >
    ${INNER_TEM}
</div>`;
templates['style4'] = `<div id="{{_Id}}" data-c-type="navcontainer" class="c-row {{_SysClass}}" >
    ${INNER_TEM}
</div>`;

const $ = getjQuery()

class NavContainer {
    constructor(id, style) {
        this._id = id
        this._control = $('#' + id);
        this._type = 'navcontainer'
        this._style = style;
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }
    changeColumnWidth(data, callback) {
        const areas = data.childArea
        const childLen = areas.length;
        for (let i = 0; i < childLen; i++) {
            const areaId = areas[i].Id + '_' + this._id;
            const $area = $('#' + areaId);
            const percent = areas[i].Percent;
            const title = areas[i].Title;
            if ($area.length > 0) {
                const areaChildLen = $area.children().length;
                if (areaChildLen > 0) {
                    $area.attr('class', 'Area c-col-navcontainer c-col-' + percent);
                } else {
                    $area.attr('class', 'Area sm-empty c-col-navcontainer c-col-' + percent);
                }
                $area.attr('data-title', title);
            }
        }
        if (typeof callback == 'function') callback();
    }
    refreshControl(data, callback) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_inner';
        const html = template(cacheKey, INNER_TEM, data);
        document.getElementById(this._id).innerHTML = html;
        if (typeof callback === 'function') {
            callback(this._id);
        }
    }
}
export default NavContainer