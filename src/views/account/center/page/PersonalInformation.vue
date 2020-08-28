<template>
    <div>
        <div v-show="visible">
            <a-card >
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
                        <a-icon style="margin-right:10px" type="apartment"  />部门: {{ form.department }}<a-tag :color="departmentColor" style="margin-left:10px">{{departmentStatus}}</a-tag>
                    </a-form-item>
                    <a-form-item>
                        <a-icon style="margin-right:10px" type="safety"  />权限: {{ form.Authority }}
                    </a-form-item>
                    <a-form-item>
                        <a-icon style="margin-right:10px" type="contacts"  />角色: {{ form.Character }}
                    </a-form-item>
                </a-form>
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
                        :default-value="['开发部']"
                        @change="handleChange"
                    >   
                        <a-select-option v-for="Depart in Department" :key="Depart.value" >
                            {{ Depart.value }}
                        </a-select-option>
                    </a-select>
                    默认部门:{{this.value}}<a @click="departChange" style="margin-left:10px">修改</a>
                    </a-form-model-item>
                    <a-form-model-item label="权限:"  >{{form.Authority}}
                    </a-form-model-item>
                    <a-form-model-item label="角色:"  >{{form.Character}}
                    </a-form-model-item>
                </a-form-model>
            </a-card>
            <a-card
                style="display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;"   
                :bordered='false'
                >
                <a-button style="margin-right:20px" @click="cancel()">取消</a-button>
                <a-button type="primary" @click="submit()">保存</a-button>
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
            @ok="mailOk"
            @cancel="mailCancel"
        >
            <p>绑定邮箱后，您可使用新的邮箱进行登录</p>
            <a-form-model 
                ref="MruleForm"
                :model="form"
                :rules="Mrules"
                >
                <a-form-model-item>
                    <a-input v-model="form.mail" placeholder="请输入您的邮箱"></a-input>
                </a-form-model-item>
                <a-form-model-item prop="code">
                    <a-input v-model="form.code"  placeholder="请输入验证码--783209">
                        <a-button  slot="suffix" type="link" @click="getMailVerificationCode">获取验证码</a-button>
                    </a-input>
                    <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p>
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
            <a-radio-group v-model="value" @change="onChange">
                <a-radio v-for="defaultDepart in Department" :key="defaultDepart.value" :style="radioStyle" :value="defaultDepart.value">
                    {{defaultDepart.value}}
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

const Department = [
  { value: '开发部' },
  { value: '销售部' },
]
export default {
    name: 'PersonalInformation',
    components: {
		Slider
	},
    data() {
        return {
            Department,
            value:"开发部",
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
                department:'开发部',
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
                this.confirmLoading = true;
                setTimeout(() => {
                    this.changeVisible = false;
                    this.confirmLoading = false;
                    this.changeNewVisible = true
                }, 1000);
             })
        },
        handleCancel(e) {
            this.changeVisible = false;
        },
        getVerificationCode(){
            // this.verificationVisible = true
        },
        getMailVerificationCode(){
            this.verificationVisible = true
        },
        verificationOk(){
            if (this.Success!=true) {
                this.$message.info('验证未通过！');
                return false
            }
            this.Success=false
            this.verificationVisible = false
            this.$refs.slideblock.reset();
        },
        verificationCancel(){
            this.verificationVisible = false
            this.$refs.slideblock.reset();
        },

        changeNewOk(){
            this.changeNewVisible = false
        },
        changeNewCancel(e) {
            this.changeNewVisible = false;
        },
        mailOk(e) {
            this.$refs.MruleForm.validate((valid) => {
                if (!valid) {
                this.$message.info('请填写正确的验证码！');
                return false
                }
                this.confirmLoading = true;
                setTimeout(() => {
                    this.mailVisible = false;
                    this.confirmLoading = false;
                }, 1000);
            })
        },
        mailCancel(e) {
            this.mailVisible = false;
        },
        handleChange(value) {
            for (let i = 0; i < value.length; i++) {
                this.form.department = value[i];
                console.log('--------->',value[i]);
            }
        },
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
        },
    }
}
</script>