/**
* @author YangNick
* @date 2020-10-18 14：29
* 部门员工档案编辑页面
*/
<template>
  <a-layout>
    <div v-show="infoVisible">
      <a-card>
        <a-col :span="24">
          <a-form  :model="form"  :label-col="labelCol" :wrapper-col="wrapperCol">
            <!--动态加载表单设置-->
            <a-form-item v-for="(item,index) in colmuns" :key="index"
                         :ref="item.fieldname.toLowerCase()"
                         :label="item.fielddecription"
                         v-if="item.fielddisplay == 1"
            >
              <!--文本框,数值-->
              <i v-show="item.fieldentertype == '字符' || item.fieldentertype == '数值'">
                {{form[item.fieldname.toLowerCase()]}}
              </i>
              <!--时间-->
              <i v-show="item.fieldentertype == '时间'">
                {{ longToDate(form[item.fieldname.toLowerCase()])}}
              </i>
            </a-form-item>
          </a-form>
        </a-col>
      </a-card>
      <!--按钮处理-->
      <a-layout-footer :style="{ position: 'fixed',width: '100%',bottom: '0px', marginLeft: '-25px'}">
        <a-card>
          <a-row>
            <a-col :span='1' :offset="4">
              <a-button type="primary"  @click="handleEdit">编辑</a-button>
            </a-col>
            <a-col :span='1' :offset="1">
              <a-button type  @click="Back">返回</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-layout-footer>
    </div>
    <div v-show="editVisible">
      <a-card>
        <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
          <!--动态加载表单设置-->
          <a-form-model-item v-for="(item,index) in colmuns" :key="index"
                             :ref="item.fieldname.toLowerCase()"
                             :label="item.fielddecription"
                             :prop="item.fieldmust == 1 ? item.fieldname.toLowerCase() : ''"
                             v-if="item.fielddisplay == 1"
          >
            <!--文本框-->
            <a-input v-if="item.fieldentertype == '字符'" v-model="form[item.fieldname.toLowerCase()]" placeholder="" :disabled="item.fieldedit == 1 ? false : true"></a-input>
            <!--时间-->
            <a-date-picker v-if="item.fieldentertype == '时间'"  placeholder="请选择日期"  v-model="form[item.fieldname.toLowerCase()]" :disabled="item.fieldedit == 1 ? false : true" style="width:100%"/>
            <!--数值-->
            <a-input v-if="item.fieldentertype == '数值'" type="number" v-model="form[item.fieldname.toLowerCase()]" placeholder="" :disabled="item.fieldedit == 1 ? false : true"></a-input>

          </a-form-model-item>

        </a-form-model>
      </a-card>
      <!--按钮处理-->
      <a-layout-footer :style="{ position: 'fixed',width: '100%',bottom: '0px', marginLeft: '-25px'}">
        <a-card>
          <a-row>
            <a-col :span='1' :offset="4">
              <a-button type="primary"  @click="resetForm">重置表单</a-button>
            </a-col>
            <a-col :span='1' :offset="1">
              <a-button type="primary"   @click="onSubmit">保存</a-button>
            </a-col>
            <a-col :span='1' :offset="1">
              <a-button type   @click="Back">返回</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-layout-footer>
    </div>

  </a-layout>
</template>
<script>
  import Vue from 'vue'
  import { formModel, Button } from 'ant-design-vue'
  Vue.use(formModel, Button)
  import { getEditSetting } from '@/api/formSetting'
  import { commonRules }  from  '@/utils/validate'
  import { logininfo } from '@/store/mutation-types'
  import { insertBaseperson,getBasepersonInfo,updateBaseperson } from '@/api/manage'


  export default {
    data() {
      return {
        visible: false,
        infoVisible: false,
        editVisible: true,
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
          departmentcode:null,// 部门编码
          personcode: null, //员工工号
          personname: null, //人员名称
          personphone: null, //人员手机号
          personadministrator: null, //人员类型
          personbegintime:null, //人员入职时间
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

      // 返回列表界面
      Back() {
        this.$router.push({ name: 'personnel-setting' });
      },
      // 重置表单
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },

      showModal() {
        this.visible = true
      },

      // 保存
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          console.log('name--->', this.form)
          if (valid) {
            console.log(this.form.personid);
            if (this.form.personid != null) {
              updateBaseperson(this.form).then((res) => {
                if (res.status == 'FAILED') {
                  this.$message.error(res.errorMsg);
                } else {
                  this.$message.success("保存成功");
                  this.editVisible = false
                  this.infoVisible = true
                }
              })
            } else {
              this.form.departmentid = this.$route.query.departmentid;
              insertBaseperson(this.form).then((res) => {
                if (res.status == 'FAILED') {
                  this.$message.error(res.errorMsg);
                } else {
                  this.$message.success("保存成功");
                  this.editVisible = false
                  this.infoVisible = true
                }
              })
            }
          } else {
            return false
          }
        })
      },

      // 编辑
      handleEdit(){
        this.editVisible = true;
        this.infoVisible = false;
      },

      /**
       * 初始化表单
       */
      initForm(){
        const columnsParams = {}
        columnsParams.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
        columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
        getEditSetting(columnsParams).then((res) => {
          console.log(res);
          this.colmuns = res.result;
        })
        if (this.$route.query.personid != null && this.$route.query.personid != "" && this.$route.query.personid != undefined) {
          const params = {}
          params.id = this.$route.query.personid;
          getBasepersonInfo(params)
            .then((res) => {
              console.log('员工信息返回值--getBasepersonInfo----->', JSON.stringify(res))
              this.form = res.result
            }).catch((err) => {
          })
        } else {
          this.resetForm();
        }
      },

      /**
       * 格式化日期方法
       * @param row
       * @returns {string}
       */
      longToDate(row){
        if (row != null && row != "") {
          let date = new Date(row);
          return date.toLocaleDateString();
        }
        return "";
      },
    },
    // 初始化加载
    activated() {
      if (this.$route.query.operation == 'info') {
        this.editVisible = false;
        this.infoVisible = true;
      } else {
        this.editVisible = true;
        this.infoVisible = false;
      }
      // 加载模板设置信息
      this.initForm();
    },
  }
</script>
