/**
 * @author YangNick
 * @date 2020-10-18 14：29
 * 部门员工档案编辑页面
 */
<template>
  <a-layout>
    <a-card>

      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <!--动态加载表单设置-->
        <a-form-model-item v-for="(item,index) in colmuns" :key="index"
                           :ref="item.fieldname.toLowerCase()"
                           :label="item.fielddecription"
                           :prop="item.fieldmust == 1 ? item.fieldname.toLowerCase() : ''"
                           v-if="item.fielddisplay == 1"
                           >
          <a-input v-model="form[item.fieldname.toLowerCase()]" placeholder="" :disabled="item.fieldedit == 1 ? false : true"></a-input>
        </a-form-model-item>

        <!--<a-form-model-item  ref="personbegintime" label="时间" >-->
          <!--<a-date-picker-->
            <!--placeholder="请选择年份"-->
            <!--v-model="form.personbegintime"-->
            <!--style="width:100%"/>-->
        <!--</a-form-model-item>-->

        <!--<a-form-model-item  ref="enablestatus" label="下拉" prop="enablestatus">-->
          <!--&lt;!&ndash;省市区&ndash;&gt;-->
          <!--<a-select v-model="form.enablestatus" allowClear>-->
            <!--<a-select-option value="1" key="1">-->
             <!--1-->
            <!--</a-select-option>-->
            <!--<a-select-option value="2" key="2">-->
              <!--2-->
            <!--</a-select-option>-->
          <!--</a-select>-->
        <!--</a-form-model-item>-->


      </a-form-model>

    </a-card>
    <!--按钮处理-->
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
import { getEditSetting } from '@/api/formSetting'
import { commonRules }  from  '@/utils/validate'
import { logininfo } from '@/store/mutation-types'
export default {
  data() {
    return {
      visible: false,
      headers: {
        authorization: 'authorization-text',
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
      // 表单
      form: {
        mold: null, // 标记
        personid: null, // 员工ID
        enterpriseid: null, // 企业ID
        departmentid: null, //部门ID
        personcode: null, //员工工号
        personname: null, //人员名称
        personphone: null, //人员手机号
        personadministrator: null, //人员类型
        personbegintime: null, //人员入职时间
        personendtime: null, //人员离职时间
        personcreationdate: null, //人员建立时间
        personfounder: null, //人员建立人员
        personlabel: null, //人员个性标签
        personduty: null, //人员职责
        personmemo: null, //人员备注
        personpassword: null, //人员密码
        createby: null, //创建人
        createtime: null, //创建时间
        updateby: null, //更新人
        updatetime: null, //更新时间
        enablestatus: null, //启用标记
        deletestatus: null, //删除标记
        vdef1: null, //预留字段1
        vdef2: null, //预留字段2
        vdef3: null, //预留字段3
        vdef4: null, //预留字段4
        vdef5: null, //预留字段5
        vdef6: null, //预留字段6
        vdef7: null, //预留字段7
        vdef8: null, //预留字段8
        vdef9: null, //预留字段9
        vdef10: null, //预留字段10
        vdef11: null, //预留字段11
        vdef12: null, //预留字段12
        vdef13: null, //预留字段13
        vdef14: null, //预留字段14
        vdef15: null, //预留字段15
      },
      // 必填校验
      rules: {
        mold: [commonRules.required(" ")], // 标记
        personid: [commonRules.required(" ")], // 标记
        enterpriseid: [commonRules.required(" ")], // 标记
        departmentid: [commonRules.required(" ")], // 标记
        personcode: [commonRules.required(" ")], // 标记
        personname: [commonRules.required(" ")], // 标记
        personphone: [commonRules.required(" ")],// 标记
        personadministrator: [commonRules.required(" ")], // 标记
        personbegintime:[commonRules.required(" ")], // 标记
        personendtime: [commonRules.required(" ")], // 标记
        personcreationdate: [commonRules.required(" ")], // 标记
        personfounder: [commonRules.required(" ")], // 标记
        personlabel: [commonRules.required(" ")], // 标记
        personduty: [commonRules.required(" ")], // 标记
        personmemo: [commonRules.required(" ")], // 标记
        personpassword: [commonRules.required(" ")], // 标记
        createby: [commonRules.required(" ")], // 标记
        createtime: [commonRules.required(" ")], // 标记
        updateby: [commonRules.required(" ")], // 标记
        updatetime: [commonRules.required(" ")], // 标记
        enablestatus: [commonRules.required(" ")], // 标记
        deletestatus: [commonRules.required(" ")], // 标记
        vdef1: [commonRules.required(" ")], // 标记
        vdef2: [commonRules.required(" ")], // 标记
        vdef3: [commonRules.required(" ")], // 标记
        vdef4: [commonRules.required(" ")], // 标记
        vdef5: [commonRules.required(" ")], // 标记
        vdef6: [commonRules.required(" ")], // 标记
        vdef7: [commonRules.required(" ")], // 标记
        vdef8: [commonRules.required(" ")], // 标记
        vdef9: [commonRules.required(" ")], // 标记
        vdef10: [commonRules.required(" ")], // 标记
        vdef11: [commonRules.required(" ")], // 标记
        vdef12: [commonRules.required(" ")], // 标记
        vdef13: [commonRules.required(" ")], // 标记
        vdef14: [commonRules.required(" ")], // 标记
        vdef15: [commonRules.required(" ")], // 标记
      },

      // 表单设置模板信息
      colmuns:[],
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
//          postWarehouseAdd(this.form).then((res) => {
//            console.log(res)
//          })
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
    /**
     * 初始化表单设置查询
     */
    initForm(){
        const columnsParams = {}
        columnsParams.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
        columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        getEditSetting(columnsParams).then((res) => {
          console.log(res);
          this.colmuns = res.result;
        })
    },
  },
  // 初始化加载
  created() {
    this.$nextTick(() => {
        // 加载模板设置信息
        console.log("111");
        this.initForm();
    })
  },
}
</script>
