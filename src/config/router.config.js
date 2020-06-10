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
          }, {
            path: 'classification_goods',
            name: 'ClassificationGoods',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ClassificationGoods.vue'),
            meta: { title: '货品分类', icon: 'user', permission: ['dashboard'] },

          }, {
            path: 'supplier_file',
            name: 'SupplierFile',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/SupplierFile.vue'),
            meta: { title: '供应商档案', icon: 'user', permission: ['dashboard'] },
          }, {
            path: 'customer_file',
            name: 'CustomerFile',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/CustomerFile.vue'),
            meta: { title: '客户档案', icon: 'user', permission: ['dashboard'] },
          }, {
            path: 'contact_file',
            name: 'ContactFile',
        
            component: () => import(/* webpackChunkName: "fail" */ '@/views/basicArchives/ContactFile.vue'),
            meta: { title: '联系人档案', icon: 'user', permission: ['dashboard'] },
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
      }, {
        path: 'yyzx',
        name: 'yyzx',
        component: RouteView,
        meta: { title: '运营中心', icon: 'user', permission: ['dashboard'] },
      }, {
        path: 'management',
        name: 'management',
        component: RouteView,
        meta: { title: '管理中心', icon: 'user', permission: ['dashboard'] },
        children: [
         {
            path: 'EnterpriseInformation',
            name: 'enterprise-information',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/EnterpriseInformation.vue'),
            meta: { title: '企业信息', icon: 'user', permission: ['dashboard'] },
          }, {
            path: 'Sector',
            name: 'sector',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/Sector.vue'),
            meta: { title: '部门设置', icon: 'user', permission: ['dashboard'] },
          },{
            path: 'PersonnelSetting',
            name: 'personnel-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/PersonnelSetting.vue'),
            meta: { title: '人员设置', icon: 'user', permission: ['dashboard'] },
          },{
            path: 'RoleSetting',
            name: 'role-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/RoleSetting.vue'),
            meta: { title: '角色设置', icon: 'user', permission: ['dashboard'] },
          },{
            path: 'FormSetting',
            name: 'form-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/FormSetting.vue'),
            meta: { title: '表单设置', icon: 'user', permission: ['dashboard'] },
          },{
            path: 'CodeSetting',
            name: 'code-setting',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/CodeSetting.vue'),
            meta: { title: '编号设置', icon: 'user', permission: ['dashboard'] },
          }, {
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
          },{
            path: 'approval-settin',
            name: 'ApprovalSettin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/ApprovalSettin.vue'),
            meta: { title: '审批设置', icon: 'user', permission: ['dashboard'] },
          } ,{
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
          },{
            path: 'MessageSettin',
            name: 'message_settin',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/management/MessageSettin.vue'),
            meta: { title: '消息设置', icon: 'user', permission: ['dashboard'] },
          }
        ]
      }, {
        path: 'bbzx',
        name: 'bbzx',
        component: RouteView,
        meta: { title: '报表中心', icon: 'user', permission: ['dashboard'] },
      }, {
        path: 'ybp',
        name: 'ybp',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'user', permission: ['dashboard'] },
      }, {
        path: 'xxzx',
        name: 'xxzx',
        component: RouteView,
        meta: { title: '消息中心', icon: 'user', permission: ['dashboard'] },
      }, {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
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
    path: '*', redirect: '/404', hidden: true
  }
]


export const asyncRouterMap1 = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/basic_archives/goods_file/product-list',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard', 'base'] },
        children: [
          {
            path: 'analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: ['dashboard', 'base'] }
          },
          // 外部链接
          {
            path: 'https://www.baidu.com/',
            name: 'Monitor',
            meta: { title: '监控页（外部）', target: '_blank' }
          },
          {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: 'test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '测试功能', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list/permission-list',
            name: 'PermissionList',
            component: () => import('@/views/other/PermissionList'),
            meta: { title: '权限列表', keepAlive: true }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: PageView,
        meta: { title: '表单页', icon: 'form', permission: ['form'] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: ['form'] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
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

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
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
