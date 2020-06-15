import compile from './compile'
/**
 * 模板引擎
 * @param   {string}            cachKey 模板名
 * @param   {string}            content 模板内容
 * @param   {Object}            data 模板数据
 * @return  {string}            渲染模板结果
 */
const template = (cacheKey, content, data) => {
    return compile(
        cacheKey,
        content
    )(data);
};
template.compile = compile;
export default template