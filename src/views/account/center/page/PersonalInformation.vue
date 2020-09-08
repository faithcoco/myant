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
                                <a-icon style="margin-right:10px" type="user"  />姓名:{{ form.Name }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="idcard"  />工号: {{ form.JobNumber }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="phone"  />手机: {{ form.Phone }}<a-tag :color="phoneColor" style="margin-left:10px">{{phoneStatus}}</a-tag>
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="mail"  />邮箱: {{ form.mail }}<a-tag :color="mailColor" style="margin-left:10px">{{mailStatus}}</a-tag>
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="deployment-unit"  />备注:{{ form.Remarks }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="apartment"  />部门: {{ form.defaultDepart }}<a-tag :color="departmentColor" style="margin-left:10px">{{departmentStatus}}</a-tag><br>
                                <!-- {{departments}} -->
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="safety"  />权限: {{ form.Authority }}
                            </a-form-item>
                            <a-form-item>
                                <a-icon style="margin-right:10px" type="contacts"  />角色: {{ form.Character }}
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
                            <a-form-model-item label="姓名:"  prop="Name">
                            <a-input v-model="form.Name" placeholder="请输入姓名"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="工号:"  prop="JobNumber">
                            <a-input v-model="form.JobNumber" placeholder="请输入工号"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="手机:"   prop="Phone">
                            <a-input v-model="form.Phone" style="width:100%;margin-right:10px" disabled placeholder="请输入手机"></a-input><!-- <a @click="changePhone">更改</a> -->
                            </a-form-model-item>
                            <a-form-model-item label="邮箱:"  prop="mail">
                            <a-input v-model="form.mail" style="width:90%;margin-right:10px" disabled placeholder="请输入邮箱"></a-input><a @click="changeMail">绑定</a>
                            </a-form-model-item>
                            <a-form-model-item label="备注:"  prop="Remarks">
                            <a-input v-model="form.Remarks" placeholder="请输入备注"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="部门:" >
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
                            </a-form-model-item>
                            <a-form-model-item label="权限:"  >{{form.Authority}}
                            </a-form-model-item>
                            <a-form-model-item label="角色:"  >{{form.Character}}
                            </a-form-model-item>
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
            title="更换手机号"
            :visible="changeVisible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="下一步"
            @cancel="handleCancel"
        >
            <p>更改前需校验当前绑定的手机号</p>
            <a-form-model 
                ref="ruleForm"
                :model="form"
                :rules="rules"
                >
                <a-form-model-item>
                    <a-input v-model="form.Phone"  disabled ></a-input>
                </a-form-model-item>
                <a-form-model-item prop="code">
                    <a-input v-model="form.code"  placeholder="请输入验证码--783209">
                        <a-button  slot="suffix" type="link" @click="getVerificationCode">获取验证码</a-button>
                    </a-input>
                    <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p>
                </a-form-model-item>
            </a-form-model>
        </a-modal>

        <a-modal
            title="更换手机号"
            :visible="changeNewVisible"
            :confirm-loading="confirmLoading"
            @ok="changeNewOk"
            @cancel="changeNewCancel"
        >
            <p>更改手机号后，您将使用新的手机号进行登录</p>
            <a-form-model 
                ref="ruleForm"
                :model="form"
                :rules="rules"
                >
                <a-form-model-item>
                    <a-input v-model="form.Phone" placeholder="请输入您新的手机号"></a-input>
                </a-form-model-item>
                <a-form-model-item prop="code">
                    <a-input v-model="form.code"  placeholder="请输入验证码--783209">
                        <a-button  slot="suffix" type="link" @click="getVerificationCode">获取验证码</a-button>
                    </a-input>
                    <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p>
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
                <a-form-model-item prop="code">
                    <a-input v-model="form.code"  placeholder="请输入验证码">
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
            <slider ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
        </a-modal>
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
    </div>
</template>
<script>
import Vue from 'vue'
import Slider from '@/components/tools/Slider'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

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
                Name: 'curry',
                Phone: '13333333333',
                JobNumber: '无',
                mail: '无',
                NewMail: '',
                defaultDepart:'开发部',
                Remarks: '无',
                Authority: '系统管理',
                Character: '主管理员',
                code: '',
            },
            labelCol: { span: 2 },
            wrapperCol: { span: 18 },
            visible: true,
            editVisible: false,
            changeVisible: false,
            loading: false,
            confirmLoading: false,
            verificationVisible: false,
            changeNewVisible: false,
            mailVisible: false,
            departVisible:false,
            rules: {
                //校验规则
                Name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
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
    methods: {
        confirmSuccess:function (confirmSuccess) {
            this.Success = confirmSuccess
            console.log(this.Success);
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
                    this.$message.info('保存成功！');
                    this.editVisible = false
                    this.visible = true
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
                this.loading = false;

            }, 2000);
        },
        cancel(e) {
            this.$refs.ruleForm.resetFields()
            this.visible = true
            this.editVisible = false
        },
        changePhone(){
            // this.changeVisible = true;   
        },
        changeMail(){
            this.mailVisible = true;
        },

        handleOk(e) {
             this.$refs.ruleForm.validate((valid) => {
                 if (!valid) {
                    this.$message.info('请填写正确的验证码！');
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
            // this.verificationVisible = true
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
            
            var oBtn = document.getElementsByClassName('GMBtn')[0];
            this.$message.info("发送验证码成功！")
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
            this.changeNewVisible = false
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