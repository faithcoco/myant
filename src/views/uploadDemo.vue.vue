<!--附件上传案列-->
<template>
  <a-upload
    :action="uploadUrl" :multiple="true"
    :file-list="fileList"
    :headers="uploadHelp.file.headers"
    :on-preview="uploadHelp.file.preview"
    :on-success="uploadHelp.file.succes"
    :on-error="uploadHelp.file.faild"
    :on-remove="uploadHelp.file.remove"
    name="multipartFile"
    @change="handleChange">
    <a-button> <a-icon type="upload" /> 上传附件 </a-button>
  </a-upload>
</template>

<!--导入附件需要的组件-->
import {url} from '@/utils/request'
import {uploadHelp} from '@/utils/uploadHelp'

<script>
  export default {
    data() {
      return {
        // 附件
        fileList:[],
        uploadUrl: url + "/common/upload",//上传
        uploadHelp: { file: new uploadHelp(this,this.fileSuccess,'上传','上传',this.fileRemove,false) },
      };
    },
    methods: {

      handleChange(info) {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-2);
        fileList = fileList.map(file => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        this.fileList = fileList;
      },
    },
  };
</script>