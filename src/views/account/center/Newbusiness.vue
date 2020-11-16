<template>
  <div class="main">
    <a-form v-show="createVisible" id="formLogin" class="user-layout-login" :form="form">
      <a-form-item>
        <h1 style="text-align: center; font-weight: bold">创建企业</h1>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="最多可输入50个字符"
          v-model="enterprisename"
          v-decorator="[
            'EnterpriseName',
            {
              rules: [
                { required: true, message: '请填写企业名称' },
                { min: 1, max: 50, message: '最少可输入1个字符，最多可输入50个字符', trigger: 'blur' },
              ],
            },
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click="handleSubmit"
          >创建</a-button
        >
      </a-form-item>
    </a-form>
    <a-form v-show="centerVisible" id="formLogin" class="user-layout-login" :form="form">
      <a-form-item>
        <a-icon type="check" :style="{ fontSize: '70px', color: ' #108ee9', marginLeft: '150px' }" />
        <h1 style="text-align: center; font-weight: bold">创建成功</h1>
      </a-form-item>
      <a-form-item> </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click="handleCenter"
          >进入企业</a-button
        >
      </a-form-item>
      <a-form-item>
        <img style="width: 200px; height: 200px; margin-left: 90px" src="../../../assets/QRcode.jpg" />
      </a-form-item>
      <a-form-item style="text-align: center">
        <a-button type="link" @click="copylink">复制邀请链接</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="copycode">复制邀请码</a-button>
      </a-form-item>
    </a-form>
    <a-modal
      title="邀请新员工"
      :visible="linkVisible"
      :confirm-loading="linkConfirmLoading"
      @ok="linkHandleOk"
      @cancel="linkHandleCancel"
      :width="600"
      okText="复制"
    >
      <a-form-item>
        <div style="display: flex; justify-content: space-between">
          <span>将以下链接分享给你要邀请的同事，链接有效期：</span>
          <countdown style="margin-right: 180px" />
        </div>
      </a-form-item>

      <br />
      <a>https://app.ekuaibao.com/applet/app.html#/invite/82299954</a>
      <br />
      <br />
      <p>任何人都可以通过此链接来注册并加入您的企业，请勿轻易将其泄露给无关人员</p>
    </a-modal>
    <a-modal
      title="邀请新员工"
      :visible="codeVisible"
      :confirm-loading="codeConfirmLoading"
      @ok="codeHandleOk"
      @cancel="codeHandleCancel"
      :width="600"
      okText="复制"
    >
      <a-form-item>
        <div style="display: flex; justify-content: space-between">
          <span>将以下邀请码分享给你要邀请的同事，邀请码有效期：</span>
          <countdown style="margin-right: 160px" />
        </div>
      </a-form-item>
      <br />
      <p>{{ InvitationCode }}</p>
      <br />
      <br />
      <p>任何人都可以通过此邀请码来注册并加入您的企业，请勿轻易将其泄露给无关人员</p>
    </a-modal>
  </div>
</template>

<script>
import Countdown from '@/components/tools/Countdown'
import { insertBaseenterprise } from '@/api/manage'
import { logininfo } from '@/store/mutation-types'
import Vue from 'vue'
export default {
  components: {
    Countdown,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      loginBtn: false,
      createVisible: true,
      centerVisible: false,
      linkVisible: false,
      codeVisible: false,
      linkConfirmLoading: false,
      codeConfirmLoading: false,
      InvitationCode: 85438613,
      defaultEnterpriseName: '',
      enterprisename: '',
    }
  },

  methods: {
    handleSubmit(e) {
      this.loginBtn = true
      this.form.validateFields((err) => {
        if (!err) {
          setTimeout(() => {
            const data = {}
            data.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
            data.enterprisename = this.enterprisename
            console.log('create params-->', JSON.stringify(data))
            insertBaseenterprise(data)
              .then((res) => {
                console.log('返回值--------》', res)
                if (res.status == 'SUCCESS') {
                  this.$message.info('新建成功')
                  console.log('新建成功')
                  console.info('success')
                  //   提示用户信息
                  this.loginBtn = false
                  this.createVisible = false
                  this.centerVisible = true
                } else if (res.status == 'FAILED') {
                  this.$message.info(res.errorMsg)

                  this.loginBtn = false
                }
              })
              .catch((err) => {
                console.log('错误------》', err)
                this.$message.info('新建企业失败！！')
                this.loginBtn = false
              })
          }, 2000)
        } else {
          this.loginBtn = false
          console.log('提交失败！！')
        }
      })
    },
    handleCenter() {
      this.loginBtn = true
      setTimeout(() => {
        this.loginBtn = false
        console.info('进入企业')
        this.$router.push({ path: '/' })
      }, 2000)
    },
    copylink() {
      this.linkVisible = true
    },
    copycode() {
      this.codeVisible = true
    },

    linkHandleOk(e) {
      this.linkConfirmLoading = true
      setTimeout(() => {
        this.linkVisible = false
        this.linkConfirmLoading = false
      }, 2000)
    },
    codeHandleOk(e) {
      this.codeConfirmLoading = true
      setTimeout(() => {
        this.codeVisible = false
        this.codeConfirmLoading = false
      }, 2000)
    },
    linkHandleCancel(e) {
      this.linkVisible = false
    },
    codeHandleCancel(e) {
      this.codeVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    margin-top: 0px;
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
