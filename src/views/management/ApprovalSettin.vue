<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="approvalSettinTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
        ></s-tree>
      </a-col>
      <a-col :span="19">
        <a-form layout="vertical">
          <a-form-item :required="false">
            固定审批流
            <a-switch default-checked @change="onChange" />
          </a-form-item>
          <a-form-item label :required="false">开启后，将按照锁设置的审批流程进行，若需要自由审批，则关闭即可</a-form-item>
          <a-form-item label :required="false">
            <a-icon type="plus" />添加审批流
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { getapprovalSettinColumns, getapprovalSettinTree } from '@/api/manage'
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
      // columns: [
      //   {
      //     title: '姓名',
      //     dataIndex: 'name'
      //   },
      //   {
      //     title: '当前角色',
      //     dataIndex: 'role',
      //     needTotal: true
      //   },
      //   {
      //     title: '联系电话',
      //     dataIndex: 'tellphone'
      //   },
      //   {
      //     title: '操作',
      //     dataIndex: 'action',
      //     width: '150px',
      //     scopedSlots: { customRender: 'action' }
      //   }
      // ],
      // // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   return getapprovalSettinColumns(Object.assign(parameter, this.queryParam)).then(res => {
      //     return res.result
      //   })
      // },
      approvalSettinTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {
    getapprovalSettinTree().then(res => {
      console.log(res.result)
      this.approvalSettinTree = res.result
    })
    getapprovalSettinColumns().then(res => {
      console.log(res.columns)
      this.columns = res.columns
    })
  },
  methods: {
    onChange(checked) {
      console.log(`a-switch to ${checked}`)
    },
    handleClick(e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
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
