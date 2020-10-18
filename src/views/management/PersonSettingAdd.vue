/**
 * @author YangNick
 * @date 2020-10-18 14：29
 * 部门员工档案编辑页面
 */
<template>
  <a-layout>
    <a-card>

      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="name" label="仓库编码" prop="WarehouseCode">
          <a-input v-model="form.WarehouseCode" placeholder="请输入仓库编码">
            <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
          </a-input>
        </a-form-model-item>
        <a-form-model-item ref="name" label="仓库编码1" prop="WarehouseCode">
          <a-input v-model="form.WarehouseCode" placeholder="请输入仓库编码">
            <a-button slot="suffix" type="link" @click="elect">自动获取</a-button>
          </a-input>
        </a-form-model-item>
      </a-form-model>

    </a-card>

    <a-layout-footer :style="{ position: 'fixed',width: '100%',bottom: '0px', marginLeft: '-25px'}">
      <a-card>
        <a-row>
          <a-col :span='1' :offset="4">
            <a-button type="primary" @click="resetForm">重置表单</a-button>
          </a-col>
          <a-col :span='1' :offset="1">
            <a-button type="primary"  @click="onSubmit">保存</a-button>
          </a-col>
          <a-col :span='1' :offset="1">
            <a-button type  @click="Back">返回</a-button>
          </a-col>
        </a-row>
      </a-card>
    </a-layout-footer>
  </a-layout>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
import { postWarehouseAdd } from '@/api/manage'
export default {
  data() {
    return {
      visible: false,
      headers: {
        authorization: 'authorization-text',
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      // 表单
      form: {
        WarehouseCode: '', //仓库编码
        WarehouseName: '', //仓库名称
        WarehouseManager: '', //仓库负责人
        WarehouseAddress: '', //仓库地址
        WarehouseDetailedAddress: '', //仓库详细地址
        CargoSpaceManagement: '', //货位管理
        BatchManagement: '', //批次管理
      },
      // 必填校验
      rules: {
        WarehouseCode: [{ required: true, message: '请输入产品编码', trigger: 'blur' }],
      },
    }
  },
  computed: {

  },
  methods: {

    // 保存
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        console.log('name--->', this.form)
        if (valid) {
          postWarehouseAdd(this.form).then((res) => {
            console.log(res)
          })
          alert('保存成功，点击确认回到档案界面!')
          this.$router.push({ name: 'personnel-setting' })
        } else {
          console.log('error submit!!')
          alert('亲，您的填写内容不符合要求，请重新填写！！！')
          return false
        }
      })
    },
    // 返回列表界面
    Back() {
      this.$router.push({ name: 'personnel-setting' })
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 获取单据号
    elect() {
      this.form.WarehouseCode = 'PT2020062200001'
    },
    showModal() {
      this.visible = true
    },

  },

  // 初始化加载
  created() {
    this.$nextTick(() => {
        // 加载模板设置信息
        console.log("111");
    })
  },
}
</script>
