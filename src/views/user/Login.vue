<template>
      <div  class="main">
        <a-form v-show="loginVisible" id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
          <a-tabs
            :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
            @change="handleTabClick"
          >

            <a-tab-pane key="tab2" tab="验证码登录">
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="请输入手机号"
                  v-decorator="[
                    'mobile',
                    {
                      rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }],
                      validateTrigger: 'change'
                    }
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
                        'captcha',
                        { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' }
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
              <a-row>
                <a-form-item >
                <p style="margin-bottom:0px">如果无法收到验证码短信，请尝试<a class="VoiceVerificationCode" @click="VoiceVerificationCode">语音验证码</a></p>
                </a-form-item>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="tab1" tab="密码登录">
              <!-- <a-alert
                v-if="isLoginError"
                type="error"
                showIcon
                style="margin-bottom: 24px;"
                message="账户或密码错误（13333333333)"
              /> -->
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="请输入手机号"
                  v-decorator="[
                    'mobile',
                    {
                      rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }],
                      validateTrigger: 'change'
                    }
                  ]"
                >
                  <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
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
                    { rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
                  ]"
                >
                  <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
                <a-button type="link" @click="forgotPassword" class="forge-password" style="float: right;"
                >忘记密码</a-button>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <a-form-item>
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

          <div class="user-login-other">
            <span> 还没账号？</span><router-link class="register" :to="{ name: 'register' }">免费注册</router-link>
          </div>
        </a-form>
        <a-form v-show="ForgotPasswordVisible"  :form="form">
          <forgot-password></forgot-password>
          <a-button type="link" @click="backLogin" class="forge-password" style="float: right;">返回登录</a-button>
          </a-form>
        <a-modal
          title="滑动验证"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
        >
           <slider ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
        </a-modal>
      </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import ForgotPassword from './ForgotPassword'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getSmsCaptcha, get2step } from '@/api/login'
import Slider from '@/components/tools/Slider'

export default {
  name: 'VueTelInput',
  components: {
        Slider,
    TwoStepCaptcha,
    ForgotPassword
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      loginVisible:true,
      ForgotPasswordVisible:false,
      customActiveKey: 'tab2',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      },
      value: 86
    }
  },
  created() {
    get2step({})
      .then(res => {
        console.log('2step-code-->', JSON.stringify(res))
        this.requiredTwoStepCaptcha = res.result.stepCode
      })
      .catch(() => {
        this.requiredTwoStepCaptcha = false
      })
    // this.requiredTwoStepCaptcha = true
  },
  methods: {
    confirmSuccess:function (confirmSuccess) {
      this.Success = confirmSuccess
      var oBtn = document.getElementsByClassName('VoiceVerificationCode')[0];
      oBtn.removeAttribute('disabled'); //移除禁用效果
    },
    VoiceVerificationCode(){
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.$refs.slideblock.reset();//重置滑动验证
        this.$notification['success']({
          message:  "语音验证码已发送，请注意接听",         
      });
      }, 2000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    forgotPassword(){
      this.loginVisible = false
      this.ForgotPasswordVisible = true
    },
    backLogin(){
      this.loginVisible = true
      this.ForgotPasswordVisible = false
    },
    ...mapActions(['Login', 'Logout']),
    // handler
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
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = md5(values.password)

          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
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

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha({ mobile: values.mobile })
            .then(res => {
              setTimeout(hide, 2500)
              this.$notification['success']({
                message: '提示',
                description: '验证码获取成功，您的验证码为：' + res.result.captcha,
                duration: 8
              })
            })
            .catch(err => {
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
      // check res.homePage define, set $router.push name res.homePage
      // Why not enter onComplete
      /*
      this.$router.push({ name: 'analysis' }, () => {
        console.log('onComplete')
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      })
      */
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
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
    margin-top: 0px;
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: right;
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
