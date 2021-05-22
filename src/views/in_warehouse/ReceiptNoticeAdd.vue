<template>
  <a-layout>
    <a-spin size="large" :spinning="spinning" tip="正在加载">
      <div>
        <a-card>
          <a-form
              class="ant-advanced-search-form"
              :form="form"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 20 }"
              @submit="handleSubmit"
          >
            <a-form-item v-for="(item, index) in data" :key="index" :label="item.title">
              <div v-if="item.selectVisible">
                <a-cascader
                    v-decorator="item.decorator"
                    v-show="item.selectVisible"
                    :field-names="{ label: 'title', value: 'key', children: 'children' }"
                    :options="item.selectList"
                    placeholder="请选择"
                    :disabled="item.disabled"
                />
              </div>
              <div v-else>
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
              </div>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 21, offset: 2 }">
              <a-tabs>
                <a-tab-pane tab="明细">
                  <a-dropdown>
                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()" style="margin-left: 20px">
                      选择
                      <a-icon type="down"/>
                    </a>
                    <a-menu slot="overlay" @click="onClick">
                      <a-menu-item key="1"> 选择料品</a-menu-item>
                      <a-menu-item key="2" v-if="menu == 'StorageManagementList'">参照收货通知单</a-menu-item>
                    </a-menu>
                  </a-dropdown>

                  <a-table :columns="columns" :data-source="detailsData" :scroll="{ x: 3000 }" rowKey="index">
                    <template v-for="col in columns" :slot="col.dataIndex" slot-scope="text, record, index">
                      <div>
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

                    <!--add by tf 货位档案选择 2021年5月23日00:52:19-->
                    <span slot="positioncode" slot-scope="text, record, index">
                      <a-input ref="positionInput" v-model="text" :disabled="disabled">
                        <a-button slot="suffix" type="link"
                                  @click="(e) => handleShowModal(e.target.value, 'positioncode', record, index)">选择</a-button>
                      </a-input>
                    </span>

                    <span slot="doclinequantity" slot-scope="text, record">
                      <a-input
                          :value="text"
                          @change="(e) => waitquantityChange(e.target.value, record)"
                          type="number"
                      />
                    </span>

                    <span slot="action" slot-scope="text, record, zindex">
                      <a-modal v-model="splitmodal_visible" title="类别" @ok="() => splitOk(record)">
                        <p>请输入拆单数量：</p>
                        <a-input-number v-model="splitQuantity" placeholder :min="0"/>
                      </a-modal>
                      <a @click="split(record)" v-if="record.docid !== undefined">拆单</a>

                      <a-divider type="vertical" v-if="record.docid !== undefined"/>

                      <a @click="handleEdit(record)">编辑</a>
                      <a-divider type="vertical"/>

                      <a-popconfirm title="确定删除?" @confirm="() => deleteItem(zindex)">
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
              @ok="archivesOk"
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
            <select-modal :modalname="name" :visible="visible" @onSelect="detailSelect"
                          @onSelectAll="detailSelectAll"></select-modal>
          </a-modal>
        </a-card>
      </div>
    </a-spin>
    <a-layout-footer
        :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-10px', zIndex: '999' }">
      <a-card>
        <a-row type="flex" justify="center" align="top">
          <a-col :span="12">
            <!--入库单打印，收货通知单打印隐藏-->
            <a-button type="primary" style="margin-right: 10px" @click="print"
                      v-if="this.materialid != null && this.materialid != undefined && this.materialid != '' && this.memuid == '03bf0fb1-e9fb-4014-92e7-7121f4f72002'">
              打印
            </a-button>
            <a-button type="primary" style="margin-right: 10px" v-show="approvalVisible" @click="approvalClick">
              {{ approvalText }}
            </a-button>
            <a-button type @click="submitEdit" style="margin-right: 10px" v-if="this.isEdit == false">存为草稿</a-button>
            <a-button type @click="Back" style="margin-right: 10px" v-if="this.isEdit == false">保存送审</a-button>
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
import {logininfo} from '@/store/mutation-types'
import {getData, getForm, getProductListColumns, submitForm} from '@/api/manage'
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
      detailIndex: '',// 明细行下标
      columns: [],
      detailsData: [],
      departmentid: '',
      personid: '',
      vendorid: '',
      warehouseid: '',
      businessclassid: '',
      spinning: false,
      name: '',
      approveStatus: 8,
      destroyOnClose: true,
      menu: '',
      status: 1, //1存为草稿2保存送审
      stockincode: '',
      billcode: '',
      currentRecord: '',
      continueVisible: true,
      approvalVisible: false,
      approvalprocess: false, //1审批流启用 2审批流未启用
      businessname: '',
      splitmodal_visible: false,
      splitQuantity: '',
      approvalText: '',
      isEdit: false,
    }
  },

  activated() {
    this.initdata()
    this.$multiTab.rename(this.$route.name, this.title)
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.initdata()
      },
      // 深度观察监听
    },
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, {formname: 'form'})
  },
  methods: {
    splitOk(record) {
      if (parseInt(record.doclinequantity) < parseInt(this.splitQuantity)) {
        this.$message.info('拆单数量不能大于该行数量！')
        return
      }
      var temp = JSON.parse(JSON.stringify(record))
      temp.doclinequantity = parseInt(record.doclinequantity) - parseInt(this.splitQuantity);
      temp.doclineno = this.detailsData.length + 1;
      this.detailsData.push(temp)

      record.doclinequantity = this.splitQuantity

      this.splitmodal_visible = false
      this.splitQuantity = ''
      //this.detailsData = this.detailsData.map((item, index) => {
      //  return { ...item, doclineno: index + 1 }
      //})
    },
    addinit() {
      this.$multiTab.closeCurrentPage()
      // if (this.status == 1) {
      //   this.getFormdata()
      // } else if (this.status == 2) {

      // }
    },

    onClick({key}) {
      console.log(`Click on item ${key}`)
      if (key == '1') {
        this.detailModal()
      } else {
        this.currentkey = 'list'
        this.name = 'ReceiptNoticeList'
        this.visible = true
      }
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

    split(record) {
      this.splitmodal_visible = true
    },
    handleEdit(record) {
      console.log(JSON.stringify(record.doclineid))
      if (record.docid) {
        this.$message.info('参照明细不能修改')
      } else {
        this.name = 'ProductList'
        this.currentkey = 'edit'
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
          if (this.isEdit == false) {
            if (this.menu == 'ReceiptNoticeList') {
              var submitUrl = '/bd/docreceiptnotice/instersave'
            } else if (this.menu == 'StorageManagementList') {
              var submitUrl = '/bd/Stockinrecord/insterSave'
            }
          } else {
            if (this.menu == 'ReceiptNoticeList') {
              var submitUrl = '/bd/docreceiptnotice/updatesave'
            } else if (this.menu == 'StorageManagementList') {
              var submitUrl = '/bd/Stockinrecord/updateSave'
            }
            values.docid = this.materialid
          }
          if (this.detailsData.length == 0) {
            this.$message.warn('请添加明细')
            return
          }

          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          values.memuid = this.memuid
          values.details = this.detailsData
          values.departmentid = this.departmentid
          values.personid = this.personid
          values.vendorid = this.vendorid
          values.businessclasscode = this.businessclassid
          values.warehouseid = this.warehouseid
          if (values.approvalprocess != null) {
            values.approvalprocess = values.approvalprocess.join()
          }
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
                  // this.addinit()
                }
              }
              this.$message.info(res.errorMsg)
            } else {
              this.$message.error(res.errorMsg);
            }
          }).catch((err) => {
            this.$message.error(err.message);
          })
        }
      })
    },

    // add by tf 货位档案选择 2021年5月23日00:52:19
    handleShowModal(value, key, record, index) {
      this.currentkey = key
      this.detailIndex = index
      if (this.currentkey == 'positioncode') {
        this.name = 'CargoSpace'
        this.visible = true
      }
    },

    waitquantityChange(value, record) {
      record.doclinequantity = value
      //this.detailsData = this.detailsData.map((item, index) => {
      //  return { ...item, doclineno: index + 1 }
      //})
    },
    handleChange(value, key, record) {
      record[key] = value
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

    deleteItem(index) {
      //this.detailsData = this.detailsData.filter((item) => item.doclineno !== record.doclineno)
      this.detailsData.splice(index, 1);
    },
    initdata() {
      this.spinning = true
      this.menu = this.$route.query.menu
      if (this.menu == 'ReceiptNoticeList') {
        this.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72003'
      } else if (this.menu == 'StorageManagementList') {
        this.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72002'
      } else {
        return
      }
      this.materialid = this.$route.query.materialid

      console.log('route-->', this.$route)
      if (this.$route.query.tag == 2) {
        this.isEdit = true
        this.getList(this.menu, this.materialid, 0)
      } else {
        this.isEdit = false
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
      this.scopeList = []
      getProductListColumns(columnsParams, urlColumns).then((res) => {
        this.columns = res.result.columns;
      });
      // add by tf 查询料品档案表单的自定义项设置 2021年3月23日19:39:43
      // edit by tf 废弃 2021年4月7日21:04:01
      /*setTimeout(() => {
        this.getProductColumns();
      }, 1000)*/
    },
    /**
     * 查询料品档案表单的自定义项设置
     * add by tf 2021年3月23日19:39:33
     */
    getProductColumns() {
      const columnsParams = {}
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid;
      // 数组处理 (删除最后操作列)
      const data = JSON.parse(JSON.stringify(this.columns));
      data.splice(data.findIndex(item => item.dataIndex === 'action'), 1);
      columnsParams.columns = JSON.stringify(data);
      getProductListColumns(columnsParams, '/bd/product/getProductDefineList').then((res) => {
        this.columns = res.result.columns
      })
    },
    getList(menu, id, type) {
      const columnsParams = {}
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      columnsParams.pageNo = 1
      columnsParams.pageSize = 10
      columnsParams.docid = id
      if (menu == 'ReceiptNoticeList') {
        var urlColumns = '/bd/docreceiptnotice/childrenlist'
      } else if (menu == 'StorageManagementList') {
        var urlColumns = '/bd/Stockinrecord/stockinrecordlineList'
      }
      console.log('listdata url--->', urlColumns)
      console.log('listdata parameter-->', JSON.stringify(columnsParams))
      getData(columnsParams, urlColumns).then((res) => {
        console.log('list--->', JSON.stringify(res.result.data[0]))
        if (type == 0) {
          //编辑明细
          this.detailsData = []
          this.detailsData = res.result.data
        } else {
          //参照明细
          var addData = []
          addData = res.result.data
          addData = addData.map((item, index) => {
            return {...item, doclinequantity: item.doclinenotputquantity, receiptnoticelineid: item.doclineid}
          })
          this.detailsData = this.detailsData.concat(addData)
        }
        //this.detailsData = this.detailsData.map((item, index) => {
        //  return { ...item, doclineno: index + 1 }
        //})
      })
    },
    detailSelect(list) {
      this.selectList = list
    },
    // add by tf 全选 2021年3月23日12:18:47
    detailSelectAll(list) {
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
      for (const key in this.detailsData) {
        this.selectedRowKeys.push(this.detailsData[key].materialid)
      }
      this.detailVisible = true
      this.name = 'ProductList'
    },
    detailOk(e) {
      this.detailVisible = false
      this.selectList = this.selectList.map((item, index) => {
        return {
          ...item,
          // add by tf 记录料品来源id 2021年3月23日21:08:43
          receiptnoticelineid: item.materialid,
          // edit by tf 料品自定义项带入表体自定义项 2021年4月7日21:04:01
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
        //return { ...item, doclineno: parseInt(index) + 1 }
        return {
          ...item,
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
      console.log('current--->', JSON.stringify(this.currentkey))
      if (this.currentkey == 'departmentid') {
        this.typeVisible = false
        this.form.setFieldsValue({
          departmentid: this.selectList.title,
        })
        this.form.setFieldsValue({
          personid: '',
        })
        this.personid = ''
        this.departmentid = this.selectList.departmentid
      } else if (this.currentkey == 'personid') {
        this.visible = false
        this.form.setFieldsValue({
          personid: this.selectList[0].personname,
        })
        this.personid = this.selectList[0].personid
        this.form.setFieldsValue({
          departmentid: this.selectList[0].departmentname,
        })
        this.departmentid = this.selectList[0].departmentid
      } else if (this.currentkey == 'warehouseid') {
        this.visible = false
        this.form.setFieldsValue({
          warehouseid: this.selectList[0].warehousename,
        })
        this.warehouseid = this.selectList[0].warehouseid
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
          businessclasscode: this.selectList.businessclasscode,
        })

        this.form.setFieldsValue({
          businessclassname: this.selectList.title,
        })
        this.businessclassid = this.selectList.key
      } else if (this.currentkey == 'receiptnoticecode') {
        //收货通知选择
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
        this.getList('ReceiptNoticeList', this.selectList[0].docid, 1)
      } else if (this.currentkey == 'edit') {
        this.visible = false
        var formkey = Object.keys(this.currentRecord)
        for (const key in formkey) {
          if (this.selectList[0][formkey[key]]) {
            if (formkey[key] !== 'key') {
              this.currentRecord[formkey[key]] = this.selectList[0][formkey[key]]
            }
          }
        }
      } else if (this.currentkey == 'list') {
        this.getList('ReceiptNoticeList', this.selectList[0].docid, 1)
        this.visible = false
      } else if (this.currentkey == 'positioncode') {
        this.visible = false
        this.detailsData[this.detailIndex].positionid = this.selectList[0].positionid
        this.detailsData[this.detailIndex].positioncode = this.selectList[0].positioncode
        this.detailsData[this.detailIndex].positionname = this.selectList[0].positionname
      }
    },
    handleCancel(e) {
      console.log('currentkey->', this.currentkey)
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
      } else if (this.currentkey == 'edit') {
        this.visible = false
      } else if (this.currentkey == 'list') {
        this.visible = false
      } else if (this.currentkey == 'warehouseid') {
        this.visible = false
      } else if (this.currentkey == 'positioncode') {
        this.visible = false
      }
    },

    showModal(item) {
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
      } else if (this.currentkey == 'warehouseid') {
        this.name = 'WarehouseList'
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
    getFormdata() {
      this.modalname = this.$route.query.menu
      this.menuid = this.$route.query.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      if (this.isEdit == false) {
        this.approvalText = ''
        this.approvalVisible = false

        this.continueVisible = true
        this.title = this.$route.query.storageTitle + '新增'
        this.materialclassid = this.$route.query.materialclassid
        if (this.$route.query.menu == 'ReceiptNoticeList') {
          this.urlForm = '/bd/docreceiptnotice/insterform'
        } else if (this.$route.query.menu == 'StorageManagementList') {
          this.urlForm = '/bd/Stockinrecord/insterForm'
        }
      } else if (this.isEdit) {
        //编辑

        this.title = this.$route.query.storageTitle + '编辑'

        if (this.menu == 'ReceiptNoticeList') {
          this.urlForm = '/bd/docreceiptnotice/updateform'
        } else if (this.menu == 'StorageManagementList') {
          this.urlForm = '/bd/Stockinrecord/updateForm'
        }
        columnsParams.docid = this.materialid
      }

      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))
      this.data = []
      getForm(columnsParams, this.urlForm).then((res) => {
        if (res.status == 'SUCCESS') {
          this.data = res.result.form
          this.approvalprocess = res.result.data.enabledStatus
        } else {
          this.$message.error(res)
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

              if (this.isEdit) {
                this.continueVisible = false
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
            }
          }
          this.spinning = false
        }, 500)
      })
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
    },
    print(e) {
      const parameter = {}
      var url = '/report/getReportUrl'
      console.log('getReportUrl-->', JSON.stringify(parameter))
      getData(parameter, url).then((res) => {
        if (res.status == 'SUCCESS') {
          let address = null;
          console.log(this.$route.query.memuid);
          if (this.memuid == '03bf0fb1-e9fb-4014-92e7-7121f4f72002') {
            // 入库产品清单打印
            address = res.result + '入库单打印.cpt&id=' + this.materialid
          }
          if (address != null) {
            window.open(address, '_blank')
          }
        } else {
          this.$message.error(res.errorMsg)
        }
      })
    },
  },
}
</script>
<style lang="less">
</style>
