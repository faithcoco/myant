// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/dashboard/Workplace'),
        name: 'index',
        meta: { title: '首页', icon: 'user', keepAlive: true, permission: ['00'] }
      },
      {
        path: '/basic_archives',
        name: 'basic_archives',
        component: RouteView,
        redirect: '/basic_archives/goods_file/product-list',
        meta: { title: '基础档案', icon: 'user', permission: ['01'] },
        children: [

          {
            path: 'PersonnelSetting',
            name: 'PersonnelSetting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
            meta: { title: '部门人员档案', icon: 'user', permission: ['01-01'] },

          },
          {
            path: 'PersonsettingAdd',
            name: 'PersonsettingAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductAdd.vue'),
            meta: { title: '部门人员档案新增', icon: 'user' },
            hidden: true
          },
          {
            path: 'product-list',
            name: 'ProductList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
            meta: { title: '料品档案', icon: 'user', permission: ['01-02'] }
          },
          {
            path: 'ProductAdd',
            name: 'ProductAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductAdd.vue'),
            meta: { title: '商品档案新增' },
            hidden: true
          },
          {
            path: 'type',
            name: 'type',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/Type.vue'),
            meta: { title: '分类', icon: 'user' },
            hidden: true
          },

          {
            path: 'SupplierList',
            name: 'SupplierList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
            meta: { title: '供应商档案', icon: 'user', permission: ['01-03'] }
          },
          {
            path: 'SupplierAdd',
            name: 'SupplierAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductAdd.vue'),
            meta: { title: '供应商新增' },
            hidden: true
          },
          {
            path: 'CustomerList',
            name: 'CustomerList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
            meta: { title: '客户档案', icon: 'user', permission: ['01-04'] }
          },
          {
            path: 'CustomerAdd',
            name: 'CustomerAdd',
            component: () => import(/* webpackChunkName: "fail" */'@/views/basicArchives/ProductAdd.vue'),
            meta: { title: '客户新增' },
            hidden: true
          },
          {
            path: 'WarehouseList',
            name: 'WarehouseList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
            meta: { title: '仓库档案', icon: 'user', permission: ['01-05'] }
          },
          {
            path: 'WarehouseAdd',
            name: 'WarehouseAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductAdd.vue'),
            meta: { title: '仓库档案新增', permission: ['dashboard'] },
            hidden: true
          }, {
            path: 'CargoSpace',
            name: 'CargoSpace',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/CargoSpace.vue'),
            meta: { title: '货位档案', icon: 'user', permission: ['01-07'] }
          }, {
            path: 'BusinessCategory',
            name: 'BusinessCategory',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/BusinessCategory.vue'),
            meta: { title: '业务类别档案', icon: 'user', permission: ['01-08'] }
          },
        ]
      },
      {
        path: '/StorageManagement',
        name: 'StorageManagement',
        component: RouteView,
        redirect: '/StorageManagementAdd',
        meta: { title: '入库管理', icon: 'user', permission: ['02'] },
        children: [
          {
            path: 'StorageManagementAdd',
            name: 'StorageManagementAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/StorageManagementAdd.vue'),
            meta: { title: '入库新增' },
            hidden: true
          },
          {
            path: 'StorageManagementList',
            name: 'StorageManagementList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/StorageManagementList.vue'),
            meta: { title: '入库产品清单', icon: 'user', permission: ['02-01'] }
          },
          {
            path: 'ReceiptNoticeList',
            name: 'ReceiptNoticeList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReceiptNoticeList.vue'),
            meta: { title: '收货通知', icon: 'user', permission: ['02-02'] }
          },
          {
            path: 'ReceiptNoticeAdd',
            name: 'ReceiptNoticeAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReceiptNoticeAdd.vue'),
            meta: { title: '收货通知新增' },
            hidden: true
          },
          {
            path: 'ReturnNoticeClientList',
            name: 'ReturnNoticeClientList',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeClientList.vue'),
            meta: { title: '客户退货通知', icon: 'user', permission: ['02-03'] }
          },
          {
            path: 'ReturnNoticeClientAdd',
            name: 'ReturnNoticeClientAdd',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeClientAdd.vue'),
            meta: { title: '客户退货通知新增' },
            hidden: true
          },
          {
            path: 'WorkTimeReportApplicationList',
            name: 'WorkTimeReportApplicationList',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/WorkTimeReportApplicationList.vue'),
            meta: { title: '完工报告', icon: 'user', permission: ['02-04'] }
          },
          {
            path: 'WorkTimeReportApplicationAdd',
            name: 'WorkTimeReportApplicationAdd',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/WorkTimeReportApplicationAdd.vue'),
            meta: { title: '完工报告新增' },
            hidden: true
          }
        ]
      },
      {
        path: '/OutManagement',
        name: 'OutManagement',
        component: RouteView,
        redirect: '/OutManagementAdd',
        meta: { title: '出库管理', icon: 'user', permission: ['03'] },
        children: [
          {
            path: 'OutManagementAdd',
            name: 'OutManagementAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OutManagementAdd.vue'),
            meta: { title: '出库新增' },
            hidden: true
          },
          {
            path: 'OutManagementList',
            name: 'OutManagementList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OutManagementList.vue'),
            meta: { title: '出库产品清单', icon: 'user', permission: ['03-01'] }
          },
          {
            path: 'ShippingNoticeList',
            name: 'ShippingNoticeList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ShippingNoticeList.vue'),
            meta: { title: '发货通知', icon: 'user', permission: ['03-02'] }
          },
          {
            path: 'ShippingNoticeAdd',
            name: 'ShippingNoticeAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ShippingNoticeAdd.vue'),
            meta: { title: '发货通知新增' },
            hidden: true
          },

          {
            path: 'ReturnNoticeSupplierList',
            name: 'ReturnNoticeSupplierList',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeSupplierList.vue'),
            meta: { title: '供应商退货通知', icon: 'user', permission: ['03-03'] }
          },
          {
            path: 'ReturnNoticeSupplierAdd',
            name: 'ReturnNoticeSupplierAdd',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeSupplierAdd.vue'),
            meta: { title: '供应商退货通知新增' },
            hidden: true
          },

          {
            path: 'PickingApplicationList',
            name: 'PickingApplicationList',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PickingApplicationList.vue'),
            meta: { title: '领料申请', icon: 'user', permission: ['03-04'] }
          },
          {
            path: 'PickingApplicationAdd',
            name: 'PickingApplicationAdd',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PickingApplicationAdd.vue'),
            meta: { title: '领料申请新增' },
            hidden: true
          }
        ]
      },
      {
        path: '/operation',
        name: 'operation',
        component: RouteView,
        meta: { title: '库内管理', icon: 'user', permission: ['04'] },
        children: [
          {
            path: 'TransferList',
            name: 'TransferList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/TransferList.vue'),
            meta: { title: '调拨', icon: 'user', permission: ['04-01'] }
          },
          {
            path: 'TransferAdd',
            name: 'TransferAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/TransferAdd.vue'),
            meta: { title: '调拨新增' },
            hidden: true
          },
          {
            path: 'InventoryList',
            name: 'InventoryList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/InventoryList.vue'),
            meta: { title: '盘点', icon: 'user', permission: ['04-02'] }
          },
          {
            path: 'InventoryAdd',
            name: 'InventoryAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/InventoryAdd.vue'),
            meta: { title: '盘点新增' },
            hidden: true
          },
          {
            path: 'BaleList',
            name: 'BaleList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/BaleList.vue'),
            meta: { title: '包装', icon: 'user', permission: ['04-03'] }
          },
          {
            path: 'BaleAdd',
            name: 'BaleAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/BaleAdd.vue'),
            meta: { title: '包装新增' },
            hidden: true
          }
        ]
      },
      {
        path: '/management',
        name: 'management',
        component: RouteView,
        meta: { title: '管理中心', icon: 'user', permission: ['05'] },
        children: [
          {
            path: 'EnterpriseInformation',
            name: 'enterprise-information',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/account/center/CorporationInfo'),
            meta: { title: '企业信息', icon: 'user', permission: ['05-01'] }
          }, {
            path: '/account/center/PersonalInformation',
            name: 'center',
            hidden: true,
            component: () => import('@/views/account/center/page/PersonalInformation'),
            meta: { title: '个人中心', keepAlive: true }
          },
          {
            path: 'RoleSetting',
            name: 'role-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/RoleSetting.vue'),
            meta: { title: '角色设置', icon: 'user', permission: ['05-02'] }
          },
          {
            path: 'FormSetting',
            name: 'form-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/FormSetting.vue'),
            meta: { title: '表单设置', icon: 'user', permission: ['05-03'] }
          },
          {
            path: 'CodeSetting',
            name: 'code-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/CodeSetting.vue'),
            meta: { title: '编号设置', icon: 'user', permission: ['05-04'] }
          },
          {
            path: 'approval-settin',
            name: 'ApprovalSettin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/ApprovalSettin.vue'),
            meta: { title: '审批设置', icon: 'user', permission: ['05-05'] }
          },
          {
            path: 'MessageSettin',
            name: 'message_settin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/MessageSetting.vue'),
            meta: { title: '消息设置', icon: 'user', permission: ['05-06'] }
          }, {
            path: 'AdminFormsetting',
            name: 'AdminFormsetting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/AdminFormsetting.vue'),
            meta: { title: '管理员表单设置', icon: 'user', permission: ['05-01'] }
          }
        ]
      },
      {
        path: '/ReportCenter',
        name: 'reportCenter',
        component: RouteView,
        meta: { title: '报表中心', icon: 'user', permission: ['06'] },
        children: [
          {
            path: 'ExistingStock',
            name: 'enterprise-ExistingStock',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/ExistingStock.vue'),
            meta: { title: '现存量报表', icon: 'user', permission: ['06-01'] }
          },
          {
            path: 'FlowAccount',
            name: 'FlowAccount',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/FlowAccount.vue'),
            meta: { title: '库存台账', icon: 'user', permission: ['06-02'] }
          },
          {
            path: 'InventoryLedger',
            name: 'InventoryLedger',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/InventoryLedger.vue'),
            meta: { title: '出入库流水帐', icon: 'user', permission: ['06-03'] }
          },
          {
            path: 'WarehouseAge',
            name: 'WarehouseAge',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/WarehouseAge.vue'),
            meta: { title: '库龄分析', icon: 'user', permission: ['06-04'] }
          },
          {
            path: 'WorkEfficiency',
            name: 'WorkEfficiency',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/WorkEfficiency.vue'),
            meta: { title: '作业效率报表', icon: 'user', permission: ['06-05'] }
          },
          {
            path: 'StockOutlook',
            name: 'StockOutlook',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/StockOutlook.vue'),
            meta: { title: '库存展望报表', icon: 'user', permission: ['06-06'] }
          },
          {
            path: 'SendingReceivingSummaryTable',
            name: 'SendingReceivingSummaryTable',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/SendingReceivingSummaryTable.vue'),
            meta: { title: '收发存汇总表', icon: 'user', permission: ['06-07'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: '/Recover',
        name: 'Recover',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Recover')
      }
    ]
  },

  {
    path: '/Newbusiness',
    component: UserLayout,
    children: [
      {
        path: '/Newbusiness',
        name: 'Newbusiness',
        hidden: true,
        component: () => import('@/views/account/center/Newbusiness'),
        meta: { title: '', permission: ['dashboard'] }
      },
    ]
  },

  {
    path: '/changeCorporation',
    component: UserLayout,
    children: [
      {
        path: '/changeCorporation',
        name: 'changeCorporation',
        hidden: true,
        component: () => import('@/views/account/center/changeCorporation'),
        meta: { title: '', permission: ['dashboard'] }
      },
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
