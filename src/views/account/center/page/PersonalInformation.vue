<template>
    <div>
        <div v-show="visible">
            <a-card >
                <a-row >
                    <a-col :span='4'>
                        <a-avatar :size="70" icon="user"/>
                    </a-col>
                    <a-col :span='14'>
                        <a-form
                        ref="ruleForm"
                        :model="form"
                        :rules="rules">
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="apartment"  />所在部门: {{ form.departmentid }}
                                <!-- <a-tag :color="departmentColor" style="margin-left:10px">{{departmentStatus}}</a-tag><br> -->
                                <!-- {{departments}} -->
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="idcard"  />工号: {{ form.personcode }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="user"  />姓名:{{ form.personname }}
                            </a-form-item>

                            <a-form-item>
                                <a-icon style="margin-right:10px" type="phone"  />手机号: {{ form.personphone }}<a-tag :color="phoneColor" style="margin-left:10px">{{phoneStatus}}</a-tag>
                            </a-form-item>
                            <!-- <a-form-item>
                                <a-icon style="margin-right:10px" type="mail"  />邮箱: {{ form.mail }}<a-tag :color="mailColor" style="margin-left:10px">{{mailStatus}}</a-tag>
                            </a-form-item> -->
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="deployment-unit"  />入职时间:{{ form.personbegintime }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="apartment"  />建立时间: {{ form.personcreationdate }}
                                <!-- {{departments}} -->
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="apartment"  />个性签名: {{ form.personlabel }}
                                <!-- {{departments}} -->
                            </a-form-item>
                        </a-form>
                    </a-col>
                </a-row>

            </a-card>
            <a-card
                style="display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;"   
                :bordered='false'
                >
                <a-button type="primary" @click="edit()">编辑</a-button>
                <a-button type="primary" style="margin-left:10px" @click="changePassword()">密码修改</a-button>
            </a-card>
        </div>

        <div v-show="editVisible">
            <a-card>
                <a-row >
                    <a-col :span='4'>
                        <a-avatar :size="70" icon="user"/>
                    </a-col>
                    <a-col :span='20'>
                        <a-form-model
                            ref="ruleForm"
                            :model="form"
                            :rules="rules"
                            :label-col="labelCol"
                            :wrapper-col="wrapperCol"
                        >
                            <a-form-model-item label="所在部门:"   prop="DepartmentID">
                            <a-input v-model="form.departmentid" disabled placeholder="请输入姓名"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="工号:"  prop="PersonCode">
                            <a-input v-model="form.personcode" disabled placeholder="请输入工号"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="姓名:"  prop="PersonName">
                            <a-input v-model="form.personname"  placeholder="请输入姓名"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="手机号:"   prop="PersonPhone">
                            <a-input v-model="form.personphone" disabled style="width:85%;margin-right:10px"  placeholder="请输入手机"></a-input> <a @click="changePhone">更改</a>
                            </a-form-model-item>
                            <a-form-model-item label="入职时间:"  prop="PersonBeginTime">
                            <a-input v-model="form.personbegintime" disabled  placeholder="请输入邮箱"></a-input>
                                 <!--<a @click="changeMail">绑定</a> -->
                            </a-form-model-item>
                            <a-form-model-item label="建立时间:"  prop="PersonCreationdate">
                            <a-input v-model="form.personcreationdate" disabled placeholder="请输入备注"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="个性签名:"  prop="personlabel">
                            <a-input v-model="form.personlabel" placeholder="请输入个性签名"></a-input>
                            </a-form-model-item>
                            <!-- <a-form-model-item label="部门:" >
                            <a-select
                                mode="tags"
                                placeholder="请选择部门"
                                @change="handleChange"
                            >   
                                <a-select-option v-for="Depart in Department" :key="Depart" >
                                    {{ Depart }}
                                </a-select-option>
                            </a-select>
                            默认部门:{{form.defaultDepart}}<a @click="departChange" style="margin-left:10px">修改</a>
                            </a-form-model-item> -->
                        </a-form-model>
                    </a-col>
                </a-row>
            </a-card>
            <a-card
                style="display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;"   
                :bordered='false'
                >
                <a-button style="margin-right:20px" @click="cancel()">取消</a-button>
                <a-button type="primary" :loading="loading" @click="submit()">保存</a-button>
            </a-card>
        </div>
        <a-modal
            title="更换手机号第一步"
            :visible="changeVisible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="下一步"
            @cancel="handleCancel"
        >
            <p>更改前需校验当前绑定的手机号</p>
            <a-form-model 
                ref="ruleForm1"
                :model="form"
                :rules="rules"
                >
                <a-form-model-item>
                    <a-input v-model="form.personphone"  disabled ></a-input>
                </a-form-model-item>
                <a-form-model-item prop="phoneCode1">
                    <a-input v-model="form.phoneCode1" placeholder="请输入验证码">
                        <a-button class="GPBtn" :disabled="false" slot="suffix" type="link" @click="getVerificationCode">获取验证码</a-button>
                    </a-input>
                    <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
                </a-form-model-item>
            </a-form-model>
        </a-modal>

        <a-modal
            title="更换手机号第二步"
            :visible="changeNewVisible"
            :confirm-loading="confirmLoading"
            @ok="changeNewOk"
            @cancel="changeNewCancel"
            v-show="show"
            >
            <p>更改手机号后，您将使用新的手机号进行登录</p>
            <a-form-model 
                ref="PruleForm2"
                :model="form"
                :rules="rules"
                >
                <a-form-model-item>
                    <a-input v-model="form.PersonPhone" placeholder="请输入您新的手机号"></a-input>
                </a-form-model-item>
                <a-form-model-item prop="phoneCode2">
                    <a-input v-model="form.phoneCode2"   placeholder="请输入验证码">
                        <a-button class="GPBtn2" slot="suffix" :disabled="false" type="link" @click="getVerificationCode1">获取验证码</a-button>
                    </a-input>
                    <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
            title="绑定邮箱"
            :visible="mailVisible"
            :confirm-loading="confirmLoading"
            @ok="mailOk"
            @cancel="mailCancel"
        >
            <p>绑定邮箱后，您可使用新的邮箱进行登录</p>
            <a-form-model 
                ref="mailRuleForm"
                :model="form"
                :rules="Mrules"
                >
                <a-form-model-item prop="NewMail">
                    <a-input v-model="form.NewMail" placeholder="请输入您新的邮箱"></a-input>
                </a-form-model-item>
            </a-form-model>
            <a-form-model 
                ref="codeRuleForm"
                :model="form"
                :rules="Mrules"
                >
                <a-form-model-item prop="phoneCode">
                    <a-input v-model="form.phoneCode"  placeholder="请输入验证码">
                        <a-button class="GMBtn" :disabled="false" slot="suffix" type="link" @click="getMailVerificationCode">获取验证码</a-button>
                    </a-input>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
            title="滑动验证"
            :visible="verificationVisible"
            @ok="verificationOk"
            @cancel="verificationCancel"
        >
            <slider  ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
        </a-modal>
        <!-- <a-modal
            title="滑动验证2"
            :visible="verificationVisible1"
            @ok="verificationOk1"
            @cancel="verificationCancel1"
        >
            <slider  ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
        </a-modal> -->
        <a-modal
            title="设置提单默认部门"
            :visible="departVisible"
            @ok="departOk"
            @cancel="departCancel"
        >
            <p>此部门会在提交单据时指定为默认提交部门</p>
            <a-radio-group v-model="form.defaultDepart" @change="onChange">
                <a-radio v-for="defaultDepart in department" :key="defaultDepart" :style="radioStyle" :value="defaultDepart">
                    {{defaultDepart}}
                </a-radio>
            </a-radio-group>
        </a-modal>
        <a-modal
        title="修改密码"
        :visible="changePasswordVisible"
        :confirm-loading="confirmLoading"
        @ok="changePasswordhandleOk"
        @cancel="changePasswordhandleCancel"
        >
            <a-form-model 
                ref="CPruleForm"
                :model="form"
                :rules="GPrules"
                >
                <a-form-model-item  label="原密码:" prop="inputPassword">
                    <a-input-password v-model="form.inputPassword" @change="CPchange" placeholder="请输入原密码">
                    </a-input-password>
                </a-form-model-item>
                <a-form-model-item  label="新密码:" prop="newPersonPassword">
                    <a-input-password v-model="form.newPersonPassword"  :disabled="disabled" placeholder="请输入密码">
                    </a-input-password>
                </a-form-model-item>
                <a-form-model-item  label="确认密码:" prop="CPersonPassword">
                    <a-input-password v-model="form.CPersonPassword"  :disabled="disabled" placeholder="请输入密码">
                    </a-input-password>
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
import {  mapGetters } from 'vuex'
import { retrievePsdSendSMSregister } from '@/api/register'

import { getBasepersonInfo,updateBaseperson } from '@/api/manage'
export default {
    name: 'PersonalInformation',
    components: {
		Slider
	},
    data() {
        return {
            Department : ['开发部', '销售部', '管理层' ,'总裁会'],
            department:'',
            departments:'',
            phoneColor:'blue',
            mailColor:'#c5c3c3',
            departmentColor:'#c5c3c3',
            phoneStatus: '已绑定',
            mailStatus: '未绑定',
            departmentStatus: '默认',
            radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },
            form:{
                DepartmentID: '开发部',
                PersonName: 'curry',
                PersonPhone: '',
                PersonCode: '无',
                PersonBeginTime: '2020.9.9',
                PersonCreationdate: '2020.9.9',
                personlabel: '我就是我，不一样的烟火',
                mail: '无',
                NewMail: '',
                defaultDepart:'开发部',
                PersonPassword: '123456',
                inputPassword: '',
                newPersonPassword:'',
                CPersonPassword:'',
                Authority: '系统管理',
                Character: '主管理员',
                phoneCode1: '',
                phoneCode2: '',
            },
            enterpriseid:'',
            personid:'',
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
            visible: true,
            editVisible: false,
            changeVisible: false,
            loading: false,
            confirmLoading: false,
            verificationVisible: false,
            // verificationVisible1: false,
            changeNewVisible: false,
            mailVisible: false,
            departVisible:false,
            show:true,
            CPshow:true,
            changePasswordVisible:false,
            disabled:true,
            rules: {
                //校验规则
                phoneCode1: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                phoneCode2: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                personlabel: [{ required: true, message: '请输入你的个性签名', trigger: 'blur' }],
            },
            GPrules: {
                //校验规则
                inputPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
                newPersonPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
                CPersonPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
            },
            Mrules: {
                //校验规则
                NewMail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                     { required: true, pattern:  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱' },
                    ],
                code: [{ required: true, message: '请输入正确的验证码', trigger: 'blur' }],
            },
        }
    },
created(){
      const params = {}
        params.id =  this.basepersonPO.personid
      getBasepersonInfo(params)
      .then((res)=>{
        console.log("返回值--getBasepersonInfo----->",JSON.stringify(res))
        console.log("返回值--getBasepersonInfo----->",res)
        this.form = res.result
         this.form.personcreationdate = PersonCreationdate
         this.form.personbegintime = personbegintime
      })
      .catch(err => {})
        this.enterpriseid = this.baseenterprisePO.enterpriseid
        this.personid = this.basepersonPO.personid
        function getTimes(ns){
            return new Date(parseInt(ns)*1000).toLocaleString().replace(/:\d{1,2}$/,'')
        } 
        let d = new Date(this.basepersonPO.personcreationdate);
        let b = new Date(this.basepersonPO.personbegintime);
        
        let PersonCreationdate = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() +'日'
        let personbegintime = b.getFullYear() + '年' + (b.getMonth() + 1) + '月' + b.getDate() +'日'     
},
    computed: {
    ...mapGetters(['basepersonPO',"baseenterprisePO"])
  },
    methods: {
        confirmSuccess:function (confirmSuccess) {
            this.Success = confirmSuccess
            console.log(this.Success);
        },
        CPchange(){
            if (this.form.PersonPassword === this.form.inputPassword) {
                this.disabled = false
            }
        },
        changePassword(){
            this.changePasswordVisible = true
        },
        changePasswordhandleOk(e) {
            this.confirmLoading = true;
            this.$refs.CPruleForm.validate((valid) => {
                if (valid&&this.form.newPersonPassword === this.form.CPersonPassword) {
                    setTimeout(() => {
                        this.changePasswordVisible = false;
                        this.confirmLoading = false;
                    }, 2000);
                }
                else{
                    this.confirmLoading = false;
                    this.$message.info("密码不一致")
                    return false
                }
            })

        },
        changePasswordhandleCancel(e) {
        this.changePasswordVisible = false;
        },
        getVerificationCode2(){
             this.verificationVisible = true
        },
        edit() {
        this.visible = false
        this.editVisible= true
        },
        submit(e) {
            this.loading = true
            setTimeout(() => {
                this.$refs.ruleForm.validate((valid) => {
                //    this.$refs.ruleForm   获取整个表单
                //validate   对整个表单进行校验的方法
                if (valid) {
                //判断valid是否等于true     
                    const data = {}
                    data.enterpriseid = this.basepersonPO.enterpriseid
                    data.personid = this.basepersonPO.personid
                    data.personname = this.form.personname
                    data.personlabel = this.form.personlabel
                    data.personphone = this.form.personphone
                    console.log(data);
                    updateBaseperson(data)
                    .then((res)=>{
                        console.log('updateBaseperson--->',res);
                        if (res.status == 'SUCCESS') {
                            this.$message.info('保存成功！');
                            this.editVisible = false
                            this.visible = true
                        //   提示用户信息
                        }
                    } ).catch((err)=>{
                        console.log('错误------》',err);
                    })
                } else {
                // 等于false
                console.log('error submit!!')
                //   提示提交失败
                this.$message.info('亲，您的填写内容不符合要求，请重新填写！！！');
                return false
                //   结束函数
                }
                })
                    this.loading = false;

            }, 2000);
        },
        cancel(e) {
            this.$refs.ruleForm.resetFields()
            this.visible = true
            this.editVisible = false
        },
        changePhone(){
            this.changeVisible = true;   
        },
        changeMail(){
            this.mailVisible = true;
        },

        handleOk(e) {
             this.$refs.ruleForm1.validate((valid) => {
                 if (!valid) {
                    // this.$message.info('请填写正确的验证码！');
                    return false
                 }
                this.confirmLoading = true
                setTimeout(() => {
                    this.changeVisible = false;
                    this.confirmLoading = false;
                    this.changeNewVisible = true
                }, 2000);
             })
        },
        handleCancel(e) {
            this.changeVisible = false;
        },
        getVerificationCode(){
            this.verificationVisible = true
        },
        getVerificationCode1(){
            this.verificationVisible = true
            this.show = false
            var oBtn1 = document.getElementsByClassName('GPBtn2')[0];
            // this.$message.info("发送验证码成功！")
            var time = 60;
            var timer = null;
            oBtn1.innerHTML = time + '秒后重新发送';
            oBtn1.setAttribute('disabled', 'disabled');  // 禁用按钮
            // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
            timer = setInterval(function(){
              // 定时器到底了 兄弟们回家啦
              if(time == 1){
                clearInterval(timer);       
                oBtn1.innerHTML = '获取验证码';  
                oBtn1.removeAttribute('disabled'); //移除禁用效果
                // oBtn.removeAttribute('class');  //移除变灰样式效果
              }else if (this.phoneVisible === false){
                clearInterval(timer); 
                console.log("结束计时器");   
              }else{
                time--;
                oBtn1.innerHTML = time + '秒后重新发送';
              }
            }, 1000)
            console.log("获取验证码");
            this.Success=false
            this.$refs.slideblock.reset();//重置滑动验证
        },
        getMailVerificationCode(){
            this.$refs.mailRuleForm.validate((valid)=>{
                if (valid) {
                    this.verificationVisible = true
                }else{
                    return false
                }
            })
        },
        verificationOk(){
            if (this.Success!=true) {
                this.$message.info('验证未通过！');
                return false
            }
            this.show = true
            var oBtn = document.getElementsByClassName('GPBtn')[0];
            // this.$message.info("发送验证码成功！")

            const hide = this.$message.loading('验证码发送中..', 0)
            console.log(this.form.personphone);
            const params = {}
            console.log('新手机号--------》',this.form.PersonPhone);
            params.enterprisephone =  this.form.PersonPhone
            retrievePsdSendSMSregister(params)
                .then((res) => {
                console.log('retrievePsdSendSMSregister res-->', res)
                if (res.status == "SUCCESS") {
                    setTimeout(hide, 2500)
                    this.$notification['success']({
                    message: '提示',
                    description: res.errorMsg,
                    duration: 8,
                })
                }
                else if(res.status == "FAILED" ||  res.status == "EXCEPTION"){
                    setTimeout(hide, 2500)
                    this.$notification['error']({
                    message: '提示',
                    description: res.errorMsg,
                    duration: 8,
                })
                }
                })
                .catch((err) => {
                setTimeout(hide, 1)
                clearInterval(interval)
                state.time = 60
                state.smsSendBtn = false
                this.requestFailed(err)
                })
                
            var time = 60;
            var timer = null;
            oBtn.innerHTML = time + '秒后重新发送';
            oBtn.setAttribute('disabled', 'disabled');  // 禁用按钮
            // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
            timer = setInterval(function(){
              // 定时器到底了 兄弟们回家啦
              if(time == 1){
                clearInterval(timer);       
                oBtn.innerHTML = '获取验证码';  
                oBtn.removeAttribute('disabled'); //移除禁用效果
                // oBtn.removeAttribute('class');  //移除变灰样式效果
              }else if (this.phoneVisible === false){
                clearInterval(timer); 
                console.log("结束计时器");   
              }else{
                time--;
                oBtn.innerHTML = time + '秒后重新发送';
              }
            }, 1000)
            console.log("获取验证码");
            this.Success=false
            this.verificationVisible = false
            this.$refs.slideblock.reset();//重置滑动验证
        },
      
        verificationCancel(){
            this.verificationVisible = false
            this.$refs.slideblock.reset();//重置滑动验证
        },


        changeNewOk(){
            this.$refs.PruleForm2.validate((valid)=>{
                if (valid) {            
                    this.changeNewVisible = false
                    this.form.personphone = this.form.PersonPhone
                }else{
                    return false
                }
            })
        },

        changeNewCancel(e) {
            this.changeNewVisible = false;
        },
        mailOk(e) {
            this.$refs.codeRuleForm.validate((valid) => {
                this.confirmLoading = true
                if (!valid) {
                this.$message.info('请填写正确的验证码！');
                this.confirmLoading = false
                return false
                }
                setTimeout(() => {
                    this.mailVisible = false;
                    this.mailStatus = '已绑定';
                    this.mailColor = 'blue';
                    this.confirmLoading = false
                    this.form.mail = this.form.NewMail
                    this.$refs.mailRuleForm.resetFields()
                    this.$refs.codeRuleForm.resetFields()
                }, 2000);
            })
        },
        mailCancel(e) {
            this.mailVisible = false;
            this.$refs.mailRuleForm.resetFields()
            this.$refs.codeRuleForm.resetFields()
        },
        handleChange(value) {
            console.log(value);
            this.department = value 
            this.departments = value.toString()
            console.log(this.departments);
        },
        // 部门修改
        departChange(){
            this.departVisible = true
        },
        departOk(){
            this.departVisible = false
        },
        departCancel(){
            this.departVisible = false
        },
        onChange(e) {
            console.log('radio checked', e.target.value);
            this.form.defaultDepart = e.target.value
        },
    }
}
</script>