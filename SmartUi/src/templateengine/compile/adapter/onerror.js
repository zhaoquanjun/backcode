/**
 * 调试器
 * @param   {Object}    error
 * @return  {string}
 */
const onerror = (error) => {
    console.error(error.name, error.message);
};

export default onerror;