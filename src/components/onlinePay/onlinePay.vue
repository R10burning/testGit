<template>
    <div class="onlinepay">
        <div class="title">
            <ul>
                <li @click="changeCheck(item, index)" :class="{current: navCheckList[index]}" v-for="(item, index) in navList">{{item.mc}}</li>
            </ul>
        </div>
        <div class="contain" ref="contain">
            <div class="cfjf margin48" v-if="navCheckList[0]">
                <div @click="showDdjx()" class="suspenders">手工检索添加</div>
                <mt-loadmore :autoFill=false :top-method="loadTop" ref="loadmoreCfjf">
                    <ul>
                        <li @click="showCfDetail(item)" v-for="(item, index) in djfList">
                            <div @click.stop="selectFyjl(item, index)" class="cfjl-circle-wrap left">
                                <span class="circle" :class="{checked: djfCheckList[index]}"></span>
                            </div>
                            <p>No:{{item.no}}&nbsp;&nbsp;{{item.lx}}<span class="right">￥{{item.ssje|formatAmount}}</span></p>
                            <p>{{item.kdbmmc}}&nbsp;&nbsp;{{item.kdrxm}}&nbsp;&nbsp;{{item.lczd}}</p>
                        </li>
                    </ul>
                </mt-loadmore>
                <div class="handerinfo">
                  <span>当前人员: {{hzxm}}</span>
                  <span @click="switchPerson()" class="switch">切换人员</span>
                </div>
                <div class="footer">
                    <div class="detail">
                        <div @click="checkAll" class="checkall-wrap">
                            <span class="circle" :class="{checked:iscffyAllCheck}">
                            </span><span class="ckall">{{iscffyAllCheck?'取消全选':'全选'}}</span>
                        </div>
                        共选择<span class="cfnum">{{xfcount}}</span>张处方 <span class="totalCost">￥{{jfzje|formatAmount}}</span>
                    </div>
                    <div class="btn-wrap">
                        <button class="mint-button mint-button--primary mint-button--large green" :class="{'disable-gray': !xfcount}" @click="confirmCfjf()">
                            <label class="mint-button-text font18">确认缴费</label>
                        </button>
                    </div>
                </div>
            </div>
            <div class="waitpay margin48" v-if="navCheckList[1]">
                <mt-loadmore :autoFill=false :top-method="loadTop" ref="loadmoreWaitpay">
                    <ul>
                        <li @click="selectDzfjl(item, index)" v-for="(item, index) in dzfList">
                            <span class="circle" :class="{checked: dzfCheckList[index]}">
                            </span>
                            <p class="p1"><span class="tradeNo">订单号:{{item.out_trade_no}}</span><span class="right">￥{{item.total_fee|formatAmount}}</span></p>
                            <p class="p2">日期:{{item.cjsj}}<span class="right">状态: {{item.zt==0?'待支付':'已关闭'}}</span></p>
                            <ul @click.stop>
                                <li v-if="item.mx" v-for="subItem in item.mx">
                                    <p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.je|formatAmount }}</span></p>
                                    <p>{{subItem.zxks}}&nbsp;&nbsp;{{subItem.ysxm}}&nbsp;&nbsp;{{subItem.zz}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </mt-loadmore>
                <div class="footer">
                    <div class="btn-wrap">
                        <div>
                            <button :class="{'disable-gray': !dzfCk}" class="mint-button mint-button--primary mint-button--large green" @click="cancleDd()">
                                <label class="mint-button-text">取消订单</label>
                            </button>
                        </div>
                        <div>
                            <button :class="{'disable-gray': !dzfCk}" class="mint-button mint-button--primary mint-button--large green" @click="confirmDd()">
                                <label class="mint-button-text">确认缴费</label>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="record margin48" v-if="navCheckList[2]">
                <mt-loadmore :autoFill=false :top-method="loadTop" :bottom-method="loadBottom" ref="loadmoreZfjl">
                    <ul>
                        <li @click="showDdxx(item, index)" v-for="(item, index) in zfjlList">
                            <p class="p1"><span class="tradeNo_record">订单号:{{item.out_trade_no}}</span><span class="right">￥{{item.total_fee|formatAmount}}</span></p>
                            <p class="p2">创建日期:{{item.cjsj}}<span class="right">方式: {{item.zffs}}</span></p>
                            <ul @click.stop v-if="zfjlCheckList[index]">
                                <li v-if="item.mx" v-for="subItem in item.mx">
                                    <p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.ssje|formatAmount}}</span></p>
                                    <p>{{subItem.kdbmmc}}&nbsp;&nbsp;{{subItem.kdrxm}}&nbsp;&nbsp;{{subItem.lczd}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </mt-loadmore>
            </div>
            <div class="abnormal margin48" v-if="navCheckList[3]">
                <mt-loadmore :autoFill=false :top-method="loadTop" ref="loadmoreAbnormal">
                    <p class="warn-tip">已支付成功但医院处理失败的记录，请点击退费</p>
                    <ul>
                        <li @click="selectYcjl(item, index)" v-for="(item, index) in ycjlList">
                            <span class="circle" :class="{checked: ycjlCheckList[index]}">
                            </span>
                            <p class="p1"><span class="tradeNo">订单号:{{item.out_trade_no}}</span><span class="right">￥{{item.total_fee|formatAmount}}</span></p>
                            <p class="p2">日期:{{item.zfsj}}<span class="right">方式:{{item.zffs}}</span></p>
                            <!-- <ul  @click.stop>
                                <li v-if="item.mx" v-for="subItem in item.mx">
                                    <p>No:{{subItem.no}}&nbsp;&nbsp;{{subItem.lx}}<span class="right">￥{{subItem.ssje|formatAmount}}</span></p>
                                    <p>{{subItem.kdbmmc}}&nbsp;&nbsp;{{subItem.kdrxm}}&nbsp;&nbsp;{{subItem.lczd}}</p>
                                </li>
                            </ul> -->
                        </li>
                    </ul>
                </mt-loadmore>
                <div class="footer">
                    <div class="btn-wrap">
                        <button :class="{'disable-gray': !ycCk}" class="mint-button mint-button--primary mint-button--large green" @click="confirmYctf()">
                            <label class="mint-button-text">退 费</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <zffs v-if="chooseZffsShow" @confirmZffs="selectZffs"></zffs>
    </div>
</template>
<script>
import zffs from "./zffs.vue";
import { getUrlParams, checkBrowser } from "@/util/util.js";

export default {
  name: "onlinePay",
  data() {
    return {
      ddid: "",
      code: "",
      jgid: "",
      brid: "",
      topStatus: "",
      hzxm: '',
      isAllLoad: false,
      iscffyAllCheck: false, // 处方费用是否已全选
      chooseZffsShow: false,
      pagesize: 10,
      pageNumber: 1,
      navList: [{ mc: "待缴费" }, { mc: "待支付" }, { mc: "支付记录" }, { mc: "异常处理" }],
      navCheckList: [true, false, false, false],
      /*待缴费*/
      djfList: [],
      djfCheckList: [],
      /*待支付*/
      dzfList: [],
      dzfCheckList: [],
      /*支付记录*/
      zfjlList: [],
      zfjlCheckList: [],
      /*异常记录*/
      ycjlList: [],
      ycjlCheckList: []
    };
  },
  created() {
    let lx = checkBrowser();
    let urlArr = location.href.split("?");
    let params = getUrlParams(urlArr[1]);
    let param_ = getUrlParams(urlArr[2]);
    Object.assign(params, param_);
    if (params.payBack) {
      this.getPayResult(params.ddid);
    }
    this.jgid = this.$route.query.jgid;
    let handerUser = this.$store.getters.getHandleUser;
    this.brid = handerUser.hzid;
    this.hzxm = handerUser.hzxm;
    var routeParams = this.$route.query;
    if (routeParams.mzbz) {
      this.loadCffyxxByMzh(routeParams.mzh);
      this.mzbz = true;
      this.mzh = routeParams.mzh;
    } else {
      this.loadCffyxx();
    }
  },
  computed: {
    /*处方缴费总金额*/
    jfzje: function() {
      let zje = 0;
      this.djfCheckList.forEach((v, i) => {
        if (v) zje += +this.djfList[i].ssje;
      });
      return zje;
    },
    /*处方张数*/
    xfcount: function() {
      let count = 0;
      this.djfCheckList.forEach((v, i) => {
        if (v) count++;
      });
      if (count && count === this.djfList.length) this.iscffyAllCheck = true;
      else this.iscffyAllCheck = false;
      return count;
    },
    // 待支付记录是否有选中
    dzfCk: function() {
      return this.dzfCheckList.some(v => !!v);
    },
    // 异常记录是否有选中
    ycCk: function() {
      return this.ycjlCheckList.some(v => !!v);
    }
  },
  methods: {
    switchPerson() {
      this.$router.push({name:'boundManage'})
    },
    initCzqInfo() {
      this.$router.go(0);
    },
    getMsgSfxx(id) {
      var param = { id: id };
      this.api.getMsgSfxx(param).then(res => {
        if (res.data.length > 0) {
          this.sendWxMsg(res.data);
        }
      });
    },
    sendWxMsg(data) {
      let wxmsg = [];
      let item = data[0];
      wxmsg.push(`　　   在线门诊缴款信息`);
      wxmsg.push(`　门诊号:${item.mzh}`);
      data.forEach(function(v, i) {
        wxmsg.push(`${v.cflx}(${v.zxks}):${v.no}￥${v.noje}`);
      });
      wxmsg.push(`合计金额:￥${item.zje}　方式: ${item.zffs}`);
      wxmsg.push(`缴款时间:${item.sfsj}`);
      wxmsg.push(`凭此信息或打开公众号就诊记录到科室诊治。如需票据请到窗口打印`);
      wxmsg.push('当日就诊有效，过期未就诊自动作废不退');
      let param = {
        openid: this.$store.getters.getOpenid,
        jgid: this.jgid,
        msg: wxmsg
      };
      this.api.sendWxMsg(param).then(res => {
        if (res.code == "1") {
          // this.$messagebox('已发送微信通知.');
        } else {
          this.$messagebox("微信通知发送失败+" + res.msg);
        }
      });
    },
    showDdjx() {
      this.$messagebox
        .prompt(" ", "请输入门诊号")
        .then(({ value, action }) => {
          if (value == null) {
            this.showDdjx();
          } else {
            this.loadCffyxxByMzh(value);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadCffyxxByMzh(no) {
      let params = { mzh: no };
      this.api
        .loadCfxxByMzh(params)
        .then(res => {
          if (res.data.length) {
            this.mzbz = true;
            this.mzh = no;
            this.djfList = res.data;
          }
        })
        .catch(err => {});
    },
    getPayResult(id) {
      let param = { id: id };
      this.api.getResultPay(param).then(res => {
        if (res.code === "1") {
          if (
            res.data[0] &&
            res.data[0].zt == "1" &&
            res.data[0].hiszt == "1"
          ) {
            this.$toast("缴费成功！");
            this.changeCheck({}, 2)
            this.getMsgSfxx(id);
          } else if (
            res.data[0] &&
            res.data[0].zt == "1" &&
            res.data[0].hiszt != "1"
          ) {
            this.$set(this.registerInfo, "warnMsg", '支付成功，缴费异常!,请到在线缴费异常记录查看并退费');
          } else if (
            res.data[0] &&
            res.data[0].zt == "0" &&
            res.data[0].hiszt != "0"
          ) {
            this.getPayResult(param.id);
          }
        } else {
          this.$messagebox("系统异常！");
        }
      });
    },
    getCode(jgid) {
      this.api.GetAppId({ jgid: jgid }).then(
        res => {
          if (res.code === "1") {
            if (res.data.length) {
              this.requestCode(res.data[0].appid);
            } else {
              this.$messagebox("此机构未开通微信公众号");
            }
          } else {
            this.$toast("系统异常");
          }
        },
        err => {}
      );
    },
    requestCode(appid) {
      let redirect_uri = encodeURIComponent(location.href);
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      location.href = url;
    },
    wxBridge(data, id) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          // this.$toast("支付成功！");
          this.getPayResult(id);
        } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
          this.$toast("取消支付！");
        } else {
          this.$messagebox(res.err_msg);
        }
      });
    },
    // 下拉事件触发方法
    loadTop() {
      if (this.navCheckList[0]) {
        this.$refs.loadmoreCfjf.onTopLoaded();
        this.loadCffyxx();
      }
      if (this.navCheckList[1]) {
        this.$refs.loadmoreWaitpay.onTopLoaded();
        this.loadDzfxx();
      }
      if (this.navCheckList[2]) {
        this.$refs.loadmoreZfjl.onTopLoaded();
        this.loadZfjlxx();
      }
      if (this.navCheckList[3]) {
        this.$refs.loadmoreAbnormal.onTopLoaded();
        this.loadYcxx();
      }
    },
    // 发起生成订单请求
    startDdqq(a, cb) {
      let arr = [];
      this.djfCheckList.forEach((v, i) => {
        if (v) arr.push({ hjid: this.djfList[i].id, no: this.djfList[i].no });
      });

      let param = {
        ddlx: "2",
        userid: this.$store.getters.getAppUserId,
        ly: '1-机构公众号',
        jgid: this.jgid,
        brid: this.mzbz ? this.djfList[0].brid : this.brid,
        zffs: a,
        total_fee: this.jfzje + "",
        body: "门诊缴费",
        scene_info: "门诊缴费",
        mxxx: arr
      };
      this.api.OrderGeneration(param).then(
        res => {
          if (res.code == "1") {
            // this.$toast('下单成功，订单号:'+res.Trade_No)
            this.loadCffyxx();
            cb(a, res);
          } else {
            this.$messagebox(res.msg);
          }
        },
        err => {
          this.$messagebox(err);
        }
      );
    },
    // 发送支付请求
    sendPay(a, res) {
      let lx = checkBrowser();
      let param = {
        id: res.id,
        returnurl: location.href + `?ddid=${res.id}&payBack=true`
      };
      if (a == "1") {
        // 微信支付方式
        if (lx == "1" && a == "1") {
          param.bz = "1";
        }
        // if (this.code) {
        //   param.code = code;
        // }
        var openid =  this.$store.getters.getOpenid;
        param.openid = openid;
        this.api.getOnlinePay(param).then(
          res => {
            if (res.code === "1") {
              this.startPay(res, lx, param.id);
            } else {
              this.$messagebox(res.msg);
            }
          },
          err => {
            this.$messagebox(err);
          }
        );
      } else {
        // 支付宝支付
        location.href = `static/alipay.html?id=${res.id}&openid=${this.$store.getters.getOpenid}`;
        // location.href = `static/alipay.html?id=${param.id}`;
      }
    },
    // 启动支付
    startPay(res, lx, id) {
      if (lx == "1") {
        this.wxBridge(res.data, id);
      } else {
        location.href = res.data;
      }
    },
    // 待支付缴费
    dzfjf(a) {
      if (!this.$store.getters.getHandleUser.hzid) {
        this.$messagebox("此账户未绑定人员！");
        return;
      }
      let ckIndex = this.dzfCheckList.findIndex(v => !!v);
      console.log(this.dzfList[ckIndex]);
      let param = {
        id: this.dzfList[ckIndex].id,
        zffs: a,
      };
      this.api.OrderUpdate(param).then(res => {
        if (res.code === "1") {
          this.sendPay(a, param);
        } else {
          this.$messagebox("系统异常");
        }
      });
    },
    // 选择支付方式
    selectZffs(a) {
      !a && (this.chooseZffsShow = false);
      if (a) {
        if (this.navCheckList[0]) {
          this.startDdqq(a, this.sendPay);
        } else if (this.navCheckList[1]) {
          this.dzfjf(a);
        }
        this.chooseZffsShow = false;
      }
    },
    // 加载处方缴费信息
    loadCffyxx() {
      let param = {
        hzid: this.brid,
        dqjgid: this.jgid
      };
      this.mzbz = false;
      this.mzh = "";
      this.djfCheckList = [];
      this.api.GetCffy(param).then(
        res => {
          if (res.code == 1) this.djfList = res.data;
          this.mzbz = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 加载待支付信息
    loadDzfxx() {
      let param = {
        userid: this.$store.getters.getAppUserId,
        jgid: this.jgid
      };
      this.dzfCheckList = [];
      this.api.GetDzfjl(param).then(
        res => {
          if (res.code == 1) this.dzfList = res.dzfxx;
        },
        err => {}
      );
    },
    // 加载支付记录信息
    loadZfjlxx() {
      let param = {
        userid: this.$store.getters.getAppUserId,
        jgid: this.jgid,
        rn_s: this.pagesize * (this.pageNumber - 1) + 1 + "",
        rn_e: this.pagesize * this.pageNumber + ""
      };
      this.dzfCheckList = [];
      this.api.GetZfjl(param).then(
        res => {
          if (res.code == 1) {
            this.zfjlList.push(...res.data);
            this.pageNumber++;
          }
        },
        err => {}
      );
    },
    // 加载异常订单
    loadYcxx() {
      let param = {
        brid: this.brid
      };
      this.ycjlList = [];
      this.api.GetYcjl(param).then(
        res => {
          if (res.code == 1) {
            console.log(res);
            this.ycjlList.push(...res.data);
          }
        },
        err => {}
      );
    },
    // 展示处方详情
    showCfDetail(item) {
      //传递参数bz判断是否是手动输入门诊号查询的
      this.$router.push({
        name: "mzfymx",
        query: {
          data: JSON.stringify(item),
          mzbz: this.mzbz,
          mzh: this.mzh,
          jgid: this.jgid
        }
      });
    },
    // 导航nav切换
    changeCheck(item, index) {
      this.navCheckList = [];
      this.navCheckList[index] = true;
      if (index === 0) {
        this.loadCffyxx();
      } else if (index === 1) {
        this.loadDzfxx();
      } else if (index === 2) {
        this.pageNumber = 1;
        this.zfjlList = [];
        this.zfjlCheckList = [];
        this.loadZfjlxx();
      } else if (index === 3) {
        this.ycjlList = [];
        this.ycjlCheckList = [];
        this.loadYcxx();
      }
    },
    // 处方费用选择
    selectFyjl(item, index) {
      if (this.djfCheckList[index]) {
        this.$set(this.djfCheckList, index, false);
      } else {
        this.$set(this.djfCheckList, index, true);
      }
    },
    // 待支付记录选择
    selectDzfjl(item, index) {
      if (this.dzfCheckList[index]) {
        this.$set(this.dzfCheckList, index, false);
      } else {
        this.dzfCheckList = [];
        this.$set(this.dzfCheckList, index, true);
      }
    },
    // 选择异常记录数据
    selectYcjl(item, index) {
      if (this.ycjlCheckList[index]) {
        this.$set(this.ycjlCheckList, index, false);
      } else {
        this.ycjlCheckList = [];
        this.$set(this.ycjlCheckList, index, true);
      }
    },
    // 处方费用全选
    checkAll() {
      if (this.iscffyAllCheck) {
        this.iscffyAllCheck = false;
        this.djfCheckList = [];
      } else {
        this.iscffyAllCheck = true;
        let arr = new Array(this.djfList.length);
        this.djfCheckList = arr.fill(true);

        // this.djfCheckList = arr.join().split(',').map(v => {
        //  return true;
        // })
      }
    },
    // 处方缴费确认
    confirmCfjf() {
      if (this.jfzje != "0") {
        this.chooseZffsShow = true;
      }
    },
    // 待支付取消订单
    cancleDd() {
      let checkOne = this.dzfCheckList.some(v => !!v);
      if (!checkOne) return;
      let ckIndex = this.dzfCheckList.findIndex(v => !!v);
      let param = {
        id: this.dzfList[ckIndex].id
      };
      this.api.OrderCancel(param).then(
        res => {
          if (res.code == "1") {
            this.$toast("取消订单成功！");
            this.loadDzfxx();
          }
        },
        err => {}
      );
    },
    // 待支付确认缴费
    confirmDd() {
      let ckIndex = this.dzfCheckList.findIndex(v => !!v);
      if (ckIndex === -1) return;
      if (this.dzfList[ckIndex].zt != "0") return;
      let data = this.dzfList[ckIndex];
      let param = {
        id: data.id
      };
      this.chooseZffsShow = true;
    },
    // 异常记录确认退费
    confirmYctf() {
      let ckIndex = this.ycjlCheckList.findIndex(v => !!v);
      if (ckIndex === -1) return;
      let params = {
        id: this.ycjlList[ckIndex].id
      };
    },
    // 上拉加载
    loadBottom() {
      this.$refs.loadmoreZfjl.onBottomLoaded();
      // this.isAllLoad = true;
    },
    // 展开关闭支付记录详情
    showDdxx(item, index) {
      this.$set(this.zfjlCheckList, index, !this.zfjlCheckList[index]);
      let param = {
        id: item.id
      };
      item.mx = [];
      this.api.GetZfjlmx(param).then(res => {
        item.mx.push(...res.data);
        this.$set(this.zfjlList, index, item);
      });
    }
  },
  components: {
    zffs
  }
};
</script>
<style type="text/css" scoped>
.onlinepay {
  position: relative;
  font-family: Microsoft YaHei;
}

.onlinepay ul {
  list-style: none;
}

.contain {
  height: 100%;
  overflow-y: scroll;
}

.margin48 {
  margin-top: 48px;
}

.left {
  float: left;
}

.right {
  float: right;
}

.p1 {
  font-size: 16px;
  font-weight: bold;
}

.p2 {
  font-size: 14px;
  font-weight: bold;
}

.circle {
  display: inline-block;
  position: absolute;
  left: 5px;
  top: 24px;
  height: 18px;
  width: 18px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.circle:after {
  border: 2px solid transparent;
  border-left: 0;
  border-top: 0;
  content: "";
  top: 3px;
  left: 6px;
  position: absolute;
  width: 4px;
  height: 8px;
  border-color: #fff;
  transform: rotate(45deg) scale(0);
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
}

.checked {
  background-color: #26a2ff;
}

.checked:after {
  transform: rotate(45deg) scale(1);
}

.disable-gray {
  background: #ccc;
}

/* title导航样式 */

/*.title{position: fixed; top: 39px; width: 100%; background: #fff; z-index: 2}*/

.title {
  position: absolute;
  top: 0px;
  width: 100%;
  background: #fff;
  z-index: 2;
}

.title ul {
  border-bottom: 1px solid #ccc;
}

.title .current {
  border-bottom: 3px solid #3399ff;
}

.title li {
  display: inline-block;
  width: 25%;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  text-align: center;
}

/* 处方待缴费记录 */
.suspenders {
  width: 30px;
  height: 140px;
  background: rgba(61, 187, 170, 0.2);
  text-align: center;
  position: absolute;
  right: 0;
  top: 200px;
}

.cfjl-circle-wrap {
  position: absolute;
  top: 1px;
  width: 45px;
  height: 65px;
}

.cfjl-circle-wrap .circle {
  top: 20px;
  left: 8px;
}

.cfjf {
  padding-bottom: 130px;
}
.handerinfo {
  position: absolute;
  bottom: 100px;
  width: 100%;
  height: 30px;line-height: 30px;
}
.handerinfo span{display: inline-block;padding-left: 15px}
.handerinfo .switch{
  float: right;
  padding-right: 25px;
}
.cfjf li {
  position: relative;
  padding: 5px 0 5px 2px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}

.cfjf li p {
  height: 24px;
  line-height: 24px;
  margin-left: 40px;
  padding: 2px 4px;
}

.cfjf li p:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cfjf .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100px;
  background-color: #fff;
}

.cfjf .btn-wrap {
  width: 200px;
  margin: 0 auto 5px;
}

.ckall {
  margin-left: 28px;
}

.cfnum {
  color: red;
}

.detail {
  height: 40px;
  line-height: 40px;
  padding: 0 0 8px;
  border-top: 1px solid #ccc;
}

.checkall-wrap {
  display: inline-block;
  position: relative;
  padding-left: 10px;
}

.checkall-wrap .circle {
  position: absolute;
  top: 10px;
  left: 10px;
}

.totalCost {
  color: red;
  font-size: 18px;
  padding-right: 5px;
  float: right;
}

/* 待支付 */

.waitpay .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 60px;
  background-color: #fff;
}

.waitpay .btn-wrap {
  width: 100%;
  text-align: center;
}

.waitpay .btn-wrap div {
  display: inline-block;
  width: 100px;
  padding: 5px 15px;
}

.waitpay {
  padding-bottom: 60px;
}

.waitpay li {
  position: relative;
  padding: 10px 0 2px 2px;
  border-bottom: 1px solid #ccc;
}

.waitpay li p {
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  margin-left: 30px;
  padding: 2px 4px;
}

.waitpay li p:last-child {
  display: inline-block;
  width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*.watipay li p .tradeNo{display: inline-block;width: 120px;white-space: nowrap;overflow:hidden;text-overflow: ellipsis;}*/

.tradeNo {
  display: inline-block;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tradeNo_record {
  display: inline-block;
  width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.waitpay li ul {
  margin-top: 10px;
  font-size: 14px;
}

.waitpay li ul li {
  border-bottom: 0;
  border-top: 1px solid #ccc;
  padding: 0;
}

/* 支付记录 */

.record li {
  position: relative;
  padding: 10px 0 0px 2px;
  border-bottom: 1px solid #ccc;
}

.record li p {
  height: 24px;
  line-height: 24px;
  margin-left: 5px;
  padding: 2px 4px;
}

.record li ul {
  font-size: 14px;
}

.record li ul li {
  border-bottom: 0;
  border-top: 1px solid #ccc;
  padding: 0;
  font-weight: normal;
}

.record li ul li p {
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  margin-left: 35px;
  padding: 2px 4px;
}

.record li ul li p:last-child {
  display: inline-block;
  width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.record .loadmore-tip {
  height: 45px;
  line-height: 45px;
  text-align: center;
}

/* 异常处理 */

.abnormal {
  padding-bottom: 50px;
}

.abnormal .footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50px;
  background-color: #fff;
}

.abnormal .btn-wrap {
  width: 200px;
  margin: 0 auto 5px;
}

.abnormal li {
  position: relative;
  padding: 10px 0 10px 2px;
  border-bottom: 1px solid #ccc;
}

.abnormal li p {
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  margin-left: 35px;
  padding: 2px 4px;
}

.abnormal .warn-tip {
  color: red;
  padding: 2px 5px;
}
</style>
