<template>
  <div>
    <a-layout>
      <a-layout-content>
        <a-card>
          <h2>企业信息</h2>
        </a-card>
        <br />
        <a-card>
          <a-row type="flex" justify="space-between">
            <a-col style="font-weight:bold" :span="4"> {{ form.companyName }}&nbsp;(ID:&nbsp;{{ form.companyCode }}) </a-col>
            <a-col :span="12">
              <a-button type="primary" style="margin-left:20px" @click="Initialize()">初始化</a-button>
              <a-button type="primary" style="margin-left:20px" @click="edit()">编辑</a-button>
              <a-button type="primary" style="margin-left:20px" @click="disband()">解散企业</a-button>
            </a-col>
          </a-row>
          <a-divider type="horizontal" />
          <a-row>
            <a-col>
              <a-form 
              layout="vertical"
              ref="ruleForm"
              :model="form"
              :rules="rules">
                <!-- <a-form-item>
                  <a-icon style="margin-right:10px" type="barcode" class="upload-icon" />企业编码:{{ form.companyCode }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="bank" class="upload-icon" />企业名称: {{ form.companyName }}
                </a-form-item> -->
                <a-form-item>
                  <a-icon style="margin-right:10px" type="user" class="upload-icon" />联系人: {{ form.contactPerson }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="phone" class="upload-icon" />手机: {{ form.phone }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="mail" class="upload-icon" />邮箱: {{ form.mail }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="deployment-unit" class="upload-icon" />使用人数:{{ form.userCount }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="logout" class="upload-icon" />LOGO: {{ form.LOGO }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="contacts" class="upload-icon" />到期日: {{ form.expiryDate }}
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
        <br />
      </a-layout-content>
    </a-layout>

    <a-modal
      title="单据数据初始化"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>
        注意事项：这个操作将会清除企业中所有成员的单据信息包括:
      </p>
      <P> -所有单据及费用明细 </P>
      <P>-所有审批历史 </P>
      <P>-所有借还款记录</P>
      <P> -所有报表统计数据</P>
      <P>-所有自定义扩展内录入的业务对象数据</P>
      <P style="color:red"> -所有预算执行数据 该操作无法撤销或恢复，请慎重使用。</P>
      <a-checkbox v-model="ok">我已了解该操作的风险</a-checkbox>
    </a-modal>
    <a-modal
      title="企业基础设置"
      :visible="companyVisible"
      :confirm-loading="confirmLoading"
      @ok="companyOk"
      @cancel="companyCancel"
      :width='1000'
    >
      <p style="font-weight:bold">
        基础信息
      </p>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
          <a-form-model-item label="企业编码:"  prop="companyCode">
          <a-input v-model="form.companyCode" placeholder="请输入企业编码"></a-input>
          </a-form-model-item>
          <a-form-model-item label="企业名称:"  prop="companyName">
          <a-input v-model="form.companyName" placeholder="请输入企业名称"></a-input>
          </a-form-model-item>
          <a-form-model-item label="联系人:"   prop="contactPerson">
          <a-input v-model="form.contactPerson"  placeholder="请输入联系人"></a-input>
          </a-form-model-item>
          <a-form-model-item label="手机:"   prop="phone">
          <a-input v-model="form.phone"   placeholder="请输入手机"></a-input>
          </a-form-model-item>
          <a-form-model-item label="邮箱:"  prop="mail">
          <a-input v-model="form.mail"   placeholder="请输入邮箱"></a-input>
          </a-form-model-item>
          <a-form-model-item label="使用人数:"  prop="userCount">
          <a-input v-model="form.userCount" placeholder="请输入使用人数"></a-input>
          </a-form-model-item>
          <a-form-model-item label="LOGO:"  prop="LOGO">
          <a-input v-model="form.LOGO" placeholder="请输入LOGO"></a-input>
          </a-form-model-item>
          <a-form-model-item label="到期日:"  prop="expiryDate">
          <a-input v-model="form.expiryDate" placeholder="请输入到期日"></a-input>
          </a-form-model-item>
      </a-form-model>
    </a-modal>

    
    <a-modal
      title="初始化确认"
      :visible="confirmVisible"
      :confirm-loading="confirmLoading"
      @ok="confirmOk"
      @cancel="confirmCancel"
    >
    <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
      <a-form-model-item >
      {{form.companyName}}
      </a-form-model-item>
      <a-form-model-item label="" prop="cName">
      <a-input v-model="form.cName" placeholder="输入企业名称以确认初始化企业数据"></a-input>
      </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      :visible="phoneVisible"
      :confirm-loading="confirmLoading"
      @ok="phoneOk"
      @cancel="phoneCancel"
      :width='700'
    >
    <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="text-align:center"
      >
      <a-form-model-item >
        <span>手机验证通过后会初始化数据</span>
      </a-form-model-item>
      <a-form-model-item label="输入手机号:" prop="Newphone" required>
      <a-input v-model="form.Newphone" placeholder="请输入手机号"></a-input>
      </a-form-model-item>
      <a-form-model-item label="滑动验证码:">
        <slider ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
      </a-form-model-item>
      <a-form-model-item label="输入验证码:" prop="VerificationCode" required>
        <a-input v-model="form.VerificationCode" placeholder="输入验证码-111">
          <a-button  slot="suffix" type="link" @click="getMailVerificationCode">获取验证码</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item >
        <p style="color:red">该操作无法撤销或恢复，请慎重使用。</p>
      </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import Slider from '@/components/tools/Slider'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

import { mapActions } from 'vuex'
export default {
components: {
		Slider
	},
  data() {
    return {
      ok:false,
      visible: false,
      companyVisible: false,
      confirmVisible: false,
      confirmLoading: false,
      phoneVisible: false,
      cName:'',
      form:{
        companyCode: 'rEcbrupMpQv400',
        companyName: '上古',
        contactPerson: '无',
        phone: '无',
        Newphone: '',
        mail:'无',
        userCount: '无',
        LOGO: '无',
        expiryDate: '无',
        cName:'',
        VerificationCode:'',
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
          //校验规则
          companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          cName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
      },
    }
  },
  methods: {
          confirmSuccess:function (confirmSuccess) {
            this.Success = confirmSuccess
            console.log(this.Success);
          },
    Initialize() {
      this.visible = true
    },
    edit(){
      this.companyVisible = true
    },
    companyOk(e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.$refs.ruleForm.validate((valid) => {
          //    this.$refs.ruleForm   获取整个表单
          //validate   对整个表单进行校验的方法
          if (valid) {
          //判断valid是否等于true
              this.$message.info('保存成功！');
              this.companyVisible = false
          //   提示用户信息
          } else {
          // 等于false
          console.log('error submit!!')
          //   提示提交失败
          this.$message.info('亲，您的填写内容不符合要求，请重新填写！！！');
          return false
          //   结束函数
          }
        })
        this.confirmLoading = false
      }, 2000)
    },
    companyCancel(){
      console.log('Clicked cancel button')
      this.$refs.ruleForm.resetFields()
      this.companyVisible = false
    },
    ...mapActions(['Logout']),
    disband(){
       this.$confirm({
        title: '确认将要解散企业？',
        content: '解散企业操作不可撤回，请慎重考虑',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      });
    },

    handleOk(e) {
      console.log("ok--->",this.ok);
      if (!this.ok) {
        this.$message.info('请勾选“我已了解该操作的风险”');
        return false
      }
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        this.confirmVisible = true
      }, 2000)
    },
    confirmOk(e) {
      this.confirmLoading = true
      console.log('this.form.cName------>',this.form.cName);
      console.log('this.form.companyName------>',this.form.companyName);
      setTimeout(() => {
          this.$refs.ruleForm.validate((valid) => {
          if (valid) {
          if (this.form.cName===this.form.companyName) {
            console.log('ok');
              this.confirmVisible = false
          } else {
            this.$message.info("企业名称不一致")
            console.log('error submit!!')
            }
          }      
          this.confirmLoading = false
          this.phoneVisible = true
          return false
        })
      }, 2000)
    },
    phoneOk(){
      this.confirmLoading = true
      setTimeout(() => {
      this.phoneVisible = false
      this.$refs.slideblock.reset();
      this.confirmLoading = false
      }, 4000)
    },
    phoneCancel(){
      this.confirmLoading = false
      this.phoneVisible = false

    },
    getMailVerificationCode(){
      if (this.Success!=true) {
          this.$message.info('验证未通过！');
          return false
      }
      console.log("获取验证码");
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    confirmCancel(e) {
      console.log('Clicked cancel button')
      this.confirmVisible = false
    },

    onSearch(value) {
      console.log(value)
    },
    cancel(e) {
        this.$refs.ruleForm.resetFields()
        this.visible = true
        this.editVisible = false
    },
  }
}
</script>
<style lang="less" scoped></style>
