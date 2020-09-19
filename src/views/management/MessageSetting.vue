<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="MessageSettinTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
        ></s-tree>
      </a-col>
      <a-col :span="19">
        <a-table :columns="columns" :data-source="data" bordered>
          <template slot="checked">
            <a-checkbox @change="onChange"></a-checkbox>
          </template>
        </a-table>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { getMessageSettinTree, getMessageSettinList } from '@/api/manage'
import Vue from 'vue'
import { Layout } from 'ant-design-vue'
import { Descriptions } from 'ant-design-vue'
Vue.use(Descriptions)
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  if (index === 4) {
    obj.attrs.colSpan = 0
  }
  return obj
}

const data = []
// const data = [
//   {
//     key: '1',
//     name: '系统将新建合同消息推送给',
//     address: '消息会实时推送'
//   },
//   {
//     key: '2',
//     name: 'John Brown',
//     tel: '0571-22098333',
//     phone: 18889898888,
//     age: 42,
//     address: '消息会实时推送'
//   },
//   {
//     key: '3',
//     name: 'John Brown',
//     age: 32,
//     tel: '0575-22098909',
//     phone: 18900010002,
//     address: '消息会实时推送'
//   }
// ]
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal
  },
  data() {
    const columns = [
      {
        colSpan: 1,
        title: '推送内容',
        dataIndex: 'name',

        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 0) {
            obj.attrs.rowSpan = 3
          }

          if (index === 1) {
            obj.attrs.rowSpan = 0
          }

          if (index === 2) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      },
      {
        title: '推送人员或角色',
        dataIndex: 'age',
        customRender: (text, row, index) => {
          if (index == 0) {
            return <p>合同推送人</p>
          }
          if (index == 1) {
            return (
              <p>
                人员： <a-input style="width: 400px" />
              </p>
            )
          }
          if (index == 2) {
            return (
              <p>
                角色： <a-input style="width: 400px" />
              </p>
            )
          }
          return {
            children: <a href="javascript:;">{text}</a>
          }
        }
      },
      {
        title: '是否推送',
        colSpan: 1,
        dataIndex: 'tel',
        scopedSlots: { customRender: 'checked' }
      },
      {
        title: '推送时间',
        dataIndex: 'address',
        customRender: renderContent,
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          }
          if (index === 0) {
            obj.attrs.rowSpan = 3
          }
          // These two are merged into above cell
          if (index === 1) {
            obj.attrs.rowSpan = 0
          }

          if (index === 2) {
            obj.attrs.colSpan = 0
          }
          return obj
        }
      }
    ]
    return {
      openKeys: ['key-01'],
      // 查询参数
      queryParam: {},
      // 表头
      MessageSettinTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      data,
      columns
    }
  },
  created() {
    getMessageSettinTree().then(res => {
      this.MessageSettinTree = res.result
    })
    getMessageSettinList().then(res => {
      this.data = res.data
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
