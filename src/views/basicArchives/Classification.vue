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
    <a-modal v-model="visible" title="类别" @ok="handleOk" @cancel="handleCancel">
      <p>请输入类别名称：</p>
      <p>
        <a-input ref="userNameInput" v-model="typeName" placeholder />
      </p>
      <p><font color="#FF0000" v-if="this.name == 'PersonnelSetting'">*</font>请输入类别编码：</p>
      <p>
        <a-input ref="userNameInput" v-model="typeCode" :placeholder="codePlaceholder" />
      </p>
    </a-modal>
  </a-card>
</template>
<script>
import { getclassificationGoodsList, insertmaterialClass, getData } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
export default {
  props: {
    menuname: {
      type: String,
    },
  },
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
      menuname: '',
      title: '',
      destroyOnClose: true,
      codePlaceholder: '',
    }
  },
  created() {
    this.initData(this.$route.query.menu)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.query.baseTitle !== undefined) {
          this.initData(this.$route.query.menu)
        }
      },
      // 深度观察监听
    },
  },
  methods: {
    initData(name) {
      this.name = name
      this.title = this.$route.query.baseTitle + '分类'
      if (name == 'PersonnelSetting') {
        this.url = '/bd/Sector'
        this.urlAdd = '/bd/insertDepartment'
        this.urlUpdate = '/bd/updateDepartment'
        this.urlDelete = '/bd/deleteDepartment'
        this.columns[1].dataIndex = 'code'
        this.columns[0].title = '部门分类名称'
        this.columns[1].title = '部门分类编号'
      } else if (name == 'ProductList') {
        this.url = '/bd/product/materialClassTree'
        this.urlAdd = '/bd/product/insertmaterialClass'
        this.urlUpdate = '/bd/product/updatematerialClass'
        this.urlDelete = '/bd/product/delmaterialClassById'
        this.columns[1].dataIndex = 'materialclasscode'
        this.columns[0].title = '料品分类名称'
        this.columns[1].title = '料品分类编号'
      } else if (name == 'SupplierList') {
        this.url = '/bd/basevendor/vendorTree'
        this.urlAdd = '/bd/basevendor/insterVenderClass'
        this.urlDelete = '/bd/basevendor/delvendorClass'
        this.urlUpdate = '/bd/basevendor/updatevendorClass'
        this.columns[1].dataIndex = 'vendorclasscode'
        this.columns[0].title = '供应商分类名称'
        this.columns[1].title = '供应商分类编号'
      } else if (name == 'CustomerList') {
        this.url = '/bd/customer/CustomerTree'
        this.urlAdd = '/bd/customer/insterCustomerClass'
        this.urlDelete = '/bd/customer/delCustomerClass'
        this.urlUpdate = '/bd/customer/updateCustomerClass'
        this.columns[1].dataIndex = 'customerclasscode'
        this.columns[0].title = '客户分类名称'
        this.columns[1].title = '客户分类编号'
      } else if (name == 'WarehouseList') {
        this.url = '/bd/warehouse/WarehouseTree'
        this.urlAdd = '/bd/warehouse/insterWarehouseClass'
        this.urlDelete = '/bd/warehouse/delWarehouseClass'
        this.urlUpdate = '/bd/warehouse/updateWarehouseClass'
        this.columns[1].dataIndex = 'warehouseclasscode'
        this.columns[0].title = '仓位分类名称'
        this.columns[1].title = '仓位分类编号'
      }
      this.$multiTab.rename(this.$route.name, this.title)

      this.getList()
    },
    getList() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('url-->', this.url)
      getclassificationGoodsList(parameter, this.url).then((res) => {
        console.log('type list-->', JSON.stringify(res))
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
      } else if (this.name == 'PersonnelSetting') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.departmentname = this.materialclassname
        parameter.departmentcode = this.materialclasscode
      } else if (this.name == 'SupplierList') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.vendorclassname = this.materialclassname
        parameter.vendorclasscode = this.materialclasscode
      } else if (this.name == 'CustomerList') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.customerclassname = this.materialclassname
        parameter.customerclasscode = this.materialclasscode
      } else if (this.name == 'WarehouseList') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.id
        parameter.warehouseclassname = this.materialclassname
        parameter.warehouseclasscode = this.materialclasscode
      }

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
          this.$message.info(res.errorMsg)
        }
      })
    },
    update() {
      const parameter = {}
      if (this.name == 'ProductList') {
        parameter.materialclasscode = this.typeCode
        parameter.materialclassname = this.typeName
        parameter.materialclassid = this.id
      } else if (this.name == 'PersonnelSetting') {
        parameter.departmentid = this.id
        parameter.departmentname = this.typeName
        parameter.departmentcode = this.typeCode
      } else if (this.name == 'SupplierList') {
        parameter.vendorclassid = this.id
        parameter.vendorclasscode = this.typeName
        parameter.vendorclassname = this.typeCode
      } else if (this.name == 'CustomerList') {
        parameter.customerclassid = this.id
        parameter.customerclassname = this.materialclassname
        parameter.customerclasscode = this.materialclasscode
      } else if (this.name == 'WarehouseList') {
        parameter.warehouseclassid = this.id
        parameter.warehouseclassname = this.materialclassname
        parameter.warehouseclasscode = this.materialclasscode
      }
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

      if (this.name == 'ProductList') {
        parameter.materialclassid = this.id
      } else if (this.name == 'PersonnelSetting') {
        parameter.departmentid = this.id
      } else if (this.name == 'SupplierList') {
        parameter.vendorclassid = this.id
      } else if (this.name == 'CustomerList') {
        parameter.customerclassid = this.id
      } else if (this.name == 'WarehouseList') {
        parameter.warehouseclassid = this.id
      }

      console.log('delete params-->', JSON.stringify(parameter))
      console.log('delete url-->', this.urlDelete)
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
      console.log('edit-->', JSON.stringify(record))
      this.id = record.key
      this.tag = 2
      this.visible = true
      this.typeName = record.title
      if (this.name == 'PersonnelSetting') {
        this.typeCode = record.code
      } else if (this.name == 'ProductList') {
        this.typeCode = record.materialclasscode
      } else if (this.name == 'SupplierList') {
        this.typeCode = record.vendorclasscode
      } else if (this.name == 'CustomerList') {
        this.typeCode = record.customerclasscode
      } else if (this.name == 'WarehouseList') {
        this.typeCode = record.warehouseclasscode
      }
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
      this.id = ''
    },
    back() {
      this.$router.go(-1)
    },
    handleCancel(e) {
      this.typeName = ''
      this.typeCode = ''
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
