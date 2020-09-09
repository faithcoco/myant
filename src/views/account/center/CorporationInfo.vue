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
            <a-col style="font-weight:bold">
              <a-avatar shape="square" :size="70" icon="user" :src="form.LOGO" style="margin-right:30px"/>
               {{ form.companyName }}&nbsp;(ID:&nbsp;{{ form.companyCode }})
            </a-col>
            <a-col style="margin-right:50px">
              <a-button type="primary" style="margin-left:20px" @click="Initialize()">初始化</a-button>
              <a-button type="primary" style="margin-left:20px" @click="edit()">编辑</a-button>
              <a-button type="primary" style="margin-left:20px" @click="Newbusiness()">新建企业</a-button>
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
                <!-- <a-form-item>
                  <a-icon style="margin-right:10px" type="logout" class="upload-icon" />
                  LOGO: 
                  <a-avatar shape :size="100" icon="user" src="/avatar2.jpg" />
                  {{ form.LOGO }}
                </a-form-item> -->
                <a-form-item>
                  <a-icon style="margin-right:10px" type="contacts" class="upload-icon" />到期日: {{ form.time }}
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
            <a-col :md="15" :lg="4" :style="{ minHeight: '100px' }">
              <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                <div class="mask">
                  <a-icon type="plus" />
                </div>
                <img :src="option.img" />
              </div>
            </a-col>
            <avatar-modal ref="modal" @ok="setavatar" />
          </a-form-model-item>
          <a-form-model-item label="到期日:"  prop="expiryDate">
            <a-date-picker 
              v-model="form.expiryDate"
              placeholder="请选择入库日期"
              style="width: 100%;" />
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
          ref="CruleForm"
          :model="form"
          :rules="rules"
        >
        <a-form-model-item 
          style="display: flex; align-items: center;justify-content: center;text-align: justify;">
        {{form.companyName}}
        </a-form-model-item>
        <a-form-model-item label="" prop="cName">
        <a-input v-model="form.cName" placeholder="输入企业名称以确认初始化企业数据"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

      <a-modal
        :visible="phoneVisible"
        :width='700'
        style="text-align:center"
      >
        <template slot="footer">
          <a-button key="back" @click="phoneCancel">
            取消
          </a-button>
          <a-button key="submit" class="phoneBtn" :loading="loading" disabled type="primary" @click="phoneOk">
            确认
          </a-button>
        </template>
      <a-form-model
          ref="PruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          >
        <a-form-model-item>
          <span>手机验证通过后会初始化数据</span>
        </a-form-model-item>
        <a-form-model-item label="输入手机号:" prop="Newphone" >
        <a-input v-model="form.Newphone" placeholder="请输入手机号"></a-input>
        </a-form-model-item>
        <a-form-model-item label="滑动验证码:">
          <slider ref="slideblock" v-on:confirmSuccess="confirmSuccess"></slider>
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        ref="GruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="输入验证码:" prop="VerificationCode">
          <a-input v-model="form.VerificationCode" placeholder="输入验证码-111">
            <a-button class="GVbtn" disabled slot="suffix" type="link" @click="getMailVerificationCode">获取验证码</a-button>
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
import moment from 'moment'
import { mapActions } from 'vuex'
import AvatarModal from '../settings/AvatarModal'
export default {
components: {
    Slider,
    AvatarModal
	},
  data() {
    return {
      preview: {},
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
        fixedNumber: [1, 1]
      },
      previewVisible: false,
      ok:false,
      visible: false,
      companyVisible: false,
      confirmVisible: false,
      confirmLoading: false,
      loading: false,
      phoneVisible: false,
      form:{
        companyCode: 'rEcbrupMpQv400',
        companyName: '上古',
        contactPerson: 'curry',
        phone: '无',
        Newphone: '',
        mail:'无',
        userCount: '无',
        LOGO: '/avatar2.jpg',
        expiryDate: '2020-09-01',
        time: '2020-09-01',
        cName:'',
        VerificationCode:'',
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      rules: {
          //校验规则
          companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          cName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          Newphone: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' },
            ],
          VerificationCode: [{ required: true, message: '请输入验证码'}],
          expiryDate: [{ required: true, message: '请选择到期日', trigger: 'blur' }],
      },
    }
  },
  methods: {
    Newbusiness(){
      this.$router.push({ path: '/Newbusiness' })
    },
    setavatar(url) {
      console.log('--------->',url);
      this.option.img = url
    },
    pCancel() {
      this.previewVisible = false;
    },
    confirmSuccess:function (confirmSuccess) {
      this.Success = confirmSuccess
      var oBtn = document.getElementsByClassName('GVbtn')[0];
      oBtn.removeAttribute('disabled'); //移除禁用效果
    },
    Initialize() {
      this.visible = true
    },
    edit(){
      this.companyVisible = true
    },
    companyOk(e) {
      this.confirmLoading = true
      this.$refs.ruleForm.validate((valid) => {
          //    this.$refs.ruleForm   获取整个表单
          //validate   对整个表单进行校验的方法
          if (valid) {
            setTimeout(() => {
          //判断valid是否等于true
              this.confirmLoading = false
              this.$message.info('保存成功！');
              this.companyVisible = false
          //   提示用户信息
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
          console.log(moment(this.form.expiryDate).format('YYYY-MM-DD HH:mm'));
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
              }, 3000)
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
        this.ok=false
      }, 2000)
    },
    confirmOk(e) {

      console.log('this.form.cName------>',this.form.cName);
      console.log('this.form.companyName------>',this.form.companyName);
          this.$refs.CruleForm.validate((valid) => {
          if (valid) {
              this.confirmLoading = true
              if (this.form.cName==this.form.companyName) {
                setTimeout(() => {
                  console.log('ok');
                  this.confirmLoading = false
                  this.confirmVisible = false
                  this.phoneVisible = true
                  this.form.cName=''
                  this.$refs.CruleForm.resetFields()
                }, 1000)
              } else {
                this.$message.info("企业名称不一致")
                console.log('error submit!!')
                this.confirmLoading = false
                return false
              }
          }     
        })
    },
    phoneOk(){
      this.$refs.PruleForm.validate((valid) => {
        if (valid) {
          this.$refs.GruleForm.validate((valid) => {
            if (valid) {
              this.loading = true
              setTimeout(() => {
                this.loading = false
                this.phoneVisible = false
                this.$refs.slideblock.reset();//重置滑动验证
                this.form.Newphone = ''
                this.form.VerificationCode = ''
                this.$message.info('初始化成功！！！')
                var oBtn = document.getElementsByClassName('GVbtn')[0];
                oBtn.setAttribute('disabled', 'disabled');  // 禁用按钮
                this.$refs.slideblock.reset();//重置滑动验证
              }, 4000)
            }
          })
        }
        return false
      })
    },
    phoneCancel(){
      this.loading = false
      this.phoneVisible = false
      this.form.Newphone = ''
      this.form.VerificationCode = ''
      var oBtn = document.getElementsByClassName('GVbtn')[0];
      oBtn.setAttribute('disabled', 'disabled');  // 禁用按钮
      this.$refs.slideblock.reset();//重置滑动验证
      this.$refs.PruleForm.resetFields()
      this.$refs.GruleForm.resetFields()
      var pBtn = document.getElementsByClassName('phoneBtn')[0];
      pBtn.setAttribute('disabled', 'disabled');  // 禁用按钮
    },
    getMailVerificationCode(){
      if (this.Success!=true) {
          this.$message.info('验证未通过！');
          return false
      }
      this.$refs.PruleForm.validate((valid) => {
        if (valid) {
            var pBtn = document.getElementsByClassName('phoneBtn')[0];
            console.log("pBtn_________>",pBtn);
            pBtn.removeAttribute('disabled')
            var oBtn = document.getElementsByClassName('GVbtn')[0];
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
        }
        return false
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.ok=false
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
  }
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
  .edit{
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
