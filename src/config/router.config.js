// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/basic_archives/goods_file/product-list',
    children: [
      {
        path: '/basic_archives',
        name: 'basic_archives',
        component: RouteView,
        redirect: '/basic_archives/goods_file/product-list',
        meta: { title: '基础档案', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'goods_file',
            name: 'GoodsFile',
            component: RouteView,
            redirect: '/basic_archives/product-list',
            meta: { title: '商品档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ProductAdd',
                name: 'ProductAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductAdd.vue'),
                meta: { title: '商品档案新增', permission: ['dashboard'] }
              },
              {
                path: 'product-list',
                name: 'ProductList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
                meta: { title: '商品档案清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'classification_goods',
            name: 'ClassificationGoods',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ClassificationGoods.vue'),
            meta: { title: '货品分类', icon: 'user', permission: ['dashboard'] }
          },

          {
            path: 'supplier_file',
            name: 'SupplierFile',
            component: RouteView,
            redirect: '/basic_archives/SupplierAdd',
            meta: { title: '供应商档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'SupplierAdd',
                name: 'SupplierAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/SupplierAdd.vue'),
                meta: { title: '供应商新增', permission: ['dashboard'] }
              },
              {
                path: 'SupplierList',
                name: 'SupplierList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/SupplierList.vue'),
                meta: { title: '供应商产品清单', permission: ['dashboard'] }
              }
            ]
          },

          {
            path: 'customer_file',
            name: 'CustomerFile',
            component: RouteView,
            redirect: '/basic_archives/CustomerAdd',
            meta: { title: '客户档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'CustomerAdd',
                name: 'CustomerAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/CustomerAdd.vue'),
                meta: { title: '客户新增', permission: ['dashboard'] }
              },
              {
                path: 'CustomerList',
                name: 'CustomerList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/CustomerList.vue'),
                meta: { title: '客户产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'contact_file',
            name: 'ContactFile',
            component: RouteView,
            redirect: '/basic_archives/ContactAdd',
            meta: { title: '联系人档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ContactAdd',
                name: 'ContactAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ContactAdd.vue'),
                meta: { title: '联系人新增', permission: ['dashboard'] }
              },
              {
                path: 'ContactList',
                name: 'ContactList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ContactList.vue'),
                meta: { title: '联系人清单', permission: ['dashboard'] }
              }
            ]
          }
        ]
      },
      {
        path: '/StorageManagement',
        name: 'StorageManagement',
        component: RouteView,
        redirect: '/StorageManagementAdd',
        meta: { title: '入库管理', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'StorageManagementAdd',
            name: 'StorageManagementAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/StorageManagementAdd.vue'),
            meta: { title: '入库新增', permission: ['dashboard'] }
          },
          {
            path: 'StorageManagementList',
            name: 'StorageManagementList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/StorageManagementList.vue'),
            meta: { title: '入库产品清单', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/OutManagement',
        name: 'OutManagement',
        component: RouteView,
        redirect: '/OutManagementAdd',
        meta: { title: '出库管理', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'OutManagementAdd',
            name: 'OutManagementAdd',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OutManagementAdd.vue'),
            meta: { title: '出库新增', permission: ['dashboard'] }
          },
          {
            path: 'OutManagementList',
            name: 'OutManagementList',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OutManagementList.vue'),
            meta: { title: '出库产品清单', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/operation',
        name: 'operation',
        component: RouteView,
        meta: { title: '运营中心', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'Transfer',
            name: 'Transfer',
            component: RouteView,
            redirect: '/OperationsCenter/TransferAdd',
            meta: { title: '调拨', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'TransferAdd',
                name: 'TransferAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/TransferAdd.vue'),
                meta: { title: '调拨新增', permission: ['dashboard'] }
              },
              {
                path: 'TransferList',
                name: 'TransferList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/TransferList.vue'),
                meta: { title: '调拨产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'Inventory',
            name: 'Inventory',
            component: RouteView,
            redirect: '/OperationsCenter/InventoryAdd',
            meta: { title: '盘点', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'InventoryAdd',
                name: 'InventoryAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/InventoryAdd.vue'),
                meta: { title: '盘点新增', permission: ['dashboard'] }
              },
              {
                path: 'InventoryList',
                name: 'InventoryList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/InventoryList.vue'),
                meta: { title: '盘点产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'PositionAdjustment',
            name: 'PositionAdjustment',
            component: RouteView,
            redirect: '/OperationsCenter/PositionAdjustmentAdd',
            meta: { title: '货位调整', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'PositionAdjustmentAdd',
                name: 'PositionAdjustmentAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PositionAdjustmentAdd.vue'),
                meta: { title: '货位调整新增', permission: ['dashboard'] }
              },
              {
                path: 'PositionAdjustmentList',
                name: 'PositionAdjustmentList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PositionAdjustmentList.vue'),
                meta: { title: '货位调整产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'ShippingNotice',
            name: 'ShippingNotice',
            component: RouteView,
            redirect: '/OperationsCenter/ShippingNoticeAdd',
            meta: { title: '发货通知（客户）', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ShippingNoticeAdd',
                name: 'ShippingNoticeAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ShippingNoticeAdd.vue'),
                meta: { title: '发货通知新增', permission: ['dashboard'] }
              },
              {
                path: 'ShippingNoticeList',
                name: 'ShippingNoticeList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ShippingNoticeList.vue'),
                meta: { title: '发货通知产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'ReceiptNotice',
            name: 'ReceiptNotice',
            component: RouteView,
            redirect: '/OperationsCenter/ReceiptNoticeAdd',
            meta: { title: '收货通知（供应商）', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ReceiptNoticeAdd',
                name: 'ReceiptNoticeAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReceiptNoticeAdd.vue'),
                meta: { title: '收货通知新增', permission: ['dashboard'] }
              },
              {
                path: 'ReceiptNoticeList',
                name: 'ReceiptNoticeList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReceiptNoticeList.vue'),
                meta: { title: '收货通知产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'ReturnNoticeClient',
            name: 'ReturnNoticeClient',
            component: RouteView,
            redirect: '/OperationsCenter/ReturnNoticeClientAdd',
            meta: { title: '退货通知（客户）', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ReturnNoticeClientAdd',
                name: 'ReturnNoticeClientAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeClientAdd.vue'),
                meta: { title: '退货通知新增', permission: ['dashboard'] }
              },
              {
                path: 'ReturnNoticeClientList',
                name: 'ReturnNoticeClientList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeClientList.vue'),
                meta: { title: '退货通知产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'ReturnNoticeSupplier',
            name: 'ReturnNoticeSupplier',
            component: RouteView,
            redirect: '/OperationsCenter/ReturnNoticeSupplierAdd',
            meta: { title: '退货通知（供应商）', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'ReturnNoticeSupplierAdd',
                name: 'ReturnNoticeSupplierAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeSupplierAdd.vue'),
                meta: { title: '退货通知新增', permission: ['dashboard'] }
              },
              {
                path: 'ReturnNoticeSupplierList',
                name: 'ReturnNoticeSupplierList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeSupplierList.vue'),
                meta: { title: '退货通知产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'Bale',
            name: 'Bale',
            component: RouteView,
            redirect: '/OperationsCenter/BaleAdd',
            meta: { title: '打包', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'BaleAdd',
                name: 'BaleAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/BaleAdd.vue'),
                meta: { title: '打包新增', permission: ['dashboard'] }
              },
              {
                path: 'BaleList',
                name: 'BaleList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/BaleList.vue'),
                meta: { title: '打包产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'WorkTimeReportApplication',
            name: 'WorkTimeReportApplication',
            component: RouteView,
            redirect: '/OperationsCenter/WorkTimeReportApplicationAdd',
            meta: { title: '报工申请', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'WorkTimeReportApplicationAdd',
                name: 'WorkTimeReportApplicationAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/WorkTimeReportApplicationAdd.vue'),
                meta: { title: '报工申请新增', permission: ['dashboard'] }
              },
              {
                path: 'WorkTimeReportApplicationList',
                name: 'WorkTimeReportApplicationList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/WorkTimeReportApplicationList.vue'),
                meta: { title: '报工申请产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'PickingApplication',
            name: 'PickingApplication',
            component: RouteView,
            redirect: '/OperationsCenter/PickingApplicationAdd',
            meta: { title: '领料申请', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'PickingApplicationAdd',
                name: 'PickingApplicationAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PickingApplicationAdd.vue'),
                meta: { title: '领料申请新增', permission: ['dashboard'] }
              },
              {
                path: 'PickingApplicationList',
                name: 'PickingApplicationList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PickingApplicationList.vue'),
                meta: { title: '领料申请产品清单', permission: ['dashboard'] }
              }
            ]
          }
        ]
      },
      {
        path: '/management',
        name: 'management',
        component: RouteView,
        meta: { title: '管理中心', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'EnterpriseInformation',
            name: 'enterprise-information',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/EnterpriseInformation.vue'),
            meta: { title: '企业信息', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'Sector',
            name: 'sector',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/Sector.vue'),
            meta: { title: '部门设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'PersonnelSetting',
            name: 'personnel-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/PersonnelSetting.vue'),
            meta: { title: '人员设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'RoleSetting',
            name: 'role-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/RoleSetting.vue'),
            meta: { title: '角色设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'FormSetting',
            name: 'form-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/FormSetting.vue'),
            meta: { title: '表单设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'CodeSetting',
            name: 'code-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/CodeSetting.vue'),
            meta: { title: '编号设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'warehouse',
            name: 'Warehouse',
            component: RouteView,
            redirect: '/management/warehouse/WarehouseAdd',
            meta: { title: '仓库档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'WarehouseAdd',
                name: 'WarehouseAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/management/warehouse/WarehouseAdd.vue'),
                meta: { title: '仓库档案新增', permission: ['dashboard'] }
              },
              {
                path: 'WarehouseList',
                name: 'WarehouseList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/management/warehouse/WarehouseList.vue'),
                meta: { title: '仓库档案清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'approval-settin',
            name: 'ApprovalSettin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/ApprovalSettin.vue'),
            meta: { title: '审批设置', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'Inventory',
            name: 'inventory',
            component: RouteView,
            redirect: '/management/inventory/OpeningInventoryAdd',
            meta: { title: '期初库存', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'OpeningInventoryAdd',
                name: 'OpeningInventoryAdd',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/management/Inventory/OpeningInventoryAdd.vue'),
                meta: { title: '期初库存新增', permission: ['dashboard'] }
              },
              {
                path: 'OpeningInventoryList',
                name: 'OpeningInventoryList',
                component: () =>
                  import(/* webpackChunkName: "fail" */ '@/views/management/Inventory/OpeningInventoryList.vue'),
                meta: { title: '期初库存产品清单', permission: ['dashboard'] }
              }
            ]
          },
          {
            path: 'MessageSettin',
            name: 'message_settin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/MessageSettin.vue'),
            meta: { title: '消息设置', icon: 'user', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/ReportCenter',
        name: 'reportCenter',
        component: RouteView,
        meta: { title: '报表中心', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'ExistingStock',
            name: 'enterprise-ExistingStock',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/ExistingStock.vue'),
            meta: { title: '现存量报表', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'FlowAccount',
            name: 'FlowAccount',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/FlowAccount.vue'),
            meta: { title: '库存台账', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'InventoryLedger',
            name: 'InventoryLedger',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/InventoryLedger.vue'),
            meta: { title: '出入库流水帐', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'WarehouseAge',
            name: 'WarehouseAge',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/WarehouseAge.vue'),
            meta: { title: '库龄分析', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'WorkEfficiency',
            name: 'WorkEfficiency',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/WorkEfficiency.vue'),
            meta: { title: '作业效率报表', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'StockOutlook',
            name: 'StockOutlook',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/StockOutlook.vue'),
            meta: { title: '库存展望报表', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'SendingReceivingSummaryTable',
            name: 'SendingReceivingSummaryTable',
            component: () =>
              import(/* webpackChunkName: "fail" */ '@/views/ReportCenter/SendingReceivingSummaryTable.vue'),
            meta: { title: '收发存汇总表', icon: 'user', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/panel',
        name: '/panel',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'ShippingPlan',
            name: 'ShippingPlan',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/dashboard/ShippingPlan.vue'),
            meta: { title: '发货计划', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'ReceiptPlan',
            name: 'ReceiptPlan',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/dashboard/ReceiptPlan.vue'),
            meta: { title: '收货计划', icon: 'user', permission: ['dashboard'] }
          }
        ]
      },

      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/message',
            name: 'message',
            component: RouteView,
            meta: { title: '消息中心', permission: ['dashboard'] },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/MessageCenter.vue'),
          },
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {title: '分析页', permission: ['dashboard']}
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            component: () => import('@/views/dashboard/Monitor'),
            meta: {title: '监控页', permission: ['dashboard']}
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {title: '工作台', permission: ['dashboard']}
          },
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/account',
    component: RouteView,
    redirect: '/account/center',
    name: 'account',
    meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
    children: [
      {
        path: '/account/center',
        name: 'center',
        component: () => import('@/views/account/center/Index'),
        meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
      },
      {
        path: '/account/settings',
        name: 'settings',
        component: () => import('@/views/account/settings/Index'),
        meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
        redirect: '/account/settings/base',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/account/settings/base',
            name: 'BaseSettings',
            component: () => import('@/views/account/settings/BaseSetting'),
            meta: { title: '基本设置', hidden: true, permission: ['user'] }
          },
          {
            path: '/account/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings/custom',
            name: 'CustomSettings',
            component: () => import('@/views/account/settings/Custom'),
            meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings/binding',
            name: 'BindingSettings',
            component: () => import('@/views/account/settings/Binding'),
            meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings/notification',
            name: 'NotificationSettings',
            component: () => import('@/views/account/settings/Notification'),
            meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
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
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]