import Compiler from './compiler'
import settings from './settings'
import TemplateError from './error'

const debugRender = (error, options) => {
    options.onerror(error, options);
    const render = () => `{Template Error}`;
    render.mappings = [];
    render.sourcesContent = [];
    return render;
};
const defaults=settings
/**
 * 编译模版
 * @param {string} cacheKey  缓存key
 * @param {string}       source   模板内容
 * @return {function}
 */
const compile = (cacheKey, source) => {
    
    // 合并默认配置
    let options = defaults;
    options.source=source;

    // debug 模式
    /* istanbul ignore if */
    if (options.debug === true) {
        options.cache = false;
        options.minimize = false;
        options.compileDebug = true;
    }

    if (options.compileDebug) {
        options.minimize = false;
    }
    const cache = options.cache;
    const caches = options.caches;

    // 匹配缓存
    if (cache && cacheKey) {
        const render = caches.get(cacheKey);
        if (render) {
            return render;
        }
    }

    

    let fn;
    const compiler = new Compiler(options);

    try {
        fn = compiler.build();
    } catch (error) {
        const nerror = new TemplateError(error);
        if (options.bail) {
            throw error;
        } else {
            return debugRender(nerror, options);
        }
    }

    const render = (data, blocks) => {
        try {
            return fn(data, blocks);
        } catch (error) {
            // 运行时出错以调试模式重载
            if (!options.compileDebug) {
                options.cache = false;
                options.compileDebug = true;
                return compile(options)(data, blocks);
            }

            const nerror = new TemplateError(error);

            if (options.bail) {
                throw error;
            } else {
                return debugRender(nerror, options)();
            }
        }
    };

    render.mappings = fn.mappings;
    render.sourcesContent = fn.sourcesContent;
    render.toString = () => fn.toString();

    if (cache && cacheKey) {
        caches.set(cacheKey, render);
    }

    return render;
};

compile.Compiler = Compiler;

export default compile