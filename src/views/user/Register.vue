<template>
  <div class="main user-layout-register">
    <div style="text-align:center">
      <h2>
        <span>填写信息，获取免费试用名额</span>
      </h2>
      <h4>
        <span>客服人员会尽快与您取得联系，安排试用</span>
      </h4>
      <br />
    </div>
    <a-form-model
      ref="formRegister"
      :form="form"
      id="formRegister"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="姓名">
        <a-input
          v-model="data.enterpriseregistrant"
          size="large"
          type="text"
          placeholder="请输入正确姓名"
          v-decorator="['EnterpriseRegistrant', {rules: [{ required: true, message: '请输入正确姓名' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="手机号码">
        <a-input
          v-model="data.enterprisephone"
          size="large"
          placeholder="请输入正确手机号"
          v-decorator="['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"
        >
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="图片验证">
        <div style="display: flex;justify-content: space-between;">
          <a-input
            v-model="data.captchaCode"
            style="max-width:150px"
            size="large"
            placeholder="图片验证码"
            @change="pictureCodeFn"
            v-decorator="['userToken', {rules: [{ required: true, message: '请输入正确的图片验证码' }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
          <div @click="refreshCode">
            <sidentify
              style="margin-bottom:-14.5px"
              ref="sidentifyblock"
              :identifyCode="identifyCode"
              :contentWidth="120"
              :contentHeight="40"
            ></sidentify>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="手机验证">
        <div style="display: flex;justify-content: space-between;">
          <a-input
            v-model="data.phoneCode"
            size="large"
            style="max-width:160px"
            type="text"
            placeholder="短信验证码"
            v-decorator="['enterprisephone', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
          ></a-input>
          <a-button
            class="getCaptcha"
            tabindex="-1"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
          ></a-button>
        </div>
      </a-form-model-item>
      <a-form-model-item label="企业名称">
        <a-input
          v-model="data.enterprisename"
          size="large"
          type="text"
          placeholder="请输入正确的企业名称"
          v-decorator="['EnterpriseName', {rules: [{ required: true,  message: '请输入正确的企业名称' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-model-item>
       <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="密码">
        <a-input
          size="large"
          type="password"
          v-model="data.password"
          placeholder="请输入密码"
          v-decorator="['PersonPassword', {rules: [{ required: true, message: '请输入密码' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-model-item>
       </a-form>
      <!-- <a-form-item>
        <a-checkbox/>
        <a-button type="link"  class="privacy" @click="privacy">同意《用户注册服务协议》</a-button>
      </a-form-item>-->
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >立即获取</a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form-model>
    <a-modal :width="1000" :visible="privacyVisible" @cancel="handleCancel" :footer="null">
      <privacy></privacy>
    </a-modal>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin.js'
import { getSmsCaptcha } from '@/api/login'
import { retrievePsdSendSMSregister, getPictureVerification, insertBdregister } from '@/api/register'
import Privacy from './Privacy'
import Sidentify from '@/components/tools/SIdentify'
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)

export default {
  name: 'Register',
  components: {
    Privacy,
    Sidentify,
  },
  mixins: [mixinDevice],
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.from.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      identifyCodes: '1234567890', // 设置验证码为数字验证码，如果想要验证码为字母数字组合，可以加字母，如： identifyCodes: 'ABCD1234567890abcd'
      identifyCode: '',
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      privacyVisible: false,
      form: this.$form.createForm(this),
      data: {
        enterprisephone: '',
        userToken: this.randomNum,
        enterpriseregistrant: '',
        captchaCode: '',
        phoneCode: '',
        enterprisename: '',
        password: '',
      },
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000',
      },
      registerBtn: false,
    }
  },

  created() {
    const params = {}
    this.makeCode()
    params.userToken = this.data.userToken
    getPictureVerification(params).then((res) => {
      this.identifyCode = res.result
      console.log('getPictureVerification res-->', res)
    })
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    },
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      const params = {}

      this.makeCode()
      params.userToken = this.data.userToken

      getPictureVerification(params).then((res) => {
        this.identifyCode = res.result
        console.log('getPictureVerification res-->', res)
      })
    },
    makeCode() {
      this.data.userToken = ''
      for (let i = 0; i < 10; i++) {
        this.data.userToken += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log('user', this.data.userToken)
    },

    pictureCodeFn() {},
    privacy() {
      this.privacyVisible = true
    },
    handleOk(e) {
      setTimeout(() => {
        this.privacyVisible = false
      }, 2000)
    },
    handleCancel(e) {
      this.privacyVisible = false
    },
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')

      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePhoneCheck(rule, value, callback) {
      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit() {
      const params = {}
      params.enterprisephone = this.data.enterprisephone
      params.enterpriseregistrant = this.data.enterpriseregistrant
      params.captchaCode = this.data.captchaCode
      params.userToken = this.data.userToken
      params.enterprisename = this.data.enterprisename
      params.phoneCode = this.data.phoneCode
      params.password=this.data.password
      console.log('register params-->',JSON.stringify(params))
      this.registerBtn=true
      insertBdregister(params).then((res) => {
        console.log('insertBdregister res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.$router.push({
            name: `registerResult`, // 这里只能是name，对应路由
            params: { EnterpriseName: this.data.enterprisename },
          })
        } else {
          this.$message.error(res.errorMsg)
        }
        this.registerBtn=false
      })
    },

    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        $message,
        $notification,
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          // const hide = $message.loading('验证码发送中..', 0)

          const params = {}
          params.enterprisephone = this.data.enterprisephone
          retrievePsdSendSMSregister(params).then((res) => {
            console.log('getPictureVerification res-->', res)
          })
        }
      })
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4,
      })
      this.registerBtn = false
    },
  },
  watch: {
    'state.passwordLevel'(val) {
      console.log(val)
    },
  },
}
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    margin-left: 10px;
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 133%;
  }

  .login {
    float: left;
    line-height: 40px;
  }
}
</style>
