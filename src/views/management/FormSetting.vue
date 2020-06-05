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
        <s-table ref="table" size="default" :columns="columns" :data="loadData" :alert="false">
          <span slot="use" style="margin: 0">
            <a-checkbox @change="onChange" />
          </span>
          <span slot="must" style="margin: 0">
            <a-checkbox @change="onChange" />
          </span>
            <span slot="sort" style="margin: 0">
            <a-icon type="unordered-list" />
          </span>
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleEdit(record)">删除</a>
            </template>
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
import { getOrgTree, getServiceList } from '@/api/manage'

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
      columns: [
        {
          title: '字段名称',
          dataIndex: 'field_name'
        },
        {
          title: '字段类型',
          dataIndex: 'field_type',
          needTotal: true
        },
        {
          title: '启用',

          width: '150px',
          scopedSlots: { customRender: 'use' }
        },
        {
          title: '必填',
          width: '150px',
          scopedSlots: { customRender: 'must' }
        },
        {
          title: '操作',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '排序',
          width: '150px',
          scopedSlots: { customRender: 'sort' }
        }
      ],
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
    getOrgTree().then(res => {
      this.orgTree = [
        {
          title: '表单设置',
          key: 'key-01',
          children: [
            { title: '普通合同', key: '0-0-0' },
            { title: '周期合同', key: '0-0-1' },
            {
              title: '框架合同',
              key: '0-0-2',
              icon: 'apartment',
              children: [
                {
                  title: '销售部',
                  key: '0-0-2-2',
                  icon: 'apartment',
                  children: [
                    { title: '司宏宇组', key: '0-0-2-0' },
                    { title: '胡燕菲组', key: '0-0-2-1' }
                  ]
                }
              ]
            },
            { title: '发票表单', key: '0-0-3' },
            { title: '客户表单', key: '0-0-4' },
            { title: '回款管理', key: '0-0-5' }
          ]
        },
        {
          title: '应付表单',
          key: 'key-02',
          children: [
            { title: '普通合同', key: '0-0-0' },
            { title: '周期合同', key: '0-0-1' },
            {
              title: '框架合同',
              key: '0-0-2',
              icon: 'apartment',
              children: [
                {
                  title: '销售部',
                  key: '0-0-2-2',
                  icon: 'apartment',
                  children: [
                    { title: '司宏宇组', key: '0-0-2-0' },
                    { title: '胡燕菲组', key: '0-0-2-1' }
                  ]
                }
              ]
            },
            { title: '发票表单', key: '0-0-3' },
            { title: '客户表单', key: '0-0-4' },
            { title: '回款管理', key: '0-0-5' }
          ]
        },
        {
          title: '核算中心',
          key: 'key-03',
          children: [
            { title: '普通合同', key: '0-0-0' },
            { title: '周期合同', key: '0-0-1' },
            {
              title: '框架合同',
              key: '0-0-2',
              icon: 'apartment',
              children: [
                {
                  title: '销售部',
                  key: '0-0-2-2',
                  icon: 'apartment',
                  children: [
                    { title: '司宏宇组', key: '0-0-2-0' },
                    { title: '胡燕菲组', key: '0-0-2-1' }
                  ]
                }
              ]
            },
            { title: '发票表单', key: '0-0-3' },
            { title: '客户表单', key: '0-0-4' },
            { title: '回款管理', key: '0-0-5' }
          ]
        },
        {
          title: '设置',
          key: 'key-04',
          children: [
            { title: '普通合同', key: '0-0-0' },
            { title: '周期合同', key: '0-0-1' },
            { title: '发票表单', key: '0-0-3' },
            { title: '客户表单', key: '0-0-4' },
            { title: '回款管理', key: '0-0-5' }
          ]
        }
      ]
    })
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
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
    handleSaveClose() {}
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
