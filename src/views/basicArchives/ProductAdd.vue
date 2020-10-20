<template>
  <a-layout>
    <a-card>
      <a-form-model ref="ruleForm" :model="{ setform }" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item v-for="item in setform" :label="item.title"  :prop="item.key"  >
          <a-input v-show="item.inputVisible" v-model="item.value" :placeholder="item.placeholder" @blur="() => {}">
            <a-button v-show="item.buttonVisible" slot="suffix" type="link" @click="elect">自动获取</a-button>
          </a-input>
          <a-input v-show="item.textareaVisible" v-model="item.value" type="textarea" :placeholder="item.placeholder" />
          <a-select v-show="item.selectVisible" v-model="item.value" placeholder="please select your zone">
            <a-select-option v-for="s in item.selectList" value="s.key"> {{ s.value }} </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
     
    </a-card>

    <a-layout-footer :style="{ position: 'fixed', width: '100%', bottom: '0px', marginLeft: '-25px', zIndex: '999' }">
      <a-card>
        <a-row>
          <a-col :span="1" :offset="4">
            <a-button type="primary" @click="resetForm">重置表单</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type="primary" @click="onSubmit">保存</a-button>
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type @click="Back">返回</a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-layout-footer>
  </a-layout>
</template>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postProductAdd } from '@/api/manage'

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
const data = [
  {
    key: '1',
    code: 'Y1001',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001',
  },
  {
    key: '2',
    code: 'Y1002',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001',
  },
  {
    key: '3',
    code: 'Y1003',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001',
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
      data,
      columns,
      selectedRowKeys: [],
      headers: {
        authorization: 'authorization-text',
      },
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      other: '',
      setform:  [
        {
          key:'key1',
          title: '人员名称',
          value: 'two',
          buttonVisible: false,
          inputVisible: false,
          selectList: [
            { key: 1, value: 'one' },
            { key: 2, value: 'two' },
          ],
          selectVisible: true,
          textareaVisible: false,
          placeholder: '请输入',
        },
        {
          key:'key2',
          title: '人员手机号',
          value: '',
          inputVisible: true,
          selectVisible: false,
          buttonVisible: false,
          textareaVisible: false,
          selectList: [],
          placeholder: '请输入',
        },
        ]
,

      form: {
        productCode: '', //货品编码
        ProductName: '', //货品名称
        SpecificationModel: '', //规格型号
        Barcode: '', //货品条码
        PackingUnit: '', //包装单位
        MeasurementUnit: '', //计量单位
        ConversionRelationship: '', //换算关系
        desc: '', //货品说明
        SafetyStock: '', //安全库存
        MOQ: '', //起订量
        PurchaseLot: '', //采购批量
        name: '', //自定义追加项
        content: '', //自定义追加项内容
      },
      rules: {
        //校验规则
        ProductName: [{ required: true, message: '请输入货品名称', trigger: 'blur' }],
        productCode: [{ required: true, message: '请输入产品编码', trigger: 'change' }],
        Barcode: [{ required: true, message: '请输入产品条码', trigger: 'change' }],
        key1: [{ required: true, message: '请输入产品条码', trigger: 'change' }],
      },
    }
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
    onSubmit() {

      this.$refs.ruleForm.validate((valid) => {

        if (valid) {
          console.log(valid)

        } else {
          // 等于false
          console.log('error submit!!')
          //   提示提交失败
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
          //   结束函数
        }
      })
    },
    // 返回到清单页面
    Back() {
      // 路由跳转
      this.$router.push({ name: 'ProductList' })
    },
    // 重置表单
    resetForm() {
      // 获取整个表单之后，用resetFieldes方法重置表单，使用这个方法时，表单项必须要绑定prop才有效
      this.$refs.ruleForm.resetFields()
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
