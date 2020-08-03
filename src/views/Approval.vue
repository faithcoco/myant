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
        <a-descriptions-item label="货品编码">{{product.productCode}}</a-descriptions-item>
        <a-descriptions-item label="货品名称">{{product.productName}}</a-descriptions-item>
        <a-descriptions-item label="规格型号">{{product.SpecificationModel}}</a-descriptions-item>
        <a-descriptions-item label="存货编码">{{product.InventoryCode}}</a-descriptions-item>
        <a-descriptions-item label="存货名称">{{product.InventoryName}}</a-descriptions-item>
        <a-descriptions-item label="主计量单位">{{product.MainUnit}}</a-descriptions-item>
        <a-descriptions-item label="电商销售单位">{{product.SalesUnit}}</a-descriptions-item>
        <a-descriptions-item label="分销单位">{{product.SalesUnit}}</a-descriptions-item>
        <a-descriptions-item label="最低售价">{{product.LowestPrice}}</a-descriptions-item>
        <a-descriptions-item label="商品描述">{{product.description}}</a-descriptions-item>
        <a-descriptions-item label="默认发货仓库">{{product.DefaultShippingWarehouse}}</a-descriptions-item>
        <a-descriptions-item label="是否虚拟物品">{{product.VirtualItem}}</a-descriptions-item>
        <a-descriptions-item label="图片">{{product.Image}}</a-descriptions-item>
        <a-descriptions-item label="预发货日期">{{product.StorageDate}}</a-descriptions-item>
        <a-descriptions-item label="单位毛重">{{product.UnitGrossWeight}}</a-descriptions-item>
        <a-descriptions-item label="审批状态">
          <a-tag :color="color">{{status}}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
      <a-divider>审批详情</a-divider>
      <a-timeline>
        <a-timeline-item v-for="item in timelinelist" :key="item.key">
          <p>
            <a-row>
              <a-col :span="5">
                <b>{{item.title}}</b>
              </a-col>
              <a-col :span="12">{{item.time}}</a-col>
            </a-row>
          </p>
          <p>
            <a href="#" v-for="item in item.mentions" :key="item.name">@{{item.name}}</a>
            {{item.content}}
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
              <a-mentions v-model="value" :rows="4" @change="onChange" @select="onSelect">
                <a-mentions-option
                  v-for="item in personnelList"
                  :key="item.name"
                  :value="item.name"
                >{{item.name}}</a-mentions-option>
              </a-mentions>
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="fileChange"
              >
                <a-button type="link" :size="size">添加附件</a-button>
              </a-upload>
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
              >评论</a-button>
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
const timelinelist = []
const product = {}
const personnelList = []

export default {
  name: 'approval',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  
    product: {
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      product,
      status: '正在审批',
      timelinelist,
      chat_visible: false,
      submitting: false,
      personnelList,

      color: '',
      value: '',
      confirmLoading: false,
      headers: {
        authorization: 'authorization-text',
      },

      size: 'small',
    }
  },
  components: {},
  created() {
    getApproval().then((res) => {
      this.timelinelist = res.result
      this.timelinelist = [
        {
          key: '0',
          title: 'curry 提交合同申请',
          time: '2020-07-01 10:00',
          content: '',
        },
        {
          key: '1',
          title: 'curry 评论',
          time: '2020-07-02 10:00',
          content: '了解一下功能',
          mentions: [{ name: '高明亮' }, { name: '张勇' }],
        },
        {
          key: '2',
          title: 'curry 评论',
          time: '2020-07-03 10:00',
          content: '发一张图片',
          img: [{ src: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' }],
          isShow: 'true',
        },
      ]
    })
    getPersonnelList().then((res) => {
      this.personnelList = res.result
    })
  },
  mounted() {},
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val)
    },
    onClose() {
      this.$emit('change', false)
    },

    chatClick() {
      this.value = ''
      this.chat_visible = true
    },
    cancelClick() {
      this.status = '已撤销'
      this.color = '#f00707a6'
    },
    approvalClick() {
      this.status = '已审批'
      this.color = '#108ee9'
    },

    chatOk(e) {
      this.chat_visible = false
    },
    chatCancel(e) {
      this.chat_visible = false
    },
    handleSubmit() {
      if (!this.value) {
        return
      }
      this.submitting = true
      const time = new Date()
      setTimeout(() => {
        this.submitting = false
        this.timelinelist.push({
          key: '1',
          title: 'curry 评论',
          time: moment(new Date()).format('YYYY-MM-DD HH:mm'),
          content: this.value,
        })
      }, 1000),
        (this.chat_visible = false)
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
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
}
</script>
<style lang='scss' scoped>
</style>
