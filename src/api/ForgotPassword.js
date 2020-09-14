import { axios } from '@/utils/request'

const api = {
  forgetPasswordlogin: '/sys/ forgetPasswordlogin',
  retrievePsdSendSMSregister: '/bd/Baseenterprise/retrievePsdSendSMSregister',
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

export function retrievePsdSendSMSregister(parameter) {
  console.log('/retrievePsdSendSMSregister req-->', JSON.stringify(parameter))
  return axios({
    url: api.retrievePsdSendSMSregister,
    method: 'post',
    data: parameter
  })
}