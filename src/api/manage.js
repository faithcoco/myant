import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  productList:'/productList',
  productListColumns:'/productList/columns',
  personnelList:'/personnel-list',
  approval:'/approval'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}
export function getProductList (parameter) {
  console.log('/getProductList req-->', JSON.stringify(parameter))
  return axios({
    url: api.productList,
    method: 'get',
    params: parameter
  })
}
export function getApproval (parameter) {
  console.log('/getApproval req-->', JSON.stringify(parameter))
  return axios({
    url: api.approval,
    method: 'get',
    params: parameter
  })
}
export function getProductListColumns (parameter) {
  console.log('/getProductListColumns req-->', JSON.stringify(parameter))
  return axios({
    url: api.productListColumns,
    method: 'get',
    params: parameter
  })
}
export function getPersonnelList (parameter) {
  console.log('/getPersonnelList req-->', JSON.stringify(parameter))
  return axios({
    url: api.personnelList,
    method: 'get',
    params: parameter
  })
}


export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
