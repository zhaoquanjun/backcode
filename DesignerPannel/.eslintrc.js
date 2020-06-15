//临时在一段代码中取消eslint检查，可以如下设置：
/* eslint-disable */

// Disables all rules between comments
//alert(‘foo’);

/* eslint-enable */

//临时在一段代码中取消个别规则的检查（如no-alert, no-console）：

/* eslint-disable no-alert, no-console */

// Disables no-alert and no-console warnings between comments
//alert(‘foo’);
///console.log(‘bar’);

/* eslint-enable no-alert, no-console */

//在整个文件中取消eslint检查：

/* eslint-disable */

// Disables all rules for the rest of the file
//alert('foo');
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // extends用于引入某配置作为基础配置，然后再在后续的rules中对其进行扩展
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    /*
    “off” 或者 0 - 关闭规则
    “warn” or 1 - 不符合规则时作为一个警告（不会影响退出码）
    “error” or 2 - 不符合规则时视作一个错误 (退出码为1)
    */

    'vue/max-attributes-per-line': [
      2,
      {
        //多个特性的元素应该分多行撰写，每个特性一行
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 'off', // 在单行元素的内容前后需要换行符
    'vue/multiline-html-element-content-newline': 'off', // 在多行元素的内容之前和之后需要换行符
    'vue/name-property-casing': ['error', 'PascalCase'], // JS/JSX中的组件名应该始终是帕斯卡命名法
    'vue/no-v-html': 'off',

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'any'
        },
        svg: 'always',
        math: 'always'
      }
    ],

    // 对象中定义了存值器，一定要对应的定义取值器。
    'accessor-pairs': 2,
    // 规则在箭头函数的箭头（=>）之前/之后标准化间距样式。
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 单行代码块两边加空格。
    'block-spacing': [2, 'always'],
    // else 关键字要与花括号保持在同一行。
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    // 对于变量和函数名统一使用驼峰命名法。
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    // 不允许有多余的行末逗号。
    'comma-dangle': [2, 'never'],
    // 逗号后面加空格。
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 始终将逗号置于行末。
    'comma-style': [2, 'last'],
    // 子类的构造器中一定要调用 super
    'constructor-super': 2,
    // 多行 if 语句的的括号不能省。
    curly: [2, 'multi-line'],
    // 点号操作符须与属性需在同一行。
    'dot-location': [2, 'property'],
    // 文件末尾留一空行
    'eol-last': 2,
    // 始终使用 === 替代 ==。
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    // 为了保持使用生成器时的一致性，这个规则强制执行一个单独的位置*
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 具有示例参数名称的此规则的正确代码示例" err | error"：
    'handle-callback-err': [2, '^(err|error)$'],
    // 使用两个空格进行缩进
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    // jsx 单引号
    'jsx-quotes': [2, 'prefer-single'],
    //
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 键值对当中冒号与值之间要留空白。 var obj = { 'key': 'value' }
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 构造函数要以大写字母开头。
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    // 无参的构造函数调用时要带上括号。
    'new-parens': 2,
    // 使用数组字面量而不是构造器。
    'no-array-constructor': 2,
    // 避免使用 arguments.callee 和 arguments.caller。
    'no-caller': 2,
    // 禁止调用console对象的方法。
    'no-console': 'off',
    // 避免对类名重新赋值。
    'no-class-assign': 2,
    // 条件语句中赋值语句使用括号包起来。这样使得代码更加清晰可读，而不会认为是将条件判断语句的全等号（===）错写成了等号（=）。
    'no-cond-assign': 2,
    // 避免修改使用 const 声明的变量。
    'no-const-assign': 2,
    // 正则中不要使用控制符。                   /*eslint no-control-regex: "error"*/
    'no-control-regex': 0,
    // 不要对变量使用 delete 操作。             /*eslint no-delete-var: "error"*/
    'no-delete-var': 2,
    // 不要定义冗余的函数参数                   /*eslint no-dupe-args: "error"*/
    'no-dupe-args': 2,
    // 类中不要定义冗余的属性。                 /*eslint no-dupe-class-members: "error"*/
    'no-dupe-class-members': 2,
    // 对象字面量中不要定义重复的属性。            /*eslint no-dupe-keys: "error"*/
    'no-dupe-keys': 2,
    // switch 语句中不要定义重复的 case 分支。   /*eslint no-duplicate-case: "error"*/
    'no-duplicate-case': 2,
    // 正则中不要使用空字符。                   /*eslint no-empty-character-class: "error"*/
    'no-empty-character-class': 2,
    // 不要解构空值                           /*eslint no-empty-pattern: "error"*/
    'no-empty-pattern': 2,
    // 不要使用 eval()。
    'no-eval': 2,
    // catch 中不要对错误重新赋值
    'no-ex-assign': 2,
    // 不要扩展原生对象。
    'no-extend-native': 2,
    // 避免多余的函数上下文绑定。
    'no-extra-bind': 2,
    // 避免不必要的布尔转换。
    'no-extra-boolean-cast': 2,
    // 不要使用多余的括号包裹函数。
    'no-extra-parens': [2, 'functions'],
    // switch 一定要使用 break 来将条件分支正常中断。
    'no-fallthrough': 2,
    // 不要省去小数点前面的0。
    'no-floating-decimal': 2,
    // 避免对声明过的函数重新赋值。
    'no-func-assign': 2,
    // 注意隐式的 eval()。
    'no-implied-eval': 2,
    // 嵌套的代码块中禁止再定义函数。
    'no-inner-declarations': [2, 'functions'],
    // 不要向 RegExp 构造器传入非法的正则表达式。
    'no-invalid-regexp': 2,
    // 不要使用非法的空白符
    'no-irregular-whitespace': 2,
    // 禁止使用 __iterator__。
    'no-iterator': 2,
    // 外部变量不要与对象属性重名。
    'no-label-var': 2,
    // 不要使用标签语句
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    // 不要书写不必要的嵌套代码块。
    'no-lone-blocks': 2,
    // 不要混合使用空格与制表符作为缩进。
    'no-mixed-spaces-and-tabs': 2,
    // 除了缩进，不要使用多个空格。
    'no-multi-spaces': 2,
    // 不要使用多行字符串。
    'no-multi-str': 2,
    // 不允许有连续多行空行。
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    // 禁止使用 Object 构造器
    'no-new-object': 2,
    // 禁止使用 new require。
    'no-new-require': 2,
    // 禁止使用 Symbol 构造器。
    'no-new-symbol': 2,
    // 禁止使用原始包装器。
    'no-new-wrappers': 2,
    // 不要将全局对象的属性作为函数调用。
    'no-obj-calls': 2,
    // 不要使用八进制字面量。
    'no-octal': 2,
    // 字符串字面量中也不要使用八进制转义字符。
    'no-octal-escape': 2,
    // 使用 __dirname 和 __filename 时尽量避免使用字符串拼接。
    'no-path-concat': 2,
    // 使用 getPrototypeOf 来替代 __proto__。
    'no-proto': 2,
    // 不要重复声明变量。
    'no-redeclare': 2,
    // 正则中避免使用多个空格。
    'no-regex-spaces': 2,
    // return 语句中的赋值必需有括号包裹。
    'no-return-assign': [2, 'except-parens'],
    // 避免将变量赋值给自己。
    'no-self-assign': 2,
    // 避免将变量与自己进行比较操作。
    'no-self-compare': 2,
    // 避免使用逗号操作符。
    'no-sequences': 2,
    // 不要随意更改关键字的值
    'no-shadow-restricted-names': 2,
    // 禁止使用稀疏数组（Sparse arrays）
    'no-sparse-arrays': 2,
    // 使用 this 前请确保 super() 已调用。
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    // 行末不留空格。
    'no-trailing-spaces': 2,
    // 使用浏览器全局变量时加上 window. 前缀。
    'no-undef': 2,
    // 不要使用 undefined 来初始化变量。
    'no-undef-init': 2,
    // 不要使用 (, [, or ` 等作为一行的开始。在没有分号的情况下代码压缩后会导致报错，而坚持这一规范则可避免出错。
    'no-unexpected-multiline': 2,
    // 循环语句中注意更新循环变量。
    'no-unmodified-loop-condition': 2,
    // 如果有更好的实现，尽量不要使用三元表达式。
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    // return，throw，continue 和 break 后不要再跟代码。
    'no-unreachable': 2,
    // finally 代码块中不要再改变程序执行流程。
    'no-unsafe-finally': 2,
    // 不要定义未使用的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    // 避免不必要的 .call() 和 .apply()。
    'no-useless-call': 2,
    // 避免使用不必要的计算值作对象属性。
    'no-useless-computed-key': 2,
    // 禁止多余的构造器。
    'no-useless-constructor': 2,
    // 禁止不必要的转义。
    'no-useless-escape': 0,
    // 属性前面不要加空格。
    'no-whitespace-before-property': 2,
    // 禁止使用 with。
    'no-with': 2,
    // 每个 var 关键字单独声明一个变量。
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    // 对于三元运算符 ? 和 : 与他们所负责的代码处于同一行
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 代码块中避免多余留白。
    'padded-blocks': [2, 'never'],
    // 除需要转义的情况外，字符串统一使用单引号。
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // 不要使用分号。
    semi: [2, 'never'],
    // 遇到分号时空格要后留前不留。
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 代码块首尾留空格。 if (admin) {...}  // ✓ ok
    'space-before-blocks': [2, 'always'],
    // 函数声明时括号与函数名间加空格   function name (arg) { ... }   // ✓ ok
    'space-before-function-paren': [2, 'never'],
    // 圆括号间不留空格 getName(name)       // ✓ ok
    'space-in-parens': [2, 'never'],
    // 字符串拼接操作符 (Infix operators) 之间要留空格。
    'space-infix-ops': 2,
    // 一元运算符后面跟一个空格。  typeof !admin        // ✓ ok
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释首尾留空格。
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    // 模板字符串中变量前后不加空格  const message = `Hello, ${name}`      // ✓ ok
    'template-curly-spacing': [2, 'never'],
    // 检查 NaN 的正确姿势是使用 isNaN()。检查 NaN 的正确姿势是使用 isNaN()。
    'use-isnan': 2,
    // 用合法的字符串跟 typeof 进行比较操作。 typeof name === 'undefined'     // ✓ ok
    'valid-typeof': 2,
    // 自调用匿名函数 (IIFEs) 使用括号包裹。
    'wrap-iife': [2, 'any'],
    // yield * 中的 * 前后都要有空格。
    'yield-star-spacing': [2, 'both'],
    // 请书写优雅的条件语句（avoid Yoda conditions）
    yoda: [2, 'never'],
    // 如果一个变量从不重新分配，使用const声明更好。
    'prefer-const': 2,
    // 不要使用 debugger。
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 对象文字的大括号内执行一致的间距，解构赋值和导入/导出说明符。
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    // 数组括号内强制实现一致的间距。
    'array-bracket-spacing': [2, 'never']
  }
}
