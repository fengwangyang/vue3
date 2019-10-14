import axios from 'axios';
import $app from '../main';
// import qs from 'querystring';
// import uuid from 'node-uuid'; // 埋点唯一标识以uuid保证;
axios.defaults.timeout = 1000000;
axios.defaults.baseURL = 'http://172.16.24.142:9999/';

// const CryptoJS = require('crypto-js');

// const key = '3543d3a087dcc791d913c089c20af156';
// const keyHex1 = CryptoJS.enc.Utf8.parse(key);
// function encryptByDES (msg) {
//   const Str = CryptoJS.TripleDES.encrypt(JSON.stringify(msg), keyHex1,
//     {
//       iv: CryptoJS.enc.Utf8.parse('81573026'),
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     });
//   return Str.toString();
// }
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.PORTAL_WEL_TOKEN) {
      const Authorization = `Bearer ${localStorage.PORTAL_WEL_TOKEN}`;
      config.headers.Authorization = Authorization;
      document.cookie = 'true';
    }
    if (config.HEARDPARAMS) {
      config.headers.EVENT_ID = config.HEARDPARAMS.EVENT_ID;
    }
    // config.headers.SN = uuid.v4(); // 埋点唯一标识（mId）
    config.headers.AccessPlatform = 'WEB_PORTAL';
    // if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    //   config.data = encryptByDES(config.data);
    //   config.headers['Content-Type'] = 'application/json';
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http res 拦截器
axios.interceptors.response.use(
  response => {
    if (response.headers['content-type'] === 'image/jpeg') { // 把二进制流图片转化为blob
      const myBlob = new window.Blob([response.data], {type: 'image/jpeg'});
      $app.$eventBus.$emit('fileFlow', {blob: myBlob, CaptchaToken: response.headers['captcha-token']});
      return {};
    }
    const res = response;
    // // 判断状态统一做处理
    // if (res.data.code === 1) {
    //   return res;
    // }
    if (res.data.code === 0 || JSON.stringify(res.data.code).indexOf('SUCCESS') !== -1) { // 成功
      res.data.code = 200;
      // $app.$eventBus.$emit('tokened');
    }
    return res;
  },
  error => {
    $app.$message.closeAll();
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      $app.$message({
        type: 'error',
        message: '请求超时'
      });
      return {};
    }
    if (localStorage.PORTAL_WEL_TOKEN || localStorage.PORTAL_WEL_TOKEN === '') {
      if (error.response.status === 401 || error.response.status === 403) {
        if (error.response.data.code === 'USER_ERR_10111') {
          if (JSON.parse(localStorage.TIME)) {
            localStorage.TIME = false;
            $app.$confirm('该账号已在其他地方登录。若不是本人操作，请联系客服人员修改密码', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error',
              showClose: false,
              closeOnClickModal: false
            }).then(() => {
              localStorage.TIME = true;
              $app.$router.push('/login');
              localStorage.PORTAL_WEL_TOKEN = '';
              localStorage.ISLOGIN = 'false';
            });
          }
        } else if (error.response.data.code === 'USER_ERR_10113') {
          if (JSON.parse(localStorage.TIME)) {
            localStorage.TIME = false;
            $app.$confirm('该账户已被禁用，请联系客服人员', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'error',
              showClose: false,
              closeOnClickModal: false
            }).then(() => {
              localStorage.TIME = true;
              $app.$router.push('/login');
              localStorage.PORTAL_WEL_TOKEN = '';
              localStorage.ISLOGIN = 'false';
            });
          }
        } else if (error.response.data.code === 'USER_ERR_10110') {
          $app.$message.error(error.response.data.msg);
        } else {
          $app.$router.push('/login');
          $app.$message.error('登录超时，请重新登录!');
          localStorage.PORTAL_WEL_TOKEN = '';
          localStorage.ISLOGIN = 'false';
        }
      } else if (error.response.status === 400) {
        return error.response;
      } else {
        $app.$message({
          type: 'error',
          message: '服务器异常,请稍后再试'
        });
      }
      $app.prototype.ISLOADING = false;
      return Promise.reject(error);
    }
  }
);

/**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
const methodsAry = ['get', 'post', 'patch', 'put', 'delete'];
const htp = {};
for (let k of methodsAry) {
  htp[k] = (url, data = {}, option = {
    headers: {
      'Content-Type': 'application/json'
    },
    querystring: false
  }) => {
    return new Promise((resolve, reject) => {
      axios[k](url, data.ARRAYBUFFER ? { // 二进制图片请求
        responseType: 'arraybuffer'
      } : k === 'get' ? data.HEARDPARAMS ? {...data} : {params: data} : data, option)
        .then(res => {
          resolve(res.data);
        }, err => {
          reject(err);
        });
    });
  };
}
export default htp;
