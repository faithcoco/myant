<template>
    <div  class="main">
        <a-form v-show="createVisible"  id="formLogin" class="user-layout-login" :form="form">
          <div style="display:flex;justify-content:space-between">
            <a-form-item>
                <h1 style="text-align : center;font-weight:bold">选择企业</h1>
            </a-form-item>
            <a-form-item>
                <a
                @click="handleLogout"
                >登出</a
                >
            </a-form-item>
          </div>
            
            <a-form-item>
                    <a-radio-group style="width:100%;text-align : center;margin-bottom:50px" button-style="solid" v-model="value" @change="onChange">
                      <a-radio-button style="margin-bottom:10px" :style="radioStyle" :value="1">
                       上古
                      </a-radio-button>
                      <a-radio-button :style="radioStyle" :value="2">
                        下海
                      </a-radio-button>
                    </a-radio-group>
            </a-form-item>
            <a-form-item>
                <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="loginBtn"
                @click="handleSubmit"
                >进入企业</a-button
                >
            </a-form-item>

        </a-form>
        <a-form v-show="centerVisible"  id="formLogin" class="user-layout-login" :form="form">
            <a-form-item>
                 <a-icon type="check" :style="{ fontSize: '70px', color: ' #108ee9',marginLeft:'150px' }"/>
                <h1 style="text-align : center;font-weight:bold">创建成功</h1>
            </a-form-item>
            <a-form-item>
            </a-form-item>
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
                 <img  style="width: 200px; height: 200px; margin-left:90px" src="../../../assets/QRcode.jpg">
            </a-form-item>
            <a-form-item style="text-align : center">
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
            :width=600
            okText = '复制'
            >
            <a-form-item>
                <div style="  display: flex;
                     justify-content: space-between;">
                <span >将以下链接分享给你要邀请的同事，链接有效期：</span>
                <countdown style="margin-right:180px" />
                </div>
            </a-form-item>

            <br>
            <a>https://app.ekuaibao.com/applet/app.html#/invite/82299954</a>
            <br>
            <br>
            <p>任何人都可以通过此链接来注册并加入您的企业，请勿轻易将其泄露给无关人员
            </p>
        </a-modal>
        <a-modal
            title="邀请新员工"
            :visible="codeVisible"
            :confirm-loading="codeConfirmLoading"
            @ok="codeHandleOk"
            @cancel="codeHandleCancel"
            :width=600
            okText = '复制'
            >
            <a-form-item>
                <div style="  display: flex;
                     justify-content: space-between;">
                <span >将以下邀请码分享给你要邀请的同事，邀请码有效期：</span>
                <countdown style="margin-right:160px" />
                </div>
            </a-form-item>
            <br>
            <p>{{InvitationCode}}</p>
            <br>
            <br>
            <p>任何人都可以通过此邀请码来注册并加入您的企业，请勿轻易将其泄露给无关人员
            </p>
        </a-modal>
    </div>
</template>

<script>
const EnterpriseName = [
  {
    title: '上古',value:1
  },
  {
    title: '下海',value:2
  },
];

import { mapActions } from 'vuex'
import Countdown from '@/components/tools/Countdown'
export default {
    components: {
    Countdown,
	},
  data() {
    return {
       value: 1,
       radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
         EnterpriseName,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      loginBtn: false,
      loginBtn1: false,
      loginBtn2: false,
      createVisible: true,
      centerVisible: false,
      linkVisible: false,
      codeVisible: false,
      linkConfirmLoading: false,
      codeConfirmLoading: false,
      InvitationCode:85438613,
      defaultEnterpriseName:'',

    }
  },
  methods: {
 onChange(e) {
      console.log('radio checked', e.target.value);
    },
    
    ...mapActions(['Logout']),
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
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
      })
    },
    handleSubmit(e) {
        this.loginBtn = true

                setTimeout(() => {
                    this.loginBtn = false
                    this.createVisible = false
                    this.$router.push({ path: '/account/center/CorporationInfo', })
                    console.log("表单提交了");
                    console.info('success');
                }, 2000); 
    },
    handleCenter(){
        this.loginBtn = true
        setTimeout(() => {
            this.loginBtn = false
            console.info('进入企业');
            this.$router.push({ path: '/' })
        }, 2000); 
    },
    copylink(){
        this.linkVisible = true;
    },
    copycode(){
        this.codeVisible = true;
    },

    linkHandleOk(e) {
      this.linkConfirmLoading = true;
      setTimeout(() => {
        this.linkVisible = false;
        this.linkConfirmLoading = false;
      }, 2000);
    },
    codeHandleOk(e) {
      this.codeConfirmLoading = true;
      setTimeout(() => {
        this.codeVisible = false;
        this.codeConfirmLoading = false;
      }, 2000);
    },
    linkHandleCancel(e) {
      this.linkVisible = false;
    },
    codeHandleCancel(e) {
      this.codeVisible = false;
    },
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  button.login-button {
    margin-top: 0px;
    margin-left:100px;
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 50%;
  }
}
</style>
