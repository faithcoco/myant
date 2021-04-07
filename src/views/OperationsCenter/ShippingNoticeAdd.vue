<!--发货通知单-->
<template>
  <a-layout>
    <a-spin size="large" :spinning="spinning" tip="正在加载">
      <div>
        <a-card>
          <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
            <a-form-item v-for="item in data" :label="item.title">
              <!--级联选择-->
              <div v-if="item.selectVisible">
                <a-cascader v-decorator="item.decorator" v-show="item.selectVisible" :field-names="{ label: 'title', value: 'key', children: 'children' }"
                  :options="item.selectList" placeholder="请选择" :disabled="item.disabled"/>
              </div>
              <div v-else>
                <!--文本输入-->
                <a-input v-decorator="item.decorator" :disabled="item.disabled" v-show="item.inputVisible" :maxLength="item.fieldlength"/>
                <!--数量输入-->
                <a-input-number :style="{ width: '1370px' }" v-decorator="item.decorator" v-show="item.inputnumberVisible" :max="item.fieldmax"
                  :precision="item.fieldprecision" :disabled="item.disabled"/>
                <!--日期控件-->
                <a-date-picker :style="{ width: '100%' }" v-show="item.timepickerVisible" show-time format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期" valueFormat="YYYY-MM-DD HH:mm:ss"
                  v-decorator="item.decorator" :disabled="item.disabled"/>
                <!--参照选择-->
                <a-input v-decorator="item.decorator" v-show="item.listVisible" :maxLength="item.fieldlength" :disabled="disabled">
                  <a-button slot="suffix" type="link" @click="() => showModal(item)">选择</a-button>
                </a-input>
              </div>
            </a-form-item>
            <!--明细-->
            <a-form-item :wrapper-col="{ span: 21, offset: 2 }">
              <a-tabs>
                <a-tab-pane tab="明细">
                  <a-button @click="() => detailModal()">选择</a-button>
                  <a-table :columns="columns" :data-source="detailsData" :scroll="{ x: 3000 }">
                    <template v-for="col in columns" :slot="col.dataIndex" slot-scope="text, record, index">
                      <div>
                        <a-input :value="text" @pressEnter="(e) => handleChange(e.target.value, col.dataIndex, record)" v-if="col.isEdit"/>
                        <template v-else>
                          {{ text }}
                        </template>
                      </div>
                    </template>
                    <!--操作栏-->
                    <span slot="action" slot-scope="text, record">
                      <a @click="handleEdit(record)">编辑</a>
                      <a-divider type="vertical" />
                      <a-popconfirm title="确定删除?" @confirm="() => deleteItem(record)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm>
                    </span>
                  </a-table>
                </a-tab-pane>
              </a-tabs>
            </a-form-item>
          </a-form>
          <!--参照弹窗-->
          <a-modal title="选择" :visible="visible" @ok="archivesOk" @cancel="handleCancel" width="1300px" :destroyOnClose="destroyOnClose">
            <archives-modal :name="name" @onSelect="getSelect"></archives-modal>
          </a-modal>
          <a-modal title="选择" :visible="typeVisible" @ok="handleOk" @cancel="handleCancel" width="1300px" :destroyOnClose="destroyOnClose">
            <type :menuname="name" @onSelect="typeSelect"></type>
          </a-modal>
          <!--料品档案-->
          <a-modal title="选择" :visible="detailVisible" @ok="detailOk" @cancel="detailCancel" :destroyOnClose="destroyOnClose" width="1300px">
            <select-modal :modalname="name" :visible="visible" @onSelect="detailSelect" @onSelectAll="detailSelect"></select-modal>
          </a-modal>
        </a-card>
      </div>
    </a-spin>
    <!--按钮排版-->
    <a-layout-footer :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-10px', zIndex: '999' }">
      <a-card>
        <a-row type="flex" justify="center" align="top">
          <a-col :span="12">
            <a-button type="primary" style="margin-right: 10px" v-show="approvalVisilbe" @click="submitApproval">提交审批</a-button>
            <a-button type="primary" style="margin-right: 10px" v-show="cancelVisilbe" @click="cancelClick">撤回审批</a-button>
            <a-button type="primary" ref="submit" style="margin-right: 10px" v-show="saveVisible" @click="handleSubmit">保存继续</a-button>
            <a-button type @click="Back" style="margin-right: 10px" v-show="saveVisible">保存返回</a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Vue from 'vue'
import { formModel, Button, Tree } from 'ant-design-vue'
import { Cascader } from 'ant-design-vue'
Vue.use(Cascader)
import { PageHeader } from 'ant-design-vue'
Vue.use(PageHeader)
Vue.use(formModel, Button)
import { postProductAdd } from '@/api/manage'
import { logininfo, menuname } from '@/store/mutation-types'
import { getForm, submitForm, postData, getData } from '@/api/manage'
import { Form } from 'ant-design-vue'
Vue.use(Form)
import { TreeSelect } from 'ant-design-vue'
import { keys, type } from 'mockjs2'
Vue.use(TreeSelect)
import ArchivesModal from '../modal/ArchivesModal'
import Type from '../modal/TypeModal'
import SelectModal from '../modal/SelectModal'
import { getProductListColumns } from '@/api/manage'
import { Empty } from 'ant-design-vue'
import { isRendered } from 'nprogress'
Vue.use(Empty)

const numberRow = []
export default {
  components: {
    Type,
    ArchivesModal,
    SelectModal,
  },
  data() {
    return {
      disabled: true,
      numberRow,
      selectedRow: [],
      selectedRowKeys: [],
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      other: '',
      data: [],
      menuid: '',
      urlForm: '',
      materialclassid: '',
      materialid: '',
      tag: 0, //1 add 2update
      title: '',
      visible: false,
      modalname: '',
      selectList: [],
      typeVisible: false,
      currentkey: '',
      detailVisible: false,
      columns: [],
      detailsData: [],
      menuid: '',
      departmentid: '',
      personid: '',
      vendorid: '',
      businessclassid: '',
      spinning: false,
      name: '',
      approvalVisilbe: false,
      approveStatus: 8,
      destroyOnClose: true,
      menu: '',
      status: 1, //1保存继续2保存返回
      stockincode: '',
      isReference: false,
      billcode: '',
      currentRecord: '',
      saveVisible: true,
      cancelVisilbe: false,
      continueVisible: true,
      approvalprocess: '',
      businessname:''
    }
  },
  created() {
    this.initdata()
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        hideDefaultSelections: true,
        onSelection: this.onSelection,
      }
    },
  },
  activated() {
    this.initdata()
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { formname: 'form' })
  },
  methods: {

    cancelClick(e) {
      const parameter = {}
      parameter.memuid = this.menuid
      parameter.bizid = this.materialid
      var url = ''
      if (this.approvalprocess == 1) {
        url = '/work/recallProcess'
      } else {
        url = '/work/directApproval'
      }
      console.log('cancel-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        if (res.status == 'SUCCESS') {
          this.$message.info('撤销成功')
          this.getFormdata()
        } else {
          this.$message.warn(res.errorMsg)
        }
      })
    },

    handleEdit(record) {
      console.log(JSON.stringify(record.doclineid))
      if (record.docid) {
        this.$message.info('参照明细不能修改')
      } else {
        this.name = 'ProductList'
        this.currentkey = 'detail'
        this.visible = true

        this.currentRecord = record
      }
    },

    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.query.tag == 1) {
            if (this.$route.query.menu == 'ShippingNoticeList') {
              var submitUrl = '/bd/dispatchnotice/insterSave'
            } 
          } else {
            if (this.$route.query.menu == 'ShippingNoticeList') {
              var submitUrl = '/bd/dispatchnotice/updateSave'
            }
            values.docid = this.materialid
          }
          if (this.detailsData.length == 0) {
            this.$message.warn('请添加明细')
            return
          }
          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          values.details = this.detailsData
          values.departmentid = this.departmentid
          values.personid = this.personid
          values.customerid = this.customerid
          values.businessclasscode = this.businessclassid
          // values.approvalprocess = values.approvalprocess.join()
          console.log('submit url-->', submitUrl)
          console.log('submit parameter-->', JSON.stringify(values))
          submitForm(values, submitUrl).then((res) => {
              console.log('submit--->', JSON.stringify(res))
              if (this.$route.query.tag == 1) {
                if (res.status == 'SUCCESS') {
                  this.detailsData = []
                  if (this.status == 1) {
                    this.getFormdata()
                  } else if (this.status == 2) {
                    this.$multiTab.closeCurrentPage()
                  }
                }
              }
              this.$message.info(res.errorMsg)
            }).catch((err) => {
              this.$message.error(err.message)
            })
        }
      })
    },

    handleChange(value, key, record) {
      if (key == 'doclinequantity') {
        if (this.$route.query.menu == 'StorageManagementList') {
          if (record.doclinequantity) {
            if (parseInt(record.doclinequantity) > parseInt(value)) {
              var temp = JSON.parse(JSON.stringify(record))
              temp.doclinequantity = parseInt(record.doclinequantity) - parseInt(value)
              this.detailsData.push(temp)
            }
          }
        }
      }
      record[key] = value
      this.detailsData = this.detailsData.map((item, index) => {
        return { ...item, key: index + 1 }
      })
    },

    submitApproval(e) {
      const parameter = {}
      parameter.bizid = this.materialid
      parameter.memuid = this.menuid
      var url = ''
      if (this.approvalprocess == 1) {
        url = '/work/submitProcess'
        parameter.billcode = this.billcode
          parameter.businessname=this.businessname
      } else {
        url = '/work/directApproval'
      }
      console.log('submit approval-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        if (res.status == 'SUCCESS') {
          this.$message.info('提交审批成功')
          this.getFormdata()
        } else {
          this.$message.info(res.errorMsg)
        }
      })
    },

    deleteItem(record) {
      this.detailsData = this.detailsData.filter((item) => item.key !== record.key)
    },

    initdata() {
      this.spinning = true
      this.menu = this.$route.query.menu
      console.log('add menu-->', this.$route)
      if (this.$route.query.menu == 'ShippingNoticeList') {
        this.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
      } else {
        return
      }
      this.materialid = this.$route.query.materialid
      console.log('route-->', this.$route)
      if (this.$route.query.tag == 2) {
        this.getList(this.$route.query.menu, this.$route.query.materialid)
      } else {
        this.detailsData = []
      }
      this.getFormdata()
      this.getColumns()
    },

    getColumns() {
      const columnsParams = {}
      columnsParams.menuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      var urlColumns = '/sys/setting/getChildrenSetting'
      console.log('columns url--->', urlColumns)
      console.log('columns parameter-->', JSON.stringify(columnsParams))
      getProductListColumns(columnsParams, urlColumns).then((res) => {
        this.columns = res.result.columns
        this.columns.unshift({ title: '序号', dataIndex: 'key', key: 'key', width: '200px' })
      })
    },

    getList(menu, id) {
      const columnsParams = {}
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      columnsParams.pageNo = 1
      columnsParams.pageSize = 10

      if (menu == 'ShippingNoticeList') {
        var urlColumns = '/bd/dispatchnotice/dispatchnoticelineList'
      } 
      columnsParams.docid = id
      console.log('listdata url--->', urlColumns)
      console.log('listdata parameter-->', JSON.stringify(columnsParams))
      getData(columnsParams, urlColumns).then((res) => {
        this.detailsData = []
        this.detailsData = res.result.data
        this.detailsData = this.detailsData.map((item, index) => {
          return { ...item, key: index + 1 }
        })
      })
    },

    detailSelect(list) {
      this.selectList = list
      console.log('detail-->', JSON.stringify(this.selectList))
    },

    getSelect(list) {
      this.selectList = list
    },

    typeSelect(list) {
      console.log('type-->', JSON.stringify(list))
      this.selectList = list
    },

    detailModal(e) {
      this.selectedRowKeys = []
      for (const key in this.detailsData) {
        this.selectedRowKeys.push(this.detailsData[key].materialid)
      }
      this.detailVisible = true
      this.name = 'ProductList'
    },

    detailOk(e) {
      debugger
      this.detailVisible = false
      this.detailsData = this.detailsData.concat(this.selectList)
      this.detailsData = this.detailsData.map((item, index) => {
        return { ...item, key: parseInt(index) + 1 }
      })
    },

    detailCancel(e) {
      this.detailVisible = false
    },

    handleOk(e) {
      this.setform()
    },

    archivesOk(e) {
      this.setform()
    },

    setform() {
      console.log('select--->', JSON.stringify(this.selectList))
      if (this.currentkey == 'departmentid') { // 部门选择确认
        this.typeVisible = false
        this.form.setFieldsValue({
          departmentid: this.selectList.title,
        })
        this.form.setFieldsValue({
          personid: '',
        })
        this.personid = ''
        this.departmentid = this.selectList.departmentid
      } else if (this.currentkey == 'personid') { // 员工选择确认
        this.visible = false
        this.form.setFieldsValue({
          personid: this.selectList[0].personname,
        })
        this.personid = this.selectList[0].personid
        this.form.setFieldsValue({
          departmentid: this.selectList[0].departmentname,
        })
        this.departmentid = this.selectList[0].departmentid
      } else if (this.currentkey == 'customerid') { // 客户选择确认
        debugger;
        this.visible = false
        this.form.setFieldsValue({
          [this.currentkey]: this.selectList[0].customercode,
        })
        this.form.setFieldsValue({
          customername: this.selectList[0].customername,
        })
        this.form.setFieldsValue({
          customerhead: this.selectList[0].customerhead,
        })
        this.form.setFieldsValue({
          customertel: this.selectList[0].customertel,
        })
        this.form.setFieldsValue({
          customeraddress: this.selectList[0].customeraddress,
        })
        this.customerid = this.selectList[0].customerid
      } else if (this.currentkey == 'businessclasscode') { // 业务类别选择
        this.typeVisible = false
        this.form.setFieldsValue({
          businessclasscode: this.selectList.businessclasscode,
        })
        this.form.setFieldsValue({
          businessclassname: this.selectList.title,
        })
        this.businessclassid = this.selectList.key
      } else if (this.currentkey == 'doccode') { // 收货通知单选择
        // 收货通知选择
        this.visible = false
        var formdata = this.form.domFields
        var formkey = Object.keys(formdata)
        for (const key in formkey) {
          this.form.setFieldsValue({
            [formkey[key]]: this.selectList[0][formkey[key]],
          })
        }
        this.form.setFieldsValue({
          vendorid: this.selectList[0].vendorcode,
        })
        this.form.setFieldsValue({
          receiptnoticecode: this.selectList[0].doccode,
        })
        this.form.setFieldsValue({
          doccode: this.billcode,
        })
        this.form.setFieldsValue({
          receiptnoticeid: this.selectList[0].docid,
        })
        this.form.setFieldsValue({
          personid: this.selectList[0].personname,
        })
        this.form.setFieldsValue({
          departmentid: this.selectList[0].departmentname,
        })
        if (this.selectList[0].approvalprocess == '启用') {
          this.form.setFieldsValue({
            approvalprocess: ['1'],
          })
        } else {
          this.form.setFieldsValue({
            approvalprocess: ['2'],
          })
        }
        this.personid = this.selectList[0].personid
        this.departmentid = this.selectList[0].departmentid
        this.businessclassid = this.selectList[0].businessclassid
        this.vendorid = this.selectList[0].vendorid
        this.getList('ReceiptNoticeList', this.selectList[0].docid)
        this.isReference = true
      } else if (this.currentkey == 'detail') {
        this.visible = false
        var formkey = Object.keys(this.currentRecord)
        for (const key in formkey) {
          if (this.selectList[0][formkey[key]]) {
            if (formkey[key] !== 'key') {
              this.currentRecord[formkey[key]] = this.selectList[0][formkey[key]]
            }
          }
        }
      }
    },

    handleCancel(e) {
      if (this.currentkey == 'departmentid') {
        this.typeVisible = false
      } else if (this.currentkey == 'personid') {
        this.visible = false
      } else if (this.currentkey == 'customerid') {
        this.visible = false
      } else if (this.currentkey == 'businessclasscode') {
        this.typeVisible = false
      } else if (this.currentkey == 'doccode') {
        this.visible = false
      } else if (this.currentkey == 'detail') {
        this.visible = false
      }
    },

    onChange(value) {
      console.log(value)
      this.value = value
    },

    showModal(item) {
      console.log('this-->', item.key)
      this.currentkey = item.key
      if (this.currentkey == 'departmentid') {  // 部门选择
        this.typeVisible = true
        this.name = 'PersonnelSetting'
      } else if (this.currentkey == 'personid') { // 人员选择
        this.name = 'PersonnelSetting'
        this.visible = true
      } else if (this.currentkey == 'customerid') { // 客户选择
        this.name = 'CustomerList'
        this.visible = true
      } else if (this.currentkey == 'businessclasscode') { // 业务类别选择
        this.typeVisible = true
        this.name = 'BusinessCategory'
      } else if (this.currentkey == 'doccode') { // 收货通知单选择
        this.name = 'ReceiptNoticeList'
        this.visible = true
      }
    },

    handleSubmit(e) {
      this.status = 1
      this.submit()
    },

    onCascaderChange(value) {
      console.log(this.test)
    },

    getFormdata() {
      debugger
      this.modalname = this.$route.query.menu
      this.menuid = this.$route.query.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      if (this.$route.query.tag == 1) {
        this.approvalVisilbe = false
        this.continueVisible = true
        this.saveVisible = true
        this.title = this.$route.query.storageTitle + '新增'
        this.materialclassid = this.$route.query.materialclassid
        if (this.$route.query.menu == 'ShippingNoticeList') {
          this.urlForm = '/bd/dispatchnotice/insterForm'
        } 
      } else if (this.$route.query.tag == 2) {
        this.approvalVisilbe = true
        this.title = this.$route.query.storageTitle + '编辑'
        if (this.$route.query.menu == 'ShippingNoticeList') {
          this.urlForm = '/bd/dispatchnotice/updateForm'
        } 
        columnsParams.docid = this.materialid
      }
      this.$multiTab.rename(this.$route.path, this.title)
      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))
      this.data = []
      getForm(columnsParams, this.urlForm).then((res) => {
        // console.log('form--->',JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.data = res.result
        } else {
          this.$message.info(res)
        }
        setTimeout(() => {
          for (const i in this.data) {
            this.form.setFieldsValue({
              [this.data[i].key]: this.data[i].value,
            })
            if (this.data[i].key == 'departmentid') {
              this.departmentid = this.data[i].keyvalue
            } else if (this.data[i].key == 'personid') {
              this.personid = this.data[i].keyvalue
            } else if (this.data[i].key == 'vendorid') {
              this.vendorid = this.data[i].keyvalue
            } else if (this.data[i].key == 'doccode') {
              this.billcode = this.data[i].value
            }else if (this.data[i].key == 'businessclassname') {
              this.businessname = this.data[i].value
            } else if (this.data[i].key == 'ApproveStatus') {
              if (this.$route.query.tag == 2) {
                this.continueVisible = false
                if (this.data[i].value == 3) {
                  this.cancelVisilbe = true
                  this.approvalVisilbe = false
                  this.saveVisible = false
                } else if (this.data[i].value == 8) {
                  this.cancelVisilbe = false
                  this.approvalVisilbe = true
                  this.saveVisible = true
                } else {
                  this.cancelVisilbe = false
                  this.approvalVisilbe = false
                  this.saveVisible = false
                }
              }
            } else if (this.data[i].key == 'approvalprocess') {
              this.approvalprocess = this.data[i].value.join()
            }
          }
          this.spinning = false
        }, 500)
      })
    },

    handleSearchChange(value) {
      console.log(`selected ${value}`)
    },

    // 返回到清单页面
    Back(e) {
      this.status = 2
      this.submit()
      // 路由跳转
    },

    // 重置表单

    handleBlur() {
      console.log('blur')
    },

    handleFocus() {
      console.log('focus')
    },

    onSearch(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="less">
</style>