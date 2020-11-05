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
          <a @click="handleDelete(record)">删除</a>
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
import { getclassificationGoodsColumns, getclassificationGoodsList, insertmaterialClass, getData } from '@/api/manage'
import { logininfo, menuname } from '@/store/mutation-types'
import Vue from 'vue'
export default {
  data() {
    return {
      list: [],
      columns: [
        {
          title: '类别名称',
          dataIndex: 'title',
          key: 'name',
          scopedSlots: {
            customRender: '',
          },
        },
        {
          title: '类别编号',
          dataIndex: 'materialclasscode',
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
    this.initData(Vue.ls.get(menuname))
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.initData(Vue.ls.get(menuname))
      },
      // 深度观察监听
    },
  },
  methods: {
    initData(name) {
      this.name = name
      console.log('name-->', name)

      if (name == 'ProductList') {
        this.url = '/bd/product/materialClassTree'
        this.urlAdd = '/bd/product/insertmaterialClass'
        this.urlUpdate = '/bd/product/updatematerialClass'
        this.urlDelete = '/bd/product/delmaterialClassById'
      } else if (name == 'PersonnelSetting') {
        this.url = '/bd/Sector'
        this.urlAdd = '/bd/insertDepartment'
        this.urlUpdate = '/bd/updateDepartment'
        this.urlDelete = '/bd/deleteDepartment'
      } else if (name == 'SupplierList') {
        this.url = '/bd/basevendor/vendorTree'
        this.urlAdd = '/bd/basevendor/insterVenderClass'
        this.urlDelete = '/bd/deleteDepartment'
      }

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
      if (this.name == 'ProductList') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.materialclasscode = this.materialclasscode
        parameter.materialclassname = this.materialclassname
        parameter.materialclassgrade = ''
        parameter.fatherid = this.id
      } else if (name == 'PersonnelSetting') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.departmentname = this.materialclassname
        parameter.departmentcode = this.materialclasscode
      } else if (name == 'SupplierList') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.vendorclassname = this.materialclassname
        parameter.vendorclasscode = this.materialclasscode
      }

      console.log('add url-->', this.urlAdd)
      insertmaterialClass(parameter, this.urlAdd).then((res) => {
        console.log('add res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
        } else {
          this.$message.warning(res.errorMsg)
        }
      })
    },
    update() {
      const parameter = {}
      if (this.name == 'ProductList') {
        parameter.materialclasscode = this.typeCode
        parameter.materialclassname = this.typeName
        parameter.materialclassid = this.id
      } else if (name == 'PersonnelSetting') {
        parameter.departmentid = this.id
        parameter.departmentname = this.typeName
        parameter.departmentcode = this.typeCode
      } else if (name == 'SupplierList') {
        parameter.vendorclassid = this.id
        parameter.vendorclasscode = this.typeName
        parameter.vendorclassname = this.typeCode
      }

      insertmaterialClass(parameter, this.urlUpdate).then((res) => {
        console.log('update res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
        } else {
          this.$message.warning(res.status)
        }
      })
    },
    delete() {
      const parameter = {}

      if (this.name == 'ProductList') {
        parameter.materialclassid = this.id
      } else if (this.name == 'PersonnelSetting') {
        parameter.departmentid = this.id
      } else if (this.name == 'SupplierList') {
        parameter.vendorclassid = this.id
      }

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
      this.typeCode = record.materialclasscode
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
      this.$router.push({ name: 'ProductList' }) //编程式导航  修改 url，完成跳转
    },
    handleOk(e) {
      this.visible = false

      this.materialclassname = this.typeName
      this.materialclasscode = this.typeCode
      if (this.tag == 1) {
        this.insertmaterialClass()
      } else if (this.tag == 2) {
        this.update()
      }

      this.typeName = ''
      this.typeCode = ''
    },
    onDelete(key) {
      const list = [...this.list]
      this.list = list.filter((item) => item.key !== key)
    },
  },
}
</script>
