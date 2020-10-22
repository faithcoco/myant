<template>
  <a-card :bordered="false">
    <a-row :gutter="10">
      <a-col :span="4">
        <span>部门结构</span>
        <a-button style="margin-left: 40px" type="primary" @click="Classify()">部门设置</a-button>
        <a-divider type="horizontal" />
        <a-tree
          :tree-data="treeData"
          show-icon
          @expand="onExpand"
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          @select="onSelect"
        >
          <a-icon slot="apartment" type="apartment" :style="{ color: '#1890FF' }" />
          <template slot="custom" slot-scope="{ selected }">
            <a-icon :type="selected ? 'frown' : 'frown-o'" />
          </template>
        </a-tree>
      </a-col>

      <a-col :span="20">

        <!--<a-select default-value="全部" style="width: 220px" @change="selectChange(value)">-->
        <!--<a-select-option v-for="SList in selectList" :key="SList.value" :value="SList.value">-->
        <!--{{SList.value }}-->
        <!--</a-select-option>-->
        <!--</a-select>-->

        <a-input-search @search="onSearch" v-model="queryParam.personname" style="width: 220px; margin-left: 20px" placeholder="请输入员工名称" />
        <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
          </span>
        <a-spin :spinning="localLoading">
          <div class="spin-content">
            <s-table
              ref="table"
              size="default"
              :columns="columns"
              :data="loadData"
              :alert="false"
              :scroll="{ x: 1300 }"
              :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            >
            <span slot="action" slot-scope="text, record">
              <template>
                <a v-show="record.personadministrator == 0" @click="handleRole(record)">分配角色</a>
                 <a-divider type="vertical" />
                <a @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
              </template>
              <a-dropdown>
                <a class="ant-dropdown-link">
                  更多<a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="handleInfo(record)">详情</a>
                  </a-menu-item>
                  <a-menu-item v-show="record.personadministrator == 0 && record.enablestatus == 1">
                    <a href="javascript:;" @click="handleEnable(record)" >禁用</a>
                  </a-menu-item>
                  <a-menu-item v-show="record.personadministrator == 0">
                    <a href="javascript:;" @click="handleDelete(record)" >删除</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
            </s-table>
          </div>
        </a-spin>

      </a-col>
    </a-row>
    <!--角色选择弹出框-->
    <a-modal
      title="角色"
      :visible="visibleRole"
      :confirm-loading="changeConfirmLoading"
      @ok="changeHandleOk"
      @cancel="changeHandleCancel"
    >
      <p>请从下面选择一个角色</p>
      <a-radio-group :default-value="1" @change="onChange">
        <a-radio v-for="item in roleData" :key="item.roleid" :style="radioStyle" :value="item.roleid">
          {{item.rolename}}
        </a-radio>
      </a-radio-group>
    </a-modal>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />

  </a-card>
</template>

<script>
  import Vue from 'vue'
  import STree from '@/components/Tree/Tree'
  import { STable } from '@/components'
  import { Tree } from 'ant-design-vue'
  Vue.use(Tree)
  import OrgModal from '../other/modules/OrgModal'
  import { getOrgTree, getServiceList, getPersonnelSettingList, getPersonnelSettingColumns, getRoleData, updatePsndocRole,deletePerson,enablePerson} from '@/api/manage'
  import { getSector } from '@/api/manage'
  import { logininfo } from '@/store/mutation-types'

  const columns = []

  export default {
    name: 'TreeList',
    components: {
      STable,
      STree,
      OrgModal,
    },
    data() {
      return {
        localLoading:false,
        // 角色选择弹出框
        visibleRole:false,
        changeConfirmLoading: false,
        openKeys: ['key-01'],
        treeData: [],
        expandedKeys: [],
        autoExpandParent: true,
        // 查询参数
        queryParam: {
          personname:null
        },
        // 表头
        columns,
        // 加载数据方法 必须为 Promise 对象
        loadData: (parameter) => {
          parameter.menuid='03bf0fb1-e9fb-4014-92e7-7121f4f71005'
          parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          return getPersonnelSettingList(Object.assign(parameter, this.queryParam)).then((res) => {
            console.log("getPersonnelSettingList-->",JSON.stringify(res))
            return res.result
          })
        },
        orgTree: [],
        selectedRowKeys: [],
        selectedRows: [],
        // 选中的树值
        selectedKeys:'',
        // 角色集合
        roleData:[],
        // 角色弹出框样式
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },
        // 选中的角色ID
        roleId:null,
        // 当前行的员工ID
        personid:null,
        // 部门主键
        departmentid:null,
      }
    },
    created() {
      const columnsParams = {}
      columnsParams.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getPersonnelSettingColumns(columnsParams).then((res) => {
        console.log("getPersonnelSettingColumns-->",JSON.stringify(res))
        this.columns = res.result.columns
      })
      const treeParams = {}
      treeParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getSector(treeParams).then((res) => {
        console.log("tree res-->",JSON.stringify(res))
        this.treeData = res.result
        this.expandedKeys = ['0-0-0', '0-0-1']
      })

    },
    methods: {
      /**
       * 树选中事件
       */
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
        this.selectedKeys = selectedKeys;
      },
      onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
      },
      onExpand(expandedKeys) {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      handleClick(e) {
        console.log('handleClick', e)
        this.queryParam = {
          key: e.key,
        }
        this.$refs.table.refresh(true)
      },
      handleAdd(item) {
        console.log('add button, item', item)
        this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
        this.$refs.modal.add(item.key)
      },
      handleTitleClick(item) {
        console.log('handleTitleClick', item)
      },
      titleClick(e) {
        console.log('titleClick', e)
      },
      handleSaveOk() {},
      handleSaveClose() {},
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      /**
       * 编辑事件
       * @param
       * @author YangNick
       * @date 2020年10月15日16:09:27
       */
      handleEdit(row){
        this.$router.push({ name: 'PersonSettingAdd',query:{personid :row.personid,operation:'edit'}})
      },
      /**
       * 详情
       * @param
       * @author YangNick
       * @date 2020年10月15日16:09:27
       */
      handleInfo(row){
        this.$router.push({ name: 'PersonSettingAdd',query:{personid :row.personid,operation:'info'}})
      },
      /**
       * 删除
       */
      handleDelete(row){
        const params={}
        params.personid= row.personid;
        deletePerson(params).then((res) => {
          console.log("deletePerson-->",JSON.stringify(res))
          this.$refs.table.refresh(true) //用refresh方法刷新表格
        }).catch(() => {})
      },
      /**
       * 禁用/启用
       */
      handleEnable(row){
        debugger;
        const params={}
        params.personid= row.personid;
        if (row.enablestatus == 1) {
          params.enablestatus= 2;
        } else {
          params.enablestatus= 1;
        }
        enablePerson(params).then((res) => {
          console.log("enablePerson-->",JSON.stringify(res))
          this.$refs.table.refresh(true) //用refresh方法刷新表格
        }).catch(() => {})
      },
      // 角色分配
      handleRole(row){
        this.personid = row.personid;
        // 弹出角色选择框
        this.visibleRole = true;
        const params={}
        params.enterpriseid= Vue.ls.get(logininfo).basepersonPO.enterpriseid,
          getRoleData(params).then((res) => {
            console.log("getRoleList-->",JSON.stringify(res))
            this.roleData=res.result
          }).catch(() => {})
      },
      /**
       * 跳转编辑页面
       */
      add(){
        this.$router.push({ name: 'PersonSettingAdd',query:{departmentid:this.departmentid,operation:'add'}})
      },

      /**
       * 部门设置
       * @constructor
       */
      Classify() {
        this.$router.push({ name: 'ClassificationGoods' }) //编程式导航  修改 url，完成跳转
      },
      // 角色选择赋值
      onChange(e) {
        this.roleId = e.target.value
      },
      /**
       * 选择角色确定
       * @param e
       */
      changeHandleOk(e) {
        this.changeConfirmLoading = true;
        // 更新人员角色
        const params={}
        params.personid= this.personid,
          params.roleid= this.roleId,
          updatePsndocRole(params).then((res) => {
            if (res.status == 'FAILED') {
              this.changeConfirmLoading = false;
              this.$message.error(res.errorMsg);
            } else {
              this.visibleRole = false;
              this.changeConfirmLoading = false;
              this.$message.success("分配角色成功");
              this.$refs.table.refresh(true) //用refresh方法刷新表格
            }
          }).catch(() => {})
      },
      /**
       * 角色取消
       * @param e
       */
      changeHandleCancel(e) {
        this.visibleRole = false;
      },
      /**
       * 搜索
       */
      onSearch(){
        const parameter = {};
        parameter.pageNo = 1
        parameter.pageSize = 10
        parameter.menuid='03bf0fb1-e9fb-4014-92e7-7121f4f71005'
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.personname = this.queryParam.personname
        this.loadData(parameter);
        this.$refs.table.refresh(true) //用refresh方法刷新表格
      }
    },

    created() {
      const columnsParams = {}
      columnsParams.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getPersonnelSettingColumns(columnsParams).then((res) => {
        console.log("getPersonnelSettingColumns-->",JSON.stringify(res))
        this.columns = res.result.columns
      })
      const treeParams = {}
      treeParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getSector(treeParams).then((res) => {
        console.log("getSector-->",JSON.stringify(res))
        // 默认第一个部门主键
        this.departmentid = res.result[0].departmentid;
        console.log("departmentid-->",JSON.stringify(this.departmentid))
        this.treeData = res.result
        this.expandedKeys = ['0-0-0', '0-0-1']
      })
      getOrgTree().then((res) => {
        this.orgTree = res.result
      })
    },
  }
</script>

<style lang="less">
  .custom-tree {
    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }
    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }

    /deep/ .spin-content {
      border: 1px solid #91d5ff;
      background-color: #e6f7ff;
      padding: 30px;
    }
  }
</style>
