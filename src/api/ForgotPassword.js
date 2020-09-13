import { axios } from '@/utils/request'

const api = {
  forgetPasswordlogin: '/sys/ forgetPasswordlogin',
}
  export default api

export function forgetPasswordlogin(parameter) {
  console.log('/forgetPasswordlogin req-->', JSON.stringify(parameter))
  return axios({
    url: api.forgetPasswordlogin,
    method: 'post',
    data: parameter,
  })
}
