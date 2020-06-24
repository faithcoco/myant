<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
   
    >
      <a-form-model-item label="货品编码" required prop="code" >
        <a-input
          v-model="form.code"
          placeholder="请输入货品编码"
          @blur="
          () => {
            
          }"
        >
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
        </a-input>
      </a-form-model-item>

      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search placeholder="请输入搜索内容" @search="onSearch" />
        <br />
        <br />
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text,record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>

      <a-form-model-item ref="ProductName" label="货品名称" prop="ProductName">
        <a-input
          v-model="form.ProductName"
          placeholder="请输入货品名称"
          @blur="
          () => {
            
          }"
        >
         
        </a-input>
      
      </a-form-model-item>
      <a-form-model-item ref="name" label="规格型号">
        <a-input
          v-model="form.SpecificationModel"
          placeholder="请输入规格型号"
          @blur="
          () => {
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="货品条码" prop="Barcode">
        <a-input v-model="form.Barcode" placeholder="请输入货品条码" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="计量单位">
        <a-input
          v-model="form.MeasurementUnit"
          placeholder="请输入计量单位"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="包装单位">
        <a-input
          v-model="form.MeasurementUnit"
          placeholder="请输入包装单位"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="换算关系">
        <a-input
          v-model="form.MeasurementUnit"
          placeholder="请输入换算关系"
          @blur="
          () => {
          
         
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="货品分类">
        <a-select
          show-search
          default-value="1"
          placeholder="请选择货品分类"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">专用设备</a-select-option>
          <a-select-option value="2">芯片</a-select-option>
          <a-select-option value="3">汽车零部件</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="货品说明">
        <a-input v-model="form.desc" type="textarea" placeholder="30字以内货品说明" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="批次管理">
        <a-select
          show-search
          default-value="1"
          placeholder="请选择批次管理"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">做批次管理</a-select-option>
          <a-select-option value="2">不做批次管理</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="name" label="生成批次结存帐">
        <a-select
          show-search
          default-value="1"
          placeholder="请选择生成批次结存帐"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleSearchChange"
        >
          <a-select-option value="1">严格控制批次出库</a-select-option>
          <a-select-option value="2">不严格控制批次出库</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="name" label="安全库存">
        <a-input
          v-model="form.SalePrice"
          placeholder="请输入安全库存"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="起订量">
        <a-input
          v-model="form.SalePrice"
          placeholder="请输入起订量"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="采购批量">
        <a-input
          v-model="form.SalePrice"
          placeholder="请输入采购批量"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="自定义追加项">
        <a-input
          v-model="form.SalePrice"
          placeholder="请输入自定义追加项"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
        <a-input
          v-model="form.SalePrice"
          placeholder="请输入自定义追加项"
          @blur="
          () => {
            $refs.name.onFieldBlur();
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
        <a-button type @click="resetForm">保存并继续</a-button>
        <a-button type="primary" style="margin-left: 10px;" @click="onSubmit">保存</a-button>
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
    title: '选择',
    dataIndex: 'checked',
    key: 'checked',
    width: 80,
    scopedSlots: { customRender: 'checked' }
  },
  {
    title: '编码',
    dataIndex: 'code',
    key: '1',
    width: 80,
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '产品名称',
    dataIndex: 'ProductName',
    key: '2',
    width: 100
  },
  {
    title: '产品条码',
    dataIndex: 'Barcode',
    key: '3',
    width: 100
  },
  {
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    key: '4',
    width: 100
  }
]
const selectcolumns = [
  {
    title: '编码',
    dataIndex: 'code',
    key: '1',
    width: 80,
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '产品名称',
    dataIndex: 'ProductName',
    key: '2',
    width: 100
  },
  {
    title: '产品条码',
    dataIndex: 'Barcode',
    key: '3',
    width: 100
  },
  {
    title: '规格型号',
    dataIndex: 'SpecificationModel',
    key: '4',
    width: 100
  }
]
const data = [
  {
    key: '1',
    code: 'Y1001',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001'
  },
  {
    key: '2',
    code: 'Y1002',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001'
  },
  {
    key: '3',
    code: 'Y1003',
    ProductName: '自动炒菜机',
    Barcode: '101010101010',
    SpecificationModel: 'Y001'
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
      selectedRowKeys: [], // Check here to configure the default column
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        ProductName: '',
        code: '',
        Barcode: '',
        SpecificationModel: '',
        MeasurementUnit: '',
        ProductCategories: '',
        SalePrice: '',
        PurchasePrice: '',
        desc: ''
      },
      rules: {
        ProductName: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入产品编码', trigger: 'change' }],
        Barcode: [{ required: true, message: '请输入产品条码', trigger: 'change' }]
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

    elect() {
      this.form.code = 'PT2020062200001'
      console.log(this.form.code)
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
