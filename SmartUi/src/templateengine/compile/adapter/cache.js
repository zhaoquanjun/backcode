/**
 * ----------------------------------------
 * SmartUi(v0.1):templat engine cache
 * ----------------------------------------
 */
const Cache = {
    _data: {},
    set: function (key, val) {
        this._data[key] = val
    },
    get: function (key) {
        return this._data[key]
    },
    reset: function () {
        this._data = {}
    }
}
export default Cache