<template>
  <a-card>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="发货通知单编码" required prop="coding">
        <!-- <a-input v-model="form.ShippingNoticeCode" placeholder="请输入发货通知单编码">
          <a-button slot="suffix" type="link">自动获取</a-button>
        </a-input>-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="客户编码" prop="name">
        <!-- <a-input
          v-model="form.CustomerCode"
          placeholder="请输入客户编码"
          @blur="
          () => {
            
          }"
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="客户地址编码" prop="name">
        <!-- <a-input
          v-model="form.CustomerAddressCode"
          placeholder="请输入客户地址编码"
          @blur="
          () => {
            
          }"
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item label="联系人编码" prop="code">
        <!-- <a-input v-model="form.ContactCode" placeholder="请输入联系人编码" /> -->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="部门编码">
        <!-- <a-input
          v-model="form.DepartmentCode"
          placeholder="请输入部门编码"
          @blur="
          () => {
         
          }
        "
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="业务员编码">
        <!-- <a-input
          v-model="form.SalesmanCode"
          placeholder="请输入业务员编码"
          @blur="
          () => {
         
          }
        "
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="预计退库日期">
        <a-date-picker
          v-model="form.ExpectedReturnDate"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="发货仓库编码">
        <!-- <a-input
          v-model="form.ShippingWarehouseCode"
          placeholder="请输入发货通知单编码"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货编码">
        <!-- <a-input
          v-model="form.InventoryCode"
          placeholder="请输入存货编码"
          @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item ref="name" label="存货名称">
        <a-input
          v-model="form.InventoryName"
          placeholder="请输入存货名称"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="批次编码">
        <!-- <a-input
          v-model="form.BatchCode"
          placeholder="请输入批次编码"
          @blur="
          () => {
            
          }
        "
        />-->
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-form-model-item>
      <a-form-model-item label="数量">
        <a-input
          v-model="form.Quantity"
          placeholder="请输入数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="计量单位">
        <a-input
          v-model="form.Unit"
          placeholder="请输入计量单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装数量">
        <a-input
          v-model="form.PackingQuantity"
          placeholder="请输入包装数量"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="包装单位">
        <a-input
          v-model="form.PackingUnit"
          placeholder="请输入包装单位"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="单价">
        <a-input
          v-model="form.UnitPrice"
          placeholder="请输入单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="含税单价">
        <a-input
          v-model="form.TaxIncludedUnitPrice"
          placeholder="请输入含税单价"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="税率">
        <a-input
          v-model="form.TaxRate"
          placeholder="请输入税率"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="金额">
        <a-input
          v-model="form.Amount"
          placeholder="请输入金额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="含税金额">
        <a-input
          v-model="form.TaxIncludedAmount"
          placeholder="请输入金额"
          @blur="
          () => {
            
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item label="税额">
        <a-input
          v-model="form.Tax"
          placeholder="请输入税额"
          @blur="
          () => {
            
          }
        "
        />
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
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default {
  data() {
    return {
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
        ShippingNoticeCode: '', //发货通知单编码
        CustomerCode: '',
        ContactCode: '',
        DepartmentCode: '', //部门编码
        SalesmanCode: '',
        ExpectedReturnDate: '', //日期
        ShippingWarehouseCode: '',
        InventoryCode: '', //存货编码
        InventoryName: '', //存货名称
        BatchCode: '', //批次编码
        Quantity: '', //数量
        Unit: '', //单位
        PackingQuantity: '', //包装数量
        PackingUnit: '', //包装单位
        UnitPrice: '', //单价
        TaxIncludedUnitPrice: '', //含税单价
        TaxRate: '', //税率
        Amount: '', //金额
        TaxIncludedAmount: '', //含税金额
        Tax: '' //税额
      },
      rules: {
        name: [
          { required: true, message: '请输入产品编码', trigger: 'blur' },
          { min: 1, max: 3, message: '', trigger: 'blur' }
        ],
        region: [{ required: true, message: '', trigger: 'change' }],
        date1: [{ required: true, message: '', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: '请输入产品说明', trigger: 'blur' }]
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
    }
  }
}
</script>
