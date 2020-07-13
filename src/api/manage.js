import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  productList: '/productList',
  SupplierList: '/SupplierList',
  CustomerList: '/CustomerList',
  ContactList: '/ContactList',
  StorageManagementList: '/StorageManagementList',
  OutManagementList: '/OutManagementList',
  TransferList: '/TransferList',
  InventoryList: '/InventoryList',
  PositionAdjustmentList: '/PositionAdjustmentList',
  ShippingNoticeList: '/ShippingNoticeList',
  ReceiptNoticeList: '/ReceiptNoticeList',
  ReturnNoticeClientList: '/ReturnNoticeClientList',
  ReturnNoticeSupplierList: '/ReturnNoticeSupplierList',
  BaleList: '/BaleList',
  WorkTimeReportApplicationList: '/WorkTimeReportApplicationList',
  PickingApplicationList: '/PickingApplicationList',
  WarehouseList: '/WarehouseList',
  OpeningInventoryList: '/OpeningInventoryList',
   productListColumns:'/productList/columns',
    personnelList:'/personnel-list',
    approval:'/approval'
  
}

export default api

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
export function getApproval (parameter) {
    console.log('/getApproval req-->', JSON.stringify(parameter))
    return axios({
      url: api.productList,
      method: 'get',
      params: parameter
    })
  }
  export function getProductListColumns (parameter) {
    console.log('/getProductListColumns req-->', JSON.stringify(parameter))
    return axios({
      url: api.productListColumns,
      method: 'get',
      params: parameter
    })
  }
  export function getPersonnelList (parameter) {
    console.log('/getPersonnelList req-->', JSON.stringify(parameter))
    return axios({
      url: api.personnelList,
      method: 'get',
      params: parameter
    })
  }
export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}
export function getProductList(parameter) {
  console.log('/getProductList req-->', JSON.stringify(parameter))
  return axios({
    url: api.productList,
    method: 'get',
    params: parameter
  })
}
export function getSupplierList(parameter) {
  console.log('/getSupplierList req-->', JSON.stringify(parameter))
  return axios({
    url: api.SupplierList,
    method: 'get',
    params: parameter
  })
}
export function getCustomerList(parameter) {
  console.log('/getCustomerList req-->', JSON.stringify(parameter))
  return axios({
    url: api.CustomerList,
    method: 'get',
    params: parameter
  })
}
export function getContactList(parameter) {
  console.log('/getContactList req-->', JSON.stringify(parameter))
  return axios({
    url: api.ContactList,
    method: 'get',
    params: parameter
  })
}
export function getStorageManagementList(parameter) {
  console.log('/getStorageManagementList req-->', JSON.stringify(parameter))
  return axios({
    url: api.StorageManagementList,
    method: 'get',
    params: parameter
  })
}
export function getOutManagementList(parameter) {
  console.log('/getOutManagementList req-->', JSON.stringify(parameter))
  return axios({
    url: api.OutManagementList,
    method: 'get',
    params: parameter
  })
}
export function getTransferList(parameter) {
  console.log('/getTransferList req-->', JSON.stringify(parameter))
  return axios({
    url: api.TransferList,
    method: 'get',
    params: parameter
  })
}
export function getInventoryList(parameter) {
  console.log('/getInventoryList req-->', JSON.stringify(parameter))
  return axios({
    url: api.InventoryList,
    method: 'get',
    params: parameter
  })
}
export function getPositionAdjustmentList(parameter) {
  console.log('/getPositionAdjustmentList req-->', JSON.stringify(parameter))
  return axios({
    url: api.PositionAdjustmentList,
    method: 'get',
    params: parameter
  })
}
export function getShippingNoticeList(parameter) {
  console.log('/getShippingNoticeList req-->', JSON.stringify(parameter))
  return axios({
    url: api.ShippingNoticeList,
    method: 'get',
    params: parameter
  })
}
export function getReceiptNoticeList(parameter) {
  console.log('/getReceiptNoticeList req-->', JSON.stringify(parameter))
  return axios({
    url: api.ReceiptNoticeList,
    method: 'get',
    params: parameter
  })
}
export function getReturnNoticeClientList(parameter) {
  console.log('/getReturnNoticeClientList req-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeClientList,
    method: 'get',
    params: parameter
  })
}
export function getReturnNoticeSupplierList(parameter) {
  console.log('/getReturnNoticeSupplierList req-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeSupplierList,
    method: 'get',
    params: parameter
  })
}
export function getBaleList(parameter) {
  console.log('/getBaleList req-->', JSON.stringify(parameter))
  return axios({
    url: api.BaleList,
    method: 'get',
    params: parameter
  })
}
export function getWorkTimeReportApplicationList(parameter) {
  console.log('/getWorkTimeReportApplicationList req-->', JSON.stringify(parameter))
  return axios({
    url: api.WorkTimeReportApplicationList,
    method: 'get',
    params: parameter
  })
}
export function getPickingApplicationList(parameter) {
  console.log('/getPickingApplicationList req-->', JSON.stringify(parameter))
  return axios({
    url: api.PickingApplicationList,
    method: 'get',
    params: parameter
  })
}
export function getWarehouseList(parameter) {
  console.log('/getWarehouseList req-->', JSON.stringify(parameter))
  return axios({
    url: api.WarehouseList,
    method: 'get',
    params: parameter
  })
}
export function getOpeningInventoryList(parameter) {
  console.log('/getOpeningInventoryList req-->', JSON.stringify(parameter))
  return axios({
    url: api.OpeningInventoryList,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree(parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}