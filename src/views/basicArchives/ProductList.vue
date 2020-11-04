<template>
  <div>
    <a-card>
      <a-row :gutter="10">
        <a-col :span="4">
          <span>{{ titleTree }}</span>
          <a-button style="margin-left: 40px" type="primary" @click="Classify()">分类设置</a-button>
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
          <a-select default-value="全部" style="width: 220px" @change="selectChange(value)">
            <a-select-option v-for="SList in selectList" :key="SList.value" :value="SList.value">{{
              SList.value
            }}</a-select-option>
          </a-select>

          <a-input-search @search="onSearch" style="width: 220px; margin-left: 20px" placeholder="请输入搜索内容" />

          <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {}">
            <a-button style="margin-left: 5px" type="primary" @click="add()">新增</a-button>

            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
            <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
          </span>

          <a-table
            ref="table"
            size="default"
            :columns="columns"
            :data-source="listdata"
            :alert="false"
            :scroll="{ x: 1500, y: 525 }"
            bordered
            style="margin-top: 20px"
          >
            <span slot="customTitle">
              {{ Operation }}
              <a-icon :type="isfold" :style="{ fontSize: '18px' }" @click="WidthChange()" />
            </span>
            <span slot="action" v-show="Operat_visible" slot-scope="text, record">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="deleteItem(record)">删除</a>
            </span>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <approval :visible="approval_visible" :product="product" @change="change"></approval>
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
import { getProductList, getProductListColumns, getclassificationGoodsList, postData } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'
import { logininfo, menuname } from '@/store/mutation-types'

const columns = []
const selectList = [
  { value: '全部' },
  { value: '货品编码' },
  { value: '货品名称' },
  { value: '规格型号' },
  { value: '存货编码' },
  { value: '存货名称' },
  { value: '主计量单位' },
  { value: '电商销售单位' },
  { value: '分销单位' },
  { value: '最低售价' },
  { value: '商品描述' },
  { value: '默认发货仓库' },
  { value: '是否虚拟物品' },
  { value: '图片' },
  { value: '预发货日期' },
  { value: '单位毛重' },
]

const product = {}
const targetTitle = columns
const Operat_visible = true
export default {
  components: {
    STable,
    STree,
    Approval,
  },
  data() {
    const oriTargetKeys = this.columns
    const targetList = []
    return {
      openKeys: ['key-01'],
      selectList,
      approval_visible: false,
      Operat_visible,
      Operation: '操作',
      visible_transfer: false,
      confirmLoading: false,
      product,
      columns,
      targetTitle,
      queryParam: {},
      selectedRowKeys: [],
      isfold: 'menu-unfold',
      size: 'small',
      targetKeys: [],
      selectedKeys: ['f5728e20-ca54-4549-bd9f-e178a94b13a2'],
      disabled: false,
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
      urlList:'',
      materialclassid: '',
      menuname: '',
      materialid: '',
    }
  },
  mounted() {
    this.initData(this.$route.name)
    this.getTree()
    this.getColumns()
    this.getList()
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.initData(val.name)
        this.getTree()
        this.getList()
        this.getColumns()
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
      console.log("menu name-->",name)
      if (name == 'ProductList') {
        this.titleTree = '货品分类'
        this.urlTree = '/bd/product/materialClassTree'
        this.urlColumns = '/bd/product/productList/columns'
        this.urlList='/bd/product/productList'
      } else if (name == 'PersonnelSetting') {
        this.titleTree = '部门结构'
        this.urlTree = '/bd/Sector'
        this.urlColumns = '/sys/setting/getSetting'
        this.urlList='/bd/baseperson/PersonnelSettingList'
      } else if (name == 'SupplierList') {
        this.titleTree = '供应商'
        this.urlTree = '/bd/basevendor/vendorTree'
        this.urlColumns = '/bd/basevendor/vendorColumns'
        this.urlList='/bd/basevendor/vendorlist'
      }
      console.log("route-->",JSON.stringify(this.$route.meta.permission) )
      this.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
    },
    getColumns() {
      const columnsParams = {}
      columnsParams.menuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('columns url--->', this.urlColumns)
      console.log('columns parameter-->',columnsParams)
      getProductListColumns(columnsParams, this.urlColumns).then((res) => {
        this.columns = res.result.columns
        console.log('columns data--->', JSON.stringify(this.columns))
      })
    },
    getTree() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getclassificationGoodsList(parameter, this.urlTree).then((res) => {
     
        this.classifyTree = res.result
        this.expandedKeys = ['2512774b-0049-4337-8150-71e4c1397813']
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
      getProductList(parameter).then((res) => {
        this.listdata = res.result.data
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
    handleDetail(record) {
      console.log(record), (this.approval_visible = true), (this.product = record)
    },
    WidthChange() {
      for (const key in this.columns) {
        if (this.columns[key].dataIndex == 'action') {
          if (this.Operat_visible) {
            this.Operat_visible = false
            this.columns[key].width = 35
            this.Operation = ''
            this.isfold = 'menu-fold'
          } else {
            this.Operat_visible = true
            this.columns[key].width = 155
            this.Operation = '操作'
            this.isfold = 'menu-unfold'
          }
        }
      }
    },
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
      console.log('current--->', this.materialclassid)
      if (this.menuname == 'ProductList') {
        this.$router.push({
          name: 'ProductAdd',
          params: {
            menu: this.$route.name,
            materialclassid: this.materialclassid,
            tag: 1,
          },
        }) //编程式导航  修改 url，完成跳转
      } else {
        this.$router.push({ name: 'PersonSettingAdd', query: { departmentid: this.materialclassid, operation: 'add' } })
      }
    },

    handleEdit(record) {
      console.log(record)
      this.$router.push({
        name: 'ProductAdd',
        params: {
          menu: this.$route.name,
          materialid: record.materialid,
          tag: 2,
        },
      })
    },
    deleteItem(record) {
      this.materialid = record.materialid
      this.delete()
    },
    handleSub(record) {
      console.log(record)
    },

    change(visible) {
      this.approval_visible = visible
    },
    handleClick(e) {
      console.log('handleClick', e)

      // this.menuid=e.materialclassid
      // this.getList()
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
