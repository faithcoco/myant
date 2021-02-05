<template>
  <a-layout>
    <a-spin size="large" :spinning="spinning" tip="正在加载">
      <div>
        <a-card>
          <div></div>
          <a-form class="ant-advanced-search-form" :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
            <a-form-item v-for="item in data" :label="item.title">
              <div v-if="item.selectVisible">
                <a-cascader
                  v-decorator="item.decorator"
                  v-show="item.selectVisible"
                  :field-names="{ label: 'title', value: 'key', children: 'children' }"
                  :options="item.selectList"
                  placeholder="请选择"
                />
              </div>
              <div v-else>
                <a-input v-decorator="item.decorator" v-show="item.inputVisible" :maxLength="item.fieldlength" />
                <a-input-number
                  :style="{ width: '1370px' }"
                  v-decorator="item.decorator"
                  v-show="item.inputnumberVisible"
                  :max="item.fieldmax"
                  :precision="item.fieldprecision"
                />

                <a-date-picker
                  :style="{ width: '100%' }"
                  v-show="item.timepickerVisible"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择日期"
                  v-decorator="item.decorator"
                />
              </div>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    </a-spin>
    <a-layout-footer
      :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-25px', zIndex: '999' }"
    >
      <a-card>
        <a-row>
          <a-col :span="1" :offset="4">
            <a-button type="primary" @click="resetForm" v-show="false">重置表单</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type="primary" ref="submit" @click="handleSubmit">保存继续</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type @click="onBack">保存返回</a-button>
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
import { logininfo} from '@/store/mutation-types'
import { getForm, submitForm} from '@/api/manage'
import { Form } from 'ant-design-vue'
Vue.use(Form)
import { TreeSelect } from 'ant-design-vue'
Vue.use(TreeSelect)

const numberRow = []
export default {
  data() {
    return {
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
      menuname: '',
      spinning: false,
      typeValue: '',
    }
  },
  created() {
    this.getFormdata()
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
        if (val.query.baseTitle !== undefined) {
          this.getFormdata()
        }
      },
      // 深度观察监听
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form' })
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.query.tag == 1) {
            if (this.$route.query.menu == 'ProductList') {
              var submitUrl = '/bd/product/insterMaterial'
            } else if (this.$route.query.menu == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personinstersave'
            } else if (this.$route.query.menu == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorinstersave'
            } else if (this.$route.query.menu == 'CustomerList') {
              var submitUrl = '/bd/customer/customerinstersave'
            } else if (this.$route.query.menu == 'WarehouseList') {
              values.warehousestatus = values.warehousestatus.join()
              var submitUrl = '/bd/warehouse/warehouseinstersave'
            } else if (this.$route.query.menu == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positioninsterSave'
              values.positionstatus = values.positionstatus.join()
            }
          } else {
            if (this.$route.query.menu == 'ProductList') {
              var submitUrl = '/bd/product/updateMaterial'
              values.materialid = this.materialid
            } else if (this.$route.query.menu == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personupdatesave'
              values.personid = this.materialid
            } else if (this.$route.query.menu == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorupdatesave'
              values.vendorid = this.materialid
            } else if (this.$route.query.menu == 'CustomerList') {
              var submitUrl = '/bd/customer/customerupdatesave'
              values.customerid = this.materialid
            } else if (this.$route.query.menu == 'WarehouseList') {
              var submitUrl = '/bd/warehouse/warehouseupdatesave'
              values.warehousestatus = values.warehousestatus.join()
              values.warehouseid = this.materialid
            } else if (this.$route.query.menu == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positionupdateSave'
              values.positionid = this.materialid
              values.positionstatus = values.positionstatus.join()
            }
          }

          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          console.log('submit url-->', submitUrl)
          console.log('submit params-->', JSON.stringify(values))
          submitForm(values, submitUrl).then((res) => {
            console.log('submit--->', JSON.stringify(res))
            if (this.$route.query.tag == 1) {
              if (res.status == 'SUCCESS') {
                this.form.resetFields()
              }
            }

            this.$message.info(res.errorMsg)
          })
        } else {
          console.log('error--->', err)
        }
      })
    },

    onCascaderChange(value) {
      console.log(this.test)
    },

    getFormdata() {
      this.spinning = true
      this.menuid = this.$route.query.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      if (this.$route.query.tag == 1) {
        this.title = this.$route.query.baseTitle + '新增'
        this.materialclassid = this.$route.query.materialclassid
        if (this.$route.query.menu == 'PersonnelSetting') {
          this.urlForm = '/bd/baseperson/insterForm'
          columnsParams.departmentid = this.materialclassid
        } else if (this.$route.query.menu == 'ProductList') {
          this.urlForm = '/bd/product/materialList'
          columnsParams.materialclassid = this.materialclassid
        } else if (this.$route.query.menu == 'SupplierList') {
          this.urlForm = '/bd/basevendor/insterForm'
          columnsParams.vendorclassid = this.materialclassid
        } else if (this.$route.query.menu == 'CustomerList') {
          this.urlForm = '/bd/customer/insterForm'
          columnsParams.customerclassid = this.materialclassid
        } else if (this.$route.query.menu == 'WarehouseList') {
          this.urlForm = '/bd/warehouse/insterForm'
          columnsParams.warehouseclassid = this.materialclassid
        } else if (this.$route.query.menu == 'CargoSpace') {
          this.urlForm = '/bd/warehouse/positioninsterForm'
          columnsParams.warehouseid = this.materialclassid
        }
      } else if (this.$route.query.tag == 2) {
        this.title = this.$route.query.baseTitle + '编辑'
        this.materialid = this.$route.query.materialid
        console.log('materialid', this.materialid)
        if (this.$route.query.menu == 'ProductList') {
          this.urlForm = '/bd/product/updateform'
          columnsParams.materialid = this.materialid
        } else if (this.$route.query.menu == 'PersonnelSetting') {
          this.urlForm = '/bd/baseperson/updateForm'
          columnsParams.personid = this.materialid
        } else if (this.$route.query.menu == 'SupplierList') {
          this.urlForm = '/bd/basevendor/updateForm'
          columnsParams.vendorid = this.materialid
        } else if (this.$route.query.menu == 'CustomerList') {
          this.urlForm = '/bd/customer/updateForm'
          columnsParams.customerid = this.materialid
        } else if (this.$route.query.menu == 'WarehouseList') {
          this.urlForm = '/bd/warehouse/updateForm'
          columnsParams.warehouseid = this.materialid
        } else if (this.$route.query.menu == 'CargoSpace') {
          this.urlForm = '/bd/warehouse/positionupdateForm'
          columnsParams.positionid = this.materialid
        }
      }

      console.log(this.$route.query.menu + ' route--->', this.$route)
      console.log(this.$route.query.menu + ' formurl--->', this.urlForm)
      console.log(this.$route.query.menu + ' form params-->', JSON.stringify(columnsParams))

      getForm(columnsParams, this.urlForm).then((res) => {
       
        this.data = res.result
        this.$multiTab.rename(this.$route.path, this.title)

        setTimeout(() => {
          for (const i in this.data) {
            this.form.setFieldsValue({
              [this.data[i].key]: this.data[i].value,
            })
          }
          this.spinning = false
        }, 500)
      })
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        //判断如果不处于上传中的状态，就log打印上传文件的信息和文件列表
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        //   如果status等于done说明上传成功，并用成功效果的提示框做提示
        this.$message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        //   如果status等于error说明上传失败，并用失败效果的提示框做提示
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleSearchChange(value) {
      console.log(`selected ${value}`)
    },
    // 返回到清单页面
    onBack(e) {
      // 路由跳转
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.query.tag == 1) {
            if (this.$route.query.menu == 'ProductList') {
              var submitUrl = '/bd/product/insterMaterial'
            } else if (this.$route.query.menu == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personinstersave'
            } else if (this.$route.query.menu == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorinstersave'
            } else if (this.$route.query.menu == 'CustomerList') {
              var submitUrl = '/bd/customer/customerinstersave'
            } else if (this.$route.query.menu == 'WarehouseList') {
              values.warehousestatus = values.warehousestatus.join()
              var submitUrl = '/bd/warehouse/warehouseinstersave'
            } else if (this.$route.query.menu == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positioninsterSave'
              values.positionstatus = values.positionstatus.join()
            }
          } else {
            if (this.$route.query.menu == 'ProductList') {
              var submitUrl = '/bd/product/updateMaterial'
              values.materialid = this.materialid
            } else if (this.$route.query.menu == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personupdatesave'
              values.personid = this.materialid
            } else if (this.$route.query.menu == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorupdatesave'
              values.vendorid = this.materialid
            } else if (this.$route.query.menu == 'CustomerList') {
              var submitUrl = '/bd/customer/customerupdatesave'
              values.customerid = this.materialid
            } else if (this.$route.query.menu == 'WarehouseList') {
              var submitUrl = '/bd/warehouse/warehouseupdatesave'
              values.warehousestatus = values.warehousestatus.join()
              values.warehouseid = this.materialid
            } else if (this.$route.query.menu == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positionupdateSave'
              values.positionid = this.materialid
              values.positionstatus = values.positionstatus.join()
            }
          }

          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          console.log('submit url-->', submitUrl)
          console.log('submit params-->', JSON.stringify(values))
          submitForm(values, submitUrl).then((res) => {
            console.log('submit--->', JSON.stringify(res))

            if (res.status == 'SUCCESS') {
              this.$multiTab.closeCurrentPage()
              

              this.form.resetFields()
            }
            this.$message.info(res.errorMsg)
          })
        }
      })
    },
    // 重置表单
    resetForm() {
      // 获取整个表单之后，用resetFieldes方法重置表单，使用这个方法时，表单项必须要绑定prop才有效
      this.form.resetFields()
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    elect() {
      // 点击按钮之后将数据赋值给表单项实现自动获取效果
      this.form.productCode = 'PT2020062200001'
      console.log(this.form.productCode)
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
      this.numberRow = this.selectedRow //将选择的行赋值给表单中的表格行
      console.log(this.numberRow)
    },

    onSearch(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="less">
.spin-content {
  background-color: #e6f7ff;
  padding: 325px;
}
</style>