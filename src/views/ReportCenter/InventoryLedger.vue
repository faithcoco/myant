/*
* 功能：库存流水账报表
* 日期：2021年5月10日15:16:18
* 作者：陶飞
* 备注：
*/
<template>
  <div>
    <div class="m-list-wrap">
      <div class="m-table">
        <div class="sfznav divc" style="overflow: hidden; padding: 0px; margin: 0px;height:800px;width: 1650px">
          <iframe id="myframe" style="position: relative;" name="myframe" :src="this.url"
                  frameborder="0" scrolling="yes"
                  width="1650" height="800">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getData} from "@/api/manage";
import Vue from "vue";
import {logininfo} from "@/store/mutation-types";

export default {
  name: "ReportList",
  data() {
    return {
      // 报表服务器地址
      url: '',
    }
  },
  methods: {
    getReportUrl() {
      debugger
      let _this = this;
      let enterpriseid = Vue.ls.get(logininfo).basepersonPO.enterpriseid;
      getData({}, '/report/getReportUrl').then((res) => {
        if (res.status == 'SUCCESS') {
          _this.url = res.result + "/report/库存流水账报表.cpt&enterpriseid=" + enterpriseid;
        } else {
          this.$message.error(res.errorMsg)
        }
      })
    },
  },
  // 监视路由，参数为要目标路由和当前页面的路由
  watch: {
    '$route'(to, from) {
      this.getReportUrl();
    }
  },
  mounted() {
    this.getReportUrl();
  },
}
</script>
