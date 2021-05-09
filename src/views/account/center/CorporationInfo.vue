<template>
  <div>
    <a-layout>
      <a-layout-content>
        <a-card>
          <h2>企业信息</h2>
        </a-card>

        <a-card>
          <a-row type="flex" justify="space-between">
            <a-col style="font-weight: bold">
              <a-avatar shape="square" :size="70" icon="user" style="margin-right: 30px"/>
              {{ form.enterprisename }}
              <!-- &nbsp;(ID:&nbsp;{{ form.companyCode }}) -->
            </a-col>
            <a-col style="margin-right: 50px">
              <a-button type="primary" style="margin-left: 20px" @click="Initialize()">初始化</a-button>
              <a-button type="primary" style="margin-left: 20px" @click="edit()">编辑</a-button>
              <a-button type="primary" style="margin-left: 20px" @click="change()">切换所在企业</a-button>
              <a-button type="primary" style="margin-left: 20px" @click="Newbusiness()">新建企业</a-button>
              <a-button type="primary" style="margin-left: 20px" @click="disband()">解散企业</a-button>
            </a-col>
          </a-row>
          <a-divider type="horizontal"/>
          <a-row>
            <a-col>
              <a-form layout="vertical" ref="ruleForm" :model="form" :rules="rules">
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="barcode" class="upload-icon"/>
                  企业地址:{{
                    form.enterpriseaddress
                  }}
                </a-form-item>

                <a-form-item>
                  <a-icon style="margin-right: 10px" type="user" class="upload-icon"/>
                  联系人:
                  {{ form.enterprisecontact }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="bank" class="upload-icon"/>
                  电话: {{ form.enterprisetel }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="bank" class="upload-icon"/>
                  注册人:
                  {{ form.enterpriseregistrant }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="phone" class="upload-icon"/>
                  注册手机:
                  {{ form.enterprisephone }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="mail" class="upload-icon"/>
                  注册时间:
                  {{ registrationtime }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right: 10px" type="deployment-unit" class="upload-icon"/>
                  状态:
                  <a-tag :color="color" style="margin-left: 10px">{{ statusname }}</a-tag>
                  剩余试用时间: {{ form.enterprisetrialdays }}天
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
        <br/>
      </a-layout-content>
    </a-layout>
    <!--初始化企业信息数据-->
    <a-modal title="初始化" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
             okText="确定">
      <!--<p>如需操作请联系匠思</p>-->
      <a-radio-group v-model="radioValue" @change="handleChange">
        <a-radio :style="radioStyle" value="1">基础数据</a-radio>
        <a-radio :style="radioStyle" value="2">业务数据</a-radio>
        <a-radio :style="radioStyle" value="3">表单数据</a-radio>
      </a-radio-group>
    </a-modal>

    <a-modal
        title="修改信息"
        :visible="companyVisible"
        :confirm-loading="confirmLoading"
        @ok="companyOk"
        @cancel="companyCancel"
        :width="800"
    >
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="企业名称:" prop="enterprisename">
          <a-input v-model="form.enterprisename" placeholder="请输入企业名称"></a-input>
        </a-form-model-item>
        <a-form-model-item label="企业地址:" prop="EnterpriseAddress">
          <a-input v-model="form.enterpriseaddress" placeholder="请输入企业地址"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系人:" prop="EnterpriseContact">
          <a-input v-model="form.enterprisecontact" placeholder="请输入联系人"></a-input>
        </a-form-model-item>
        <a-form-model-item label="电话:" prop="EnterpriseTel">
          <a-input
              v-model="form.enterprisetel"
              style="width: 100%; margin-right: 10px"
              placeholder="请输入电话"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item label="注册人:" prop="EnterpriseRegistrant">
          <a-input v-model="form.enterpriseregistrant" disabled placeholder="请输入注册人"></a-input>
        </a-form-model-item>
        <a-form-model-item label="更换手机:">
          <a-input
              v-model="form.enterprisephone"
              disabled
              style="width: 90%; margin-right: 10px"
              placeholder="请输入新手机号"
          ></a-input>
          <a @click="changePhone">更改</a>
        </a-form-model-item>
        <a-form-model-item label="注册时间:">
          <a-input v-model="registrationtime" disabled placeholder="无"></a-input>
        </a-form-model-item>

        <a-form-model-item label="状态:">
          <a-input v-model="statusname" disabled></a-input>
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
      <a-form-model ref="CruleForm" :model="form" :rules="rules">
        <a-form-model-item style="display: flex; align-items: center; justify-content: center; text-align: justify">
          {{ form.enterprisename }}
        </a-form-model-item>
        <a-form-model-item label="" prop="cName">
          <a-input v-model="form.cName" placeholder="输入企业名称以确认初始化企业数据"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal :visible="phoneVisible" :width="700" style="text-align: center">
      <template slot="footer">
        <a-button key="back" @click="phoneCancel"> 取消</a-button>
        <a-button key="submit" class="phoneBtn" :loading="loading" disabled type="primary" @click="phoneOk">
          确认
        </a-button>
      </template>
      <a-form-model ref="PruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item>
          <span>手机验证通过后会初始化数据</span>
        </a-form-model-item>
        <a-form-model-item label="输入手机号:" prop="enterprisephone">
          <a-input v-model="form.enterprisephone" placeholder="请输入手机号"></a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model ref="GruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="输入验证码:" prop="VerificationCode">
          <a-input v-model="form.VerificationCode" placeholder="输入验证码">
            <a-button class="GVbtn" :disabled="false" slot="suffix" type="link" @click="getMailVerificationCode"
            >获取验证码
            </a-button
            >
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <p style="color: red">该操作无法撤销或恢复，请慎重使用。</p>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
        title="切换所在企业"
        :visible="changeVisible"
        :confirm-loading="changeConfirmLoading"
        @ok="changeHandleOk"
        @cancel="changeHandleCancel"
    >
      <p>请从下面选择一个企业进行切换</p>
      <a-radio-group :default-value="1" @change="onChange">
        <a-radio v-for="item in enterprisename" :key="item.enterpriseid" :style="radioStyle" :value="item.enterpriseid">
          {{ item.enterprisename }}
        </a-radio>
      </a-radio-group>
    </a-modal>
    <a-modal
        title="更换电话号"
        :visible="changeTelVisible1"
        :confirm-loading="confirmLoading"
        @ok="changeTelhandleOk"
        okText="下一步"
        @cancel="changeTelhandleCancel"
    >
      <p>更改前需校验当前绑定的手机号</p>
      <a-form-model ref="ruleForm1" :model="form" :rules="rules">
        <a-form-model-item>
          <a-input v-model="form.enterprisetel" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item prop="phoneCode1">
          <a-input v-model="form.phoneCode1" placeholder="请输入验证码">
            <a-button class="GPBtn" :disabled="false" slot="suffix" type="link" @click="getVerificationCode"
            >获取验证码
            </a-button
            >
          </a-input>
          <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="更换手机号"
        :visible="changePhoneVisible1"
        :confirm-loading="confirmLoading"
        @ok="changePhonehandleOk"
        okText="下一步"
        @cancel="changePhonehandleCancel"
    >
      <p>更改前需校验当前绑定的手机号</p>
      <a-form-model ref="CPruleForm" :model="form" :rules="rules">
        <a-form-model-item>
          <a-input v-model="form.enterprisephone" disabled></a-input>
        </a-form-model-item>
        <a-form-model-item prop="phoneCode3">
          <a-input v-model="form.phoneCode3" placeholder="请输入验证码">
            <a-button class="GPBtn3" :disabled="false" slot="suffix" type="link" @click="getPhoneVerificationCode"
            >获取验证码
            </a-button
            >
          </a-input>
          <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="更换电话号第二步"
        :visible="changeNewVisible"
        :confirm-loading="confirmLoading"
        @ok="changeNewOk"
        @cancel="changeNewCancel"
        v-show="Telshow"
    >
      <p>更改手机号后，您将使用新的手机号进行登录</p>
      <a-form-model ref="PruleForm2" :model="form" :rules="rules">
        <a-form-model-item prop="enterprisetel">
          <a-input v-model="form.enterprisetel" placeholder="请输入您新的手机号"></a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model ref="PruleForm3" :model="form" :rules="rules">
        <a-form-model-item prop="phoneCode2">
          <a-input v-model="form.phoneCode2" placeholder="请输入验证码">
            <a-button class="GPBtn2" slot="suffix" :disabled="false" type="link" @click="getVerificationCode1"
            >获取验证码
            </a-button
            >
          </a-input>
          <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="更换手机第二步"
        :visible="changeNewPhoneVisible"
        :confirm-loading="confirmLoading"
        @ok="changeNewPhoneOk"
        @cancel="changeNewPhoneCancel"
        v-show="true"
    >
      <p>更改手机号后，您将使用新的手机号进行登录</p>
      <a-form-model ref="PruleForm4" :model="form" :rules="rules">
        <a-form-model-item prop="Newphone">
          <a-input v-model="form.Newphone" placeholder="请输入您新的手机号"></a-input>
        </a-form-model-item>
      </a-form-model>
      <a-form-model ref="PruleForm5" :model="form" :rules="rules">
        <a-form-model-item prop="phoneCode4">
          <a-input v-model="form.phoneCode4" placeholder="请输入验证码">
            <a-button class="GPBtn4" slot="suffix" :disabled="false" type="link" @click="getNewPhoneVerificationCode"
            >获取验证码
            </a-button
            >
          </a-input>
          <!-- <p>如果无法收到验证码短信，请尝试<a>语音验证码</a></p> -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import {Button, formModel} from 'ant-design-vue'
import moment from 'moment'
import {mapActions} from 'vuex'
import AvatarModal from '../settings/AvatarModal'
import {getBaseenterpriseInfo, initCompanyData, postData, updateBaseenterprise} from '@/api/manage'
import {retrievePsdSendSMSregister} from '@/api/register'
import {logininfo} from '@/store/mutation-types'
import {getCompanyList} from '@/api/login'

Vue.use(formModel, Button)
export default {
  components: {
    AvatarModal,
  },
  data() {
    return {
      currentChecked: '',
      Telshow: false,
      Phoneshow: false,
      changeTelVisible1: false,
      changePhoneVisible1: false,
      preview: {},
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
      },
      previewVisible: false,
      ok: false,
      visible: false,
      companyVisible: false,
      confirmVisible: false,
      confirmLoading: false,
      loading: false,
      phoneVisible: false,
      changeVisible: false,
      changeConfirmLoading: false,
      changeNewVisible: false,
      changeNewPhoneVisible: false,
      name: '',
      enterprisename: [],
      Form: Object,
      form: {},
      color: 'green',
      labelCol: {span: 4},
      wrapperCol: {span: 18},
      rules: {
        //校验规则
        enterprisename: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
        EnterprisePhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
        ],
        Newphone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
        ],
        enterprisetel: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
        ],
        PersonPhone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号'},
        ],
        VerificationCode: [{required: true, message: '请输入验证码'}],
        phoneCode1: [{required: true, message: '请输入验证码'}],
        phoneCode2: [{required: true, message: '请输入验证码'}],
        phoneCode3: [{required: true, message: '请输入验证码'}],
        phoneCode4: [{required: true, message: '请输入验证码'}],
      },
      // 初始化企业信息选择
      radioValue: '',
      // 企业状态名称
      statusname: '',
      // 企业注册日期
      registrationtime: '',
    }
  },

  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const params = {}
      params.id = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('params-->', params)
      getBaseenterpriseInfo(params)
          .then((res) => {
            console.log('getBaseenterpriseInfo----->', JSON.stringify(res))
            this.form = res.result
            if (this.form.enterpriseregistrationtime !== null && this.form.enterpriseregistrationtime !== '') {
              let d = new Date(this.form.enterpriseregistrationtime)
              let enterpriseregistrationtime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
              // 企业注册日期
              this.registrationtime = enterpriseregistrationtime
            }
            //企业状态：0待审核、1已审核、2已过期、5试用中、9已注销——注册成功默认5
            if (this.form.enterprisestatus === 5) {
              this.statusname = '试用中'
              this.color = 'yellow'
            } else if (this.form.enterprisestatus === 0) {
              this.statusname = '待审核'
              this.color = 'red'
            } else if (this.form.enterprisestatus === 1) {
              this.statusname = '已审核'
              this.color = 'yellowgreen'
            } else if (this.form.enterprisestatus === 2) {
              this.statusname = '已过期'
              this.color = 'gray'
            } else if (this.form.enterprisestatus === 9) {
              this.statusname = '已注销'
              this.color = 'black'
            }

          })
          .catch((err) => {
          })
    },
    getNewPhoneVerificationCode() {
      this.$refs.PruleForm4.validate((valid) => {
        if (valid) {
          const hide = this.$message.loading('验证码发送中..', 0)
          console.log(this.form.Newphone)
          const params = {}
          params.enterprisephone = this.form.Newphone
          retrievePsdSendSMSregister(params)
              .then((res) => {
                if (res.status == 'SUCCESS') {
                  setTimeout(hide, 2500)
                  this.$notification['success']({
                    message: '提示',
                    description: res.errorMsg,
                    duration: 8,
                  })
                } else if (res.status == 'FAILED' || res.status == 'EXCEPTION') {
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
          var oBtn1 = document.getElementsByClassName('GPBtn4')[0]
          // this.$message.info("发送验证码成功！")
          var time = 60
          var timer = null
          oBtn1.innerHTML = time + '秒后重新发送'
          oBtn1.setAttribute('disabled', 'disabled') // 禁用按钮
          // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
          timer = setInterval(function () {
            // 定时器到底了 兄弟们回家啦
            if (time == 1) {
              clearInterval(timer)
              oBtn1.innerHTML = '获取验证码'
              oBtn1.removeAttribute('disabled') //移除禁用效果
              // oBtn.removeAttribute('class');  //移除变灰样式效果
            } else {
              time--
              oBtn1.innerHTML = time + '秒后重新发送'
            }
          }, 1000)
          console.log('获取验证码')
        }
      })
    },
    verificationCancel() {
      this.verificationVisible = false
    },
    phoneverificationCancel() {
      this.phoneVerificationVisible = false
    },
    getVerificationCode1() {
      this.$refs.PruleForm2.validate((valid) => {
        if (valid) {
          const params = {}
          const hide = this.$message.loading('验证码发送中..', 0)
          console.log(this.form.enterprisetel)
          params.enterprisephone = this.form.enterprisetel
          retrievePsdSendSMSregister(params)
              .then((res) => {
                if (res.status == 'SUCCESS') {
                  setTimeout(hide, 2500)
                  this.$notification['success']({
                    message: '提示',
                    description: res.errorMsg,
                    duration: 8,
                  })
                } else if (res.status == 'FAILED' || res.status == 'EXCEPTION') {
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
          var oBtn1 = document.getElementsByClassName('GPBtn2')[0]
          var time = 60
          var timer = null
          oBtn1.innerHTML = time + '秒后重新发送'
          oBtn1.setAttribute('disabled', 'disabled') // 禁用按钮
          // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
          timer = setInterval(function () {
            // 定时器到底了 兄弟们回家啦
            if (time == 1) {
              clearInterval(timer)
              oBtn1.innerHTML = '获取验证码'
              oBtn1.removeAttribute('disabled') //移除禁用效果
              // oBtn.removeAttribute('class');  //移除变灰样式效果
            } else {
              time--
              oBtn1.innerHTML = time + '秒后重新发送'
            }
          }, 1000)
          console.log('获取验证码')
        }
      })
    },
    changeNewOk() {
      this.$refs.PruleForm3.validate((valid) => {
        if (valid) {
          this.changeNewVisible = false
        } else {
          return false
        }
      })
    },
    changeNewPhoneOk() {
      this.$refs.PruleForm5.validate((valid) => {
        if (valid) {
          this.form.enterprisephone = this.form.Newphone
          this.changeNewPhoneVisible = false
        } else {
          return false
        }
      })
    },

    changeNewPhoneCancel(e) {
      this.changeNewPhoneVisible = false
    },
    changeNewCancel(e) {
      this.changeNewVisible = false
    },
    changeTelhandleOk() {
      this.Telshow = true
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          this.changeTelVisible1 = false
          this.changeNewVisible = true
        } else {
          return false
        }
      })
    },
    changePhonehandleOk() {
      this.$refs.CPruleForm.validate((valid) => {
        if (valid) {
          this.changePhoneVisible1 = false
          this.changeNewPhoneVisible = true
        } else {
          return false
        }
      })
    },
    changeTelhandleCancel() {
      this.changeTelVisible1 = false
    },
    changePhonehandleCancel() {
      this.changePhoneVisible1 = false
    },
    changePhone() {
      this.changePhoneVisible1 = true
    },
    changeTel() {
      this.changeTelVisible1 = true
    },
    onChange(e) {
      this.currentChecked = e.target.value
    },
    changeHandleOk(e) {
      const params = {}
      params.enterpriseid = this.currentChecked
      params.enterprisephone = Vue.ls.get(logininfo).basepersonPO.personphone
      var url = '/sys/switchlogin'
      postData(params, url)
          .then((res) => {
            Vue.ls.set(logininfo, res.result)
            this.baseenterprisePO = Vue.ls.get(logininfo).baseenterprisePO
            this.getInfo()
            this.changeVisible = false
          })
          .catch(() => {
          })
    },
    changeHandleCancel(e) {
      this.changeVisible = false
    },
    Newbusiness() {
      this.$router.push({path: '/Newbusiness'})
    },
    setavatar(url) {

      this.option.img = url
    },
    pCancel() {
      this.previewVisible = false
    },
    confirmSuccess: function (confirmSuccess) {
      this.Success = confirmSuccess
      console.log(confirmSuccess)
      var oBtn = document.getElementsByClassName('GVbtn')[0]
      oBtn.removeAttribute('disabled') //移除禁用效果
    },
    Initialize() {
      this.visible = true
    },
    edit() {
      this.companyVisible = true
    },
    change() {
      this.changeVisible = true
      const params = {}
      params.phone = Vue.ls.get(logininfo).basepersonPO.personphone
      params.state = ''
      getCompanyList(params)
          .then((res) => {
            console.log('getCompanyList-->', JSON.stringify(res))
            this.enterprisename = res.result
          })
          .catch(() => {
          })
    },
    companyOk(e) {
      this.confirmLoading = true
      this.$refs.ruleForm.validate((valid) => {
        //    this.$refs.ruleForm   获取整个表单
        //validate   对整个表单进行校验的方法
        if (valid) {
          setTimeout(() => {
            //判断valid是否等于true
            const data = {}
            data.enterpriseid = this.form.enterpriseid
            data.enterprisename = this.form.enterprisename
            data.enterpriseaddress = this.form.enterpriseaddress
            data.enterprisecontact = this.form.enterprisecontact
            data.enterprisetel = this.form.enterprisetel
            data.enterprisephone = this.form.enterprisephone
            console.log('update enterprise-->', data)
            updateBaseenterprise(data)
                .then((res) => {
                  console.log('updateBaseenterprise-->', res)
                  if (res.status == 'SUCCESS') {
                    this.confirmLoading = false
                    this.$message.info('保存成功！')
                    this.companyVisible = false
                    //   提示用户信息
                    this.$store.commit('SET_ENTERPRISENAME', data.enterprisename)
                  }
                })
                .catch((err) => {
                  console.log('错误------》', err)
                  this.confirmLoading = false
                })
          }, 2000)
        } else {
          // 等于false
          console.log('error submit!!')
          this.confirmLoading = false
          //   提示提交失败
          // this.$message.info('亲，您的填写内容不符合要求，请重新填写！！！');
          return false
          //   结束函数
        }
      })
      // console.log(this.form.expiryDate);
      this.form.time = moment(this.form.expiryDate).format('YYYY-MM-DD')
      console.log(moment(this.form.expiryDate).format('YYYY-MM-DD HH:mm'))
    },
    companyCancel() {
      console.log('Clicked cancel button')
      this.$refs.ruleForm.resetFields()
      this.companyVisible = false
    },
    ...mapActions(['Logout']),
    disband() {
      this.$confirm({
        title: '确认将要解散企业？',
        content: '解散企业操作不可撤回，请慎重考虑',
        okText: '联系我们',
        onOk: () => {
        },
        onCancel() {
        },
      })
    },
    confirmOk(e) {
      console.log('this.form.cName------>', this.form.cName)
      console.log('this.form.enterprisename------>', this.form.enterprisename)
      this.$refs.CruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          if (this.form.cName == this.form.enterprisename) {
            setTimeout(() => {
              console.log('ok')
              this.confirmLoading = false
              this.confirmVisible = false
              this.phoneVisible = true
              this.form.cName = ''
              this.$refs.CruleForm.resetFields()
            }, 1000)
          } else {
            this.$message.info('企业名称不一致')
            console.log('error submit!!')
            this.confirmLoading = false
            return false
          }
        }
      })
    },
    phoneOk() {
      this.$refs.PruleForm.validate((valid) => {
        if (valid) {
          this.$refs.GruleForm.validate((valid) => {
            if (valid) {
              this.loading = true
              setTimeout(() => {
                this.loading = false
                this.phoneVisible = false
                this.form.Newphone = ''
                this.form.VerificationCode = ''
                this.$message.info('初始化成功！！！')
                var oBtn = document.getElementsByClassName('GVbtn')[0]
                oBtn.setAttribute('disabled', 'disabled') // 禁用按钮
              }, 4000)
            }
          })
        }
        return false
      })
    },
    phoneCancel() {
      this.loading = false
      this.phoneVisible = false
      this.form.Newphone = ''
      this.form.VerificationCode = ''
      var oBtn = document.getElementsByClassName('GVbtn')[0]
      oBtn.setAttribute('disabled', 'disabled') // 禁用按钮
      this.$refs.PruleForm.resetFields()
      this.$refs.GruleForm.resetFields()
      var pBtn = document.getElementsByClassName('phoneBtn')[0]
      pBtn.setAttribute('disabled', 'disabled') // 禁用按钮
    },
    getVerificationCode() {
      var oBtn1 = document.getElementsByClassName('GPBtn')[0]
      // this.$message.info("发送验证码成功！")
      const hide = this.$message.loading('验证码发送中..', 0)
      console.log(this.form.enterprisetel)
      const params = {}
      params.enterprisephone = this.form.enterprisetel
      retrievePsdSendSMSregister(params)
          .then((res) => {
            if (res.status == 'SUCCESS') {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: res.errorMsg,
                duration: 8,
              })
            } else if (res.status == 'FAILED' || res.status == 'EXCEPTION') {
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
      var time = 60
      var timer = null
      oBtn1.innerHTML = time + '秒后重新发送'
      oBtn1.setAttribute('disabled', 'disabled') // 禁用按钮
      // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
      timer = setInterval(function () {
        // 定时器到底了 兄弟们回家啦
        if (time == 1) {
          clearInterval(timer)
          oBtn1.innerHTML = '获取验证码'
          oBtn1.removeAttribute('disabled') //移除禁用效果
          // oBtn.removeAttribute('class');  //移除变灰样式效果
        } else {
          time--
          oBtn1.innerHTML = time + '秒后重新发送'
        }
      }, 1000)
      console.log('获取验证码')
    },
    getPhoneVerificationCode() {
      console.log(this.form.enterprisephone)
      const hide = this.$message.loading('验证码发送中..', 0)
      const params = {}
      params.enterprisephone = this.form.enterprisephone
      retrievePsdSendSMSregister(params)
          .then((res) => {
            if (res.status == 'SUCCESS') {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: res.errorMsg,
                duration: 8,
              })
            } else if (res.status == 'FAILED' || res.status == 'EXCEPTION') {
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
      var oBtn1 = document.getElementsByClassName('GPBtn3')[0]
      // this.$message.info("发送验证码成功！")
      var time = 60
      var timer = null
      oBtn1.innerHTML = time + '秒后重新发送'
      oBtn1.setAttribute('disabled', 'disabled') // 禁用按钮
      // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
      timer = setInterval(function () {
        // 定时器到底了 兄弟们回家啦
        if (time == 1) {
          clearInterval(timer)
          oBtn1.innerHTML = '获取验证码'
          oBtn1.removeAttribute('disabled') //移除禁用效果
          // oBtn.removeAttribute('class');  //移除变灰样式效果
        } else {
          time--
          oBtn1.innerHTML = time + '秒后重新发送'
        }
      }, 1000)
      console.log('获取验证码')
    },

    getMailVerificationCode() {
      var pBtn = document.getElementsByClassName('phoneBtn')[0]
      console.log('pBtn_________>', pBtn)
      pBtn.removeAttribute('disabled')
      var oBtn = document.getElementsByClassName('GVbtn')[0]

      const hide = this.$message.loading('验证码发送中..', 0)
      const params = {}
      console.log('手机号码----->', this.form.enterprisephone)
      params.enterprisephone = this.form.enterprisephone
      retrievePsdSendSMSregister(params)
          .then((res) => {
            if (res.status == 'SUCCESS') {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: res.errorMsg,
                duration: 8,
              })
            } else if (res.status == 'FAILED' || res.status == 'EXCEPTION') {
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

      var time = 60
      var timer = null
      oBtn.innerHTML = time + '秒后重新发送'
      oBtn.setAttribute('disabled', 'disabled') // 禁用按钮
      // oBtn.setAttribute('class', 'disabled');   // 添加class 按钮样式变灰
      timer = setInterval(function () {
        // 定时器到底了 兄弟们回家啦
        if (time == 1) {
          clearInterval(timer)
          oBtn.innerHTML = '获取验证码'
          oBtn.removeAttribute('disabled') //移除禁用效果
          // oBtn.removeAttribute('class');  //移除变灰样式效果
        } else if (this.phoneVisible === false) {
          clearInterval(timer)
          console.log('结束计时器')
        } else {
          time--
          oBtn.innerHTML = time + '秒后重新发送'
        }
      }, 1000)
      console.log('获取验证码')
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.ok = false
    },
    confirmCancel(e) {
      this.$refs.CruleForm.resetFields()
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
    /**
     * 企业初始话选择确认
     * @param e
     */
    handleChange(e) {
      this.radioValue = e.target.value;
    },
    /**
     * 初始话企业信息确认
     */
    handleOk(e) {
      if (this.radioValue == null || this.radioValue == '' || this.radioValue == undefined) {
        this.$message.error("请勾选需要清除的数据类型")
        return false;
      }
      let context = '';
      if (this.radioValue == '1') {
        context = '基础数据';
      } else if (this.radioValue == '2') {
        context = '业务数据';
      } else if (this.radioValue == '3') {
        context = '表单数据';
      }
      // 提示
      this.$confirm({
        title: '是否确认清除' + context + "？",
        content: '清除数据操作不可找回，请慎重考虑！',
        onOk: () => {
          this.confirmLoading = true;
          // 调用后台接口方法
          let param = {
            radioValue: this.radioValue,
            enterpriseid: this.form.enterpriseid,
          }
          initCompanyData(param).then((res) => {
            console.log('initCompanyData-->', res)
            if (res.status == 'SUCCESS') {
              this.$message.success('初始化成功！')
              this.confirmLoading = false
              this.visible = false
            }
          }).catch((err) => {
            console.log('初始化错误：', err)
            this.confirmLoading = false
          })
        },
        onCancel() {

        },
      })

    },
  },
}
</script>
<style lang="less" scoped>
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  background: rgba(222, 221, 221, 0.7);
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 0px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .edit {
    background: rgba(24, 144, 255, 0.7);
  }

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 0;
    overflow: hidden;
  }
}
</style>
