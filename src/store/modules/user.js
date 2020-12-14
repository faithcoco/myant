import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, logininfo } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    selectkey: 'c6d0f290-b045-4851-bcb8-d00b60081d22'
  },

  mutations: {
    SET_SELECTKEY: (state, selectkey) => {
      state.selectkey = selectkey
    },
    SET_TOKEN: (state, token) => {
      state.token = token
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
      console.log('login--->', userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          console.log('login res-->', JSON.stringify(response))
          Vue.ls.set(ACCESS_TOKEN, result.userToken, 7 * 24 * 60 * 60 * 1000)

          Vue.ls.set(logininfo, result)
          commit('SET_TOKEN', result.userToken)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const params = {}
        params.id = Vue.ls.get(logininfo).basepersonPO.personid
        getInfo(params).then(response => {

          const result = response.result
          if (result.name == '管理员') {
            result.role.permissions.push({ "permissionId": "admin" })
          }

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
          console.log("getinfo--->", JSON.stringify(result))

          commit('SET_AVATAR', result.avatar)
          commit('SET_NAME', { name: result.enterprisename, welcome: welcome() })

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
