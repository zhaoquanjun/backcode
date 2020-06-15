/**
 * ----------------------------------------
 * SmartUi(v0.1):qrcode.js
 * ----------------------------------------
 */
import QrCode from 'qrcode'
import template from '../templateengine/index'
import {
    getSysClass,
    getjQuery
} from '../util'
const DATA_KEY = 'st.qrcode'
const templates = {}
const $ = getjQuery()
templates['style1'] = `<img id="{{_Id}}" data-c-type="{{_Name}}" class="c-row {{_SysClass}}" src="{{DefaultImage}}" alt="二维码" />`;

class QRCode {
    constructor(id, style) {
        this._id = id
        this.$control = $('#' + id);
        this._type = 'qrcode';
        this._style = style;
        this._defaultSrc = 'http://img.andni.cn/Picture/823EB3BD-93F4-4655-B833-D604A6EF2032/4eRn6yhx8UuYQqFbVjDUdg.png';
    }
    //public methods
    renderControl(data) {
        data._Id = this._id;
        data._SysClass = getSysClass(this._id);
        const cacheKey = DATA_KEY + '_' + this._style;
        return template(cacheKey, templates[this._style], data);
    }
    renderQRCode(data, callback) {
        this.makeCode(data, callback);
    }

    makeCode(data, callback) {
        var id = this._id;
        var text = "";
        var flag = false;
        switch (data.QRType) {
            case 1:
                text = data.Link;
                if (data.Link) flag = true;
                break;
            case 2:
                text = data.Text;
                if (data.Text) flag = true;
                break;
            case 3:
                text = 'tel://' + data.Tel;
                if (data.Tel) flag = true;
                break;
            default:
                return;
        }
        text = flag ? text : "该二维码未设置内容";
        QrCode.toDataURL(text, {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            margin: 1,
            quality: 0.3,
            color: {
                dark: data.DarkColor,
                light: data.LightColor
            }
        }, function (err, url) {
            if (err) throw err
            var img = document.getElementById(id);
            img.src = url
            img.onload = function () {
                if (typeof callback=='function') callback(url);
            }
        })
    }
}
export default QRCode