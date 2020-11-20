<template>
  <div>
    <a-card>
      <a-row :gutter="10">
        <a-col :span="4">
          <span>{{ titleTree }}</span>

          <a-divider type="horizontal" />

          <a-tree
            showLine
            v-model="checkedKeys"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="classifyTree"
            @expand="onExpand"
            @select="onSelect"
          >
          </a-tree>
        </a-col>

        <a-col :span="20">
          <a-input-search @search="onSearch" style="width: 220px; margin-left: 20px" placeholder="请输入搜索内容" />

          <a-table
            ref="table"
            size="default"
            :columns="columns"
            :data-source="listdata"
            :alert="false"
            :scroll="{ x: 1500, y: 475 }"
            bordered
            style="margin-top: 20px"
          >
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

import { logininfo, menuname } from '@/store/mutation-types'

const columns = []

const Operat_visible = true
export default {
  name: 'select',
  props: {
    name: {
      type: String,
    },
  },
  components: {
    STable,
    STree,
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      name: '',

      Operat_visible,
      confirmLoading: false,
      columns,
      queryParam: {},

      selectedKeys: ['f5728e20-ca54-4549-bd9f-e178a94b13a2'],
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
      bean: {},
      visible: false,
    }
  },
  mounted() {
    this.initData(this.name)
  },

  methods: {
    delete() {
      const columnsParams = {}
      columnsParams.materialid = this.materialid
      this.urlColumns = '/bd/product/delMaterialById'
      console.log('url--->', this.urlColumns)
      postData(columnsParams, this.urlColumns).then((res) => {
        console.log('res', JSON.stringify(res))
        this.getList()
      })
    },
    initData(name) {
      this.menuname = name
      const parameter = {}
      console.log('menu name-->', name)
      if (name == 'ProductList') {
        this.titleTree = '货品分类'
        this.urlTree = '/bd/product/materialClassTree'

        this.urlList = '/bd/product/productList'
      } else if (name == 'PersonnelSetting') {
        this.titleTree = '部门分类'
        this.urlTree = '/bd/Sector'
        parameter.memucode = '01-01'
        this.urlList = '/bd/baseperson/PersonnelSettingList'
      } else if (name == 'SupplierList') {
        this.titleTree = '供应商分类'
        this.urlTree = '/bd/basevendor/vendorTree'

        this.urlList = '/bd/basevendor/vendorlist'
      } else if (name == 'CustomerList') {
        this.titleTree = '客户分类'
        this.urlTree = '/bd/customer/CustomerTree'

        this.urlList = '/bd/customer/customerlist'
      } else if (name == 'WarehouseList') {
        this.titleTree = '仓位分类'
        this.urlTree = '/bd/warehouse/WarehouseTree'

        this.urlList = '/bd/warehouse/warehouselist'
      }
      this.urlColumns = '/sys/setting/getSetting'

      var url = '/bd/menu/findallmenu'
      console.log('gtmenuid res-->', JSON.stringify(parameter))
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
        console.log('columns data--->', JSON.stringify(res))
      })
    },
    getTree() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getclassificationGoodsList(parameter, this.urlTree).then((res) => {
        this.classifyTree = res.result

        console.log('tree-->', JSON.stringify(this.classifyTree))
        this.expandedKeys.push(this.classifyTree[0].key)
        this.materialclassid = res.result[0].children[0].key
        this.getList()
      })
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys
      this.materialclassid = selectedKeys[selectedKeys.length - 1]
      this.getList()
    },
    getList() {
      const parameter = {}

      parameter.materialclassid = this.materialclassid
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = '1'
      parameter.pageSize = '10'
      console.log('list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      getProductList(parameter, this.urlList).then((res) => {
        this.listdata = res.result.data
        for (const key in this.listdata) {
          this.listdata[key].key = key
        }
      })
    },
    onSearch(value) {
      console.log(value)
      this.queryParam = {
        key: value,
      }
      this.$refs.table.refresh(true) //用refresh方法刷新表格
    },
    selectChange() {},

    Classify() {
      Vue.ls.set(menuname, this.$route.name)
      this.$router.push({
        name: 'ClassificationGoods',
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
        this.materialid = record.vendorclassid
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
        this.materialid = record.vendorclassid
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
