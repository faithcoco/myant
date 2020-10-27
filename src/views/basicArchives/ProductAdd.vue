<template>
  <a-layout>
    <div class="form">
      <a-card>
        <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" @submit="handleSubmit">
          <a-form-item v-for="item in data" :label="item.title">
            <a-input v-decorator="item.decorator" v-show="item.inputVisible" />
            <a-cascader
              v-model="item.value"
              v-decorator="item.decorator"
              v-show="item.selectVisible"
              :field-names="{ label: 'title', value: 'key', children: 'children' }"
              :options="item.selectList"
              placeholder="请选择"
            />
            <a-date-picker
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
            <a-button type="primary" @click="resetForm">重置表单</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type="primary" @click="handleSubmit">保存</a-button>
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
import { formModel, Button } from 'ant-design-vue'
import { Cascader } from 'ant-design-vue'
Vue.use(Cascader)
Vue.use(formModel, Button)
import { postProductAdd } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import { getForm, submitForm, postData } from '@/api/manage'
const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' },
  },
  {
    title: '编码',
    dataIndex: 'code',
    key: '1',
    width: 80,
    scopedSlots: { customRender: 'code' },
  },
  {
    title: '产品名称',
    dataIndex: 'ProductName',
    key: '2',
    width: 100,
  },
  {
    title: '产品条码',
    dataIndex: 'Barcode',
    key: '3',
    width: 100,
  },
  {
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    key: '4',
    width: 100,
  },
]
const selectcolumns = [
  {
    title: '编码',
    dataIndex: 'code',
    key: '1',
    width: 80,
    scopedSlots: { customRender: 'code' },
  },
  {
    title: '产品名称',
    dataIndex: 'ProductName',
    key: '2',
    width: 100,
  },
  {
    title: '产品条码',
    dataIndex: 'Barcode',
    key: '3',
    width: 100,
  },
  {
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    key: '4',
    width: 100,
  },
]

const numberRow = []
export default {
  data() {
    return {
      numberRow,
      selectedRow: [],
      selectcolumns,
      visible: false,

      columns,
      selectedRowKeys: [],
      headers: {
        authorization: 'authorization-text',
      },
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      other: '',
      data: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
     

      menuid: '03bf0fb1-e9fb-4014-92e7-7121f4f71003',
      urlForm: '/bd/product/materialList',
      materialclassid: '',
      test: '',
    }
  },
  created() {
    this.materialclassid = this.$route.params.materialclassid
    this.getForm()
    this.getRules()
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
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.materialclassid = this.$route.params.materialclassid
        this.getForm()
        this.getRules()
      },
      // 深度观察监听
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
         
          var submitUrl = '/bd/product/insterMaterial'
          values.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
          submitForm(values, submitUrl)
            .then((res) => {
              console.log('submit--->', res)
              if (res.status == 'SUCCESS') {
                this.getForm()
              }
              this.$message.info(res.status)
            })
            .catch(() => {})
        }
      })
    },
    getRules() {
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      this.urlForm = '/bd/product/FormValidation'
      console.log('columns url--->', this.urlForm)
      postData(columnsParams, this.urlForm).then((res) => {
        this.rules = res.result
      })
    },
    onCascaderChange(value) {
      console.log(this.test)
    },
    getForm() {
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      columnsParams.materialclassid = this.materialclassid
      this.urlForm = '/bd/product/materialList'
      console.log('url--->', this.urlForm)
      getForm(columnsParams, this.urlForm).then((res) => {
        console.log('form-->', JSON.stringify(res.result))
        this.data = res.result
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
      this.$router.push({ name: 'ProductList' })
    },
    // 重置表单
    resetForm() {
      // 获取整个表单之后，用resetFieldes方法重置表单，使用这个方法时，表单项必须要绑定prop才有效
       this.form.resetFields();
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      //   console.log(option.componentOptions)
      //   console.log(input.toLowerCase())
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0

      //toLowerCase() 方法用于把字符串转换为小写。
      //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
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
    onChange(record) {
      console.log('check', record)
      if (record.checked) {
        //判断是否选中
        // 将选中的行推到selectedRow中， 其中存放的是被选中的行数据
        this.selectedRow.push(record)
        console.log(this.selectedRow)
      }
    },
    onSearch(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="less">
.form {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;

  height: 775px;
}
</style>