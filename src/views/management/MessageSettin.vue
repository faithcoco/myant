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
        <a-descriptions layout="vertical" bordered :column="4">
          <a-descriptions-item label="推送内容">系统将合同推送给</a-descriptions-item>
          <a-descriptions-item label="推送人员/角色">
            <div
              :style="{textAlign: 'center',height: '40px',lineHeight: '40px',color: '#777'}">合同推进人</div>
            <a-divider />
            <p>
              人员:
              <a-input placeholder="input search text" style="width: 200px" />
            </p>
            <a-divider />
            <p>
              人员:
              <a-input placeholder="input search text" style="width: 200px" />
            </p>
          </a-descriptions-item>
          <a-descriptions-item label="是否推送">
            <p>
              <a-checkbox @change="onChange" />
            </p>
            <a-divider />
            <p>
              <a-checkbox @change="onChange" />
            </p>
            <a-divider />
            <p>
              <a-checkbox @change="onChange" />
            </p>
          </a-descriptions-item>
          <a-descriptions-item label="推送时间">消息会实时推送</a-descriptions-item>
        </a-descriptions>
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
import Vue from 'vue'
import { Layout } from 'ant-design-vue'
import { Descriptions } from 'ant-design-vue'
Vue.use(Descriptions)

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
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: rgba(255, 255, 255, 1);

  height: 100px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(255, 255, 255, 1);

  height: 100px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 480px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}

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
