<template>
  <div>
    <a-card>
       
      <a-form-model class="ant-advanced-search-form" :model="form" @submit="handleSearch" ref="ruleForm">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-model-item label="供应商" prop="supplier">
              <a-select placeholder="请选择供应商" v-model="form.supplier" style="width: 100%">
                <a-select-option v-for="(item, index) in supplier" :value="item.vendorid"
                  >{{ item.vendorname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="部 门" prop="department">
              <a-select style="width: 100%" placeholder="请选择部门" v-model="form.department">
                <a-select-option v-for="(item, index) in department" :value="item.departmentid"
                  >{{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="日 期" prop="date">
              <a-range-picker @change="timeChange" v-model="form.date" style="width: 100%" />
            </a-form-model-item>
          </a-col>

          <a-col :span="8">
            <a-form-model-item label="业务员" prop="personnel">
              <a-select style="width: 100%" placeholder="请选择人员" v-model="form.personnel">
                <a-select-option v-for="(item, index) in personnel" :value="item.personid"
                  >{{ item.personname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="审核状态" prop="approveStatus">
              <a-select style="width: 100%" placeholder="请选择审核状态" v-model="form.approveStatus">
                <a-select-option value="1"> 已审核 </a-select-option>
                <a-select-option value="0"> 未审核 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="关键字" prop="key">
              <a-input-search style="width: 100%" placeholder="请输入搜索内容" v-model="form.key" />
            </a-form-model-item>
          </a-col>
          <a-col :span="3" :offset="21">
            <a-form-model-item>
              <a-button type="primary" @click="onSubmit"> 搜索 </a-button>
              <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
       
      <a-divider></a-divider>
      <a-col :span="4" :offset="20" style="margin-bottom: 10px">
        <a-button style="" type="primary" @click="add()">新增</a-button>

        <a-button style="margin-left: 10px" @click="() => (queryParam = {})">导入</a-button>
        <a-button style="margin-left: 10px" @click="() => (queryParam = {})">导出</a-button>
      </a-col>

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
import { FormModel } from 'ant-design-vue'
Vue.use(FormModel)
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import { getProductList, getProductListColumns, getclassificationGoodsList, postData, getData } from '@/api/manage'
import action from '../../core/directives/action'
import Approval from '../Approval'
import SelectModal from '../other/SelectModal'
import { logininfo } from '@/store/mutation-types'

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

      materialid: '',
      approval_visible: false,
      tree_visible: true,
      product: {},
      urlDelete: '',
      treeData: [],
      menu: '',

      searchValue: '',
      searchKey: 'all',
      pagination: { current: 1, pageSize: 10, total: 10 },
      pageNo: 1,
      form: {
        supplier: undefined,
        department: undefined,
        date: undefined,
        personnel: undefined,
        approveStatus: undefined,
        key: undefined,
      },
      supplier: [],
      department: [],
      personnel: [],
    }
  },
  mounted() {
    console.log('mounted', 'is run')
    this.initData(this.$route.name)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log('is run', 'watch')
        this.initData(val.name)
      },
      // 深度观察监听
    },
  },

  methods: {
    onSubmit() {
      console.log('form submit-->', JSON.stringify(this.form))
      this.getList()
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    getPersonnel() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      params.pageNo = 1
      params.pageSize = 10
      console.log('supplier params-->', JSON.stringify(params))
      getData(params, '/bd/baseperson/PersonnelSettingList').then((res) => {
        this.personnel = res.result.data
      })
    },
    getSupplier() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      params.pageNo = 1
      params.pageSize = 10
      console.log('supplier params-->', JSON.stringify(params))
      getData(params, '/bd/basevendor/vendorlist').then((res) => {
        this.supplier = res.result.data
      })
    },
    getDepartment() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('department params-->', JSON.stringify(params))
      getData(params, '/bd/Sector').then((res) => {
        this.department = res.result
      })
    },
    handleSearch(e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        console.log('error', error)
        console.log('Received values of form: ', values)
      })
    },
    timeChange(date, dateString) {
      console.log(date, dateString)
    },
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

      columnsParams.docid = this.materialid

      console.log('delete url--->', this.urlDelete)
      console.log('delete params--->', JSON.stringify(columnsParams))
      getData(columnsParams, this.urlDelete).then((res) => {
        console.log('delete res-->', JSON.stringify(res))
        this.getList()
      })
    },
    initData(name) {
      this.menu = this.$route.name

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
        this.getSupplier()
        this.getDepartment()
        this.getPersonnel()
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

    getList() {
      const parameter = {}

      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = this.pageNo
      parameter.pageSize = '10'
      parameter.form = this.form

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
        } else {
          this.$message.warning(res.errorMsg)
        }

        // Read total count from server
        // pagination.total = data.totalCount;
      })
    },

    selectChange(value) {
      this.searchKey = value
    },

    Classify() {
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
<style>


.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}


</style>
