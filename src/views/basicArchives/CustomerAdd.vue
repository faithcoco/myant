<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="客户编码" prop="CustomerCode">
        <a-input
          v-model="form.CustomerCode"
          placeholder="请输入客户编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search
          placeholder="搜索"
          style="width: 400px;margin-bottom:20px"
          @search="onSearch"
        />
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item ref="name" label="客户名称" prop="CustomerName">
        <a-input
          v-model="form.CustomerName"
          placeholder="请输入客户名称"
          @blur="
          () => {
            
          }"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="客户类型">
        <a-input v-model="form.CustomerType" placeholder="请输入客户类型" />
      </a-form-model-item>

      <a-form-model-item label="负责人" prop="principal">
        <a-input v-model="form.principal" placeholder="请输入负责人"></a-input>
      </a-form-model-item>
      <a-form-model-item label="联系人编码" prop="CustomerNature">
        <a-input v-model="form.CustomerNature" placeholder="请输入联系人编码" />
      </a-form-model-item>
      <a-form-model-item label="备注">
        <a-input v-model="form.desc" type="textarea" placeholder="30字以内产品说明" />
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
      <a-form-model-item label="银行账号">
        <a-input v-model="form.AccountNumber" placeholder="请输入银行账号" />
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

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type @click="resetForm">重置表单</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postCustomerAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },

  {
    title: '客户名称',
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 80
  },
  {
    title: '客户编码',
    dataIndex: 'CustomerCode',
    key: 'CustomerCode',
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
const selectcolumns = [
  {
    title: '供应商名称',
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 80
  },
  {
    title: '供应商编号',
    dataIndex: 'CustomerCode',
    key: 'CustomerCode',
    width: 80
  },
  {
    title: '供应商类型',
    dataIndex: 'CustomerNature',
    key: 'CustomerNature',
    width: 80
  },
  {
    title: '负责人',
    dataIndex: 'Industry',
    key: 'Industry',
    width: 80
  }
]
const data = [
  {
    key: '1',
    CustomerName: 'John Brown',
    CustomerCode: 32,
    CustomerNature: '国有',
    Industry: '高新技术'
  },
  {
    key: '2',
    CustomerName: 'Jim Green',
    CustomerCode: 42,
    CustomerNature: '私营',
    Industry: '劳动密集型'
  },
  {
    key: '3',
    CustomerName: 'Joe Black',
    CustomerCode: 32,
    CustomerNature: '私营',
    Industry: '加工'
  }
]

const numberRow = []

export default {
  data() {
    return {
      numberRow,
      selectedRow: [],
      selectcolumns,
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
        CustomerType: '', //客户类型
        CustomerCode: '',
        CustomerNature: '',
        Invoice: '',
        principal: '', //负责人
        Industry: '', //行业
        Address: '', //地址
        DetailAddress: '',
        TaxpayerIdentificationNumber: '', //纳税人识别号
        BankAccount: '',
        AccountNumber: ''
      },
      rules: {
        CustomerName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        principal: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
      }
    }
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        hideDefaultSelections: true,
        onSelection: this.onSelection
      }
    }
  },

  methods: {
    onSearch(value) {
      console.log(value)
    },
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
          postCustomerAdd(this.form).then(res => {
            console.log('res------->', res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'CustomerList' })
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
    ////////
    elect() {
      this.form.CustomerCode = 'PT2020062200001'
    },
    showModal() {
      this.visible = true
    },

    handleOk(e) {
      console.log(e)
      this.visible = false
      this.numberRow = this.selectedRow
      console.log(this.numberRow)
    },
    onChange(record) {
      console.log('check', record)
      if (record.checked) {
        this.selectedRow.push(record)
        console.log(this.selectedRow)
      }
    }
  }
}
</script>
