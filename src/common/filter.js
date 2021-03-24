import Util from './util'

/**
 * 格式化JSON
 * @param  {String} json    [JSON字符串]
 * @param  {Object} options [参数]
 * @return {[type]}         [格式化后的字符串]
 */
const getRelationStatus = (status) => {
    let statusDesc = '';
    switch (status) {
        case 1:
            statusDesc = '本人';
            break;
        case 2:
            statusDesc = '配偶';
            break;
        case 3:
            statusDesc = '父母';
            break;
        case 4:
            statusDesc = '子女';
            break;
        case 5:
            statusDesc = '其他';
            break;
        default:
            statusDesc = '本人';
            break
    }
    return statusDesc
};
export default {
    getRelationStatus: getRelationStatus,
}
