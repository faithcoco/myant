<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
        ></s-tree>
      </a-col>
      <a-col :span="19">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.delete')">
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
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { getOrgTree, getServiceList, getPersonnelSettingColumns } from '@/api/manage'

const columns = []

export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal
  },
  data() {
    return {
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    getPersonnelSettingColumns().then(res => {
      console.log('res.result---------->', res.columns)
      this.columns = res.columns
    })
    getOrgTree().then(res => {
      this.orgTree = res.result
      // this.orgTree = [
      //   {
      //     title: '上海砺学信息科技有限公司',
      //     key: 'key-01',
      //     icon: 'apartment',
      //     children: [
      //       { title: '渠道业务', key: '0-0-0', icon: 'apartment' },
      //       {
      //         title: '销售总部',
      //         key: '0-0-1',
      //         icon: 'apartment',
      //         children: [
      //           {
      //             title: '销售部',
      //             key: '0-0-1-2',
      //             icon: 'apartment',
      //             children: [
      //               { title: '司宏宇组', key: '0-0-2-0', slots: { icon: 'apartment' } },
      //               { title: '胡燕菲组', key: '0-0-2-1', slots: { icon: 'apartment' } }
      //             ]
      //           }
      //         ]
      //       },
      //       {
      //         title: '交付中心',
      //         key: '0-0-2',
      //         icon: 'apartment'
      //       },
      //       {
      //         title: '管理部门',
      //         key: '0-0-3',
      //         icon: 'apartment'
      //       },
      //       {
      //         title: '管理',
      //         key: '0-0-4',
      //         icon: 'apartment'
      //       },
      //       {
      //         title: '智能制造',
      //         key: '0-0-5',
      //         icon: 'apartment'
      //       }
      //     ]
      //   }
      // ]
    })
  },
  methods: {
    handleClick(e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
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
    }
  }
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
