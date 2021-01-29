<template>
  <div>
    <a-card>
      <a-form-model class="ant-advanced-search-form" :model="form" @submit="onSubmit" ref="ruleForm">
        <a-row>
          <a-col :span="22">
            <a-form-model-item label="关键字" prop="key">
              <a-select v-model="key.scope" style="width: 10%">
                <a-select-option v-for="SList in selectList" :key="SList.key" :value="SList.key">{{
                  SList.value
                }}</a-select-option>
              </a-select>
              <a-input-search style="width: 90%" placeholder="请输入搜索内容" v-model="key.value" />
            </a-form-model-item>
          </a-col>
          <a-col :span="1">
            <a-form-model-item>
              <a-button type="primary" style="margin-left: 10px" @click="handleSearch">{{ search_text }}</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-show="search_show">
          <a-col :span="4">
            <a-form-model-item label="供应商" prop="vendorid">
              <a-select placeholder="请选择供应商" v-model="form.vendorid" style="width: 100%">
                <a-select-option v-for="(item, index) in supplier" :value="item.vendorid"
                  >{{ item.vendorname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="4" v-if="menu == 'ReceiptNoticeList'">
            <a-form-model-item label="部 门" prop="departmentid">
              <a-select style="width: 100%" placeholder="请选择部门" v-model="form.departmentid">
                <a-select-option v-for="(item, index) in department" :value="item.departmentid"
                  >{{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="4">
            <a-form-model-item label="日 期" prop="date">
              <a-range-picker v-model="date" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="4" v-if="menu == 'StorageManagementList'">
            <a-form-model-item label="仓 库" prop="warehouseid">
              <a-select style="width: 100%" placeholder="请选择仓库" v-model="form.warehouseid">
                <a-select-option v-for="(item, index) in warehouse" :value="item.warehouseid"
                  >{{ item.warehousename }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="4">
            <a-form-model-item label="审批状态" prop="approvestatus">
              <a-select style="width: 100%" placeholder="请选择审批状态" v-model="form.approvestatus">
                <a-select-option value="1"> 已审批 </a-select-option>
                <a-select-option value="2"> 审批中 </a-select-option>
                <a-select-option value="3"> 已提交 </a-select-option>
                <a-select-option value="8"> 未提交 </a-select-option>
                <a-select-option value="9"> 未通过 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="4" v-if="menu == 'ReceiptNoticeList'">
            <a-form-model-item label="业务员" prop="personid">
              <a-select style="width: 100%" placeholder="请选择人员" v-model="form.personid">
                <a-select-option v-for="(item, index) in personnel" :value="item.personid"
                  >{{ item.personname }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="end">
          <a-col :span="3">
            <a-form-model-item>
              <a-button type="primary" @click="onSubmit"> 搜索 </a-button>

              <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>

      <a-divider></a-divider>
      <a-row type="flex" justify="end">
        <a-col :span="4">
          <a-button type="primary" style="margin-left: 5px" @click="handleAdd">新增</a-button>
          <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导入</a-button>
          <a-button style="margin-left: 5px" @click="() => (queryParam = {})">导出</a-button>
        </a-col>
      </a-row>
      <a-spin size="large" :spinning="spinning" tip="正在加载">
        <a-table
          ref="table"
          size="default"
          :columns="columns"
          :data-source="listdata"
          :alert="false"
          :scroll="{ x: 1500, y: 800 }"
          bordered
          style="margin-top: 20px"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <span slot="action" slot-scope="text, record">
            <a @click="showApproval(record)">查审</a>
            <a-divider type="vertical" />
            <a @click="submitApproval(record)" v-if="record.approvecode == 8">送审</a>
            <a-divider type="vertical" v-if="record.approvecode == 8" />
            <a @click="handleRevocation(record)" v-if="record.approvecode == 3">撤回</a>
            <a-divider type="vertical" v-if="record.approvecode == 3" />
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除?" @confirm="() => deleteItem(record)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-spin>
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
import { getProductListColumns, postData, getData } from '@/api/manage'
import Approval from '../Approval'
import SelectModal from '../modal/SelectModal'
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
      scopeList: [],
      materialid: '',
      approval_visible: false,
      tree_visible: true,
      product: {},
      urlDelete: '',
      treeData: [],
      menu: '',
      searchValue: '',
      pagination: { current: 1, pageSize: 10, total: 10 },
      pageNo: 1,
      form: {
        vendorid: undefined,
        departmentid: undefined,

        personid: undefined,
        approvestatus: undefined,

        warehouseid: undefined,
      },
      key: {
        scope: 'all',
        value: undefined,
      },
      date: undefined,
      supplier: [],
      department: [],
      personnel: [],
      warehouse: [],
      spinning: false,
      search_show: false,
      search_text: '高级选项',
      path: '',
      span: 8,
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

  methods: {
    getWarehouse() {
      const params = {}
      params.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      params.pageNo = 1
      params.pageSize = 10
      console.log('supplier params-->', JSON.stringify(params))
      getData(params, '/bd/warehouse/warehouselist').then((res) => {
        this.warehouse = res.result.data
      })
    },
    onSubmit() {
      if (this.date !== undefined) {
        this.date = this.date.map((item) => moment(item).valueOf())
        this.form.starttime = this.date[0]
        this.form.endtime = this.date[1]
      }

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
    handleTableChange(pagination, filters, sorter) {
      console.log('pagination', pagination)
      this.pageNo = pagination.current
      this.getList()
    },
    showApproval(record) {
      this.approval_visible = true
      this.materialid = record.docid
    },
    handleRevocation(record) {
      const parameter = {}
      parameter.memuid = this.menuid
      parameter.bizid = record.docid
      var url = '/work/recallProcess'

      console.log('cancel-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        if (res.status == 'SUCCESS') {
          this.$message.info('撤销成功')
          this.getList()
        } else {
          this.$message.warn(res.errorMsg)
        }
      })
    },
    submitApproval(record) {
      console.log('record--->', JSON.stringify(record))
      //提交审批
      const parameter = {}
      parameter.bizid = record.docid
      parameter.memuid = this.menuid
      var url = ''

      if (record.approvalprocess == '启用') {
        url = '/work/submitProcess'
        parameter.billcode = this.billcode
        parameter.businessname = this.businessname
      } else {
        url = '/work/directApproval'
      }
      console.log('approval-->', JSON.stringify(parameter))
      console.log('approval url-->', url)
      getData(parameter, url).then((res) => {
        if (res.status == 'SUCCESS') {
          this.$message.info('提交审批成功')
          this.getList()
        } else {
          this.$message.info(res.errorMsg)
        }
      })
    },
    delete() {
      const columnsParams = {}
      columnsParams.docid = this.materialid
      console.log('delete url--->', this.urlDelete)
      console.log('delete params--->', JSON.stringify(columnsParams))
      getData(columnsParams, this.urlDelete).then((res) => {
        console.log('delete res-->', JSON.stringify(res))
        if (res.status == 'FAILED') {
          this.$message.info(res.errorMsg)
        } else {
          this.getList()
        }
      })
    },
    initData(name) {
      this.menu = this.$route.name
      this.titleTree = '仓位分类'
      console.log('menu-->', this.menu)
      if (this.menu == 'StorageManagementList') {
        this.urlList = '/bd/Stockinrecord/stockinrecordList'
        this.urlDelete = '/bd/Stockinrecord/delStocinrec'
        this.path = 'StorageManagementAdd'
      } else if (this.menu == 'ReceiptNoticeList') {
        this.urlList = '/bd/docreceiptnotice/list'
        this.urlDelete = '/bd/docreceiptnotice/del'
        this.path = 'ReceiptNoticeAdd'
      } else {
        return
      }
      this.urlColumns = '/sys/setting/getSetting'
      const parameter = {}
      parameter.memucode = this.$route.meta.permission[0]
      var url = '/bd/menu/findallmenu'
      console.log('gtmenuid res-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        console.log('menuid res-->', JSON.stringify(res))
        this.menuid = res.result
        this.getList()
        this.getColumns()
        this.getSupplier()
        this.getDepartment()
        this.getPersonnel()
        this.getWarehouse()
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
        console.log('columns-->', JSON.stringify(this.columns))
        for (let i = 0; i < this.columns.length; i++) {
          this.selectList.push({ value: this.columns[i].title, key: this.columns[i].dataIndex })
        }
      })
    },
    getList() {
      this.spinning = true
      const parameter = {}
      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = this.pageNo
      parameter.pageSize = '10'
      if (this.key.value == undefined) {
        this.form[this.key.scope] = ''
      }
      parameter.form = this.form
      console.log('list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      postData(parameter, this.urlList).then((res) => {
        this.listdata = []
        // console.log('list--->',JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.pagination.current = res.result.pageNo
          this.pagination.pageSize = res.result.pageSize
          this.pagination.total = res.result.totalCount
          this.listdata = res.result.data
          for (const key in this.listdata) {
            this.listdata[key].key = key
          }
        } else {
          console.log('list error-->', JSON.stringify(res.errorMsg))
          this.$message.warning(res.errorMsg)
        }
        this.spinning = false
      })
    },
    handleSearch(e) {
      if (this.search_show == false) {
        this.search_show = true

        this.search_text = '隐藏选项'
      } else {
        this.search_text = '展开选项'
        this.search_show = false
      }
    },
    handleAdd(e) {
      this.$router.push({
        path: this.path,
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
    change(visible) {
      this.approval_visible = visible
    },
  },
}
</script>
<style>
.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin-bottom: 10px;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
