/**
 * ----------------------------------------
 * SmartUi(v0.1):text.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import {
  getSysClass
} from '../util'
const DATA_KEY = 'st.text'
const templates = {}
templates['style1'] = `<h1 id="{{_Id}}" data-c-type="text" contenteditable="false"  class="c-text {{_SysClass}}">{{@Text}}</h1>`;
templates['style2'] = `<h2 id="{{_Id}}" data-c-type="text" contenteditable="false"  class="c-text {{_SysClass}}">{{@Text}}</h2>`;
templates['style3'] = `<h3 id="{{_Id}}" data-c-type="text" contenteditable="false"  class="c-text {{_SysClass}}">{{@Text}}</h3>`;
templates['style4'] = `<div id="{{_Id}}" data-c-type="text" contenteditable="false"  class="c-text {{_SysClass}}">{{@Text}}</div>`;

templates['style5'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" contenteditable="false"  class="c-text c-text-style5 {{_SysClass}}">
                            <div class="liner"></div>
                            <div class="c-inner-text">
                                <span>{{@Text}}</span>
                            </div>
                            <div class="liner"></div>
                        </div>`;
templates['style6'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" contenteditable="false"  class="c-text c-text-style6 {{_SysClass}}">
                            <div class="container">
                                <div class="c-inner-text">{{@Text}}</div>
                            </div>
                        </div>`;
templates['style7'] = `<div id="{{_Id}}" data-c-type="{{_Name}}" contenteditable="false"  class="c-text c-text-style6 {{_SysClass}}">
                            <div class="container">
                                <div class="c-inner-text">{{@Text}}</div>
                            </div>
                        </div>`;
class Text {
  constructor(id, style) {
    this._id = id
    this._type = 'text'
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
export default Text