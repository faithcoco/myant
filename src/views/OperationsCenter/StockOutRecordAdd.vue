<!--发货通知单-->
<template>
  <a-layout>
    <a-spin size="large" :spinning="spinning" tip="正在加载">
      <div>
        <a-card>
          <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
            <a-form-item v-for="(item,index) in data" :key="index" :label="item.title">
              <!--级联选择-->
              <div v-if="item.selectVisible">
                <a-cascader v-decorator="item.decorator" v-show="item.selectVisible"
                            :field-names="{ label: 'title', value: 'key', children: 'children' }"
                            :options="item.selectList" placeholder="请选择" :disabled="item.disabled"/>
              </div>
              <div v-else>
                <!--文本输入-->
                <a-input v-decorator="item.decorator" :disabled="item.disabled" v-show="item.inputVisible"
                         :maxLength="item.fieldlength"/>
                <!--数量输入-->
                <a-input-number :style="{ width: '1370px' }" v-decorator="item.decorator"
                                v-show="item.inputnumberVisible" :max="item.fieldmax"
                                :precision="item.fieldprecision" :disabled="item.disabled"/>
                <!--日期控件-->
                <a-date-picker :style="{ width: '100%' }" v-show="item.timepickerVisible" show-time
                               format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期" valueFormat="YYYY-MM-DD HH:mm:ss"
                               v-decorator="item.decorator" :disabled="item.disabled"/>
                <!--参照选择-->
                <a-input v-decorator="item.decorator" v-show="item.listVisible" :maxLength="item.fieldlength"
                         :disabled="disabled">
                  <a-button slot="suffix" type="link" @click="() => showModal(item)">选择</a-button>
                </a-input>
              </div>
            </a-form-item>
            <!--明细-->
            <a-form-item :wrapper-col="{ span: 21, offset: 2 }">
              <a-tabs>
                <a-tab-pane tab="明细">
                  <!--                  <a-button @click="() => detailModal()">选择</a-button>-->
                  <a-dropdown>
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()" style="margin-left: 20px">选择
                      <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay" @click="onClick">
                      <a-menu-item key="1"> 选择料品</a-menu-item>
                    </a-menu>
                  </a-dropdown>
                  <a-table :columns="columns" :data-source="detailsData" :scroll="{ x: 3000 }">
                    <template v-for="col in columns" :slot="col.dataIndex" slot-scope="text, record, index">
                      <div>
                        <a-input :value="text" @pressEnter="(e) => handleChange(e.target.value, col.dataIndex, record)"
                                 v-if="col.isEdit"/>
                        <template v-else>
                          {{ text }}
                        </template>
                      </div>
                    </template>
                    <span slot="doclinequantity" slot-scope="text, record">
                      <a-input
                          :value="text"
                          @change="(e) => waitquantityChange(e.target.value, record)"
                          type="number"
                      />
                    </span>
                    <!--操作栏-->
                    <span slot="action" slot-scope="text, record">
                      <a @click="handleEdit(record)">编辑</a>
                      <a-divider type="vertical"/>
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
          <a-modal title="选择" :visible="visible" @ok="archivesOk" @cancel="handleCancel" width="1300px"
                   :destroyOnClose="destroyOnClose">
            <archives-modal :name="name" @onSelect="getSelect"></archives-modal>
          </a-modal>
          <a-modal title="选择" :visible="typeVisible" @ok="handleOk" @cancel="handleCancel" width="1300px"
                   :destroyOnClose="destroyOnClose">
            <type :menuname="name" @onSelect="typeSelect"></type>
          </a-modal>
          <!--料品档案-->
          <a-modal title="选择" :visible="detailVisible" @ok="detailOk" @cancel="detailCancel"
                   :destroyOnClose="destroyOnClose" width="1300px">
            <select-modal :modalname="name" :visible="visible" @onSelect="detailSelect"
                          @onSelectAll="detailSelect"></select-modal>
          </a-modal>
        </a-card>
      </div>
    </a-spin>
    <!--按钮排版-->
    <a-layout-footer
        :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-10px', zIndex: '999' }">
      <a-card>
        <a-row type="flex" justify="center" align="top">
          <a-col :span="12">
            <a-button type="primary" style="margin-right: 10px" v-show="approvalVisible" @click="approvalClick">
              {{ approvalText }}
            </a-button>
            <a-button type @click="submitEdit" style="margin-right: 10px" v-if="this.isEdit == false">存为草稿</a-button>
            <a-button type @click="Back" style="margin-right: 10px" v-if="this.isEdit == false">保存返回</a-button>
            <a-button type @click="handleSubmit" style="margin-right: 10px" v-if="this.approvalText == '提交审批'">保存
            </a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Vue from 'vue'
import {Button, Cascader, Empty, Form, formModel, PageHeader, TreeSelect} from 'ant-design-vue'
import {getData, getForm, getProductListColumns, submitForm} from '@/api/manage'
import {logininfo} from '@/store/mutation-types'
import ArchivesModal from '../modal/ArchivesModal'
import Type from '../modal/TypeModal'
import SelectModal from '../modal/SelectModal'

Vue.use(Cascader)
Vue.use(PageHeader)
Vue.use(formModel, Button)
Vue.use(Form)
Vue.use(TreeSelect)
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
      labelCol: {span: 2},
      wrapperCol: {span: 22},
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
      departmentid: '',
      personid: '',
      vendorid: '',
      businessclassid: '',
      spinning: false,
      name: '',
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
      approvalVisible: false,
      approvalprocess: false, //1审批流启用 2审批流未启用
      businessname: '',
      approvalText: '',
      isEdit: false,
      
    }
  },
  created() {
    this.initdata()
  },
  computed: {
    rowSelection() {
      const {selectedRowKeys} = this
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
    this.form = this.$form.createForm(this, {formname: 'form'})
  },
  methods: {

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
      var isError = false
      for (const key in this.detailsData) {
        if (this.detailsData[key].doclinequantity == undefined) {
          isError = true
          this.$message.info('明细数量不能为空！')
          return
        } else if (parseInt(this.detailsData[key].doclinequantity) < 1) {
          isError = true
          this.$message.info('明细数量必须大于0！')
          return
        }
      }
      if (isError) {
        this.$message.info('明细数量不能为空！')
        isError = false
        return
      }
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
          values.businessclassid = this.businessclassid
          // values.approvalprocess = values.approvalprocess.join()
          console.log('submit url-->', submitUrl)
          console.log('submit parameter-->', JSON.stringify(values))
          submitForm(values, submitUrl).then((res) => {
            console.log('submit--->', JSON.stringify(res))
            if (res.status == 'SUCCESS') {
              if (this.$route.query.tag == 2) {
                //编辑
                if (this.status == 1) {
                  this.getList(this.$route.query.menu, this.$route.query.materialid, 0)
                } else {
                  this.$multiTab.closeCurrentPage()
                }
              } else {
                //新增
                this.materialid = res.result.bizid
                this.billcode = res.result.billcode
                this.businessname = values.businessclassname
                if (this.status == 2) {
                  this.submitApproval()
                  this.addinit()
                } else if (this.status == 1) {
                  this.isEdit = true
                  this.getList(this.menu, this.materialid, 0)
                  this.getFormdata()
                  this.getColumns()
                }
              }
              this.$message.info(res.errorMsg)
            } else {
              this.$message.error(res.errorMsg);
            }
            /*if (this.$route.query.tag == 1) {
              if (res.status == 'SUCCESS') {
                this.detailsData = []
                if (this.status == 1) {
                  this.getFormdata()
                } else if (this.status == 2) {
                  this.$multiTab.closeCurrentPage()
                }
              }
            }
            this.$message.info(res.errorMsg)*/
          }).catch((err) => {
            this.$message.error(err.message)
          })
        }
      })
    },

    waitquantityChange(value, record) {
      record.doclinequantity = value
    },

    handleChange(value, key, record) {
      record[key] = value
      this.detailsData = this.detailsData.map((item, index) => {
        return {...item, key: index + 1}
      })
    },

    approvalClick(e) {
      if (this.approvalText == '提交审批') {
        this.submitApproval()
      } else {
        const parameter = {}
        parameter.memuid = this.menuid
        parameter.bizid = this.materialid
        var url = '/work/recallProcess'

        console.log('cancel-->', JSON.stringify(parameter))
        getData(parameter, url).then((res) => {
          if (res.status == 'SUCCESS') {
            this.$message.info('撤销成功')
            this.getFormdata()
          } else {
            this.$message.warn(res.errorMsg)
          }
        })
      }
    },

    submitApproval() {
      //提交审批
      const parameter = {}
      parameter.bizid = this.materialid
      parameter.memuid = this.menuid
      var url = ''
      if (this.approvalprocess) {
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
          this.$message.success('提交审批成功')
          this.getFormdata()
        } else {
          console.log('approval error-->', res)
          this.$message.error(res.errorMsg)
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
        this.columns.unshift({title: '序号', dataIndex: 'key', key: 'key', width: '200px'})
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

    onClick({key}) {
      console.log(`Click on item ${key}`)
      if (key == '1') {
        this.detailModal()
      } else {
        return;
      }
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
      this.detailVisible = false
      // add by tf 记录料品来源字段信息 2021年4月19日14:45:03
      this.selectList = this.selectList.map((item, index) => {
        return {
          ...item,
          doclinedefine1: item.materialdefine1,
          doclinedefine2: item.materialdefine2,
          doclinedefine3: item.materialdefine3,
          doclinedefine4: item.materialdefine4,
          doclinedefine5: item.materialdefine5,
          doclinedefine6: item.materialdefine6,
          doclinedefine7: item.materialdefine7,
          doclinedefine8: item.materialdefine8,
          doclinedefine9: item.materialdefine9,
          doclinedefine10: item.materialdefine10,
          doclinedefine11: item.materialdefine11,
          doclinedefine12: item.materialdefine12,
          doclinedefine13: item.materialdefine13,
          doclinedefine14: item.materialdefine14,
          doclinedefine15: item.materialdefine15,
          doclinedefine16: item.materialdefine16,
          doclinedefine17: item.materialdefine17,
          doclinedefine18: item.materialdefine18,
          doclinedefine19: item.materialdefine19,
          doclinedefine20: item.materialdefine20,
        }
      })
      this.detailsData = this.detailsData.concat(this.selectList)
      this.detailsData = this.detailsData.map((item, index) => {
        /*return {...item, key: parseInt(index) + 1}*/
        // add by tf 记录料品行号 2021年4月19日14:46:43
        return {
          ...item,
          key: parseInt(index) + 1,
          doclineno: item.doclineno == undefined ? parseInt(index) + 1 : item.doclineno,
        }
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

    submitEdit(e) {
      this.submit()
    },

    handleSubmit(e) {
      this.status = 1
      this.submit()
    },

    onCascaderChange(value) {
      console.log(this.test)
    },

    getFormdata() {
      this.modalname = this.$route.query.menu
      this.menuid = this.$route.query.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      if (this.$route.query.tag == 1) {
        this.approvalVisible = false
        this.continueVisible = true
        this.saveVisible = true
        this.title = this.$route.query.storageTitle + '新增'
        this.materialclassid = this.$route.query.materialclassid
        if (this.$route.query.menu == 'ShippingNoticeList') {
          this.urlForm = '/bd/dispatchnotice/insterForm'
        }
      } else if (this.$route.query.tag == 2) {
        this.approvalVisible = true
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
            } else if (this.data[i].key == 'businessclassname') {
              this.businessname = this.data[i].value
            } else if (this.data[i].key == 'ApproveStatus') {
              if (this.$route.query.tag == 2) {
                this.continueVisible = false
                /*if (this.data[i].value == 3) {
                  this.cancelVisilbe = true
                  this.approvalVisible = false
                  this.saveVisible = false
                } else if (this.data[i].value == 8) {
                  this.cancelVisilbe = false
                  this.approvalVisible = true
                  this.saveVisible = true
                } else {
                  this.cancelVisilbe = false
                  this.approvalVisible = false
                  this.saveVisible = false
                }*/
                if (this.data[i].value == 3) {
                  this.approvalText = '撤回审批'
                  this.approvalVisible = true
                  //撤回
                } else if (this.data[i].value == 8) {
                  this.approvalText = '提交审批'
                  this.approvalVisible = true
                  //提交
                } else {
                  this.approvalText = ''
                  this.approvalVisible = false
                  //都不显示
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
      var isError = false
      for (const key in this.detailsData) {
        if (this.detailsData[key].doclinequantity == undefined) {
          isError = true
          this.$message.error('明细数量不能为空！')
          return
        } else if (parseInt(this.detailsData[key].doclinequantity) < 1) {
          isError = true
          this.$message.error('明细数量必须大于0！')
          return
        }
      }
      if (!isError) {
        this.submit()
      }
      // 路由跳转
    }
  },
}
</script>
<style lang="less">
</style>
