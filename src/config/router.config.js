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
        path: 'basic_archives',
        name: 'BasicArchives',
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
                path: 'add',
                name: 'Add',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/Add.vue'),
                meta: { title: '新增', permission: ['dashboard'] }
              },
              {
                path: 'product-list',
                name: 'ProductList',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ProductList.vue'),
                meta: { title: '产品清单', permission: ['dashboard'] }
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
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/SupplierFile.vue'),
            meta: { title: '供应商档案', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'customer_file',
            name: 'CustomerFile',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/CustomerFile.vue'),
            meta: { title: '客户档案', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'contact_file',
            name: 'ContactFile',

            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ContactFile.vue'),
            meta: { title: '联系人档案', icon: 'user', permission: ['dashboard'] }
          }
        ]
      },
      {
        path: 'StorageManagement',
        name: 'StorageManagement',
        meta: { title: '入库管理', icon: 'user', permission: ['dashboard'] },
        component: () => import(/* webpackChunkName: "fail" */ '@/views/StorageManagement.vue')

      }, {
        path: 'OutManagement',
        name: 'OutManagement',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/OutManagement.vue'),
        meta: { title: '出库管理', icon: 'user', permission: ['dashboard'] },
      },

      /////////////////////////////////////
      {
        path: 'yyzx',
        name: 'yyzx',
        component: RouteView,
        meta: { title: '运营中心', icon: 'user', permission: ['dashboard'] },
        children: [
          {
            path: 'Transfer',
            name: 'Transfer',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/Transfer.vue'),
            meta: { title: '调拨', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'Inventory',
            name: 'Inventory',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/Inventory.vue'),
            meta: { title: '盘点', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'PositionAdjustment',
            name: 'PositionAdjustment',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PositionAdjustment.vue'),
            meta: { title: '货位调整', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'ShippingNotice',
            name: 'ShippingNotice',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ShippingNotice.vue'),
            meta: { title: '发货通知（客户）', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'ReceiptNotice',
            name: 'ReceiptNotice',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReceiptNotice.vue'),
            meta: { title: '收货通知（供应商）', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'ReturnNoticeClient',
            name: 'ReturnNoticeClient',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeClient.vue'),
            meta: { title: '退货通知（客户）', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'ReturnNoticeSupplier',
            name: 'ReturnNoticeSupplier',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/ReturnNoticeSupplier.vue'),
            meta: { title: '退货通知（供应商）', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'Bale',
            name: 'Bale',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/Bale.vue'),
            meta: { title: '打包', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'WorkTimeReportApplication',
            name: 'WorkTimeReportApplication',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/WorkTimeReportApplication.vue'),
            meta: { title: '报工申请', icon: 'user', permission: ['dashboard'] }
          },
          {
            path: 'PickingApplication',
            name: 'PickingApplication',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/OperationsCenter/PickingApplication.vue'),
            meta: { title: '领料申请', icon: 'user', permission: ['dashboard'] }
          },
        ]
      },
      //////////////////////////////////

      {
        path: 'management',
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
            redirect: '/management/warehouse/add',
            meta: { title: '仓库档案', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'add',
                name: 'WarehouseAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/management/warehouse/Add.vue'),
                meta: { title: '新增', permission: ['dashboard'] }
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
            redirect: '/management/inventory/add',
            meta: { title: '期初库存', icon: 'user', permission: ['dashboard'] },
            children: [
              {
                path: 'add',
                name: 'InventoryAdd',
                component: () => import(/* webpackChunkName: "fail" */ '@/views/management/Inventory.vue'),
                meta: { title: '新增', permission: ['dashboard'] }
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
        path: 'ReportCenter',
        name: 'ReportCenter',
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
        path: 'ybp',
        name: 'ybp',
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
        path: 'xxzx',
        name: 'xxzx',
        component: RouteView,
        meta: { title: '消息中心', icon: 'user', permission: ['dashboard'] },
        component: () => import(/* webpackChunkName: "fail" */ '@/views/MessageCenter.vue'),
      
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
