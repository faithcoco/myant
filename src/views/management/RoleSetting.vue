<template>
  <a-card :bordered="false" :style="{ height: '100%' }">
    <a-row :gutter="24">
      <a-col :md="4">
        <div class="demo-infinite-container">
          <a-list itemLayout="vertical" :dataSource="roles">
            <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
              <a-list-item-meta :style="{ marginBottom: '0' }">
                <span slot="description" style="text-align: center; display: block">{{ item.describe }}</span>
                <a slot="title" style="text-align: center; display: block" @click="edit(item)">{{ item.name }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
      <a-col :md="20">
        <a-card>
          <div style="max-width: 1000px">
            <div v-if="mdl.id">
              <h3>角色：{{ mdl.name }}</h3>
            </div>
            <a-form :form="form">
              <a-form-item label="角色名称">
                <a-input
                  @change="onChange"
                  v-decorator="['name', { rules: [{ required: true, message: 'Please input role name!' }] }]"
                  placeholder="请填写角色名称"
                />
              </a-form-item>
              <a-form-item label="人员">
                <a-button block style="text-align: left" @click="personnelClick">{{ personlist }}</a-button>
              </a-form-item>

              <a-form-item label="状态">
                <a-select v-decorator="['status', { rules: [] }]" @change="handleChange">
                  <a-select-option :value="1">正常</a-select-option>
                  <a-select-option :value="2">禁用</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item label="拥有权限">
                <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                  <a-col :xl="3" :lg="24"> {{ permission.name }}： </a-col>
                  <a-col :xl="21" :lg="24">
                    <a-checkbox
                      v-if="permission.actionsOptions.length > 0"
                      :indeterminate="permission.indeterminate"
                      :checked="permission.checkedAll"
                      @change="onChangeCheckAll($event, permission)"
                    >
                      全选
                    </a-checkbox>
                    <a-checkbox-group
                      :options="permission.actionsOptions"
                      v-model="permission.selected"
                      @change="onChangeCheck(permission)"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
            </a-form>
          </div>
          <a-row>
            <a-col :span="1" :offset="7">
              <a-button type="primary" @click="onSubmit">保存</a-button>
            </a-col>
            <a-col :span="1" :offset="1">
              <a-button type="danger" @click="onDelete">删除</a-button>
            </a-col>
            <a-col :span="1" :offset="1">
              <a-button type @click="onBack">返回</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-modal title="选择" :visible="visible" @ok="handleOk" @cancel="handleCancel" width="1300px">
      <select-modal
        :name="name"
        :defaultSelect="selectedRowKeys"
        :visible="visible"
        @onSelect="getSelect"
      ></select-modal>
    </a-modal>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { getRoleList, getPermissions, insertRole, updateRole, deleteRole } from '@/api/manage'
import { actionToObject } from '@/utils/permissions'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
import SelectModal from '../other/SelectModal'
import Approval from '../Approval'

export default {
  name: 'RoleList',
  components: {
    SelectModal,
    Approval,
  },

  data() {
    return {
      form: this.$form.createForm(this),
      mdl: {},
      state: 1, //0：add1：change2delete
      roles: [],
      permissions: [],
      idParapms: {},
      visible: false,
      name: 'PersonnelSetting',
      product: {},
      selectList: [],
      personlist: '',
      updateList: [],
      selectedRowKeys: [],
      selectName: [],
      selectList: [],
    }
  },
  created() {
    this.idParapms.id = Vue.ls.get(logininfo).basepersonPO.personid
    this.setRole()
    this.loadPermissions()
  },
  methods: {
    handleOk(e) {
      var list = []

      console.log('this list-->', JSON.stringify(this.selectList.length))
      for (const key in this.selectList) {
        list.push(this.selectList[key].personname)

        this.updateList.push({ personid: this.selectList[key].personid, personname: this.selectList[key].personname })
      }
      this.personlist = list.join()

      this.visible = false
    },
    getSelect(selectlist) {
      this.selectList = selectlist
    },
    handleCancel(e) {
      this.visible = false
    },
    change(visible) {
      this.approval_visible = visible
    },

    personnelClick() {
      this.visible = true
      this.name = 'PersonnelSetting'

      console.log('prop--->', this.selectedRowKeys)
    },
    setRole() {
      getRoleList(this.idParapms).then((res) => {
        console.log('role list-->', JSON.stringify(res))
        this.roles = res.result.data

        this.roles.push({
          personid: [],
          enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid,
          name: '新增角色',
          describe: '新增角色',
          status: 1,
          permissions: [
            {
              permissionId: '01',
              actionEntitySet: [],
            },
          ],
        })
        this.mdl = this.roles[0]
        this.setData()
      })
    },
    onChange(e) {
      this.mdl.name = e.target.value
    },
    onDescribeChange(e) {
      this.mdl.describe = e.target.value
    },
    handleChange(value) {
      this.mdl.status = value
    },
    onSubmit() {
      console.log('list-->', JSON.stringify(this.updateList))
      this.mdl.permissions = []
      this.mdl.describe = ''
      for (const key in this.permissions) {
        this.mdl.permissions.push({ permissionId: this.permissions[key].action, actionEntitySet: [] })

        for (const i in this.permissions[key].selected) {
          if (this.permissions[key].selected.length != 0) {
            this.mdl.permissions[key].actionEntitySet.push({ action: this.permissions[key].selected[i] })
          }
        }
      }

      console.log('submit--->', JSON.stringify(this.mdl))
      console.log('state-->', this.state)
      this.mdl.personList = this.updateList
      if (this.state == 0) {
        console.log('add role params-->', JSON.stringify(this.mdl))
        insertRole(this.mdl).then((res) => {
          if (res.status != 'SUCCESS') {
            this.$message.error(res.errorMsg)
          } else {
            this.setRole()
          }
        })
      } else {
        console.log('update role params-->', JSON.stringify(this.mdl))
        updateRole(this.mdl).then((res) => {
          console.log('role set--->', JSON.stringify(res))
          if (res.status != 'SUCCESS') {
            this.$message.error(res.errorMsg)
          } else {
            this.$message.info('保存成功')
            this.setRole()
          }
        })
      }
    },
    onBack() {
      // 路由跳转
    },

    onDelete() {
      if (this.mdl.admin) {
        this.$message.info('管理员不能删除')
        return
      }
      const params = {}
      params.id = this.mdl.id
      console.log('delete--->', params)
      deleteRole(params).then((res) => {
        console.log('  updateRole---------->', JSON.stringify(res))
        if (res.status != 'SUCCESS') {
          this.$message.error(res.errorMsg)
        } else {
          this.setRole()
        }
      })
    },

    callback(val) {
      console.log(val)
    },

    add() {
      this.edit({ id: 0 })
    },
    setData() {
      if (this.mdl.describe == '新增角色') {
        this.state = 0
        this.mdl.name = ''
      }

      // 有权限表，处理勾选
      if (this.mdl.permissions && this.permissions) {
        // 先处理要勾选的权限结构
        const permissionsAction = {}
        this.mdl.permissions.forEach((permission) => {
          if (permission.actionEntitySet != null) {
            permissionsAction[permission.permissionId] = permission.actionEntitySet.map((entity) => entity.action)
          }
        })

        console.log('permissionsAction', permissionsAction)
        // 把权限表遍历一遍，设定要勾选的权限 action
        this.permissions.forEach((permission) => {
          const selected = permissionsAction[permission.id]
          permission.selected = selected || []
          this.onChangeCheck(permission)
        })
      }
      var userlist = []

      for (const key in this.mdl.personList) {
        userlist.push(this.mdl.personList[key].personname)
        this.selectedRowKeys.push(this.mdl.personList[key].personid)
      }
      this.personlist = userlist.join()
      this.selectName = userlist

      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'status', 'describe'))
      })
    },

    edit(record) {
      this.mdl = Object.assign({}, record)
      console.log('mdl-->', JSON.stringify(this.mdl))

      this.setData()
    },

    onChangeCheck(permission) {
      console.log('permission:', permission.action + JSON.stringify(permission.selected))
      permission.indeterminate =
        !!permission.selected.length && permission.selected.length < permission.actionsOptions.length
      permission.checkedAll = permission.selected.length === permission.actionsOptions.length
    },
    onChangeCheckAll(e, permission) {
      console.log('permission all:', permission.action + JSON.stringify(permission.selected))

      Object.assign(permission, {
        selected: e.target.checked ? permission.actionsOptions.map((obj) => obj.value) : [],
        indeterminate: false,
        checkedAll: e.target.checked,
      })
    },
    loadPermissions() {
      getPermissions().then((res) => {
        const result = res.result
        this.permissions = result.map((permission) => {
          const options = actionToObject(permission.actionData)
          permission.checkedAll = false
          permission.selected = []
          permission.indeterminate = false
          permission.actionsOptions = options.map((option) => {
            return {
              label: option.describe,
              value: option.action,
            }
          })
          return permission
        })
      })
    },
  },
}
</script>

<style scoped>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 2px;
  height: 750px;
}
</style>
