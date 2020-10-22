<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="8">
      </a-col>
      <a-col :span="16">
          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>
            <a-button style="margin-left: 5px" type="primary" @click="handleSetting()">设置</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
          </span>
      </a-col>
    </a-row>
    <a-row :gutter="8">
      <a-col :span="5">
        <span>部门结构</span>
        <a-tree
          :tree-data="treeData"
          show-icon
          @expand="onExpand"
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
        >
          <a-icon slot="apartment" type="apartment" :style="{ color: '#1890FF' }" />
          <template slot="custom" slot-scope="{ selected }">
            <a-icon :type="selected ? 'frown' : 'frown-o'" />
          </template>
        </a-tree>
      </a-col>
      <a-col :span="19">
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
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多<a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item >
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item >
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>

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
  import { getOrgTree, getServiceList, getPersonnelSettingList, getPersonnelSettingColumns} from '@/api/manage'
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
        openKeys: ['key-01'],
        treeData: [],
        expandedKeys: [],
        autoExpandParent: true,
        // 查询参数
        queryParam: {},
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
      onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
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
        debugger;
        console.log(row);
      },
      /**
       * 跳转编辑页面
       */
      add(){
        this.$router.push({ name: 'PersonSettingAdd' })
      },
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
  }
</style>
