<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content" >
      <a-spin :spinning="loading">
        <a-tabs class="notice-infinite-container">
          <a-tab-pane tab="通知" key="1">
            <a-list :data-source="noticeList"  >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :title="item.title">
                  <a slot="description">{{ item.time | formatDate }}</a>
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="消息" key="2">
            <a-list :data-source="commonList">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta >
                   <a slot="title" :href="item.href">{{ item.title }}</a>
                  <a slot="description">{{ item.time | formatDate }}</a>
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                   {{ item.title }}
                </a-list-item-meta>
               
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3" >
            <a-list :data-source="workTaskList" >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :title="item.context">
                  
                  <a slot="description">{{ item.time | formatDate }}</a-col></a>
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="count">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { getData } from '@/api/manage'

export default {
  name: 'HeaderNotice',
  data() {
    return {
      loading: false,
      visible: false,
      commonList: [],
      noticeList: [],
      workTaskList: [],
      count: 0,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const params = {}
      getData(params, '/desk/getDeskMsgList').then((res) => {
        console.log('noticelcon res-->', JSON.stringify(res.result))
        if (res.result !== null) {
          this.commonList = res.result.commonList
          this.noticeList = res.result.noticeList
          this.workTaskList = res.result.workTaskList
          this.count = res.result.msgcount
        }
      })
    },
    fetchNotice() {
      if (!this.visible) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    },
  },
}
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
.notice-infinite-container {
  border: 0px solid #e8e8e8;
  border-radius: 0px;
  overflow: auto;
  padding: 0px 0px;
  height: 250px;
}
</style>
