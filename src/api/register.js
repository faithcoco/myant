import { axios } from '@/utils/request'

const api = {
  PictureVerification: '/bd/Baseenterprise/captchaCoderegister',
  retrievePsdSendSMSregister: '/bd/Baseenterprise/retrievePsdSendSMSregister'
}
export default api
export function getPictureVerification(parameter) {
  console.log('/getPictureVerification req-->', JSON.stringify(parameter))
  return axios({
    url: api.PictureVerification,
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