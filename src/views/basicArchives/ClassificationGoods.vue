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
          <a-popconfirm v-if="list.length" title="确定要删除吗?" @confirm="() => onDelete(record.key)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </span>
      <span slot="use" style="margin: 0">
        <a-checkbox @change="onChange" />
      </span>
    </a-table>
    <a-modal v-model="visible" title="新增类别" @ok="handleOk">
      <p>请输入类别名称：</p>
      <a-input ref="userNameInput" v-model="typeName" placeholder />
      <p>请输入类别编码：</p>
      <a-input ref="userNameInput" v-model="typeCode" placeholder />
    </a-modal>
  </a-card>
</template>
<script>
import { getclassificationGoodsColumns, getclassificationGoodsList, insertmaterialClass } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
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
      tag: -1,
      materialclasscode: '',
      materialclassname: '',
      fatherid: '',
      url: '',
      urlAdd: '',
      name: '',
    }
  },
  created() {
    // getclassificationGoodsColumns().then((res) => {
    //   this.columns = res.columns

    //   console.log('columns-->', JSON.stringify(res.columns))
    // })
    console.log('route-->', this.$route.params.menu)

    this.initData(this.$route.params.menu)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log('watch--->', val.params.menu)
        this.initData(val.params.menu)
      },
      // 深度观察监听
    },
  },
  methods: {
    initData(name) {
      this.name = name
      if (name == 'productlist') {
        this.url = '/bd/product/materialClassTree'
        this.urlAdd = '/bd/product/insertmaterialClass'
      } else {
        this.url = '/bd/Sector'
        this.urlAdd = '/bd/insertDepartment'
      }
      this.getList()
    },
    getList() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getclassificationGoodsList(parameter, this.url).then((res) => {
        console.log('list-->', JSON.stringify(res))
        this.list = res.result
      })
    },
    insertmaterialClass() {
      const parameter = {}
      if (this.name == 'productlist') {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.materialclasscode = this.materialclasscode
        parameter.materialclassname = this.materialclassname
        parameter.materialclassgrade = ''
        parameter.fatherid = this.fatherid
      } else {
        parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        parameter.fatherid = this.fatherid
        parameter.departmentname = this.materialclassname
       // parameter.departmentcode = this.materialclasscode
      }

      console.log('add url-->', this.urlAdd)
      insertmaterialClass(parameter, this.urlAdd).then((res) => {
        console.log('add-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getList()
        } else {
          this.$message.warning(res.status)
        }
      })
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    handleAddItem(record) {
      this.currentRecord = record
      this.tag = 2
      this.visible = true
      this.fatherid = record.key
    },
    handleEdit(record) {
      console.log(record)
    },
    handleSub(record) {
      console.log(record)
    },
    handleAdd() {
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
      this.insertmaterialClass()
      this.typeName = ''
    },
    onDelete(key) {
      const list = [...this.list]
      this.list = list.filter((item) => item.key !== key)
    },
  },
}
</script>
