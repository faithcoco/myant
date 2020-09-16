import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    basepersonPO:[],
    baseenterprisePO:[],
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_BASEPERSONPO: (state, basepersonPO) => {
        state.basepersonPO = basepersonPO
    },
    SET_BASEENTERPRISEPO: (state, baseenterprisePO) => {
        state.baseenterprisePO = baseenterprisePO
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log('/auth/login', userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {

          if (response.status == "SUCCESS") {
            console.log('成功返回值--------》',response);
            // response = { "result": { "id": "8edCeDD4-CfBd-32fd-E3E4-C7a4F5207C0f", "name": "Daniel Hernandez", "username": "admin", "password": "", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png", "status": 1, "telephone": "", "lastLoginIp": "27.154.74.117", "lastLoginTime": 1534837621348, "creatorId": "admin", "createTime": 1497160610259, "deleted": 0, "roleId": "admin", "lang": "zh-CN", "token": "4291d7da9005377ec9aec4a71ea837f", "EnterprisePhone": 13333333333 }, "message": "", "timestamp": 1592791121590, "code": 200, "_headers": { "Custom-Header": "bf99C3E5-eeCF-B749-0B3c-9cB9a9b1F05f" } }
          }
          const result = response.result

          Vue.ls.set(ACCESS_TOKEN, "result.baseenterprisePO.userToken", 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', "result.baseenterprisePO.userToken")
          commit('SET_BASEPERSONPO', result.basepersonPO)
          commit('SET_BASEENTERPRISEPO', result.baseenterprisePO)          
          commit('SET_NAME', { name: result.basepersonPO.personname, welcome: welcome() })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          response = { "message": "", "timestamp": 1589704835938, "result": { "id": "4291d7da9005377ec9aec4a71ea837f", "name": "curry", "username": "admin", "password": "", "avatar": "/avatar2.jpg", "status": 1, "telephone": "", "lastLoginIp": "27.154.74.117", "lastLoginTime": 1534837621348, "creatorId": "admin", "createTime": 1497160610259, "merchantCode": "TLif2btpzg079h15bk", "deleted": 0, "roleId": "admin", "role": { "id": "admin", "name": "管理员", "describe": "拥有所有权限", "status": 1, "creatorId": "system", "createTime": 1497160610259, "deleted": 0, "permissions": [{ "roleId": "admin", "permissionId": "dashboard", "permissionName": "仪表盘", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "exception", "permissionName": "异常页面权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "profile", "permissionName": "详细页权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "table", "permissionName": "表格权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "form", "permissionName": "表单权限", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "order", "permissionName": "订单管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "permission", "permissionName": "权限管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "role", "permissionName": "角色管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "table", "permissionName": "桌子管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"query\",\"defaultCheck\":false,\"describe\":\"查询\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "user", "permissionName": "用户管理", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"},{\"action\":\"export\",\"defaultCheck\":false,\"describe\":\"导出\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }, { "roleId": "admin", "permissionId": "support", "permissionName": "超级模块", "actions": "[{\"action\":\"add\",\"defaultCheck\":false,\"describe\":\"新增\"},{\"action\":\"import\",\"defaultCheck\":false,\"describe\":\"导入\"},{\"action\":\"get\",\"defaultCheck\":false,\"describe\":\"详情\"},{\"action\":\"update\",\"defaultCheck\":false,\"describe\":\"修改\"},{\"action\":\"delete\",\"defaultCheck\":false,\"describe\":\"删除\"},{\"action\":\"export\",\"defaultCheck\":false,\"describe\":\"导出\"}]", "actionEntitySet": [{ "action": "add", "describe": "新增", "defaultCheck": false }, { "action": "query", "describe": "查询", "defaultCheck": false }, { "action": "get", "describe": "详情", "defaultCheck": false }, { "action": "update", "describe": "修改", "defaultCheck": false }, { "action": "delete", "describe": "删除", "defaultCheck": false }], "actionList": null, "dataAccess": null }] } }, "code": 200, "_headers": { "Custom-Header": "4FEDD6bD-bB39-34AE-6b2C-c2AAbCbf55c9" } }
          const result = response.result
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
