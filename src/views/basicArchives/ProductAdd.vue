<template>
  <a-card>
    <!-- ref="ruleForm"     绑定ref方便后面获取组件的属性和方法
    :model="form"           数据绑定
    :rules="rules"          绑定验证规则
    :label-col="labelCol"   label 标签的布局样式
    :wrapper-col="wrapperCol"  输入控件的布局样式 -->
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!--  label="货品编码"    标签、标题
            required            必填项
            prop="code"         有验证规则和重置表单功能时必填属性-->
      <a-form-model-item label="货品编码" required prop="productCode">
        <!-- v-model="form.code"            数据绑定
            placeholder="请输入货品编码"      输入提示-->
        <a-input v-model="form.productCode" placeholder="请输入货品编码" @blur="() => {}">
          <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
          <!-- slot="suffix"        属性配置  按钮处于右侧
                type="link"         类型设置  链接类型
                @click="elect"      点击事件监听器  发生点击事件后出发函数elect
            -->
        </a-input>
      </a-form-model-item>
      <a-form-model-item ref="ProductName" label="货品名称" prop="ProductName">
        <a-input v-model="form.ProductName" placeholder="请输入货品名称" @blur="() => {}"></a-input>
      </a-form-model-item>
      <a-form-model-item ref="name" label="规格型号" prop="SpecificationModel">
        <a-input v-model="form.SpecificationModel" placeholder="请输入规格型号" @blur="() => {}" />
      </a-form-model-item>
      <a-form-model-item label="货品条码" prop="Barcode">
        <a-input v-model="form.Barcode" placeholder="请输入货品条码" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="计量单位" prop="MeasurementUnit">
        <a-input v-model="form.MeasurementUnit" placeholder="请输入计量单位" @blur="() => {}" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="包装单位" prop="PackingUnit">
        <a-input v-model="form.PackingUnit" placeholder="请输入包装单位" @blur="() => {}" />
      </a-form-model-item>
      <a-form-model-item ref="name" label="换算关系" prop="ConversionRelationship">
        <a-input v-model="form.ConversionRelationship" placeholder="请输入换算关系" @blur="() => {}" />
      </a-form-model-item>
      <a-form-model-item label="货品分类">
        <!-- 下拉菜单 
          show-search                           展示搜索功能
          default-value="1"                     默认值
          placeholder="请选择货品分类"           选择提示
          option-filter-prop="children"         设置为 children 表示对内嵌内容进行搜索
          :filter-option="filterOption"         根据输入项进行筛选
          @focus="handleFocus"                  获得焦点时回调函数
          @blur="handleBlur"                    失去焦点时回调函数
          @change="handleSearchChange"          选中选项时触发的函数
          -->
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
      <a-form-model-item label="货品说明" prop="desc">
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
      <a-form-model-item ref="name" label="安全库存" prop="SafetyStock">
        <a-input
          v-model="form.SafetyStock"
          placeholder="请输入安全库存"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="起订量" prop="MOQ">
        <a-input
          v-model="form.MOQ"
          placeholder="请输入起订量"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="采购批量" prop="PurchaseLot">
        <a-input
          v-model="form.PurchaseLot"
          placeholder="请输入采购批量"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="name" label="自定义追加项" prop="name">
        <a-input
          v-model="form.name"
          placeholder="请输入自定义追加项"
          @blur="
            () => {
              $refs.name.onFieldBlur()
            }
          "
        />
        <a-input
          v-model="form.content"
          placeholder="请输入自定义追加项"
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
      <a-modal v-model="visible" title="选择编码" width="1000px" @ok="handleOk">
        <a-input-search placeholder="请输入搜索内容" @search="onSearch" />
        <br />
        <br />
        <!-- 
        :columns="columns"      表头数据
        :data-source="data"     表体数据
        :pagination="false"     页码展示
        bordered                表格线加粗
        -->
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
          <span slot="checked" style="margin: 0" slot-scope="text, record">
            <a-checkbox v-model="record.checked" @change="onChange(record)" />
          </span>
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-modal>
      <!-- wrapper-col="{ span: 14, offset: 4 }   输入控件设置布局样式
            span: 14    控件宽度比重
            offset: 4   控件左边距-->
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
import { postProductAdd } from '@/api/manage'

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
      selectedRowKeys: [],
      headers: {
        authorization: 'authorization-text'
      },
      size: 'small',
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      other: '',
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
        content: '' //自定义追加项内容
      },
      rules: {
        //校验规则
        ProductName: [{ required: true, message: '请输入货品名称', trigger: 'blur' }],
        productCode: [{ required: true, message: '请输入产品编码', trigger: 'change' }],
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
      this.$refs.ruleForm.validate(valid => {
        //    this.$refs.ruleForm   获取整个表单
        //validate   对整个表单进行校验的方法
        if (valid) {
          //判断valid是否等于true
          postProductAdd(this.form).then(res => {
            //   将数据发送到服务器
            console.log('res------->', res)
          })
          alert('保存成功，点击确认回到档案界面！')
          //   提示用户信息
          this.$router.push({ name: 'ProductList' })
          //   路由跳转
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
    }
  }
}
</script>
