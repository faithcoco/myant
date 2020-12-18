<template>
  <div>
    <a-card>
      <a-row :gutter="10">
        <a-col>
          <a-select default-value="全部" style="width: 220px" @change="selectChange">
            <a-select-option v-for="SList in selectList" :key="SList.key" :value="SList.key">{{
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
            :pagination="pagination"
            @change="handleTableChange"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="showApproval(record)">查审</a>
              <a-divider type="vertical" />
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

    <approval :visible="approval_visible" :materialid="materialid" :menu="menu" @change="change"></approval>
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

const dataList = []
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
      menu: '',
      isSearch: false,
      searchValue: '',
      searchKey: 'all',
      pagination: { current: 1, pageSize: 10, total: 10 },
      pageNo: 1,
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
    handleTableChange(pagination, filters, sorter) {
      console.log('pagination', pagination)
      this.pageNo = pagination.current
      this.getList()
    },
    showApproval(record) {
      this.approval_visible = true
      this.materialid = record.docid
    },
    treeSearch(e) {
      const value = e.target.value
      this.classifyTree = this.treeData.filter((item) => JSON.stringify(item).includes(value))
    },
    delete() {
      const columnsParams = {}
    
      columnsParams.docid=this.materialid

      console.log('delete url--->', this.urlDelete)
      console.log('delete params--->', JSON.stringify(columnsParams))
      getData(columnsParams, this.urlDelete).then((res) => {
        console.log('delete res-->', JSON.stringify(res))
        this.getList()
      })
    },
    initData(name) {
      this.menu = this.$route.name
      this.menuname = name
      this.titleTree = '仓位分类'
      console.log('menu-->', this.menu)
      if (this.menu == 'StorageManagementList') {
        this.urlList = '/bd/Stockinrecord/stockinrecordList'
        this.urlDelete = '/bd/Stockinrecord/delStocinrec'
      } else if (this.menu == 'ReceiptNoticeList') {
        this.urlList = '/bd/docreceiptnotice/list'
        this.urlDelete = '/bd/docreceiptnotice/del'
      } else {
        return
      }
      this.urlColumns = '/sys/setting/getSetting'
      const parameter = {}
      parameter.memucode = this.$route.meta.permission[0]
      var url = '/bd/menu/findallmenu'
      console.log('gtmenuid res-->', JSON.stringify(parameter))
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

        for (let i = 0; i < this.columns.length; i++) {
          if (i < this.columns.length - 1) {
            this.selectList.push({ value: this.columns[i].title, key: this.columns[i].dataIndex })
          } else {
            this.columns[i].width = 155
          }
        }
      })
    },

    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect(selectedKeys, info) {
      this.checkedKeys = []
      this.checkedKeys.push(selectedKeys[0])
      this.materialclassid = selectedKeys.join()
      this.getList()
    },
    getList() {
      const parameter = {}

      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = this.pageNo
      parameter.pageSize = '10'
      if (this.isSearch) {
        console.log('search-->', this.searchKey + '/' + this.searchValue)
        parameter[`${this.searchKey}`] = this.searchValue
      }

      console.log('list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      getProductList(parameter, this.urlList).then((res) => {
        console.log('list res--->', JSON.stringify(res.result.data[0]))
        this.listdata = []
        if (res.status == 'SUCCESS') {
          this.pagination.current = res.result.pageNo
          this.pagination.pageSize = res.result.pageSize
          this.pagination.total = res.result.totalCount

          this.listdata = res.result.data

          for (const key in this.listdata) {
            this.listdata[key].key = key
          }
          this.isSearch = false
        } else {
          this.$message.warning(res.errorMsg)
        }

        // Read total count from server
        // pagination.total = data.totalCount;
      })
    },
    onSearch(value) {
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
        name: 'ClassificationGoods',
        params: {
          menu: this.$route.name,
        },
      })
    },
    add() {
      console.log('push-->', this.$route.name)
      this.$router.push({
        path: 'ReceiptNoticeAdd',
        query: {
          menu: this.$route.name,
          menuid: this.menuid,
          materialclassid: this.materialclassid,
          tag: 1,
          storageTitle: this.$route.meta.title,
        },
      })
    },

    handleEdit(record) {
      this.materialid = record.docid

      this.$router.push({
        path: 'ReceiptNoticeAdd',
        query: {
          menu: this.$route.name,
          materialid: this.materialid,
          tag: 2,
          menuid: this.menuid,
          storageTitle: this.$route.meta.title,
        },
      })
    },
    deleteItem(record) {
      this.materialid = record.docid
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
