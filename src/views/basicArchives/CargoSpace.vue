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
import { getProductList, getProductListColumns, getclassificationGoodsList, postData, getData } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'
import SelectModal from '../other/SelectModal'
import { logininfo, menuname } from '@/store/mutation-types'

const columns = []
const selectList = [{ value: '全部' }]

const Operat_visible = true
export default {
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
      treeData: [],
    }
  },
  mounted() {
    this.initData(this.$route.name)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.initData(val.name)
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
    treeSearch(e) {
      const value = e.target.value
      this.classifyTree = this.treeData.filter((item) => JSON.stringify(item).includes(value))
    },
    delete() {
      const columnsParams = {}
      columnsParams.positionid = this.materialid
      this.urlColumns = '/bd/warehouse/delposition'
      console.log('url--->', this.urlColumns)
      getData(columnsParams, this.urlColumns).then((res) => {
        console.log('res', JSON.stringify(res))
        this.getList()
      })
    },
    initData(name) {
      this.menuname = name
      console.log('menu name-->', name)
      if (name == 'CargoSpace') {
        this.titleTree = '仓库'
        this.urlTree = '/bd/warehouse/positionTree'
        this.urlColumns = '/sys/setting/getSetting'
        this.urlList = '/bd/warehouse/positionlist'
      }
      this.urlColumns = '/sys/setting/getSetting'
      const parameter = {}
      parameter.memucode = this.$route.meta.permission[0]
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
        console.log('columns data--->', JSON.stringify(res))
        for (let i = 0; i < this.columns.length - 1; i++) {
          this.selectList.push({ value: this.columns[i].title })
        }
      })
    },
    getTree() {
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      getclassificationGoodsList(parameter, this.urlTree).then((res) => {
        this.treeData = res.result
        this.classifyTree = this.treeData

        console.log('tree', JSON.stringify(this.classifyTree))
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

      parameter.warehouseid = this.materialclassid
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = '1'
      parameter.pageSize = '10'
      console.log('list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      getProductList(parameter, this.urlList).then((res) => {
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

      this.materialid = record.positionid
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
      this.materialid = record.positionid
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
