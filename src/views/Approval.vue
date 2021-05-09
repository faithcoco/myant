<template>
  <div class="approval">
    <a-drawer
        title="产品详情"
        placement="right"
        :width="700"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
    >
      <a-descriptions title :column="2">
        <a-descriptions-item v-for="(item, index) in descriptions" :key="index" v-if="item.label != '审批流'"
                             :label="item.label">{{
            item.value
          }}
        </a-descriptions-item>

        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{ status }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider>审批详情</a-divider>
      <a-timeline>
        <a-timeline-item v-for="item in timelinelist" :key="item.key">
          <p>
            <a-row>
              <a-col :span="14">
                <b>{{ item.title + ' ' + item.approvestatus }}</b>
              </a-col>
              <a-col :span="10">{{ item.time | formatDate }}</a-col>
            </a-row>
          </p>
          <p>
            <a href="#" v-for="item in item.mentions" :key="item.name">@{{ item.name }}</a>
            {{ item.content }}
          </p>
          <p v-show="item.isShow">
            <a-card v-for="item in item.img" :key="item.src" :bordered="false">
              <img slot="extra" alt="logo" :src="item.src" height="100%" width="100%"/>
              <br/>
            </a-card>
          </p>
        </a-timeline-item>
      </a-timeline>
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <a-button type="primary" v-show="approvalVisible" style="margin-right: 10px" @click="approvalClick"
          >同意
          </a-button
          >

          <a-button type="danger" v-show="approvalVisible" style="margin-right: 10px" @click="refuceClick"
          >拒绝
          </a-button
          >
          <a-button type="primary" style="margin-right: 10px" @click="chatClick">评论</a-button>
        </a-col>
      </a-row>
    </a-drawer>

    <a-modal
        width="1000px"
        :title="title"
        :visible="chat_visible"
        :confirm-loading="confirmLoading"
        @ok="chatOk"
        @cancel="chatCancel"
        :destroyOnClose="destroyOnClose"
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
              <a-textarea v-model="content" :rows="4"/>

              <a-upload
                  v-show="isContent"
                  name="multipartFile"
                  :multiple="true"
                  action="/api/common/upload"
                  :headers="headers"
                  @change="fileChange"
              >
                <a-button type="link" :size="size">添加附件</a-button>
              </a-upload>
            </a-form-item>
            <a-form-item v-show="isContent" label="通知人员">
              <a-button block style="text-align: left" @click="personnelClick">{{ personlist }}</a-button>
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">提交</a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
      <div slot="footer"></div>
    </a-modal>
    <a-modal
        :destroyOnClose="destroyOnClose"
        width="1000px"
        title="选择通知人员"
        :visible="personVisible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-table
          ref="table"
          size="default"
          :columns="columns"
          :data-source="listdata"
          :alert="false"
          :scroll="{ x: 1500, y: 425 }"
          bordered
          style="margin-top: 20px"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, onSelect: onSelect }"
      >
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import Vue from 'vue'
import {Mentions, Timeline} from 'ant-design-vue'
import {getData, getProductList, getProductListColumns, postData} from '@/api/manage'
import {ACCESS_TOKEN, logininfo} from '@/store/mutation-types'
import {url} from '@/utils/request'
import {uploadHelp} from '@/utils/uploadHelp'

Vue.use(Timeline)
Vue.use(Mentions)

const product = {}
const personnelList = [
  {name: '张三', key: '1'},
  {name: '李四', key: '2'},
  {name: '王五', key: '3'},
]

export default {
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
        'Access-Token': Vue.ls.get(ACCESS_TOKEN),
      },
      menuid: '',
      size: 'small',
      descriptions: [],
      instanceId: '',
      expiryDate: '1606468834000',
      currtent: 0, //1审批2撤销3评论

      title: '',
      uploadUrl: url + '/common/upload', //上传
      uploadHelp: {file: new uploadHelp(this, this.fileSuccess, '上传', '上传', this.fileRemove, false)},
      mentions: '',
      upload: [],

      personVisible: false,
      personName: 'PersonnelSetting',
      personlist: '',

      selectList: [],
      selectedRowKeys: [],
      destroyOnClose: true,
      columns: [],
      listdata: [],
      urlColumns: '',
      urlList: '',
      personIdList: [],
      approvalVisible: true,
      isContent: false,
      content: '',
      approvalprocess: '',
    }
  },
  components: {},
  created() {
    this.urlList = '/bd/baseperson/PersonnelSettingList'
    this.menuid = '03bf0fb1-e9fb-4014-92e7-7121f4f71002'
    this.urlColumns = '/sys/setting/getSetting'
    this.getColumns()
    this.getList()
  },

  mounted() {
  },
  methods: {
    onSelect(record, selected, selectedRows) {
      this.selectList = selectedRows
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleCancel(e) {
      this.personVisible = false
    },
    handleOk(e) {
      var list = []

      for (const key in this.selectList) {
        list.push(this.selectList[key].personname)
        this.personIdList.push(this.selectList[key].personid)
      }
      this.personlist = list.join()

      this.personVisible = false
    },
    getColumns() {
      const columnsParams = {}
      columnsParams.menuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      console.log('columns url--->', this.urlColumns)
      console.log('columns parameter-->', JSON.stringify(columnsParams))
      getProductListColumns(columnsParams, this.urlColumns).then((res) => {
        this.columns = res.result.columns

        this.columns.splice(this.columns.length - 1, 1)
      })
    },
    getList() {
      this.selectedRowKeys = []
      const parameter = {}

      parameter.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      parameter.pageNo = '1'
      parameter.pageSize = '10'
      if (this.isSearch) {
        console.log('search-->', this.searchKey + '/' + this.searchValue)
        parameter[`${this.searchKey}`] = this.searchValue
      }

      console.log('list url-->', this.urlList)
      console.log('list params-->', JSON.stringify(parameter))
      getProductList(parameter, this.urlList).then((res) => {
        this.listdata = res.result.data
        for (const key in this.listdata) {
          this.listdata[key].key = key
        }
        this.isSearch = false
      })
    },

    personnelClick() {
      this.personVisible = true
      this.name = 'PersonnelSetting'
    },
    comment() {
      const parameter = {}
      parameter.bizid = this.materialid
      parameter.msgcontent = this.content
      parameter.personIdList = this.personIdList
      parameter.sysAttachList = this.upload
      postData(parameter, '/work/sendMsg').then((res) => {
        console.log('comment-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.getTimeline()
        } else {
          this.$message.warn('EXCEPTION')
        }
      })
    },

    handleChange(info) {
      debugger
      console.log('info--->', JSON.stringify(info))
      let fileList = [...info.fileList]
      fileList = fileList.slice(-2)
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })
      this.fileList = fileList
    },
    getTimeline() {
      this.timelinelist = []
      const parameter = {}
      parameter.bizid = this.materialid
      if (this.approvalprocess) {
        parameter.isEnabled = "1"
      } else {
        parameter.isEnabled = "2"
      }

      console.log('timeline param-->', JSON.stringify(parameter))
      getData(parameter, '/work/getApprovalInfo').then((res) => {
        console.log('timeline-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.timelinelist = res.result.data
          this.instanceId = res.result.instanceId
          this.setStatus(res.result.appstatus)
          this.approvalVisible = res.result.isDisplay
        } else {
          this.$message.warn(res.errorMsg)
        }
      })
    },
    initdata() {
      debugger
      this.getFormdata()
      // const parameter = {}
      // parameter.memucode = '02-02'
      // var url = '/bd/menu/findallmenu'
      //
      // getData(parameter, url).then((res) => {
      //   this.menuid = res.result
      //   this.getFormdata()
      //
      // })
    },
    setStatus(status) {
      if (status == 1) {
        this.status = '审批通过'
        this.color = '#15BC83'
      } else if (status == 2) {
        this.status = '审批中'
        this.color = '#3296FA'
      } else if (status == 3) {
        this.status = '已提交'
        this.color = '#3296FA'
      } else if (status == 8) {
        this.status = '未提交审批'
        this.color = '#FF943E'
      } else if (status == 9) {
        this.status = '审批未通过'
        this.color = ' #F25643'
      }
    },
    getFormdata() {
      const columnsParams = {}
      // columnsParams.memuid = this.menuid
      columnsParams.enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid
      this.materialid = this.materialid
      console.log('materialid', this.materialid)
      if (this.menu == 'ReceiptNoticeList') {
        columnsParams.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72003'
        this.urlForm = '/bd/docreceiptnotice/updateform'
      } else if (this.menu == 'StorageManagementList') {
        columnsParams.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f72002'
        this.urlForm = '/bd/Stockinrecord/updateForm'
      } else if (this.menu == 'ShippingNoticeList') {
        columnsParams.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f73003'
        this.urlForm = '/bd/dispatchnotice/updateForm'
      } else if (this.menu == 'StockOutRecordList') {
        columnsParams.memuid = '03bf0fb1-e9fb-4014-92e7-7121f4f73002'
        this.urlForm = '/bd/Stockoutrecord/updateForm'
      }
      columnsParams.docid = this.materialid
      console.log('form url--->', this.urlForm)
      console.log('form params-->', JSON.stringify(columnsParams))

      getData(columnsParams, this.urlForm).then((res) => {
        console.log('res-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {

          this.data = []
          this.descriptions = []
          this.data = res.result.form
          this.approvalprocess = res.result.data.enabledStatus

          for (const key in this.data) {
            if (this.data[key].key == 'ApproveStatus') {
              this.setStatus(this.data[key].value)
            } else {
              this.descriptions.push({label: this.data[key].title, value: this.data[key].value})
            }
          }
          this.getTimeline()
        } else {
          this.$message.warn(res.errorMsg)
        }
      })
    },
    afterVisibleChange(val) {
      this.initdata()
    },
    onClose() {
      this.$emit('change', false)
    },

    chatClick() {
      this.currtent = 3
      this.content = ''
      this.chat_visible = true
      this.title = '评论'
      this.isContent = true
    },

    rejectProcess() {
      const parameter = {}
      parameter.instanceId = this.instanceId
      parameter.bizid = this.materialid
      parameter.approveNote = this.content
      getData(parameter, '/work/rejectProcess').then((res) => {
        if (res.status == 'SUCCESS') {
          console.log(JSON.stringify(res))
          this.content = ''
          this.getTimeline()
          this.$parent.initData(this.$route.name)
        } else {
          this.$message.warn(res.errorMsg)
        }
      })
    },
    approvalClick() {
      this.currtent = 1
      this.content = ''
      this.chat_visible = true
      this.title = '审批'
      this.isContent = false
    },

    refuceClick() {
      this.currtent = 2
      this.content = ''
      this.chat_visible = true
      this.title = '审批'
      this.isContent = false
    },

    approveProcess() {
      const parameter = {}
      parameter.instanceId = this.instanceId
      parameter.bizid = this.materialid
      parameter.approveNote = this.content

      console.log('approval param----->', JSON.stringify(parameter))
      getData(parameter, '/work/approveProcess').then((res) => {
        console.log('approval-->', JSON.stringify(res))
        if (res.status == 'SUCCESS') {
          this.content = ''
          this.getTimeline()
          this.$parent.initData(this.$route.name)
        } else {
          this.$message.warn(res.errorMsg)
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
        this.approveProcess();
      } else if (this.currtent == 2) {
        this.rejectProcess()
      } else if (this.currtent == 3) {
        this.comment()
      }

      this.chat_visible = false
    },

    handleScroll(direction, e) {
    },
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
        this.upload = []
        for (const key in info.fileList) {
          this.upload.push({
            attachmentFilename: info.fileList[key].name,
            attachmentPath: info.fileList[key].response.result,
          })
        }
      }
      if (info.file.status === 'done') {
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
