<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <div class="approvalTree">
          <s-tree
            :dataSource="approvalSettinTree"
            :openKeys.sync="openKeys"
            :search="true"
            @click="handleClick"
            @add="handleAdd"
            @titleClick="handleTitleClick"
            v-model="selectedKeys"
            :selectedKeys="selectedKeys"
          ></s-tree>
        </div>
      </a-col>
      <a-col :span="19">
        <a-form layout="vertical">
          <a-form-item :required="false">
            固定审批流
            <a-switch default-checked @change="onChange" />
          </a-form-item>
          <a-form-item label :required="false"
            >开启后，将按照锁设置的审批流程进行，若需要自由审批，则关闭即可</a-form-item
          >

          <a-form-item label="审批节点一:">
            <a-tree-select
              v-model="submit.node1"
              @change="handleChange1"
              style="width: 50%"
              :tree-data="nameList"
              multiple
              search-placeholder="Please select"
            />
          </a-form-item>
          <a-form-item label="审批节点二:">
            <a-tree-select
              @change="handleChange2"
              style="width: 50%"
              :tree-data="nameList"
              multiple
              search-placeholder="Please select"
              v-model="submit.node2"
            />
          </a-form-item>
          <a-form-item label="审批节点三:">
            <a-tree-select
              @change="handleChange3"
              style="width: 50%"
              :tree-data="nameList"
              multiple
              search-placeholder="Please select"
              v-model="submit.node3"
            />
          </a-form-item>
          <a-form-item label :required="false">
            <a-steps direction="vertical" size="small" :current="3" progress-dot>
              <a-step v-for="(item, i) in steps" :title="item.title" :description="item.name" />
            </a-steps>
          </a-form-item>
        </a-form>

        <a-col :span="1" :offset="1">
          <a-button type="primary" @click="onSubmit">保存</a-button>
        </a-col>
        <a-col :span="1" :offset="1">
          <a-button type @click="onBack">取消</a-button>
        </a-col>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { getData, postData } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
import { TreeSelect } from 'ant-design-vue'
Vue.use(TreeSelect)
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
      openKeys: ['03bf0fb1-e9fb-4014-92e7-7121f4f71002'],
      selectedKeys: ['03bf0fb1-e9fb-4014-92e7-7121f4f71002'],
      list: [],
      nameList: [
        { key: 1, name: '张三 ' },
        { key: 2, name: '李四 ' },
        { key: 3, name: '王五' },
      ],
      steps: [
        { title: '审批节点一', name: '' },
        { title: '审批节点二', name: '' },
        { title: '审批节点三', name: '' },
      ],

      // 查询参数
      queryParam: {},
      // 表头
      columns,

      approvalSettinTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      menuid: '',
      select1: { key: '' },
      select2: { key: '' },
      select3: { key: '' },
      submit: {
        node1: [],
        node2: [],
        node3: [],
      },
      node1: [],
    }
  },
  created() {
    //params.memuname=''
    var url = '/work/getBillTypeList'
    const params = {}
    getData(params, url).then((res) => {
      this.approvalSettinTree = res.result
      console.log('tree-->', JSON.stringify(this.approvalSettinTree))
      this.menuid = this.approvalSettinTree[0].memuid
    })
    url = '/work/getPsndocOrRoleList'
    const paramsName = { enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid }
    getData(paramsName, url).then((res) => {
      console.log('name list ->', JSON.stringify(res))
      // this.nameList = res.result
      this.nameList = [
        {
          children: [
            {
              selectable: 'true',
              title: 'cbc',
              value: 'bc6a7b35-dd53-43d6-82b7-c7d09a2fb96c',
              key: 'bc6a7b35-dd53-43d6-82b7-c7d09a2fb96c',
            },
          ],
          selectable: 'false',
          title: '管理员',
          value: 'a1e87014-a896-4e29-a667-dd69a7e33e36',
          key: 'a1e87014-a896-4e29-a667-dd69a7e33e36',
        },
      ]
      this.getSelect()
    })
  },
  methods: {
    getSelect() {
      const parameter = {
        enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid,
        memuid: this.menuid,
      }
      var url = '/work/getWorkFlowSetInfo'
      getData(parameter, url).then((res) => {
        this.submit.node1 = res.result.node1
        this.submit.node2 = res.result.node2
        this.submit.node3 = res.result.node3
        console.log('approval init ->', JSON.stringify(res))
      })
    },
    onSubmit(e) {
      const parameter = {
        enterpriseid: Vue.ls.get(logininfo).basepersonPO.enterpriseid,
        memuid: this.menuid,
        nameList: this.submit,
      }
      var url = '/work/insertWorkflow'
      postData(parameter, url).then((res) => {
        console.log('name ->', JSON.stringify(res))

        if (res.status == 'SUCCESS') {
          this.$message.info(res.status)
        } else {
          this.$message.error(res.status)
        }
      })
    },

    onBack(e) {
      this.getSelect()
    },
    handleChange1(value, label) {
      
      console.log(JSON.stringify(value))
      this.steps[0].name = label.join()
      this.submit.node1 = value
    },
    handleChange2(value, label) {
      this.steps[1].name = label.join()
      this.submit.node2 = value
    },
    handleChange3(value, label) {
      this.steps[2].name = label.join()
      this.submit.node3 = value
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`)
    },
    handleClick(e) {
      this.menuid = e.key
      this.getSelect()
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
  },
}
</script>

<style lang="less">
.approvalTree {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 2px;
  height: 775px;
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
