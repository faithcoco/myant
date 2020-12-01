<template>
  <div class="approval">
    <a-drawer
      title="产品详情"
      placement="right"
      :width="720"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <a-descriptions title :column="2">
        <a-descriptions-item v-for="(item, index) in descriptions" v-if="item.label != '审批流'" :label="item.label">{{
          item.value
        }}</a-descriptions-item>

        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{ status }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider>审批详情</a-divider>
      <a-timeline>
        <a-timeline-item v-for="item in timelinelist" :key="item.key">
          <p>
            <a-row>
              <a-col :span="8">
                <b>{{ item.name + ' ' + item.approvestatus }}</b>
              </a-col>
              <a-col :span="3">{{ item.time }}</a-col>
            </a-row>
          </p>
          <p>
            <a href="#" v-for="item in item.mentions" :key="item.name">@{{ item.name }}</a>
            {{ item.approveNote }}
          </p>
          <p v-show="item.isShow">
            <a-card v-for="item in item.img" :key="item.src" :bordered="false">
              <img slot="extra" alt="logo" :src="item.src" />
              <br />
            </a-card>
          </p>
        </a-timeline-item>
      </a-timeline>
      <a-row>
        <a-col :span="3">
          <a-button type="primary" @click="approvalClick">审批</a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="danger" @click="cancelClick">撤销</a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="chatClick">评论</a-button>
        </a-col>
      </a-row>
    </a-drawer>
    <a-modal
      width="1000px"
      title="评论"
      :visible="chat_visible"
      :confirm-loading="confirmLoading"
      @ok="chatOk"
      @cancel="chatCancel"
    >
      <div>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <div slot="content">
            <a-form-item>
              <a-mentions v-model="content" :rows="4" @change="onChange" @select="onSelect">
                <a-mentions-option v-for="item in personnelList" :key="item.name" :value="item.name">{{
                  item.name
                }}</a-mentions-option>
              </a-mentions>
              <a-upload
                name="file"
                :multiple="true"
                action="/api/common/upload"
                :headers="headers"
                @change="fileChange"
              >
                <a-button type="link" :size="size">添加附件</a-button>
              </a-upload>
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">评论</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
      <div slot="footer"></div>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import { Timeline } from 'ant-design-vue'
import { type } from 'mockjs2'
Vue.use(Timeline)
import { Mentions } from 'ant-design-vue'
Vue.use(Mentions)
import { getPersonnelList, getApproval } from '@/api/manage'
import moment from 'moment'
import { logininfo } from '@/store/mutation-types'
import { postData, getData } from '@/api/manage'
import { resetWarned } from 'ant-design-vue/es/_util/warning'

const product = {}
const personnelList = []

export default {
  name: 'approval',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    materialid: {
      type: String,
    },
    menu: {
      type: String,
    },
    product: {
      type: Object,
    },
  },
  data() {
    return {
      // visible: false,
      // product,
      status: '正在审批',
      timelinelist: [],
      chat_visible: false,
      submitting: false,
      personnelList,

      color: '',
      value: '',
      confirmLoading: false,
      headers: {
        authorization: 'authorization-text',
      },
      menuid: '',
      size: 'small',
      descriptions: [],
      instanceId: '',
      expiryDate: '1606468834000',
      currtent: 0, //1审批2撤销
      content: '',
    }
  },
  components: {},
  created() {},

  mounted() {},
  methods: {
    getTimeline() {
      const parameter = {}
      parameter.bizid = this.materialid
      console.log('timeline param-->', JSON.stringify(parameter))
      getData(parameter, '/work/getApprovalInfo').then((res) => {
        console.log('timeline-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.timelinelist = res.result.data
          this.instanceId = res.result.instanceId
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },
    initdata() {
      const parameter = {}
      parameter.memucode = '02-02'
      var url = '/bd/menu/findallmenu'

      getData(parameter, url).then((res) => {
        this.menuid = res.result
        this.getFormdata()
        this.getTimeline()
      })
    },
    getFormdata() {
      const columnsParams = {}
      columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid

      this.materialid = this.materialid
      console.log('materialid', this.materialid)
      if (this.menu == 'ReceiptNoticeList') {
        this.urlForm = '/bd/docreceiptnotice/updateform'
        columnsParams.receiptnoticeid = this.materialid
      }

     

      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))

      getData(columnsParams, this.urlForm).then((res) => {
        if (res.status == 'SUCCESS') {
          this.data = []
          this.data = res.result
          this.descriptions = res.result.map((item) => {
            return {
              label: item.title,
              value: item.value,
            }
          })
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },
    afterVisibleChange(val) {
      console.log('visible', val)
      this.initdata()
    },
    onClose() {
      this.$emit('change', false)
    },

    chatClick() {
      this.value = ''
      this.chat_visible = true
    },

    rejectProcess() {
      const parameter = {}
      parameter.instanceId = this.instanceId
      parameter.bizid = this.materialid
      parameter.approveNote = this.approveNote
      getData(parameter, '/work/rejectProcess').then((res) => {
        if (res.status == 'SUCCESS') {
          console.log(JSON.stringify(res))
          this.getTimeline()
          this.status = '已撤销'
          this.color = '#f00707a6'
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },
    approvalClick() {
      this.currtent = 1
      this.content = ''
      this.chat_visible = true
    },
    cancelClick() {
      this.currtent = 2
      this.content = ''
      this.chat_visible = true
    },
    approveProcess() {
      const parameter = {}
      parameter.instanceId = this.instanceId
      parameter.bizid = this.materialid
      parameter.approveNote = this.content
      getData(parameter, '/work/approveProcess').then((res) => {
        console.log('approval-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          console.log(JSON.stringify(res))
          this.getTimeline()
          this.status = '已审批'
          this.color = '#108ee9'
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },

    chatOk(e) {
      this.chat_visible = false
    },
    chatCancel(e) {
      this.chat_visible = false
    },
    handleSubmit() {
      if (this.currtent == 1) {
        this.approveProcess()
      } else if (this.currtent == 2) {
        this.rejectProcess()
      }

      this.chat_visible = false
    },
    onSelect(option) {
      console.log('select', option)
    },
    onChange(value) {
      console.log('Change:', value)
    },
    handleScroll(direction, e) {},
    handleChange(nextTargetKeys, direction, moveKeys) {
      console.log(nextTargetKeys)
      for (const key in moveKeys) {
        if (direction == 'right') {
          this.targetKeys.push(moveKeys[key])
        } else {
          for (const item in this.targetKeys) {
            // console.log(this.targetKeys[item])
            if (this.targetKeys[item] == moveKeys[key]) {
              this.targetKeys.splice(item, 1)
            }
          }
          //
        }
      }
    },
    fileChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log('info-->',JSON.stringify(info))
        this.$message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
  },
}
</script>
<style lang='scss' scoped>
</style>
