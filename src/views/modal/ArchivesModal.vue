<template>
  <div>
    <a-card>

      <a-col :span="24">
        <a-select default-value="全部" style="width: 220px" @change="selectChange">
          <a-select-option v-for="SList in selectList" :key="SList.key" :value="SList.key">{{
              SList.value
            }}
          </a-select-option>
        </a-select>

        <a-input-search @search="onSearch" style="width: 220px; margin-left: 20px" placeholder="请输入搜索内容"/>

        <a-table
            ref="table"
            size="default"
            :columns="columns"
            :data-source="listdata"
            :alert="false"
            :scroll="{ x: 1500, y: 475 }"
            bordered
            style="margin-top: 20px"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
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
import {Comment, Descriptions, Mentions, Timeline, Transfer, Tree} from 'ant-design-vue'
import STree from '@/components/Tree/Tree'
import {STable} from '@/components'
import {getData, getProductListColumns, requestData} from '@/api/manage'
import Approval from '../Approval'
import SelectModal from '../modal/SelectModal'
import {logininfo, menuname} from '@/store/mutation-types'

Vue.use(Descriptions)
Vue.use(Transfer)
Vue.use(Comment)
Vue.use(Tree)
Vue.use(Timeline)
Vue.use(Mentions)

const columns = []
const selectList = [{value: '全部', key: 'all'}]

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
      method: '',
    }
  },
  mounted() {
    this.initData(this.name)
  },
  watch: {
    name: {
      handler: function (val, oldVal) {
        console.log('modal-->', val + '/' + oldVal + '/' + this.name)
        this.initData(this.name)
      },
      // 深度观察监听
    },
  },
  computed: {
    rowSelection() {
      const {selectedRowKeys} = this
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

    initData(name) {
      this.selectedRowKeys = []
      this.menuname = name
      const parameter = {}
      if (name == 'ProductList') {
        this.urlList = '/bd/product/productList'
        this.method = 'get'
        parameter.memucode = '01-02'
      } else if (name == 'PersonnelSetting') {
        this.urlList = '/bd/baseperson/PersonnelSettingList'
        this.method = 'get'
        parameter.memucode = '01-01'
      } else if (name == 'SupplierList') {
        this.urlList = '/bd/basevendor/vendorlist'
        this.method = 'get'
        parameter.memucode = '01-03'
      } else if (name == 'CustomerList') {
        this.urlList = '/bd/customer/customerlist'
        this.method = 'get'
        parameter.memucode = '01-04'
      } else if (name == 'WarehouseList') {
        this.urlList = '/bd/warehouse/warehouselist'
        this.method = 'get'
        parameter.memucode = '01-05'
      } else if (name == 'ReceiptNoticeList') {
        this.urlList = '/bd/docreceiptnotice/selectlist'
        this.method = 'post'
        parameter.memucode = '02-02'
      } else if (name == 'WarehouseList') {
        this.urlList = '/bd/warehouse/warehouselist'
        this.method = 'get'
        parameter.memucode = '01-05'
      } else {
        return
      }
      this.urlColumns = '/sys/setting/getSetting'

      var url = '/bd/menu/findallmenu'
      console.log('menu id-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        console.log('menu id-->', JSON.stringify(res))

        this.menuid = res.result

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
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = '1'
      parameter.pageSize = '10'
      parameter.form = {}
      if (this.isSearch) {
        console.log('search-->', this.searchKey + '/' + this.searchValue)
        parameter[`${this.searchKey}`] = this.searchValue
      }

      console.log('request url-->', this.urlList)
      console.log('request params-->', JSON.stringify(parameter))
      requestData(parameter, this.urlList, this.method).then((res) => {

        if (res.result.data.length !== 0) {
          this.listdata = res.result.data
          this.selectedRowKeys = []
          for (const key in this.listdata) {
            this.listdata[key].key = key
          }
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
