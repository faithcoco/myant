import { axios } from '@/utils/request'

const api = {
  ProductAdd: '/ProductAdd',
  SupplierAdd: '/SupplierAdd',
  CustomerAdd: '/CustomerAdd',
  ContactAdd: '/ContactAdd',
  StorageManagementAdd: '/StorageManagementAdd',
  OutManagementAdd: '/OutManagementAdd',
  TransferAdd: '/TransferAdd',
  InventoryAdd: '/InventoryAdd',
  PositionAdjustmentAdd: '/PositionAdjustmentAdd',
  ShippingNoticeAdd: '/ShippingNoticeAdd',
  ReceiptNoticeAdd: '/ReceiptNoticeAdd',
  ReturnNoticeClientAdd: '/ReturnNoticeClientAdd',
  ReturnNoticeSupplierAdd: '/ReturnNoticeSupplierAdd',
  BaleAdd: '/BaleAdd',
  WorkTimeReportApplicationAdd: '/WorkTimeReportApplicationAdd',
  PickingApplicationAdd: '/PickingApplicationAdd',
  WarehouseAdd: '/WarehouseAdd',
  OpeningInventoryAdd: '/OpeningInventoryAdd',

  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  FormSettingTree: '/FormSetting/tree',
  approvalSettin: '/approval-settin/tree',
  MessageSettin: '/MessageSettin/tree',
  approval: '/approval',
  Sector: '/Sector',
  BasepersonInfo: '/bd/baseperson/getBasepersonInfo',
  BaseenterpriseInfo: '/bd/Baseenterprise/getBaseenterpriseInfo',
  updateBaseperson: '/bd/baseperson/updateBaseperson',
  updateBaseenterprise: '/bd/Baseenterprise/updateBaseenterprise',
  insertBaseenterprise: '/bd/Baseenterprise//insertBaseenterprise',

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
  personnelList: '/personnel-list',
  MessageSettinList: '/MessageSettinList',
  classificationGoodsList: '/classification_goods',
  PersonnelSettingList: '/PersonnelSettingList',
  FormSettingList: '/FormSettingList',

  productListColumns: '/productList/columns',
  SupplierListColumns: '/SupplierList/columns',
  CustomerListColumns: '/CustomerList/columns',
  ContactListColumns: '/ContactList/columns',
  StorageManagementListColumns: '/StorageManagementList/columns',
  OutManagementListColumns: '/OutManagementListColumns/columns',
  TransferListColumns: '/TransferListColumns/columns',
  InventoryListColumns: '/InventoryListColumns/columns',
  PositionAdjustmentListColumns: '/PositionAdjustmentListColumns/columns',
  ShippingNoticeListColumns: '/ShippingNoticeListColumns/columns',
  ReceiptNoticeListColumns: '/ReceiptNoticeListColumns/columns',
  ReturnNoticeClientListColumns: '/ReturnNoticeClientListColumns/columns',
  ReturnNoticeSupplierListColumns: '/ReturnNoticeSupplierListColumns/columns',
  BaleListColumns: '/BaleListColumns/columns',
  WorkTimeReportApplicationListColumns: '/WorkTimeReportApplicationListColumns/columns',
  PickingApplicationListColumns: '/PickingApplicationListColumns/columns',
  WarehouseListColumns: '/WarehouseListColumns/columns',
  OpeningInventoryListColumns: '/OpeningInventoryListColumns/columns',
  PersonnelSettingColumns: '/PersonnelSetting/columns',
  FormSettingColumns: '/FormSetting/columns',
  CodeSettingColumns: '/CodeSetting/columns',
  classificationGoodsColumns: '/classification_goods/columns',
  approvalSettinColumns: '/approval-settin/columns'
}

export default api

export function postProductAdd(parameter) {
  console.log('/postProductAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ProductAdd,
    method: 'post',
    data: parameter
  })
}
export function postSupplierAdd(parameter) {
  console.log('/postSupplierAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.SupplierAdd,
    method: 'post',
    data: parameter
  })
}
export function postCustomerAdd(parameter) {
  console.log('/postCustomerAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.CustomerAdd,
    method: 'post',
    data: parameter
  })
}
export function postContactAdd(parameter) {
  console.log('/postContactAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ContactAdd,
    method: 'post',
    data: parameter
  })
}
export function postStorageManagementAdd(parameter) {
  console.log('/postStorageManagementAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.StorageManagementAdd,
    method: 'post',
    data: parameter
  })
}
export function postOutManagementAdd(parameter) {
  console.log('/postOutManagementAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.OutManagementAdd,
    method: 'post',
    data: parameter
  })
}
export function postTransferAdd(parameter) {
  console.log('/postTransferAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.TransferAdd,
    method: 'post',
    data: parameter
  })
}
export function postInventoryAdd(parameter) {
  console.log('/postInventoryAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.InventoryAdd,
    method: 'post',
    data: parameter
  })
}
export function postPositionAdjustmentAdd(parameter) {
  console.log('/postPositionAdjustmentAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.PositionAdjustmentAdd,
    method: 'post',
    data: parameter
  })
}
export function postShippingNoticeAdd(parameter) {
  console.log('/postShippingNoticeAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ShippingNoticeAdd,
    method: 'post',
    data: parameter
  })
}
export function postReceiptNoticeAdd(parameter) {
  console.log('/postReceiptNoticeAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ReceiptNoticeAdd,
    method: 'post',
    data: parameter
  })
}
export function postReturnNoticeClientAdd(parameter) {
  console.log('/postReturnNoticeClientAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeClientAdd,
    method: 'post',
    data: parameter
  })
}
export function postReturnNoticeSupplierAdd(parameter) {
  console.log('/postReturnNoticeSupplierAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeSupplierAdd,
    method: 'post',
    data: parameter
  })
}
export function postBaleAdd(parameter) {
  console.log('/postBaleAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.BaleAdd,
    method: 'post',
    data: parameter
  })
}
export function postWorkTimeReportApplicationAdd(parameter) {
  console.log('/postWorkTimeReportApplicationAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.WorkTimeReportApplicationAdd,
    method: 'post',
    data: parameter
  })
}
export function postPickingApplicationAdd(parameter) {
  console.log('/postPickingApplicationAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.PickingApplicationAdd,
    method: 'post',
    data: parameter
  })
}
export function postWarehouseAdd(parameter) {
  console.log('/postWarehouseAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.WarehouseAdd,
    method: 'post',
    data: parameter
  })
}
export function postOpeningInventoryAdd(parameter) {
  console.log('/postOpeningInventoryAdd-->', JSON.stringify(parameter))
  return axios({
    url: api.OpeningInventoryAdd,
    method: 'post',
    data: parameter
  })
}
export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
export function getApproval(parameter) {
  console.log('/getApproval req-->', JSON.stringify(parameter))
  return axios({
    url: api.approval,
    method: 'get',
    params: parameter
  })
}
export function getSector(parameter) {
  console.log('/getSector req-->', JSON.stringify(parameter))
  return axios({
    url: api.Sector,
    method: 'get',
    params: parameter
  })
}
export function getProductListColumns(parameter) {
  console.log('/getProductListColumns req-->', JSON.stringify(parameter))
  return axios({
    url: api.productListColumns,
    method: 'get',
    params: parameter
  })
}
export function getSupplierListColumns(parameter) {
  console.log('/getSupplierListColumns req-->', JSON.stringify(parameter))
  return axios({
    url: api.SupplierListColumns,
    method: 'get',
    params: parameter
  })
}
export function getCustomerListColumns(parameter) {
  console.log('/getCustomerListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.CustomerListColumns,
    method: 'get',
    params: parameter
  })
}
export function getContactListColumns(parameter) {
  console.log('/getContactListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.ContactListColumns,
    method: 'get',
    params: parameter
  })
}
export function getStorageManagementListColumns(parameter) {
  console.log('/getStorageManagementListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.StorageManagementListColumns,
    method: 'get',
    params: parameter
  })
}
export function getOutManagementListColumns(parameter) {
  console.log('/getOutManagementListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.OutManagementListColumns,
    method: 'get',
    params: parameter
  })
}
export function getTransferListColumns(parameter) {
  console.log('/geTransferListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.TransferListColumns,
    method: 'get',
    params: parameter
  })
}
export function getInventoryListColumns(parameter) {
  console.log('/getInventoryListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.InventoryListColumns,
    method: 'get',
    params: parameter
  })
}
export function getPositionAdjustmentListColumns(parameter) {
  console.log('/getPositionAdjustmentListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.PositionAdjustmentListColumns,
    method: 'get',
    params: parameter
  })
}
export function getShippingNoticeListColumns(parameter) {
  console.log('/getShippingNoticeListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.ShippingNoticeListColumns,
    method: 'get',
    params: parameter
  })
}
export function getReceiptNoticeListColumns(parameter) {
  console.log('/getReceiptNoticeListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.ReceiptNoticeListColumns,
    method: 'get',
    params: parameter
  })
}
export function getReturnNoticeClientListColumns(parameter) {
  console.log('/getReturnNoticeClientListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeClientListColumns,
    method: 'get',
    params: parameter
  })
}
export function getReturnNoticeSupplierListColumns(parameter) {
  console.log('/getReturnNoticeSupplierListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.ReturnNoticeSupplierListColumns,
    method: 'get',
    params: parameter
  })
}
export function getBaleListColumns(parameter) {
  console.log('/getBaleListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.BaleListColumns,
    method: 'get',
    params: parameter
  })
}
export function getWorkTimeReportApplicationListColumns(parameter) {
  console.log('/getWorkTimeReportApplicationListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.WorkTimeReportApplicationListColumns,
    method: 'get',
    params: parameter
  })
}
export function getPickingApplicationListColumns(parameter) {
  console.log('/getPickingApplicationListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.PickingApplicationListColumns,
    method: 'get',
    params: parameter
  })
}
export function getWarehouseListColumns(parameter) {
  console.log('/getWarehouseListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.WarehouseListColumns,
    method: 'get',
    params: parameter
  })
}
export function getOpeningInventoryListColumns(parameter) {
  console.log('/getOpeningInventoryListColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.OpeningInventoryListColumns,
    method: 'get',
    params: parameter
  })
}
export function getPersonnelSettingColumns(parameter) {
  console.log('/getPersonnelSettingColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.PersonnelSettingColumns,
    method: 'get',
    params: parameter
  })
}
export function getFormSettingColumns(parameter) {
  console.log('/getFormSettingColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.FormSettingColumns,
    method: 'get',
    params: parameter
  })
}
export function getCodeSettingColumns(parameter) {
  console.log('/getCodeSettingColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.CodeSettingColumns,
    method: 'get',
    params: parameter
  })
}
export function getclassificationGoodsColumns(parameter) {
  console.log('/getclassificationGoodsColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.classificationGoodsColumns,
    method: 'get',
    params: parameter
  })
}
export function getapprovalSettinColumns(parameter) {
  console.log('/getapprovalSettinColumns-->', JSON.stringify(parameter))
  return axios({
    url: api.approvalSettinColumns,
    method: 'get',
    params: parameter
  })
}

export function getPersonnelList(parameter) {
  console.log('/getPersonnelList req-->', JSON.stringify(parameter))
  return axios({
    url: api.personnelList,
    method: 'get',
    params: parameter
  })
}
export function getMessageSettinList(parameter) {
  console.log('/getMessageSettinList req-->', JSON.stringify(parameter))
  return axios({
    url: api.MessageSettinList,
    method: 'get',
    params: parameter
  })
}
export function getclassificationGoodsList(parameter) {
  console.log('/getclassificationGoodsList req-->', JSON.stringify(parameter))
  return axios({
    url: api.classificationGoodsList,
    method: 'get',
    params: parameter
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
export function getPersonnelSettingList(parameter) {
  console.log('/getPersonnelSettingList req-->', JSON.stringify(parameter))
  return axios({
    url: api.PersonnelSettingList,
    method: 'get',
    params: parameter
  })
}
export function getFormSettingList(parameter) {
  console.log('/getFormSettingList req-->', JSON.stringify(parameter))
  return axios({
    url: api.FormSettingList,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: '/bd/menu/getMenuList',
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
export function getFormSettingTree(parameter) {
  return axios({
    url: api.FormSettingTree,
    method: 'get',
    params: parameter
  })
}
export function getapprovalSettinTree(parameter) {
  return axios({
    url: api.approvalSettin,
    method: 'get',
    params: parameter
  })
}
export function getMessageSettinTree(parameter) {
  return axios({
    url: api.MessageSettin,
    method: 'get',
    params: parameter
  })
}
export function getBasepersonInfo(parameter) {
  return axios({
    url: api.BasepersonInfo,
    method: 'get',
    params: parameter
  })
}
export function getBaseenterpriseInfo(parameter) {
  return axios({
    url: api.BaseenterpriseInfo,
    method: 'get',
    params: parameter
  })
}
export function updateBaseperson(parameter) {
  return axios({
    url: api.updateBaseperson,
    method: 'post',
    data: parameter
  })
}
export function updateBaseenterprise(parameter) {
  return axios({
    url: api.updateBaseenterprise,
    method: 'post',
    data: parameter
  })
}
export function insertBaseenterprise(parameter) {
  return axios({
    url: api.insertBaseenterprise,
    method: 'post',
    data: parameter
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
