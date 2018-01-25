import axios from 'axios'
import store from '@/store'
let Base64 = require('js-base64').Base64;

//POST传参序列化
axios.interceptors.request.use((config) => {
  store.commit('maskShow', true)
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  store.commit('maskShow', false)
  return res;
}, (error) => {
  return Promise.reject(error);
});
export function getHtml(url) {
  url = url + '?ref=' + new Date().getTime() + '' + Math.random();
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        store.commit('maskShow', false)
        if (error.message.indexOf('timeout') >= 0) {
          store.commit('systemMessage', '连接超时，请检查网络。');
        }
        reject(error);
      });
  })
}
export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        store.commit('maskShow', false)
        if (error.message.indexOf('timeout') >= 0) {
          store.commit('systemMessage', '连接超时，请检查网络。');
        }
        reject(error);
      });
  })
}
export function fetch(url, params, config) {
  if (!config) {
    config = {};
  }
  if (!config.timeout) {
    config.timeout = 8000;
  }
  return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: url,
        data: {
          data: JSON.stringify(params)
        },
        timeout: config.timeout,
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        store.commit('maskShow', false)
        if (error.message.indexOf('timeout') >= 0) {
          store.commit('systemMessage', '连接超时，请检查网络。');
        }
        reject(error);
      });
  })
}
export function getPrintHtml(printurl) {
  console.log(printurl)
  let param = {
    "base64": btoa(printurl)
  }
  // let url = 'http://172.16.110.185:8080/wdphis/rest/getPageDom'
  let url = axios.defaults.getPageDomUrl + '/rest/getPageDom';
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: {
        data: JSON.stringify(param)
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      if (res.data.code == 1) {
        let content = Base64.decode(res.data.data);
        resolve(content);
      } else {
        reject('档案获取失败');
      }
    }).catch(err => {
      reject(err);
    })
  })
}
let sysConfig;
export default {
  getHtml,
  getPrintHtml,
  getSys() {
    return sysConfig.currentServer;
  },
  initConfig(data) {
    sysConfig = data;
    if (sysConfig.currentServer.rootUrl) {
      axios.defaults.baseURL = sysConfig.currentServer1.rootUrl;
      axios.defaults.nbImgUrl = sysConfig.currentServer.nbImg;
      axios.defaults.imgUrl = sysConfig.currentServer.imgUrl;
      axios.defaults.htmlUrl = sysConfig.currentServer.htmlUrl;
      axios.defaults.printUrl = sysConfig.currentServer.printUrl;
      axios.defaults.getPageDomUrl = sysConfig.currentServer.getPageDomUrl;
      axios.defaults.jgid = sysConfig.currentServer.jgid;
      axios.defaults.searchAdress = sysConfig.currentServer.searchAdress;
    }
  },
  /**
   *  获取机构文章列表
   */
  getArticleList(params, config) {
    return fetch('rest/queryDataBySql/080104/3', params)
  },
  /**
   * 根据对象id和类型查询其介绍文章信息
   */
  getIntro(params, config) {
    return fetch('/rest/queryDataBySql/080104/5', params)
  },
  /*
   * 获取APPID
   */
  GetAppId(params) {
    return fetch('/rest/queryDataBySql/080401/10', params)
  },
  /**
   * 获取微信openid
   * 
   */
  getOpenid(params) {
    // let baseurl = 'http://www.hw-family.com/hisapi/rest/h5payopenid';
    let url = sysConfig.currentPayServer.baseUrl + `openid?code=${params.code}&jgid=${params.jgid}`;
    return get(url);
  },
  /**
   *  获取机构文章列表
   */
  getArticleList(params, config) {
    return fetch('rest/queryDataBySql/080104/3', params)
  },
  /**
   * 获取部门列表
   */
  getDepartmentList(params, config) {
    return fetch('/rest/queryDataBySql/080102/1', params)
  },
  /**
   * 查询排班列表
   */
  getWorkList(params, config) {
    return fetch('rest/queryDataBySql/080304/1', params)
  },
  /**
   * 获取全部排班列表
   */
  getAllWorkList(params, config) {
    return fetch('rest/queryDataBySql/080304/2', params)
  },
  /**
   * 获取文章详情
   */
  getActicleDetail(params, config) {
    return fetch('/rest/queryDataBySql/080104/4', params)
  },
  /**
   * 获取临床科室列表
   */
  getClinicalList(params, config) {
    return fetch('/rest/queryDataBySql/080103/5', params)
  },
  /**
   * 获取医生列表
   */
  getDoctorList(params, config) {
    return fetch('/rest/queryDataBySql/080103/4', params)
  },
  /**
   * 微信openid登录
   */
  searchOpenid(params, config) {
    return fetch('rest/commitData/080301/3', params)
  },
  /**
   * 获取微信信息
   * 
   */
  getInfoByCode(params) {
    // let baseurl = 'http://www.hw-family.com/hisapi/rest/h5payopenid';
    let url = sysConfig.currentPayServer.getInfo + `h5payuserinfo?code=${params.code}&jgid=${params.jgid}&openid=`;
    return get(url);
  },
  /**
   * 获取门诊和住院信息
   */
  searchUserList(params, config) {
    return fetch('rest/queryDataBySql/080201/3', params)
  },
  /**
   * 获取短信验证
   */
  getSms(params, config) {
    return fetch('/rest/sendSms', params, config)
  },
  /**
   * 临时删除用户
   */
  deleteUser(params, config) {
    return fetch('rest/commitData/080201/7', params)
  },
  /**
   * 用户注册
   */
  regist(params, config) {
    return fetch('/rest/commitData/080301/1', params)
  },
  /**
   * 微信openid绑定
   */
  bondOpenid(params, config) {
    return fetch('rest/commitData/080301/4', params)
  },
  /**
   *  更新his用户信息
   */
  updateHisUser(params, config) {
    return fetch('rest/commitData/080201/4', params)
  },
  /**
   * 绑定app用户和his用户
   */
  treatmentCardBind(params, config) {
    return fetch('rest/commitData/080201/1', params)
  },
  /**
   * 绑定app用户和his用户
   */
  getHasRegisterNum(params, config) {
    return fetch('rest/queryDataBySql/080304/3', params)
  },
  /**
   * 订单生成
   */
  OrderGeneration(params) {
    return fetch('/rest/commitData/080401/2', params)
  },
  /*
   * 支付成功，通知后台，写入his
   */
  ConfirmPayment(params) {
    return fetch('/rest/commitData/080401/5', params)
  },
  /**
   * 发送微信消息
   * @params {JSON} 参数openid, jgid, msg
   */
  sendWxMsg(params) {
    let url = sysConfig.currentPayServer.sendWxMsg + `?openid=${params.openid}&jgid=${params.jgid}&msg=${JSON.stringify(params.msg)}`;
    return get(url);
  },
  /**
   * 在线支付
   * @params {JSON} 参数id,return_url
   */
  getOnlinePay(params) {
    // let baseurl = 'http://www.hw-family.com/hisapi/rest/h5payopenid';
    let url = sysConfig.currentPayServer.baseUrl + `?openid=${params.openid}&bz=${params.bz}&id=${params.id}&returnurl=${encodeURIComponent(params.returnurl)}`;
    return get(url);
  },
  /*
   * 获取个人所有门诊就诊记录
   */
  getMzjzjl(params) {
    return fetch('/rest/queryDataBySql/080401/11', params)
  },
  /*
   * 获取个人所有住院费用记录
   */
  getZyfyjl(params) {
    return fetch('/rest/queryDataBySql/080401/13', params)
  },
  /**
   * 待缴费记录
   */
  GetCffy(params) {
    return fetch('/rest/queryDataBySql/080401/4', params);
  },
  /**
   * 待支付记录  存储过程查询，并做相关处理 
   */
  GetDzfjl(params) {
    return fetch('/rest/commitData/080401/3', params)
  },
  /**
   * 支付记录明细
   */
  GetZfjlmx(params) {
    return fetch('/rest/queryDataBySql/080401/7', params)
  },
  /**
   * 支付记录
   */
  GetZfjl(params) {
    return fetch('/rest/queryDataBySql/080401/6', params)
  },
  /**
   * 异常订单
   */
  GetYcjl(params) {
    return fetch('/rest/queryDataBySql/080401/9', params);
  },
  /*
   * 获取个人门诊费用记录
   */
  getMzfyjl(params) {
    return fetch('/rest/queryDataBySql/080401/12', params)
  },
  /**
   * 门诊费用明细
   */
  GetMzfymx(params) {
    return fetch('/rest/queryDataBySql/080401/5', params);
  },
  /*
   * 获取个人门诊费用记录明细
   */
  getMzfymx(params) {
    return fetch('/rest/queryDataBySql/080401/15', params)
  },
  /*
   * 获取个人一天住院费用详情
   */
  getZyfyOneDay(params) {
    return fetch('/rest/queryDataBySql/080401/14', params)
  },
  /**
   * 订单取消
   */
  OrderCancel(params) {
    return fetch('/rest/commitData/080401/6', params)
  },
  /**
   * 获取支付结果
   */
  getResultPay(params) {
    return fetch('/rest/queryDataBySql/080401/8', params);
  },
  /**
   * 订单更新
   */
  OrderUpdate(params) {
    return fetch('/rest/commitData/080401/4', params)
  },
  /**
   * 订单更新
   */
  loadCfxxByMzh(params) {
    return fetch('/rest/queryDataBySql/080401/16', params)
  },
  /**
   * 解绑用户
   */
  treatmentCardunBind(params, config) {
    return fetch('rest/commitData/080201/1', params)
  },
  /**
   * 获取文章信息
   */
  getInfoArticlePath(params, config) {
    return fetch('rest/queryDataBySql/080103/6', params)
  },
  /*
   * 获取收费成功信息
   */
  getMsgSfxx(params) {
    return fetch('/rest/queryDataBySql/010303/25', params)
  },
  /*
   * 获取挂号成功信息
   */
  getMsgGhxx(params) {
    return fetch('/rest/queryDataBySql/010303/24', params)
  },
  /**
   * 解绑用户
   */
  getGhTimeArr(params, config) {
    return fetch('rest/commitData/010301/7', params)
  },
  /**
   * 获取父级
   */
  getParentsArea(params, config) {
    return fetch('/rest/queryDataBySql/080201/7', params)
  },
  /**
   * 获取地区列表
   */
  getAreaList(params, config) {
    return fetch('/rest/queryDataBySql/080201/6', params)
  },
  /**
   *  注册his用户
   */
  registHisUser(params, config) {
    return fetch('rest/commitData/080201/3', params)
  },
  /**
   *  获取已配置机构列表
   */
  getJgList(params, config) {
    return fetch('rest/queryDataBySql/080104/12', params)
  },
  /**
   *  获取文章列表-分页
   */
  getArticleListByPagination(params, config) {
    return fetch('rest/queryDataBySql/080104/10', params)
  },
  /**
   *  获取文章分类
   */
  getNewListFl(params, config) {
    return fetch('rest/queryDataBySql/080104/6', params)
  },
  /**
   *  获取所有文章分类
   */
  getAllNewListFl(params, config) {
    return fetch('rest/queryDataBySql/080104/11', params)
  },
  /**
   *  获取当前机构介绍
   */
  getJgjs(params, config) {
    return fetch('rest/queryDataBySql/080104/13', params)
  },
  /**
   *  通过机构id获取医生介绍
   */
  getDoctorListByJgid(params, config) {
    return fetch('rest/queryDataBySql/080104/14', params)
  },
  // 获取个人健康档案信息
  getjkdaList(params){
    return fetch('/rest/queryDataBySql/080501/5',params )
  },
  /**
   *  通过档案id  daid查询有效的高血压中医干预记录
   * "daid":"790033279|52012700000000230934|JN"--先规定一个人
   */
  //高血压
  getHypertensionByDaid(param,config){
    return fetch('rest/queryDataBySql/020501/7',param)
  },
  //糖尿病
  getDiabetesByDaid(param,config){
    return fetch('rest/queryDataBySql/020502/5',param)
  },
  //中医的
  getChineseMedicineByDaid(param, config) {
    return fetch('rest/queryDataBySql/020504/4', param)
  },
  /**
   *  通过患者id 查询user的相关信息
   * 
   */
  getUserInfoByHzid(param,config){
    return fetch('rest/queryDataBySql/080501/3', param)
  },
  /**
   *  通过档案id  daid查询个人年检记录
   * "daid":"790033279|52012700000000230934|JN"--先规定一个人
   */
  getUserYearlyInspectionByDaid(param,config){
    return fetch('rest/queryDataBySql/020401/1', param)
  },
  /**
   *  根据daid查询有效的高血压随访记录
   * "daid":"790033279|52012700000000230934|JN"--先规定一个人
   */
  getHypertensionSfjlByDaid(param,config){
    return fetch('rest/queryDataBySql/020501/2', param)
  },
  getDiabetesSfjlByDaid(param, config) {
    return fetch('rest/queryDataBySql/020502/2', param)
  },
  /**
   *  通过机构id和sfzh查询健康档案信息
   */
  getJkdaxx(params, config) {
    return fetch('rest/queryDataBySql/080501/1', params)
  },
  /**
   *  通过健康档案查询
   */
  getqtdaxx(params, config) {
    return fetch('rest/queryDataBySql/080501/2', params)
  },
  /**
   *  通过患者ID查询检验报告
   */
  getInspectionReportByHzid(params,config){
    return fetch('rest/queryDataBySql/080501/6', params)
  },
  /**
   *  通过患者ID查询检验报告详情
   */
  getInspectionReportXqByHzid(params, config) {
    return fetch('rest/queryDataBySql/080501/7', params)
  },
  /*
   *新镇签约记录
   */
  setqyjl(params,config) {
    return fetch('rest/commitData/080501/1', params)
  },
  /*
   *查询机构列表
   */
  getjgInfo(params,config) {
    return fetch('rest/queryDataBySql/000202/11', params)
  },
  /*
   *通过机构id查询机构团队列表
   */
  getjgtdInfo(params,config) {
    return fetch('rest/queryDataBySql/020104/4', params)
  },
  /*
   *通过机构id查询机构协议列表
   */
  getjgxyInfo(params,config) {
    return fetch('rest/queryDataBySql/020105/3', params)
  },
  /*
   *通过机构id查询机构协议列表
   */
  getjgtdryInfo(params,config) {
    return fetch('rest/queryDataBySql/020104/6', params)
  },
  /*
   *通过机构id查询机构服务包列表
   */
  getjgfwbInfo(params,config) {
    return fetch('rest/queryDataBySql/020107/3', params)
  },
  /*
   *通过机构id查询机构信息
   */
  getjgDetail(params,config) {
    return fetch('rest/queryDataBySql/000202/6', params)
  }
}
