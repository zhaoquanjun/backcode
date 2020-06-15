/**
 * ----------------------------------------
 * SmartUi(v0.1):httpRequest.js
 * ----------------------------------------
 */
import {
  getjQuery
} from './index'
const $ = getjQuery()

function setRequestHeader(xhr) {
  xhr.setRequestHeader('X-XSRF-TOKEN', document.getElementById('__x-xsrf-token').getAttribute('value'));
}
class HttpRequest {
  static get(url, data, successCallback, failedCallback, completeCallback) {
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      data: data,
      beforeSend: function (xhr) {
        setRequestHeader(xhr)
      },
      success: function (r) {
        if (typeof successCallback === 'function') {
          successCallback(r);
        }
      },
      error: function (r) {
        if (typeof failedCallback === 'function') {
          failedCallback(r);
        }
      },
      complete: function() {
        typeof completeCallback === 'function' && completeCallback()
      }
    })
  }
  static post(url, data, successCallback, failedCallback, completeCallback) {
    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(data),
      beforeSend: function (xhr) {
        setRequestHeader(xhr)
      },
      success: function (r) {
        if (typeof successCallback === 'function') {
          successCallback(r);
        }
      },
      error: function (r) {
        if (typeof failedCallback === 'function') {
          failedCallback(r);
        }
      },
      complete: function() {
        typeof completeCallback === 'function' && completeCallback()
      }
    })
  }

  static put(url, data, successCallback, failedCallback, completeCallback) {
    $.ajax({
      url: url,
      type: "PUT",
      dataType: "json",
      contentType: 'application/json',
      data: JSON.stringify(data),
      beforeSend: function (xhr) {
        setRequestHeader(xhr)
      },
      success: function (r) {
        if (typeof successCallback === 'function') {
          successCallback(r);
        }
      },
      error: function (r) {
        if (typeof failedCallback === 'function') {
          failedCallback(r);
        }
      },
      complete: function() {
        typeof completeCallback === 'function' && completeCallback()
      }
    })
  }
}
export default HttpRequest