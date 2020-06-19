<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="name" label="类型" required>
        <a-select
          show-search
          :model="value"
          default-value="1"
          placeholder="请选择入库类型"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">采购入库</a-select-option>
          <a-select-option value="2">芯片</a-select-option>
          <a-select-option value="3">汽车零部件</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="编号" required prop="Num">
        <a-input
          v-model="form.Num"
          placeholder="请输入编号"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="showModal">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编号" width="1000px" @ok="handleOk">
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

      <a-form-model-item label="仓库" prop="Warehouse">
        <a-input v-model="form.Warehouse" placeholder="请选择仓库">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="date" label="入库日期" prop="date">
        <a-date-picker
          v-model="form.StorageDate"
          show-time
          type="date"
          placeholder="请选择入库日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="Principal" label="负责人">
        <a-input
          v-model="form.Principal"
          placeholder="请选择负责人"
          @blur="
          () => {
          
         
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="name" label="关联单据" prop="RelateDocuments">
        <a-input
          v-model="form.RelateDocuments"
          placeholder="请选择需要关联的单据"
          @blur="
          () => {
          
         
          }
        "
        >
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="入库产品" prop="StorageProduct">
        <a-input v-model="form.StorageProduct" placeholder="请输入入库产品" @blur="
          () => { }">
          <a-button slot="suffix" type="link">选择</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="备注">
        <a-input
          v-model="form.Remarks"
          placeholder="请输入备注"
          type="textarea"
          @blur="
          () => {
            
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
    title: '类型',
    dataIndex: 'Type',
    key: 'Type',
    scopedSlots: { customRender: 'Type' },
    width: 80
  },
  {
    title: '编号',
    dataIndex: 'Num',
    key: 'Num',
    width: 80
  },
  {
    title: '仓库',
    dataIndex: 'Warehouse',
    key: 'Warehouse',
    width: 80
  },
  {
    title: '入库产品',
    dataIndex: 'StorageProduct',
    key: 'StorageProduct',
    width: 80
  }
]

const data = [
  {
    key: '1',
    Type: '机箱',
    Num: 322311,
    Warehouse: 'A1',
    StorageProduct: 'ASUS'
  },
  {
    key: '2',
    Type: '主板',
    Num: 421231,
    Warehouse: 'A1',
    StorageProduct: '技嘉'
  },
  {
    key: '3',
    Type: '显卡',
    Num: 3221312,
    Warehouse: 'A1',
    StorageProduct: 'RTX2080TI'
  }
]

export default {
  data() {
    return {
      visible: false, ///////////////
      selectedRowKeys: [], ////////////////////////
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
        Type: '', //类型
        Num: '', //编号
        Warehouse: '', //仓库
        StorageDate: '', //入库日期
        Principal: '', //负责人
        RelateDocuments: '', //关联单据
        StorageProduct: '', //入库产品
        Remarks: '', //备注
        desc: '',
        code: '',
        price: ''
      },
      rules: {
        type: [{ required: true, message: '请选择入库类型', trigger: 'blur' }],
        Num: [{ required: true, message: '请输入编号', trigger: 'change' }],
        Warehouse: [{ required: true, message: '请选择仓库', trigger: 'change' }],

        StorageDate: [{ required: true, message: '请选择入库日期', trigger: 'change' }],
        RelateDocuments: [{ required: true, message: '请选择需要关联的单据', trigger: 'blur' }],
        StorageProduct: [{ required: true, message: '请输入入库产品', trigger: 'blur' }]
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
  }
}
</script>
