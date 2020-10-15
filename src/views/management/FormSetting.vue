<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="FormSettingTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"
        ></s-tree>
      </a-col>
      <a-col :span="20">
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :scroll="{ x: 1300 }"
          :alert="false"
          bordered
        >
          <a slot="fieldsort" slot-scope="text, record" @click="showSort(record)">{{ record.fieldsort }}</a>
          <span slot="fieldname" slot-scope="text, record">
            <a-input @change="(e) => fieldname(e.target.value, record)" :value="record.fieldname" />
          </span>
          <span slot="fielddecription" slot-scope="text, record">
            <a-input @change="(e) => fieldname(e.target.value, record)" :value="record.fielddecription" />
          </span>
          <span slot="fieldwidthlist" slot-scope="text, record">
            <a-input
              @change="(e) => vdef2Change(e.target.value, record)"
              :value="record.fieldwidthlist"
              style="width: 50px"
            />px
          </span>
          <span slot="fielddisplay" style="margin: 0" slot-scope="text, record">
            <a-checkbox @change="(e) => fielddisplayChange(e.target.checked, record)" :checked="record.fielddisplay" />
          </span>
          <span slot="fieldmust" style="margin: 0" slot-scope="text, record">
            <a-checkbox @change="(e) => fieldmustChange(e.target.checked, record)" :checked="record.fieldmust" />
          </span>
          <span slot="sort" style="margin: 0">
            <a-icon type="unordered-list" />
          </span>
          <span slot="handle" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="handleEdit(record)">删除</a>
            </template>
          </span>
        </s-table>
        <a-row>
          <a-col :span="1" :offset="10">
            <a-button type="primary" @click="onSubmit">保存</a-button>
          </a-col>

          <a-col :span="1" :offset="1">
            <a-button type @click="onBack">返回</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-modal title="提示" :visible="sortVisible" :confirm-loading="confirmLoading" @ok="sortOk" @cancel="sortCancel">
      <p>请输入想要移动位置：</p>
      <a-input type="number" :visible="sortAfter" :max="sortMax" />
    </a-modal>
    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from '../other/modules/OrgModal'
import { getFormSettingTree, getServiceList, getFormSettingList, getFormSettingColumns, updateForm } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
const columns = []
//表单设置
export default {
  name: 'TreeList',
  components: {
    STable,
    STree,
    OrgModal,
  },
  data() {
    return {
      openKeys: ['01'],
      menuid: '',
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log('parameter--->', parameter)
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        //parameter.enterpriseid = '23e34e91-d6c5-43af-886b-2327ade04bcc'
        return getFormSettingList(Object.assign(parameter, this.queryParam)).then((res) => {
          console.log('getFormSettingList-->', JSON.stringify(res))
          if (res.status == 'FAILED') {
            this.$message.error(res.errorMsg)
          } else {
            this.formSettingList = res.result
            this.sortMax = this.formSettingList.length
          }

          return this.formSettingList
        })
      },
      FormSettingTree: [],
      selectedRowKeys: [],
      selectedRows: [],
      formSettingList: {},
      sortVisible: false,
      sortAfter: '',
      sortBfter: '',
      sortMax: '',
      currentId: '',
    }
  },
  created() {
    getFormSettingColumns().then((res) => {
      console.log('columns-->', JSON.stringify(res))
      this.columns = res.result.columns
    })
    getFormSettingTree().then((res) => {
      this.FormSettingTree = res.result
      console.log('tree-->', JSON.stringify(res.result))
    })
  },
  methods: {
    sortOk(e) {
      const parameter = {}
      parameter.enterpriseid = ''
      this.loadData(parameter)
    },
    sortCancel(e) {
      this.sortVisible = false
    },
    showSort(record) {
      this.sortVisible = true
      this.sortBfter = record.fieldsort
      record.fieldwidthlist = 200
    },
    onSubmit(e) {
      const updateParams = {}

      updateForm(this.formSettingList).then((res) => {
        this.$message.success('更改成功')
        location.reload()
      })
    },

    vdef2Change(value, record) {
      for (const key in this.formSettingList.data) {
        if (record.id == this.formSettingList.data[key].id) {
          this.formSettingList.data[key].vdef2 = value
        }
      }
    },
    fieldname(value, record) {
      for (const key in this.formSettingList.data) {
        if (record.id == this.formSettingList.data[key].id) {
          this.formSettingList.data[key].fieldname = value
        }
      }
    },
    fielddisplayChange(value, record) {
      for (const key in this.formSettingList.data) {
        if (record.id == this.formSettingList.data[key].id) {
          this.formSettingList.data[key].fielddisplay = value
        }
      }
    },
    fieldmustChange(value, record) {
      for (const key in this.formSettingList.data) {
        if (record.id == this.formSettingList.data[key].id) {
          this.formSettingList.data[key].fieldmust = value
        }
      }
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleClick(e) {
      for (const key in this.FormSettingTree) {
        for (const i in this.FormSettingTree[key].children) {
          if (e.key == this.FormSettingTree[key].children[i].key) {
            this.menuid = this.FormSettingTree[key].children[i].memuid
          }
        }
      }

      this.queryParam = {
        menuid: this.menuid,
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
