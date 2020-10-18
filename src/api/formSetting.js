/**
 * 表单设置查询
 */
import { axios } from '@/utils/request'

const api = {
  // 单表表单设置查询
  getEditSetting: '/sys/setting/getEditSetting',
}

export default api

/**
 * 获取模板设置
 * @param parameter
 * @returns {*}
 */
export function getEditSetting(parameter) {
  console.log('/getEditSetting-->', JSON.stringify(parameter))
  return axios({
    url: api.getEditSetting,
    method: 'get',
    params: parameter
  })
}
