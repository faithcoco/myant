<template>
  <a-card>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="供应商编码test" required prop="SupplierCode">
        <a-input v-model="form.SupplierCode" placeholder="请输入供应商编码" @blur="() => {}">
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="供应商名称" prop="supplierName">
        <a-input
          v-model="form.supplierName"
          placeholder="请输入供应商名称"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        ></a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编号" width="1000px" @ok="handleOk">
        <a-input-search placeholder="搜索" style="width: 400px;margin-bottom:20px" @search="onSearch" />

        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text, record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item label="供应商类型" prop="SupplierType">
        <a-input v-model="form.SupplierType" placeholder="请输入供应商类型"></a-input>
      </a-form-model-item>
      <a-form-model-item label="负责人" prop="region">
        <a-input v-model="form.region" placeholder="请选择负责人"></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="联系人编码" prop="ContactPerson">
        <a-input
          v-model="form.ContactPerson"
          placeholder="请输入联系人编码"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="desc">
        <a-input v-model="form.desc" type="textarea" placeholder="30字以内产品说明" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="纳税人识别号" prop="TaxpayerIdentificationNumber">
        <a-input
          v-model="form.TaxpayerIdentificationNumber"
          placeholder="请输入纳税人识别号"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
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
        <a-button type="primary" @click="resetForm">重置表单</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
        <a-button type style="margin-left: 10px;" @click="Back">返回</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postSupplierAdd } from '@/api/manage'

const columns = [
  {
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },
  {
    title: '供应商名称',
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 80,
    scopedSlots: { customRender: 'supplierName' }
  },
  {
    title: '供应商编号',
    dataIndex: 'SupplierCode',
    key: 'SupplierCode',
    width: 80
  },
  {
    title: '供应商类型',
    dataIndex: 'SupplierType',
    key: 'SupplierType',
    width: 80
  },
  {
    title: '负责人',
    dataIndex: 'ContactPerson',
    key: 'ContactPerson',
    width: 80
  }
]
const selectcolumns = [
  {
    title: '供应商名称',
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 80,
    scopedSlots: { customRender: 'supplierName' }
  },
  {
    title: '供应商编号',
    dataIndex: 'SupplierCode',
    key: 'SupplierCode',
    width: 80
  },
  {
    title: '供应商类型',
    dataIndex: 'SupplierType',
    key: 'SupplierType',
    width: 80
  },
  {
    title: '负责人',
    dataIndex: 'ContactPerson',
    key: 'ContactPerson',
    width: 80
  }
]
const data = [
  {
    key: '1',
    supplierName: 'John Brown',
    SupplierCode: 32,
    SupplierType: '服装',
    ContactPerson: '老王'
  },
  {
    key: '2',
    supplierName: 'Jim Green',
    SupplierCode: 42,
    SupplierType: '电子',
    ContactPerson: '李四'
  },
  {
    key: '3',
    supplierName: 'Joe Black',
    SupplierCode: 32,
    SupplierType: '餐饮',
    ContactPerson: '张三'
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
      data,
      columns,
      selectedRowKeys: [],
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      form: {
        code: '',
        supplierName: '', //供应商名称
        region: '', //负责人
        SupplierCode: '', //供应商编号
        delivery: false,
        SupplierType: '',
        resource: '',
        desc: '',
        TaxpayerIdentificationNumber: '', //纳税人识别号
        ContactPerson: '', //联系人
        Tel: ''
      },
      rules: {
        supplierName: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        region: [{ required: true, message: '请选择负责人', trigger: 'change' }],
        SupplierCode: [{ required: true, message: '请输入供应商编码', trigger: 'change' }]
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
        if (valid) {
          postSupplierAdd(this.form).then(res => {
            console.log('res------->', res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'SupplierList' })
        } else {
          console.log('error submit!!')
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
        }
      })
    },
    Back() {
      this.$router.push({ name: 'SupplierList' })
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
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },

    showModal() {
      this.visible = true
    },
    elect() {
      this.form.SupplierCode = 'PT2020062200001'
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
