<template>
  <a-card>
    <a-row>
      <a-col :span="19"></a-col>
      <a-col :span="5"></a-col>
    </a-row>
    <br/>
    <a-table
        :columns="columns"
        :data-source="list"
        defaultExpandAllRows
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio', onSelect: onSelect }"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleAddItem(record)">添加子类</a>
          <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="确定删除?" @confirm="() => handleDelete(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="use" style="margin: 0">
        <a-checkbox @change="onChange"/>
      </span>
    </a-table>
    <a-modal v-model="visible" title="类别" @ok="handleOk">
      <p>请输入类别名称：</p>
      <a-input ref="userNameInput" v-model="typeName" placeholder/>
      <p>请输入类别编码：</p>
      <a-input ref="userNameInput" v-model="typeCode" placeholder/>
    </a-modal>
  </a-card>
</template>
<script>
import {getclassificationGoodsList} from '@/api/manage'
import {logininfo} from '@/store/mutation-types'
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
      selectedRowKeys: [],
    }
  },
  created() {
    this.initData(this.menuname)
  },
  watch: {
    menuname: {
      handler: function (val, oldVal) {
        this.initData(this.menuname)
      },
      // 深度观察监听
    },
  },
  methods: {
    onSelect(record) {
      console.log('record-->', JSON.stringify(record))

      this.$emit('onSelect', record)
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed-->', selectedRowKeys)
      console.log('this list-->', JSON.stringify(this.list))
      this.selectedRowKeys = selectedRowKeys

    },
    initData(name) {
      this.name = name
      console.log('name-->', name)
      if (name == 'PersonnelSetting') {
        this.url = '/bd/Sector'
        this.urlAdd = '/bd/insertDepartment'
        this.urlUpdate = '/bd/updateDepartment'
        this.urlDelete = '/bd/deleteDepartment'
        this.columns[1].dataIndex = 'code'
        this.columns[0].title = '部门名称'
        this.columns[1].title = '部门编号'
      } else if (name == 'ProductList') {
        this.url = '/bd/product/materialClassTree'
        this.urlAdd = '/bd/product/insertmaterialClass'
        this.urlUpdate = '/bd/product/updatematerialClass'
        this.urlDelete = '/bd/product/delmaterialClassById'
        this.columns[1].dataIndex = 'materialclasscode'
        this.columns[0].title = '料品名称'
        this.columns[1].title = '料品编号'
      } else if (name == 'SupplierList') {
        this.url = '/bd/basevendor/vendorTree'
        this.urlAdd = '/bd/basevendor/insterVenderClass'
        this.urlDelete = '/bd/deleteDepartment'
        this.urlUpdate = '/bd/basevendor/updatevendorClass'
        this.columns[1].dataIndex = 'vendorclasscode'
        this.columns[0].title = '供应商名称'
        this.columns[1].title = '供应商编号'
      } else if (name == 'CustomerList') {
        this.url = '/bd/customer/CustomerTree'
        this.urlAdd = '/bd/customer/insterCustomerClass'
        this.urlDelete = '/bd/customer/delCustomerClass'
        this.urlUpdate = '/bd/customer/updateCustomerClass'
        this.columns[1].dataIndex = 'customerclasscode'
        this.columns[0].title = '客户名称'
        this.columns[1].title = '客户编号'
      } else if (name == 'WarehouseList') {
        this.url = '/bd/warehouse/WarehouseTree'
        this.urlAdd = '/bd/warehouse/insterWarehouseClass'
        this.urlDelete = '/bd/warehouse/delWarehouseClass'
        this.urlUpdate = '/bd/warehouse/updateWarehouseClass'
        this.columns[1].dataIndex = 'materialclasscode'
        this.columns[0].title = '仓库名称'
        this.columns[1].title = '仓库编号'
      } else if (name == 'BusinessCategory') {
        this.url = '/bd/business/businessClassTree'

        this.columns[1].dataIndex = 'businessclasscode'
        this.columns[0].title = '业务名称'
        this.columns[1].title = '业务编号'
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

    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },

    handleSub(record) {
      console.log(record)
    },

    back() {
      this.$router.go(-1)
    },
    handleOk(e) {

    },
  },
}
</script>
