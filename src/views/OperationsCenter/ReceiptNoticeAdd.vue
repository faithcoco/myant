<template>
  <a-layout>
    <a-spin size="large" :spinning="spinning" tip="正在加载">
      <div>
        <a-card>
          <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
            <a-form-item v-for="item in data" :label="item.title">
              <a-input
                v-decorator="item.decorator"
                :disabled="item.disabled"
                v-show="item.inputVisible"
                :maxLength="item.fieldlength"
              />
              <a-input-number
                :style="{ width: '1370px' }"
                v-decorator="item.decorator"
                v-show="item.inputnumberVisible"
                :max="item.fieldmax"
                :precision="item.fieldprecision"
                :disabled="item.disabled"
              />
              <a-cascader
                v-decorator="item.decorator"
                v-show="item.selectVisible"
                :field-names="{ label: 'title', value: 'key', children: 'children' }"
                :options="item.selectList"
                placeholder="请选择"
                :disabled="item.disabled"
              />

              <a-date-picker
                :style="{ width: '100%' }"
                v-show="item.timepickerVisible"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择日期"
                v-decorator="item.decorator"
                :disabled="item.disabled"
              />
              <a-input
                v-decorator="item.decorator"
                v-show="item.listVisible"
                :maxLength="item.fieldlength"
                :disabled="disabled"
              >
                <a-button slot="suffix" type="link" @click="() => showModal(item)">选择</a-button>
              </a-input>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 21, offset: 2 }">
              <a-tabs>
                <a-tab-pane tab="明细">
                  <a-button @click="() => detailModal()">选择</a-button>
                  <a-table :columns="columns" :data-source="deatilData" :scroll="{ x: 1500 }">
                    <template v-for="col in columns" :slot="col.dataIndex" slot-scope="text, record, index">
                      <div :key="col.dataIndex">
                        <a-input
                          :value="text"
                          @change="(e) => handleChange(e.target.value, col.dataIndex, record)"
                          v-if="col.isEdit"
                        />
                        <template v-else>
                          {{ text }}
                        </template>
                      </div>
                    </template>
                    <span slot="action" slot-scope="text, record">
                      <a-popconfirm title="确定删除?" @confirm="() => deleteItem(record)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm>
                    </span>
                  </a-table>
                </a-tab-pane>
              </a-tabs>
            </a-form-item>
          </a-form>
          <a-modal
            title="选择"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            width="1300px"
            :destroyOnClose="destroyOnClose"
          >
            <archives-modal :name="name" @onSelect="getSelect"></archives-modal>
          </a-modal>
          <a-modal
            title="选择"
            :visible="typeVisible"
            @ok="handleOk"
            @cancel="handleCancel"
            width="1300px"
            :destroyOnClose="destroyOnClose"
          >
            <type :menuname="name" @onSelect="typeSelect"></type>
          </a-modal>
          <a-modal
            title="选择"
            :visible="detailVisible"
            @ok="detailOk"
            @cancel="detailCancel"
            :destroyOnClose="destroyOnClose"
            width="1300px"
          >
            <select-modal :name="name" :visible="visible" @onSelect="detailSelect"></select-modal>
          </a-modal>
        </a-card>
      </div>
    </a-spin>
    <a-layout-footer
      :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-10px', zIndex: '999' }"
    >
      <a-card>
        <a-row type="flex" justify="center" align="top">
          <a-col :span="2">
            <a-button type="primary" ref="submit" v-show="approvalVisilbe" @click="submitApproval">提交审批</a-button>
          </a-col>
          <a-col :span="2">
            <a-button type="primary" ref="submit" @click="handleSubmit">保存继续</a-button>
          </a-col>
          <a-col :span="2">
            <a-button type @click="Back">保存返回</a-button>
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
import { keys } from 'mockjs2'
Vue.use(TreeSelect)
import ArchivesModal from '../other/ArchivesModal'
import Type from '../other/TypeModal'
import SelectModal from '../other/SelectModal'
import { getProductListColumns } from '@/api/manage'
import { Empty } from 'ant-design-vue'
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
      headers: {
        authorization: 'authorization-text',
      },
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
      deatilData: [],
      menuid: '',
      departmentid: '',
      personid: '',
      vendorid: '',
      businessclasscode: '',
      spinning: false,
      name: '',
      approvalVisilbe: false,
      billcode: '',
      destroyOnClose: true,
      menu: '',
      status: 1, //1continue2back
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
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.params.storageTitle !== undefined) {
          this.initdata()
        }
      },
      // 深度观察监听
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form' })
  },
  methods: {
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.params.tag == 1) {
            if (this.$route.params.menu == 'ReceiptNoticeList') {
              var submitUrl = '/bd/docreceiptnotice/instersave'
            } else if (this.$route.params.menu == 'StorageManagementList') {
              var submitUrl = '/bd/Stockinrecord/insterSave'
            }
          } else {
            if (this.$route.params.menu == 'ReceiptNoticeList') {
              var submitUrl = '/bd/docreceiptnotice/updatesave'
              values.receiptnoticeid = this.materialid
            } else if (this.$route.params.menu == 'StorageManagementList') {
              var submitUrl = '/bd/Stockinrecord/updateSave'
              values.stockinid = this.materialid
            }
          }
          if (this.deatilData.length == 0) {
            this.$message.warn('请添加明细')
            return
          }

          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          values.details = this.deatilData
          values.departmentid = this.departmentid
          values.personid = this.personid
          values.vendorid = this.vendorid
          values.businessclasscode = this.businessclasscode
          values.approvalprocess = values.approvalprocess.join()
          console.log('submit url-->', submitUrl)
          console.log('submit parameter-->', JSON.stringify(values))
          submitForm(values, submitUrl)
            .then((res) => {
              console.log('submit--->', JSON.stringify(res))
              if (this.$route.params.tag == 1) {
                if (res.status == 'SUCCESS') {
                  this.deatilData = []
                  if (this.status == 1) {
                    this.getFormdata()
                  } else if (this.status == 2) {
                    this.$router.go(-1)
                  }
                }
              }

              this.$message.info(res.errorMsg)
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        }
      })
    },
    handleChange(value, key, record) {
      record[key] = value
    },

    submitApproval(e) {
      const parameter = {}
      parameter.bizid = this.materialid
      parameter.billcode = this.billcode
      parameter.memuid = this.menuid

      getData(parameter, '/work/submitProcess').then((res) => {
        if (res.status == 'SUCCESS') {
          this.$message.info('提交审批成功')
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },
    deleteItem(record) {
      console.log('on delect', JSON.stringify(record))
      this.deatilData = this.deatilData.filter((item) => item.id !== record.id)
    },
    initdata() {
      this.spinning = true
      this.menu = this.$route.params.menu
      console.log('add menu-->', this.$route)
      if (this.$route.params.menu == 'ReceiptNoticeList') {
        this.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72003'
      } else if (this.$route.params.menu == 'StorageManagementList') {
        this.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72002'
      } else {
        return
      }

      if (this.$route.params.tag == 2) {
        this.materialid = this.$route.params.materialid
        this.getList()
      } else {
        this.deatilData = []
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
      })
    },
    getList() {
      const columnsParams = {}
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      columnsParams.pageNo = 1
      columnsParams.pageSize = 10

      if (this.$route.params.menu == 'ReceiptNoticeList') {
        var urlColumns = '/bd/docreceiptnotice/childrenlist'
        columnsParams.receiptnoticeid = this.materialid
      } else if (this.$route.params.menu == 'StorageManagementList') {
        var urlColumns = '/bd/Stockinrecord/stockinrecordlineList'
        columnsParams.stockinid = this.materialid
      }

      console.log('listdata url--->', urlColumns)
      console.log('listdata parameter-->', JSON.stringify(columnsParams))
      getData(columnsParams, urlColumns).then((res) => {
        console.log(this.$route.params.menu + '/list res-->', JSON.stringify(res))
        this.deatilData = []
        this.deatilData = res.result.data
        for (const key in this.deatilData) {
          this.deatilData[key].id = key
        }
      })
    },
    detailSelect(list) {
      console.log('detail-->', JSON.stringify(list))
      this.selectList = list
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
      for (const key in this.deatilData) {
        this.selectedRowKeys.push(this.deatilData[key].materialid)
      }

      this.detailVisible = true
      this.name = 'ProductList'
    },
    detailOk(e) {
      this.detailVisible = false
      this.deatilData = this.deatilData.concat(this.selectList)
      for (const key in this.deatilData) {
        this.deatilData[key].id = key
      }
    },
    detailCancel(e) {
      this.detailVisible = false
    },
    handleOk(e) {
      console.log('select--->',JSON.stringify(this.selectList))
      if (this.currentkey == 'departmentid') {
        this.typeVisible = false
        this.form.setFieldsValue({
          [this.currentkey]: this.selectList.title,
        })
        this.form.setFieldsValue({
          personid: '',
        })
        this.personid = ''
        this.departmentid = this.selectList.departmentid
      } else if (this.currentkey == 'personid') {
        this.visible = false
        this.form.setFieldsValue({
          [this.currentkey]: this.selectList[0].personname,
        })
        this.personid = this.selectList[0].personid
        this.form.setFieldsValue({
          departmentid: this.selectList[0].departmentname,
        })
        this.departmentid = this.selectList[0].departmentid
      } else if (this.currentkey == 'vendorid') {
        this.visible = false
        this.form.setFieldsValue({
          [this.currentkey]: this.selectList[0].vendorcode,
        })
          this.form.setFieldsValue({
          vendorcontactenterprise: this.selectList[0].vendorname,
        })
          this.form.setFieldsValue({
         vendorcontactaddress: this.selectList[0].vendoraddress,
        })
          this.form.setFieldsValue({
          vendorcontacthead: this.selectList[0].vendorhead,
        })
          this.form.setFieldsValue({
          vendorcontactphone: this.selectList[0].vendortel,
        })
        
        this.vendorid = this.selectList[0].vendorid
      } else if (this.currentkey == 'businessclasscode') {
        this.typeVisible = false
        this.form.setFieldsValue({
          [this.currentkey]: this.selectList.businessclasscode,
        })

        this.form.setFieldsValue({
          businessclassname: this.selectList.title,
        })
        this.businessclasscode = this.selectList.key
      } else if (this.currentkey == 'receiptnoticecode') {
      
        this.visible = false
        this.form.setFieldsValue({
          receiptnoticecode: this.selectList[0].receiptnoticecode,
        })
      }
    },
    handleCancel(e) {
      if (this.currentkey == 'departmentid') {
        this.typeVisible = false
      } else if (this.currentkey == 'personid') {
        this.visible = false
      } else if (this.currentkey == 'vendorid') {
        this.visible = false
      } else if (this.currentkey == 'businessclasscode') {
        this.typeVisible = false
      } else if (this.currentkey == 'receiptnoticecode') {
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
      if (this.currentkey == 'departmentid') {
        this.typeVisible = true
        this.name = 'PersonnelSetting'
      } else if (this.currentkey == 'personid') {
        this.name = 'PersonnelSetting'
        this.visible = true
      } else if (this.currentkey == 'vendorid') {
        this.name = 'SupplierList'
        this.visible = true
      } else if (this.currentkey == 'businessclasscode') {
        this.typeVisible = true
        this.name = 'BusinessCategory'
      } else if (this.currentkey == 'receiptnoticecode') {
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
      this.modalname = this.$route.params.menu
      this.menuid = this.$route.params.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      if (this.$route.params.tag == 1) {
        this.approvalVisilbe = false
        this.title = this.$route.params.storageTitle + '新增'
        this.materialclassid = this.$route.params.materialclassid
        if (this.$route.params.menu == 'ReceiptNoticeList') {
          this.urlForm = '/bd/docreceiptnotice/insterform'
        } else if (this.$route.params.menu == 'StorageManagementList') {
          this.urlForm = '/bd/Stockinrecord/insterForm'
        }
      } else if (this.$route.params.tag == 2) {
        this.approvalVisilbe = true
        this.title = this.$route.params.storageTitle + '编辑'

        if (this.$route.params.menu == 'ReceiptNoticeList') {
          this.urlForm = '/bd/docreceiptnotice/updateform'
          columnsParams.receiptnoticeid = this.materialid
        } else if (this.$route.params.menu == 'StorageManagementList') {
          this.urlForm = '/bd/Stockinrecord/updateForm'
          columnsParams.stockinid = this.materialid
        }
      }
      this.$multiTab.rename(this.$route.path, this.title)

      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))

      getForm(columnsParams, this.urlForm).then((res) => {
        console.log('form--->',JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.data = []
          this.data = res.result
        } else {
          console.log('form res-->', JSON.stringify(res))
          this.$message.warn('EXCEPTION')
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
            } else if (this.data[i].key == 'businessclasscode') {
              this.businessclasscode = this.data[i].keyvalue
            } else if (this.data[i].key == 'receiptnoticecode') {
              this.billcode = this.data[i].keyvalue
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
    Back() {
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