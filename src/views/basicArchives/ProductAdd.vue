<template>
  <a-layout>
    <div>
      <a-card>
        <a-page-header :title="title" @back="Back" />
        <a-form :form="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
          <a-form-item v-for="item in data" :label="item.title">
            <a-input v-decorator="item.decorator" v-show="item.inputVisible" :maxLength="item.fieldlength" />
            <a-input-number
              :style="{ width: '1370px' }"
              v-decorator="item.decorator"
              v-show="item.inputnumberVisible"
              :max="item.fieldmax"
              :precision="item.fieldprecision"
            />
            <a-cascader
              v-decorator="item.decorator"
              v-show="item.selectVisible"
              :field-names="{ label: 'title', value: 'key', children: 'children' }"
              :options="item.selectList"
              placeholder="请选择"
            />

            <a-date-picker
              :style="{ width: '1370px' }"
              v-show="item.timepickerVisible"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择日期"
              v-decorator="item.decorator"
            />
          </a-form-item>
        </a-form>
      </a-card>
    </div>
    <a-layout-footer
      :style="{ position: 'fixed', width: '100%', height: '70px', bottom: '0px', marginLeft: '-25px', zIndex: '999' }"
    >
      <a-card>
        <a-row>
          <a-col :span="1" :offset="4">
            <a-button type="primary" @click="resetForm" v-show="false">重置表单</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type="primary" ref="submit" @click="handleSubmit">保存</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type @click="Back">返回</a-button>
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
    }
  },
  created() {
    this.getForm()
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
        this.getForm()
      },
      // 深度观察监听
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form' })
  },
  methods: {
    onChange(value) {
      console.log(value)
      this.value = value
    },
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.$route.params.tag == 1) {
            if (Vue.ls.get(menuname) == 'ProductList') {
              var submitUrl = '/bd/product/insterMaterial'
            } else if (Vue.ls.get(menuname) == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personinstersave'
            } else if (Vue.ls.get(menuname) == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorinstersave'
            } else if (Vue.ls.get(menuname) == 'CustomerList') {
              var submitUrl = '/bd/customer/customerinstersave'
            } else if (Vue.ls.get(menuname) == 'WarehouseList') {
              var submitUrl = '/bd/warehouse/warehouseinstersave'
            } else if (Vue.ls.get(menuname) == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positioninsterSave'
            }
          } else {
            if (Vue.ls.get(menuname) == 'ProductList') {
              var submitUrl = '/bd/product/updateMaterial'
              values.materialid = this.materialid
            } else if (Vue.ls.get(menuname) == 'PersonnelSetting') {
              var submitUrl = '/bd/baseperson/personupdatesave'
            } else if (Vue.ls.get(menuname) == 'SupplierList') {
              var submitUrl = '/bd/basevendor/vendorupdatesave'
              values.vendorid = this.materialid
            } else if (Vue.ls.get(menuname) == 'CustomerList') {
              var submitUrl = '/bd/customer/customerupdatesave'
              values.customerid = this.materialid
            } else if (Vue.ls.get(menuname) == 'WarehouseList') {
              var submitUrl = '/bd/warehouse/warehouseupdatesave'
              values.warehouseid = this.materialid
            } else if (Vue.ls.get(menuname) == 'CargoSpace') {
              var submitUrl = '/bd/warehouse/positionupdateSave'
              values.positionid = this.materialid
            }
          }

          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          console.log('submit url-->', submitUrl)
          submitForm(values, submitUrl).then((res) => {
            console.log('submit--->', JSON.stringify(res))

            if (res.status == 'SUCCESS') {
              this.form.resetFields()
            }
            this.$message.info(res.errorMsg)
          })
        }
      })
    },

    onCascaderChange(value) {
      console.log(this.test)
    },

    getForm() {
      console.log('route-->', this.$route)

      this.menuid = this.$route.params.menuid
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      if (this.$route.params.tag == 1) {
        this.title = this.$route.params.title + '新增'
        this.materialclassid = this.$route.params.materialclassid
        if (Vue.ls.get(menuname) == 'PersonnelSetting') {
          this.urlForm = '/bd/baseperson/insterForm'
          columnsParams.departmentid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'ProductList') {
          this.urlForm = '/bd/product/materialList'
          columnsParams.materialclassid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'SupplierList') {
          this.urlForm = '/bd/basevendor/insterForm'
          columnsParams.vendorclassid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'CustomerList') {
          this.urlForm = '/bd/customer/insterForm'
          columnsParams.customerclassid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'WarehouseList') {
          this.urlForm = '/bd/warehouse/insterForm'
          columnsParams.warehouseclassid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'CargoSpace') {
          this.urlForm = '/bd/warehouse/positioninsterForm'
          columnsParams.positionid = this.materialid
          columnsParams.warehouseid = this.materialclassid
        } else if (Vue.ls.get(menuname) == 'ReceiptNoticeList') {
          this.urlForm = '/bd/docreceiptnotice/insterform'
        }
      } else if (this.$route.params.tag == 2) {
        this.title = this.$route.params.title + '编辑'
        this.materialid = this.$route.params.materialid
        console.log('materialid', this.materialid)
        if (Vue.ls.get(menuname) == 'ProductList') {
          this.urlForm = '/bd/product/updateform'
          columnsParams.materialid = this.materialid
        } else if (Vue.ls.get(menuname) == 'PersonnelSetting') {
          this.urlForm = '/bd/baseperson/updateForm'
          columnsParams.personid = this.materialid
        } else if (Vue.ls.get(menuname) == 'SupplierList') {
          this.urlForm = '/bd/basevendor/updateForm'
          columnsParams.vendorid = this.materialid
        } else if (Vue.ls.get(menuname) == 'CustomerList') {
          this.urlForm = '/bd/customer/updateForm'
          columnsParams.customerid = this.materialid
        } else if (Vue.ls.get(menuname) == 'WarehouseList') {
          this.urlForm = '/bd/warehouse/updateForm'
          columnsParams.warehouseid = this.materialid
        } else if (Vue.ls.get(menuname) == 'CargoSpace') {
          this.urlForm = '/bd/warehouse/positionupdateForm'
          columnsParams.positionid = this.materialid
        }
      }
      this.$multiTab.rename('/basic_archives/ProductAdd', this.title)
      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))
      getForm(columnsParams, this.urlForm).then((res) => {
        console.log('form res-->', JSON.stringify(res.result))
        this.data = res.result
        setTimeout(() => {
          for (const i in this.data) {
            if (this.data[i].value != '') {
              this.form.setFieldsValue({
                [this.data[i].key]: this.data[i].value,
              })
            }
          }
        }, 1000)
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
    Back() {
      // 路由跳转
      this.$router.go(-1)
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
</style>