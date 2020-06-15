if (!window.localStorage) {
    throw new Error('浏览器版本不支持 localStorage')
}
var ls = window.localStorage;

export const setLocal = (key, value, time) => {
    if (value === 'undefined') {
        return
    }
    var data = {
        time: time ? Date.now() + time : 0,
        value: value
    }
    if (typeof data == 'object') {
        data = JSON.stringify(data);
    }
    ls.setItem(key, data)
}
export const getLocal = (key) => {

    var data = ls.getItem(key);
    data = JSON.parse(data) || {};

    if (data.time === 0) {
        return data.value;
    } else if (Date.now() > data.time) {
        ls.removeItem(key);
        return '';
    } else {
        return typeof data.value !== "undefined" ? data.value : '';
    }

}

export const removeLocal = (key) => {
    return ls.removeItem(key);
}

export const clearAllLocal = () => {
    return ls.clear()
}