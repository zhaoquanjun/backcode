<template>
  <div ref="tuiImageEditor" style="width: 100%;height: 100%;"></div>
</template>
<style>
.tui-image-editor-menu {
  background-color: #ff6a00;
}
</style>
<script>
import ImageEditor from '../../../static/my-node_modules/tui-image-editor/tui-image-editor'
import customTheme from './CustomTheme'
// To use the default UI, the svg files for the icons is required.
require('tui-image-editor/dist/svg/icon-a.svg')
import 'tui-image-editor/dist/svg/icon-b.svg'
import 'tui-image-editor/dist/svg/icon-c.svg'
import 'tui-image-editor/dist/svg/icon-d.svg'
import snippet from 'tui-code-snippet'

// Load Style Code
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
const editorEvents = [
  'addText',
  'mousedown',
  'objectActivated',
  'objectMoved',
  'objectScaled',
  'redoStackChanged',
  'textEditing',
  'undoStackChanged',
  'downLoad'
]
const includeUIOptions = {}
const locale_ru_ZH = {
  // override default English locale to your custom
  Crop: '裁剪',
  Delete: '删除',
  'Delete-all': '删除所有',
  Load: '选择图片',
  Download: '保存图片',
  Sharpen: '锐化',
  Emboss: '浮雕',
  Blur: '模糊',
  Sepia: '深褐色',
  Sepia2: '深褐色2',
  Invert: '反色',
  Grayscale: '灰度化',
  'Remove White': '移除白色',
  Threshold: '阈值',
  Distance: '距离',
  Filter: '滤镜',
  'Color Filter': '颜色滤镜',
  Pixelate: '像素化',
  Noise: '噪点',
  Brightness: '亮度',
  Redo: '重做',
  Undo: '撤销',
  Reset: '重设',
  Flip: '翻转',
  Rotate: '旋转',
  Draw: '绘画',
  Shape: '图形',
  Icon: '图标',
  Text: '文字',
  Mask: '遮罩',
  Apply: '应用',
  Cancel: '取消',
  Custom: '自定义',
  Square: '正方形',
  'Load Mask Image': '选择遮罩图片',
  Range: '角度',
  Color: '颜色',
  Fill: '填充',
  Stroke: '边框',
  Rectangle: '长方形',
  Circle: '圆形',
  Triangle: '三角形',
  Bold: '加粗',
  Italic: '倾斜',
  Underline: '下横线',
  Left: '左对齐',
  Center: '居中',
  Right: '右对齐',
  'Text size': '文本大小',
  Arrow: '箭头',
  'Arrow-2': '箭头2',
  'Arrow-3': '箭头3',
  Value: '值',
  'Custom icon': '自定义图标',
  'Gradient transparency': '渐变透明',
  Blend: '混合',
  Multiply: '叠加',
  Tint: '色调',
  Heart: '心',
  Bubble: '泡泡',
  Location: '位置',
  Polygon: '多变形',
  'Star-1': '星星1',
  'Star-2': '星星2',
  Free: '自由',
  Straight: '直线'
  // etc...
}
const editorDefaultOptions = {
  cssMaxWidth: 700,
  cssMaxHeight: 500,
  includeUI: {
    loadImage: {
      path:
        'https://nwzimg.wezhan.cn/contents/sitefiles2008/10043615/images/8724406.jpg?x-oss-process=image/resize,m_lfit,h_200,w_200',
      name: '示例照片'
    },
    locale: locale_ru_ZH,
    // menu: ['crop', 'flip', 'rotate', 'text', 'mask'],
    theme: customTheme, // or blackTheme
    // initMenu: "crop",
    menuBarPosition: 'bottom'
  }
}
export default {
  name: 'TuiImageEditor',
  props: {
    useDefaultUI: {
      type: Boolean,
      default: true
    },
    options: {
      type: Object,
      default() {
        return editorDefaultOptions
      }
    },
    model: {
      type: Object
    }
  },
  data() {
    return {
      editorInstance: null
    }
  },
  computed: {
    src: {
      get: function() {
        return this.model['Src']
      },
      set: function() {}
    }
  },
  watch: {
    src() {
      this._initImage()
    }
  },
  mounted() {
    this._initImage()
  },
  destroyed() {
    editorEvents.forEach((eventName) => this.editorInstance.off(eventName))
    this.editorInstance.destroy()
  },
  methods: {
    getImg() {
      return this.editorInstance.toDataURL()
    },
    addEventListener() {
      editorEvents.forEach((eventName) => {
        this.editorInstance.on(eventName, (...args) =>
          this.$emit(eventName, ...args)
        )
      })

      // 隐藏 选择图片
      var sltBtns = this.editorInstance.ui._selectedElement.querySelectorAll(
        '.tui-image-editor-header-buttons div'
      )
      if (sltBtns && sltBtns.length > 0) sltBtns[0].style.display = 'none'

      // 隐藏 左侧logo
      var logoDiv = this.editorInstance.ui._selectedElement.querySelectorAll(
        '.tui-image-editor-header-logo'
      )
      if (logoDiv && logoDiv.length > 0) logoDiv[0].style.display = 'none'

      // 重写 保存图片  方法
      var downloads = this.editorInstance.ui._selectedElement.querySelectorAll(
        '.tui-image-editor-download-btn'
      )
      snippet.forEach(downloads, (element) => {
        element.addEventListener('click', () => {
          var cropClass = this.editorInstance.ui._selectedElement
            .querySelector('#tie-crop-button')
            .querySelector('.tui-image-editor-button').className
          var maskClass = this.editorInstance.ui._selectedElement.querySelector(
            '#tie-mask-apply'
          ).className
          var _this = this
          if (cropClass.indexOf('active') > -1) {
            this.editorInstance.ui._selectedElement
              .querySelector('#tie-crop-button')
              .querySelector('.tui-image-editor-button.apply.active')
              .click()
            setTimeout(function() {
              var imgBase64Data = _this.getImg()
              _this.$emit(
                'uploadBase64Img',
                imgBase64Data,
                Date.now().toString()
              )
            }, 100)
          } else if (maskClass.indexOf('active') > -1) {
            this.editorInstance.ui._selectedElement
              .querySelector('#tie-mask-apply')
              .querySelector('.tui-image-editor-button.apply')
              .click()
            setTimeout(function() {
              var imgBase64Data = _this.getImg()
              _this.$emit(
                'uploadBase64Img',
                imgBase64Data,
                Date.now().toString()
              )
            }, 100)
          } else {
            var imgBase64Data = _this.getImg()
            _this.$emit('uploadBase64Img', imgBase64Data, Date.now().toString())
          }
        })
      })

      // 遮罩应用
      // var maskBtns = this.editorInstance.ui._selectedElement.querySelectorAll("#tie-mask-apply");
      // if (maskBtns)
      //    maskBtns[0].style.display = "none";

      // //裁剪应用、取消
      // var cropBtns = this.editorInstance.ui._selectedElement.querySelectorAll("#tie-crop-button");
      // if (cropBtns)
      //    cropBtns[0].style.display = "none";

      var menuUndo = this.editorInstance.ui._selectedElement.querySelector(
        '#tie-btn-undo'
      )
      if (menuUndo) menuUndo.setAttribute('tooltip-content', locale_ru_ZH.Undo)

      var menuRedo = this.editorInstance.ui._selectedElement.querySelector(
        '#tie-btn-redo'
      )
      if (menuRedo) menuRedo.setAttribute('tooltip-content', locale_ru_ZH.Redo)

      var menuReset = this.editorInstance.ui._selectedElement.querySelector(
        '#tie-btn-reset'
      )
      if (menuReset) {
        menuReset.setAttribute('tooltip-content', locale_ru_ZH.Reset)
      }

      var menuDelete = this.editorInstance.ui._selectedElement.querySelector(
        '#tie-btn-delete'
      )
      if (menuDelete) menuDelete.style.display = 'none'

      var menuDeleteAll = this.editorInstance.ui._selectedElement.querySelector(
        '#tie-btn-delete-all'
      )
      if (menuDeleteAll) menuDeleteAll.style.display = 'none'

      var tieLines = this.editorInstance.ui._selectedElement.querySelectorAll(
        '.tui-image-editor-menu .tui-image-editor-item'
      )
      // 第6个的竖线去掉
      if (tieLines && tieLines.length > 5) tieLines[6].style.display = 'none'

      // 重写面板top值
      // var editorPannels = this.editorInstance.ui._selectedElement.querySelectorAll(".tui-image-editor");
      // snippet.forEach(editorPannels, element => {
      //    console.log("Top:"+element.style);
      //    element.style["top"] = "-75px";
      // });
    },
    getRootElement() {
      return this.$refs.tuiImageEditor
    },
    invoke(methodName, ...args) {
      let result = null
      if (this.editorInstance[methodName]) {
        result = this.editorInstance[methodName](...args)
      } else if (methodName.indexOf('.') > -1) {
        const func = this.getMethod(this.editorInstance, methodName)

        if (typeof func === 'function') {
          result = func(...args)
        }
      }

      return result
    },
    getMethod(instance, methodName) {
      const { first, rest } = this.parseDotMethodName(methodName)
      const isInstance = instance.constructor.name !== 'Object'
      const type = typeof instance[first]
      let obj

      if (isInstance && type === 'function') {
        obj = instance[first].bind(instance)
      } else {
        obj = instance[first]
      }

      if (rest.length > 0) {
        return this.getMethod(obj, rest)
      }

      return obj
    },
    parseDotMethodName(methodName) {
      const firstDotIdx = methodName.indexOf('.')
      let firstMethodName = methodName
      let restMethodName = ''

      if (firstDotIdx > -1) {
        firstMethodName = methodName.substring(0, firstDotIdx)
        restMethodName = methodName.substring(
          firstDotIdx + 1,
          methodName.length
        )
      }

      return {
        first: firstMethodName,
        rest: restMethodName
      }
    },
    _initImage() {
      if (this.useDefaultUI) {
        options = Object.assign(includeUIOptions, this.options)
      }

      editorDefaultOptions.includeUI.loadImage.path = this.src
      let options = editorDefaultOptions

      this.editorInstance = new ImageEditor(this.$refs.tuiImageEditor, options)
      this.editorInstance.loadImageFromURL(this.src, 'lena').then((result) => {
        // console.log("old : " + result.oldWidth + ", " + result.oldHeight);
        // console.log("new : " + result.newWidth + ", " + result.newHeight);
      })
      this.addEventListener()
    },
    close() {
      editorEvents.forEach((eventName) => this.editorInstance.off(eventName))
      this.includeUIOptions = {}
      this.editorInstance.destroy()
    }
  }
}
</script>
