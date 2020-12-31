<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="2" tab="账号密码登录">
          <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px" message="账户或密码错误" />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入账号"
              v-decorator="[
                'enterprisephone',
                {
                  rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' },
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="1" tab="验证码登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="手机号"
              v-decorator="[
                'enterprisephone',
                {
                  rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
                  validateTrigger: 'change',
                },
              ]"
            >
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="验证码"
                  v-decorator="[
                    'phoneCode',
                    {
                      initialValue: '',
                      rules: [{ required: false, len: 4, message: '请输入验证码' }],
                      validateTrigger: 'change',
                    },
                  ]"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="(!state.smsSendBtn && '获取验证码') || state.time + ' s'"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
        <router-link :to="{ name: 'Recover', params: { user: 'aaa' } }" class="forge-password" style="float: right"
          >忘记密码</router-link
        >
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          >确定</a-button
        >
      </a-form-item>

      <router-link class="register" :to="{ name: 'register' }">还没有账号？注册账户</router-link>
    </a-form>
    <a-modal title="选择企业" :visible="enterpriseVisible" @ok="handleOk" @cancel="handleCancel">
      <a-radio-group v-model="radioValue" @change="handleChange">
        <a-radio :style="radioStyle" v-for="d in companyList" :value="d.enterpriseid">{{ d.enterprisename }}</a-radio>
      </a-radio-group>
    </a-modal>
    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha, get2step, getCompanyList } from '@/api/login'
import { retrievePsdSendSMSregister } from '@/api/register'
export default {
  components: {
    TwoStepCaptcha,
  },
  data() {
    return {
      enterpriseVisible: false,
      enterpriseid: '',
      companyDefault: '',
      companyList: {},
      customActiveKey: '2',
      enterprisephone: '',
      password: '',
      phoneCode: '',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false,
      },
      radioValue: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
    }
  },
  created() {
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleOk(e) {
      this.enterpriseVisible = false
      this.loginSubmit()
    },
    handleCancel(e) {
      this.enterpriseVisible = false
      this.state.loginBtn=false
      console.log('cancel is run')
    },
    // handler
    loginSubmit() {
      const { state, Login } = this
      const loginParams = {}
      loginParams.enterprisephone = this.enterprisephone
      loginParams.password = this.password
      loginParams.phoneCode = this.phoneCode
      loginParams.loginType = this.customActiveKey
      loginParams.enterpriseid = this.enterpriseid
      console.log('login params-->', JSON.stringify(loginParams))
      Login(loginParams)
        .then((res) => this.loginSuccess(res))
        .catch((err) => console.log(err))
        .finally(() => {
          state.loginBtn = false
        })
    },
    handleChange(e) {
      console.log('change', e.target.value)
      this.enterpriseid = e.target.value
    },
    dropdownVisibleChange(value) {},
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick(key) {
      this.customActiveKey = key
      console.log(key)
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login,
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === '2' ? ['username', 'password'] : ['mobile', 'captcha']
      this.form.validateFields((err, values) => {
        if (!err) {
          this.enterprisephone = values.enterprisephone
          this.password = values.password
          this.phoneCode = values.phoneCode

          const loginParams = {}

          loginParams.phone = values.enterprisephone
          loginParams.password = values.password
          loginParams.state = '1'
          console.log('enterpriseid params-->', loginParams)
          getCompanyList(loginParams)
            .then((res) => {
              if (res.status == 'FAILED') {
                this.requestFailed(res.errorMsg)
                state.loginBtn = false
              } else {
                if (res.result.length == 1) {
                  this.enterpriseid = res.result[0].enterpriseid
                  this.enterpriseVisible = false
                  this.loginSubmit()
                } else {
                  this.enterpriseVisible = true
                }
                this.companyList = res.result
              }
            })
            .catch(() => {
              this.requiredTwoStepCaptcha = false
            })
        }
      })
    },
    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
      } = this
      this.form.validateFields((err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          const params = {}
          params.enterprisephone = values.enterprisephone
          retrievePsdSendSMSregister(params)
            .then((res) => {
              console.log('getPictureVerification res-->', res)
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，请注意查收！',
                duration: 8,
              })
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    stepCaptchaSuccess() {
      this.loginSuccess()
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    loginSuccess(res) {
      this.$router.push({ name: 'index' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`,
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
