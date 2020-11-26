<template>
  <div>
    <a-card>
      <a-row :gutter="10">
        <a-col :span="4">
          <span>{{ titleTree }}</span>

          <a-divider type="horizontal" />
          <a-input-search style="margin-bottom: 8px" placeholder="请输入关键字" @change="treeSearch" />
          <a-tree
            v-show="tree_visible"
            showLine
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="classifyTree"
            @expand="onExpand"
            @select="onSelect"
            :selectedKeys="checkedKeys"
          >
          </a-tree>
        </a-col>

        <a-col :span="20">
          <a-select default-value="全部" style="width: 220px" @change="selectChange">
            <a-select-option v-for="SList in selectList" :key="SList.key" :value="SList.key">{{
              SList.value
            }}</a-select-option>
          </a-select>

          <a-input-search @search="onSearch" style="width: 220px; margin-left: 20px" placeholder="请输入搜索内容" />

          <a-table
            ref="table"
            size="default"
            :columns="columns"
            :data-source="listdata"
            :alert="false"
            :scroll="{ x: 1500, y: 525 }"
            bordered
            style="margin-top: 20px"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
          >
            <span slot="action" v-show="Operat_visible" slot-scope="text, record">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />

              <a-popconfirm title="确定删除?" @confirm="() => deleteItem(record)">
                <a href="javascript:;">删除</a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import { Descriptions } from 'ant-design-vue'
import { Transfer } from 'ant-design-vue'
import { Comment } from 'ant-design-vue'
Vue.use(Descriptions)
Vue.use(Transfer)
Vue.use(Comment)
import { Tree } from 'ant-design-vue'
Vue.use(Tree)
import { Timeline } from 'ant-design-vue'
Vue.use(Timeline)
import { Mentions } from 'ant-design-vue'
Vue.use(Mentions)
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getProductList, getProductListColumns, getclassificationGoodsList, postData, getData } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'
import SelectModal from '../other/SelectModal'
import { logininfo, menuname } from '@/store/mutation-types'

const columns = []
const selectList = [{ value: '全部', key: 'all' }]

const Operat_visible = true
const dataList = []
export default {
  name: 'archivesmodal',
  props: {
    name: {
      type: String,
    },
  },
  components: {
    STable,
    STree,
    Approval,
    SelectModal,
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      selectList,
      Operat_visible,
      confirmLoading: false,
      columns,
      queryParam: {},
      selectedRowKeys: [],
      selectedKeys: [],
      listdata: [],
      classifyTree: [],
      moment,
      menuid: '',
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      titleTree: '',
      urlTree: '',
      urlColumns: '',
      urlList: '',
      materialclassid: '',
      menuname: '',
      materialid: '',
      approval_visible: false,
      tree_visible: true,
      product: {},
      urlDelete: '',
      treeData: [],

      isSearch: false,
      searchValue: '',
      searchKey: 'all',
      name: '',
    }
  },
  mounted() {
    this.initData(this.name)
  },
  watch: {
    name: {
      handler: function (val, oldVal) {
        console.log('modal-->',val+"/"+oldVal+"/"+this.name)
        this.initData(this.name)
      },
      // 深度观察监听
    },
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection,
      }
    },
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      var selectList = []
      for (const key in this.selectedRowKeys) {
        var i = this.selectedRowKeys[key]
        selectList.push(this.listdata[i])
      }
      this.$emit('onSelect', selectList)
    },
    treeSearch(e) {
      const value = e.target.value
      this.classifyTree = this.treeData.filter((item) => JSON.stringify(item).includes(value))
    },
    delete() {
      const columnsParams = {}
      if (this.menuname == 'ProductList') {
        columnsParams.materialid = this.materialid
      } else if (this.menuname == 'PersonnelSetting') {
        columnsParams.personid = this.materialid
      } else if (this.menuname == 'SupplierList') {
        columnsParams.vendorid = this.materialid
      } else if (this.menuname == 'CustomerList') {
        columnsParams.customerid = this.materialid
      } else if (this.menuname == 'WarehouseList') {
        columnsParams.warehouseid = this.materialid
      }

      console.log('delete url--->', this.urlDelete)
      console.log('delete params--->', JSON.stringify(columnsParams))
      getData(columnsParams, this.urlDelete).then((res) => {
        console.log('delete res-->', JSON.stringify(res))
        this.getList()
      })
    },
    initData(name) {
      this.selectedRowKeys=[]
      this.menuname = name
      const parameter = {}
      if (name == 'ProductList') {
        this.titleTree = '货品分类'
        this.urlTree = '/bd/product/materialClassTree'
        this.urlColumns = '/bd/product/productList/columns'
        this.urlList = '/bd/product/productList'
        this.urlDelete = '/bd/product/delMaterialById'
        parameter.memucode = '01-02'
      } else if (name == 'PersonnelSetting') {
        this.titleTree = '部门分类'
        this.urlTree = '/bd/Sector'
        this.urlColumns = '/sys/setting/getSetting'
        this.urlList = '/bd/baseperson/PersonnelSettingList'
        this.urlDelete = '/bd/baseperson/deletePerson'
        parameter.memucode = '01-01'
      } else if (name == 'SupplierList') {
        this.titleTree = '供应商分类'
        this.urlTree = '/bd/basevendor/vendorTree'
        this.urlColumns = '/bd/basevendor/vendorColumns'
        this.urlList = '/bd/basevendor/vendorlist'
        this.urlDelete = '/bd/basevendor/delvendorbyid'
        parameter.memucode = '01-03'
      } else if (name == 'CustomerList') {
        this.titleTree = '客户分类'
        this.urlTree = '/bd/customer/CustomerTree'
        this.urlColumns = '/sys/setting/getSetting'
        this.urlList = '/bd/customer/customerlist'
        this.urlDelete = '/bd/customer/delCustomerbyid'
        parameter.memucode = '01-04'
      } else if (name == 'WarehouseList') {
        this.titleTree = '仓位分类'
        this.urlTree = '/bd/warehouse/WarehouseTree'
        this.urlColumns = '/sys/setting/getSetting'
        this.urlList = '/bd/warehouse/warehouselist'
        this.urlDelete = '/bd/warehouse/delWarehousebyid'
        parameter.memucode = '01-05'
      }else{
        return
      }
      this.urlColumns = '/sys/setting/getSetting'

      var url = '/bd/menu/findallmenu'
      console.log('menu id-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        console.log('menu id-->', JSON.stringify(res))

        this.menuid = res.result
        this.getTree()
        this.getList()
        this.getColumns()
      })
    },
    getColumns() {
      const columnsParams = {}
      columnsParams.menuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('columns url--->', this.urlColumns)
      console.log('columns parameter-->', JSON.stringify(columnsParams))
      getProductListColumns(columnsParams, this.urlColumns).then((res) => {
        this.columns = res.result.columns
       
        this.columns.splice(this.columns.length - 1, 1)
      })
    },
    getTree() {
      this.checkedKeys = []
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('tree params-->', parameter)
      console.log('tree url', this.urlTree)
      getclassificationGoodsList(parameter, this.urlTree).then((res) => {
        this.checkedKeys.push(res.result[0].key)
        this.materialclassid = res.result[0].key
        this.treeData = res.result
        this.classifyTree = this.treeData
        console.log('tree-->', JSON.stringify(this.classifyTree))
        this.expandedKeys.push(this.classifyTree[0].key)

        this.getList()
      })
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect(selectedKeys, info) {
      this.checkedKeys = []
      this.checkedKeys.push(selectedKeys[0])
      console.log('onselect-->', this.checkedKeys)
      this.materialclassid = selectedKeys.join()
      this.getList()
    },
    getList() {
      const parameter = {}
      if (this.menuname == 'PersonnelSetting') {
        parameter.departmentid = this.materialclassid
      } else if (this.menuname == 'ProductList') {
        parameter.materialclassid = this.materialclassid
      } else if (this.menuname == 'SupplierList') {
        parameter.vendorclassid = this.materialclassid
      } else if (this.menuname == 'CustomerList') {
        parameter.customerclassid = this.materialclassid
      } else if (this.menuname == 'WarehouseList') {
        parameter.warehouseclassid = this.materialclassid
      }

      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = '1'
      parameter.pageSize = '10'
      if (this.isSearch) {
        console.log('search-->', this.searchKey + '/' + this.searchValue)
        parameter[`${this.searchKey}`] = this.searchValue
      }

      console.log('modal list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      getProductList(parameter, this.urlList).then((res) => {
        this.listdata = res.result.data
        this.selectedRowKeys=[]
        for (const key in this.listdata) {
          this.listdata[key].key = key
        }
        this.isSearch = false
      })
    },
    onSearch(value) {
      console.log('is run--->')
      this.isSearch = true
      this.searchValue = value
      this.getList()
    },
    selectChange(value) {
      this.searchKey = value
    },

    Classify() {
      Vue.ls.set(menuname, this.$route.name)
      this.$router.push({
        name: 'type',
        params: {
          menu: this.$route.name,
        },
      })
    },
    add() {
      Vue.ls.set(menuname, this.$route.name)
      this.$router.push({
        name: 'ProductAdd',
        params: {
          menu: this.$route.name,
          menuid: this.menuid,
          materialclassid: this.materialclassid,
          tag: 1,
          title: this.$route.meta.title,
        },
      })
    },

    handleEdit(record) {
      Vue.ls.set(menuname, this.$route.name)
      if (this.menuname == 'ProductList') {
        this.materialid = record.materialid
      } else if (this.menuname == 'PersonnelSetting') {
        this.materialid = record.personid
      } else if (this.menuname == 'SupplierList') {
        this.materialid = record.vendorid
      } else if (this.menuname == 'CustomerList') {
        this.materialid = record.customerid
      } else if (this.menuname == 'WarehouseList') {
        this.materialid = record.warehouseid
      }
      console.log('add materialid-->', this.materialid)
      this.$router.push({
        name: 'ProductAdd',
        params: {
          menu: this.$route.name,
          materialid: this.materialid,
          tag: 2,
          menuid: this.menuid,
        },
      })
    },
    deleteItem(record) {
      if (this.menuname == 'ProductList') {
        this.materialid = record.materialid
      } else if (this.menuname == 'PersonnelSetting') {
        this.materialid = record.personid
      } else if (this.menuname == 'SupplierList') {
        this.materialid = record.vendorid
      } else if (this.menuname == 'CustomerList') {
        this.materialid = record.customerid
      } else if (this.menuname == 'WarehouseList') {
        this.materialid = record.warehouseid
      }
      this.delete()
    },
    handleSub(record) {
      console.log(record)
    },

    change(visible) {
      this.approval_visible = visible
    },
    handleAdd(item) {
      console.log('add button, item', item)
      //   this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick(item) {
      console.log('handleTitleClick', item)
    },
  },
}
</script>
<style lang="less" scoped>
</style>
