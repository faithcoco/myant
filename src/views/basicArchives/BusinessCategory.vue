<template>
  <a-card>
    <a-row>
      <a-col :span="19"></a-col>
      <a-col :span="5">
        <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
          <a-button style="margin-left: 5px" type="primary" @click="handleAdd">新增</a-button>
          <a-button style="margin-left: 5px" type="primary" @click="back">返回</a-button>
        </span>
      </a-col>
    </a-row>
    <br />
    <a-table :columns="columns" :data-source="list" defaultExpandAllRows>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleAddItem(record)">添加子类</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除?" @confirm="() => handleDelete(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="use" style="margin: 0">
        <a-checkbox @change="onChange" />
      </span>
    </a-table>
    <a-modal v-model="visible" title="类别" @ok="handleOk">
      <p>请输入类别名称：</p>
      <a-input ref="userNameInput" v-model="typeName" placeholder />
      <p>请输入类别编码：</p>
      <a-input ref="userNameInput" v-model="typeCode" placeholder />
    </a-modal>
  </a-card>
</template>
<script>
import { getclassificationGoodsList, insertmaterialClass, getData } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
export default {
  data() {
    return {
      list: [],
      columns: [
        {
          title: '业务类别分类名称',
          dataIndex: 'title',
          key: 'name',
          scopedSlots: {
            customRender: '',
          },
        },
        {
          title: '业务类别分类编号',
          dataIndex: 'businessclasscode',
          key: 'age',
          scopedSlots: {
            customRender: '',
          },
        },
        ,
        {
          title: '操作',
          dataIndex: '',
          key: 'x',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      visible: false,
      typeName: '',
      typeCode: '',
      currentRecord: '',
      materialclasscode: '',
      materialclassname: '',
      id: '',
      url: '',
      urlAdd: '',
      name: '',
      tag: 0, //1新增 2编辑
      urlUpdate: '',
      urlDelete: '',
    }
  },
  created() {
    this.initData('BusinessCategory')
  },
  watch: {},
  methods: {
    initData(name) {
      this.name = name
      console.log('name-->', name)

      this.url = '/bd/business/businessClassTree'
      this.urlAdd = '/bd/business/insterBusinessClass'
      this.urlDelete = '/bd/business/delbusinessClass'
      this.urlUpdate = '/bd/business/updatebusinessClass'

      this.getList()
    },
    getList() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('url-->', this.url)
      getclassificationGoodsList(parameter, this.url).then((res) => {
        console.log('list-->', JSON.stringify(res))
        this.list = res.result
      })
    },
    insertmaterialClass() {
      const parameter = {}

      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.fatherid = this.id
      parameter.businessclassname = this.materialclassname
      parameter.businessclasscode = this.materialclasscode

      console.log('add url-->', this.urlAdd)
      console.log('add params-->', JSON.stringify(parameter))
      insertmaterialClass(parameter, this.urlAdd).then((res) => {
        console.log('add res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
          this.visible = false
          this.typeName = ''
          this.typeCode = ''
        } else {
          this.$message.warning(res.errorMsg)
        }
      })
    },
    update() {
      const parameter = {}

      parameter.businessclassid = this.id
      parameter.businessclassname = this.materialclassname
      parameter.businessclasscode = this.materialclasscode
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      insertmaterialClass(parameter, this.urlUpdate).then((res) => {
        console.log('update res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
          this.visible = false
          this.typeName = ''
          this.typeCode = ''
        } else {
          this.$message.warning(res.status)
        }
      })
    },
    delete() {
      const parameter = {}

      parameter.businessclassid = this.id

      console.log('delete-->', JSON.stringify(parameter))
      getData(parameter, this.urlDelete).then((res) => {
        console.log('delete-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
        } else {
          this.$message.warning(res.errorMsg)
        }
      })
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleAddItem(record) {
      //添加子类
      this.tag = 1
      this.currentRecord = record

      this.visible = true
      this.id = record.key
    },
    handleEdit(record) {
      //编辑
      console.log('edit-->', record)
      this.id = record.key
      this.tag = 2
      this.visible = true
      this.typeName = record.title
      this.typeCode = record.businessclasscode
    },
    handleDelete(record) {
      //删除
      console.log('edit-->', record)
      this.id = record.key
      this.delete()
    },
    handleSub(record) {
      console.log(record)
    },
    handleAdd() {
      //新增类别
      this.tag = 1
      this.visible = true
    },
    back() {
      this.$router.go(-1)
    },
    handleOk(e) {
      this.materialclassname = this.typeName
      this.materialclasscode = this.typeCode
      if (this.tag == 1) {
        this.insertmaterialClass()
      } else if (this.tag == 2) {
        this.update()
      }
    },
    onDelete(key) {
      const list = [...this.list]
      this.list = list.filter((item) => item.key !== key)
    },
  },
}
</script>
