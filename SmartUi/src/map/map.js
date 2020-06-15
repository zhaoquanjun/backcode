/**
 * ----------------------------------------
 * SmartUi(v0.1):baidumap.js
 * ----------------------------------------
 */
import template from '../templateengine/index'
import { getSysClass, getjQuery } from '../util'
import { isDesign } from '../env/index'
const NAME = 'baidumap'
const DATA_KEY = `st.${NAME}`;
const templates = {};
const $ = getjQuery();
const EVENT_KEY = `.${DATA_KEY}`
const Event = {
    CLICK: `click${EVENT_KEY}`,
    RESIZE: `resize${EVENT_KEY}`
};
templates['style1'] = `<div id="{{_Id}}" data-c-type="map" data-model='{{@model}}' data-c-style="{{_Style}}" class="c-map {{_SysClass}}"  data-ride="baidumap" mapStyle="style1"></div>`;
templates['style2'] = `<div id="{{_Id}}" data-c-type="map" data-model='{{@model}}' data-c-style="{{_Style}}" class="c-map {{_SysClass}}"  data-ride="baidumap" mapStyle="style2"></div>`;
templates['style3'] = `<div id="{{_Id}}" data-c-type="map" data-model='{{@model}}' data-c-style="{{_Style}}" class="c-map {{_SysClass}}"  data-ride="baidumap" mapStyle="style3"></div>`;
templates['style4'] = `<div id="{{_Id}}" data-c-type="map" data-model='{{@model}}' data-c-style="{{_Style}}" class="c-map {{_SysClass}}"  data-ride="baidumap" mapStyle="style4"></div>`;
templates['style5'] = `<div id="{{_Id}}" data-c-type="map" data-model='{{@model}}' data-c-style="{{_Style}}" class="c-map {{_SysClass}}"  data-ride="baidumap" mapStyle="style5"></div>`;
class BaiDuMap {
    constructor(id, style) {
        this._id = id
        this._type = 'map'
        this._style = style;//style;
        this._styleId = "";
        var dataModel = $('#' + id).attr('data-model');
        if (dataModel) {
            this._data = JSON.parse(dataModel);
            this._positionList = this._data.positionList;
            this._styleId = this._data.styleId;
        } else {
            this._data = {};
            this._data.zoom = 16;
            this._data.showMapTypes = true;
            this._data.showToolBar = true;
            this._positionList = [];
        }
    }
    //public methods
    renderControl(data) {
        const model = JSON.stringify(data);
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        data.model = model;
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }
    
    showMapType(flag) {
        this._data.showMapTypes = flag;
        $('#' + this._id).attr('data-model',JSON.stringify(this._data));
        this.initMapPoint();
    }
    showToolBar(flag) {
        this._data.showToolBar = flag;
        $('#' + this._id).attr('data-model', JSON.stringify(this._data));
        this.initMapPoint();
    }
    changeSize(size) {
        this._data.zoom = size.zoom;
        $('#' + this._id).attr('data-model', JSON.stringify(this._data));
        this.initMapPoint();
    }
    setData(data) {
        this._data.positionList = data.positionList;
        $('#' + this._id).attr('data-model', JSON.stringify(this._data));
        this._positionList = data.positionList;
        this.initMapPoint();
    }
    //添加标点
    _addMarker(map, position,title,content) {
        let marker = new window.BMap.Marker(position);
        if (!isDesign()) {
        marker.addEventListener("click", function () {
                var opts = {
                    width: 300,
                    height: 100,
                    title: title
        }
        var infoWindow = new window.BMap.InfoWindow(content, opts);
        map.openInfoWindow(infoWindow, position);
            });
        }
        map.addOverlay(marker);
       
    }
    //初始化
    initMapPoint() {
        if (!window.BMap) {
            return;
        }
        let initMap = new window.BMap.Map(this._id, { enableMapClick: false }); 
        if (isDesign()) {
            initMap.disableDragging(); //禁用拖拽
            initMap.disableDoubleClickZoom();//禁用双击放大            
        }        
        const zoom = this._data.zoom;
        if (this._positionList == null || this._positionList.length < 1) {
            var defaultPoint = new window.BMap.Point(this._data.lng, this._data.lat);
            initMap.centerAndZoom(defaultPoint, zoom);
        } else {
            if (this._positionList.length == 1) {
                this._positionList[0].isCenter = true;
                let point = new window.BMap.Point(this._positionList[0].lng, this._positionList[0].lat);
                initMap.centerAndZoom(point, zoom);
                this._addMarker(initMap, point, this._positionList[0].title, this._positionList[0].description);
            } else {
                for (var i = 0; i < this._positionList.length; i++) {
                    if (this._positionList[i].isCenter) {
                        let point = new window.BMap.Point(this._positionList[i].lng, this._positionList[i].lat);
                        initMap.centerAndZoom(point, zoom);
                        this._addMarker(initMap, point, this._positionList[i].title, this._positionList[i].description);
                        break;
                    }
                }
            }            
        }
        initMap.setMapStyleV2({
            styleJson: this._styleId
        });
        if (this._data.showMapTypes) {
            initMap.addControl(new window.BMap.MapTypeControl({
                mapTypes: [
                    window.BMAP_NORMAL_MAP,
                    window.BMAP_SATELLITE_MAP,
                    window.BMAP_HYBRID_MAP
                ]
            }));
        }
        if (this._data.showToolBar) {
            var opts = { type: window.BMAP_NAVIGATION_CONTROL_ZOOM }    
            initMap.addControl(new window.BMap.NavigationControl(opts));
            //initMap.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
        }
    }
    _addEventListener() {
        $(window)
            .off(Event.RESIZE + this._id)
            .on(Event.RESIZE + this._id, $.proxy(this.initMapPoint, this))
    }
    // Static

    static mapInterface(element, config, args) {
        const $this = $(element);
        let data = $this.data(DATA_KEY)
        let _config = {};
        if (typeof config === 'object') {
            _config = $.extend({}, BaiDuMap.DEFAULTS, config);
        }
        const action = typeof config === 'string' ? config : _config.action
        if (!data) {
            data = new BaiDuMap($this.attr('id'), $this.attr('mapStyle'));
            data.initMapPoint();
            data._addEventListener();
        }
        if (typeof action === 'string' && action) {
            if (typeof data[action] === 'undefined') {
                throw new TypeError(`No method named "${action}"`)
            }
            data[action](args)
        }
    }

    static jQueryInterface(config) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            BaiDuMap.mapInterface(this, config, args)
        })
    }
}

const JQUERY_NO_CONFLICT = $.fn[NAME]
$.fn[NAME] = BaiDuMap.jQueryInterface
$.fn[NAME].Constructor = BaiDuMap
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return BaiDuMap.jQueryInterface
}
$(window).on('load', function () {
    $(`[data-ride="${NAME}"]`)[NAME]();
})
export default BaiDuMap