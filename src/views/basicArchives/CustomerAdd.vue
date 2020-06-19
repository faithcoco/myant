<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="客户名称" prop="CustomerName">
        <a-input
          v-model="form.CustomerName"
          placeholder="请输入客户名称"
          @blur="
          () => {
            
          }"
        />
      </a-form-model-item>

      <a-form-model-item label="客户编号" prop="CustomerNumber">
        <a-input
          v-model="form.CustomerNumber"
          placeholder="请输入客户编号"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="客户编号" width="1000px" @ok="handleOk">
        <a-table
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="data"
          :pagination="false"
          bordered
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>
      <a-form-model-item label="客户性质" prop="CustomerNature">
        <a-input v-model="form.CustomerNature" placeholder="请输入客户性质" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="所属行业">
        <a-input
          v-model="form.Industry"
          placeholder="请输入所属行业"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="办公地址">
        <a-input
          v-model="form.Address"
          placeholder="请输入办公地址"
          @blur="
          () => {
          
         
          }
        "
        />

        <a-input v-model="form.DetailAddress" type="textarea" placeholder="请输入详细地址" />
      </a-form-model-item>

      <a-form-model-item label="负责人" prop="principal">
        <a-input v-model="form.principal" placeholder="请选择负责人">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="附件">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <a-button type="link" :size="size">添加附件</a-button>
        </a-upload>
      </a-form-model-item>

      <a-form-model-item ref="name" label="发票抬头">
        <a-input
          v-model="form.Invoice"
          placeholder="请输入发票抬头"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="纳税人识别号">
        <a-input
          v-model="form.TaxpayerIdentificationNumber"
          placeholder="请输入纳税人识别号"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="开户银行">
        <a-input v-model="form.BankAccount" placeholder="请输入开户银行" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">保存</a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">取消</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

const columns = [
  {
    title: '客户名称',
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    scopedSlots: { customRender: 'CustomerName' },
    width: 80
  },
  {
    title: '客户编号',
    dataIndex: 'CustomerNumber',
    key: 'CustomerNumber',
    width: 80
  },
  {
    title: '客户性质',
    dataIndex: 'CustomerNature',
    key: 'CustomerNature',
    width: 80
  },
  {
    title: '所属行业',
    dataIndex: 'Industry',
    key: 'Industry',
    width: 80
  }
]

const data = [
  {
    key: '1',
    CustomerName: 'John Brown',
    CustomerNumber: 32,
    CustomerNature: '国有',
    Industry: "高新技术"
  },
  {
    key: '2',
    CustomerName: 'Jim Green',
    CustomerNumber: 42,
    CustomerNature: '私营',
    Industry: "劳动密集型"
  },
  {
    key: '3',
    CustomerName: 'Joe Black',
    CustomerNumber: 32,
    CustomerNature: '私营',
    Industry: '加工'
  }
]

export default {
  data() {
    return {
      visible: false,
      selectedRowKeys: [],
      data,
      columns,
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        CustomerName: '', //客户名称
        CustomerNumber: '',
        CustomerNature: '',
        Invoice: '',
        principal: '', //负责人
        Industry: '', //行业
        Address: '', //地址
        DetailAddress: '',
        TaxpayerIdentificationNumber: '', //纳税人识别号
        BankAccount: ''
      },
      rules: {
        CustomerName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        principal: [{ required: true, message: '请选择负责人', trigger: 'blur' }]
      }
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        onSelection: this.onSelection
      }
    }
  },

  ////////////////
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    handleSearchChange(value) {
      console.log(`selected ${value}`)
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        console.log('name--->', this.form)
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    //////////////
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    }
    ////////////////
  }
}
</script>
