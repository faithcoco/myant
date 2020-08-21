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
            <a-col :span="4"> {{ Name }}(ID:{{ Id }}) </a-col>
            <a-col :span="12">
              <a-button type="primary" style="margin-left:20px" @click="Initialize()">初始化</a-button>
              <a-button type="primary" style="margin-left:20px">编辑</a-button>
              <a-button type="primary" style="margin-left:20px">解散企业</a-button>
              <a-button type="primary" style="margin-left:20px">切换所在企业</a-button>
              <a-button type="primary" style="margin-left:20px">新建企业</a-button>
            </a-col>
          </a-row>
          <a-divider type="horizontal" />
          <a-row>
            <a-col>
              <a-form layout="vertical">
                <a-form-item>
                  <a-icon style="margin-right:10px" type="barcode" class="upload-icon" />企业编码:
                  {{ Phone }}</a-form-item
                >
                <a-form-item>
                  <a-icon style="margin-right:10px" type="bank" class="upload-icon" />企业名称: {{ fax }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="user" class="upload-icon" />联系人: {{ address }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="phone" class="upload-icon" />手机: {{ SensitiveWords }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="mail" class="upload-icon" />邮箱: {{ SensitiveWords }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="deployment-unit" class="upload-icon" />使用人数:
                  {{ SensitiveWords }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="logout" class="upload-icon" />LOGO: {{ SensitiveWords }}
                </a-form-item>
                <a-form-item>
                  <a-icon style="margin-right:10px" type="contacts" class="upload-icon" />到期日: {{ SensitiveWords }}
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
      <a-radio>我已了解该操作的风险</a-radio>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { formModel, Button } from 'ant-design-vue'
Vue.use(formModel, Button)
export default {
  data() {
    return {
      Name: '上古',
      Id: 'rEcbrupMpQv400',
      Phone: '无',
      fax: '无',
      address: '无',
      SensitiveWords: '无',
      ModalText: '',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    Initialize() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onSearch(value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped></style>
