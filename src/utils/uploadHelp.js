/**
 * YangNick
 * 2020-12-04
 * 附件上传js
 */
import Vue from 'vue'
import {url} from '@/utils/request'
import { ACCESS_TOKEN } from '@/store/mutation-types'
/**
 *  上传附件帮助方法  点击即上传
 * @param $vue       vm对象  一般使用界面this对象
 * @param successBack 上传成功回调方法
 * @param typeName   上传附件类型名称
 * @param type        上传附件类型
 * @param removeBack  上传成功后的删除回调方法（可有可无）
 * @param isMore  是否可上传多个附件
 * @returns {{_this: null, _upload: null, upLen: number, fileKey: string, typeName: *, type: *, headers: {x-auth-token: string}, successBack: *, remove: (function(*, *)), preview: (function(*)), succes: (function(*, *, *)), faild: (function(*, *, *))}}
 */
const  uploadHelp=function ($vue,successBack,typeName,type,removeBack,isMore = true) {
  let uploadCfg = {
    $vue: $vue,//vue 对象
    _upload: null,//vue 上传控件对象
    upLen: 0,//本次上传文件的数量
    fileKey: "",
    typeName,
    type,
    isMore,
    headers: {
      'Access-Token': (Vue.ls.get(ACCESS_TOKEN) || '')
    },
    successBack,
    removeBack,
    fileChange(file, fileList){
      if(!isMore) {
        // let _this = uploadCfg; //当前的this 对象指向上传控件对象
        if (fileList.length > 1) {
          fileList.splice(0, 1);
        }
      }
    },
    remove(file, fileList){
      if (file.status == "success") {
        uploadCfg.removeBack && uploadCfg.removeBack(file.url, uploadCfg.type);
      }
    },
    preview(file){
      window.open(url + "/common/download?fileName=" + file.url + "&realName=" + file.name, "下载文件",);
      // let Wins = window.open("Upurl"+file.url, "下载文件", "width=" + window.screen.availWidth + ",height=" + (window.screen.availHeight - 33) + ",menubar=no,toolbar=no,scrollbars=yes,status=no,titlebar=no,resizable=yes,location=no");
      // Wins.moveTo(-3, 0);
    },
    //上传成功方法
    succes :(response, file, fileList) => {
      file.url=response.result;
      uploadCfg.successBack && uploadCfg.successBack({name: file.name, url: response.result}, uploadCfg.type);
    },
    //上传失败方法
    faild(err, file, fileList){
      uploadCfg.$vue.$message.error(uploadCfg.typeName + "上传失败！");
    }
  }

  return uploadCfg;
}


/**
 * 上传文件帮助方法
 * @type {{}}
 */
const  fileHelp= function(uploadName,$vue) {
  return {
    _this: null,//vue this对象
    _upload:null,//vue 上传控件对象
    faildNames: [],//上传失败的文件名称集合
    succesFiles: [],//上传成功的文件集合
    upLen: 0,//本次上传文件的数量
    fileKey: "",
    uploadName:uploadName,
    $vue:$vue,
    headers:{
      'Access-Token': (Vue.ls.get(ACCESS_TOKEN) || '')
    },
    //上传成功回调方法
    succesBack(){

    },
    //上传失败回调方法
    faildBack(){

    },
    // fileChange(file, fileList){
    //   let _this = this.fileHelp || this; //当前的this 对象指向上传控件对象
    //   if (fileList.length > 1) {
    //     fileList.splice(0,1);
    //   }
    // },
    setUpload(upload){
      this._upload=upload || null;
      this._this= upload ? upload.$el.__vue__ : null;
      upload.fileHelp=this;
    },
    remove(file, fileList){
      if (file.status == "success") {
        let _this = this.fileHelp || this; //当前的this 对象指向上传控件对象
        let findIndex = _this._upload.fileList.findIndex(value => {
          return value.name === file.name;
        });
        if (findIndex >= 0) {
          _this._upload.fileList.splice(findIndex, 1)
        }
      }
    },
    preview(file){
      console.log(file)
      window.open(url+"/common/download?fileName="+file.url+"&realName="+file.name, "下载文件",);
      // let Wins = window.open("Upurl"+file.url, "下载文件", "width=" + window.screen.availWidth + ",height=" + (window.screen.availHeight - 33) + ",menubar=no,toolbar=no,scrollbars=yes,status=no,titlebar=no,resizable=yes,location=no");
      // Wins.moveTo(-3, 0);
    },
    //上传成功方法
    succes(response, file, fileList){
      let _this = this.fileHelp || this; //当前的this 对象指向上传控件对象
      let name = file.name;
      let type = name.substring(name.lastIndexOf("."))
      _this.succesFiles.push({attachmentFilename: file.name, attachmentPath: response.result,attachmentSize: file.size ,attachmentType:type });
      //如果文件全部上传完成则触发回调方法
      let readyFiles = this.uploadFiles.filter(value => {
        return value.status === "success";
      });
      if (readyFiles.length === fileList.length && fileList.length>0) {
        let initFiles = _this._upload.fileList.map((item) => {
          let name =item.name;
          let type = name.substring(name.lastIndexOf("."))
          return {attachmentFilename: item.name, attachmentPath: item.url,attachmentSize: item.size,attachmentType:type }
        });
        let newFiles = initFiles.concat(_this.succesFiles);
        if (_this.faildNames.length == 0) {
          _this.succesBack(newFiles);
        } else {
          _this._this.$confirm('附件上传失败：' + _this.faildNames.length + '"个，是否继续提交？', '提示', {type: "warning"})
            .then(() => {
              _this.succesBack(newFiles)
            }).catch(() => {
            _this.faildBack();
          });
        }
      }
    },
    //上传失败方法
    faild(err, file, fileList){
      let _this=this.fileHelp || this;
      _this.faildNames.push(file.name);
      //如果文件全部上传完成则触发回调方法
      let readyFiles = this.uploadFiles.filter(value => {
        return value.status == "ready";
      });
      if (readyFiles.length == 0) {
        if (_this.faildNames.length == _this.upLen) {
          _this._this.$message.error("文件上传失败！");
          _this.faildBack([]);
        } else {
          if(fileList.length>0) {
            let initFiles = _this._upload.fileList.map((item) => {
              let name = item.name;
              let type = name.substring(name.lastIndexOf("."))
              return {attachmentFilename: item.name, attachmentPath: item.url ,attachmentSize:item.size,attachmentType:type }
            });
            let newFiles = initFiles.concat(_this.succesFiles);
            _this._this.$confirm('附件上传失败：' + _this.faildNames.length + '"个，是否继续提交？', '提示', {type: "warning"})
              .then(() => {
                _this.succesBack(newFiles);
              }).catch(_this.faildBack);
          }
        }
      }
    },
    submit(){
      let _th=this;
      return new Promise((callback, faildBack)=> {
        _th.succesBack = callback;
        _th.faildNames = [];
        _th.upLen == 0;
        _th.faildBack = faildBack;
        try {
          if (_th._this == null) {
            _th._this = _th.$vue;
            _th._upload = _th.$vue.$refs[_th.uploadName];
          }
          if (_th._this == null) {
            console.error('请赋值界面_this对象')
          }
          else if (_th._upload == null || _th._upload == undefined) {
            console.error('请赋值界面_this对象')
          }
          else {
            //判断当前上传控件是否有成功的数据 如果没有则初始化上传成功文件列表
            // if (this._upload.uploadFiles.length == 0) {
            //   //判断上传控件是否更换
            //   if (this._this.$refs.upload.$vnode.key != this.fileKey) {
            //     this.succesFiles = [];
            //     this.fileKey = this._this.$refs.upload.$vnode.key;
            //   }
            // }
            //判断当前上传控件是否有等待上传的文件 如果没有则直接回调callback方法
            let readyFiles = _th._upload.uploadFiles.filter(value => {
              return value.status == "ready";
            });
            if (readyFiles.length == 0) {
              let initFiles = _th._upload.fileList.map((item) => {
                let name =item.name;
                let type = name.substring(name.lastIndexOf("."))
                return {attachmentFilename: item.name, attachmentPath: item.url,attachmentSize:item.size,attachmentType:type }
              });
              _th.succesBack(initFiles);
            } else {
              _th.upLen = readyFiles.length;
              _th._upload.submit();//开始上传文件
            }
          }
        }
        catch (e) {
          console.error('文件提交上传失败')
        }
      });
    }
  }
}

export  { uploadHelp,fileHelp };
