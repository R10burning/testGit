<template>
    <div style="position:relative">
        <div style="height:calc(100% - 80px);overflow-y: auto;">
            <div style="margin-top:2px;">
                <div class="partTitle">
                    号别信息
                </div>
                <div class="partContent">
                    <div>
                        <span>科室：</span><span>{{registerInfo.ksmc}}</span>
                    </div>
                    <div>
                        <span>医生：</span><span>{{registerInfo.ysxm}}</span>
                    </div>
                    <div>
                        <span>号类：</span><span>{{registerInfo.xmmc}}</span>
                    </div>
                    <div style="display: flex;">
                        <div>
                            <span>日期：</span><span>{{registerInfo.shortDay}}({{registerInfo.day}})</span>
                        </div>
                    </div>
                    <div>
                        <span>选择时间段：</span>
                    </div>
                    <div class="flex" style="flex-wrap:wrap;">
                        <div v-for="item in ableTimeList" @click="chooseTime(item);" class="timeItem" :class="{'chooseItem':(item==timeItem)}" style="width:130px;">
                            <div>
                                <icon v-if="item==timeItem" style="color:#008000;" name="radio" :scale="1.8"></icon>
                                <icon v-if="item!=timeItem" style="color:#008000;" name="radioO" :scale="1.8"></icon>
                            </div>
                            <div style="font-size: 12px;text-align: center;width:70px;">
                                {{item.sjd}}
                            </div>
                            <div style="text-align: center;">
                                余:{{item.xgs-item.ygs}}
                            </div>
                        </div>
                        <!-- <div>上下午：</div> -->
                        <!-- <div class="box1">
                                <mt-switch class="scaleY" v-model="timeValue" @change="timeChange()"></mt-switch>
                            </div> -->
                        <!-- <div>{{timeValue?'上午':'下午'}}</div> -->
                    </div>
                    <div>
                        <span>金额：</span><span>{{registerInfo.ghfy}}</span>
                    </div>
                </div>
            </div>
            <div style="margin-top:2px;">
                <div class="partTitle">
                    就诊人员信息
                </div>
                <div class="partContent" style="position: relative;margin-top:5px;">
                    <div style="position:absolute;right:10px;top:0px;color:#3dbbaa;" @click="changeHandleUser();">
                        更换就诊人员
                    </div>
                    <div>
                        <span>{{handleUser.hzxm +'　　'+ handleUser.lxdh}}</span>
                    </div>
                    <!-- <div>
                        <span>身份证号：</span><span>{{handleUser.sfzh}}</span>
                    </div> -->
                    <!-- <div>
                        <span>手机号：</span><span>{{handleUser.lxdh}}</span>
                    </div> -->
                    <!-- <div>
                        <span>地址：</span><span>{{handleUser.mph}}</span>
                    </div> -->
                </div>
            </div>
            <div v-if="registerInfo.ddh" style="margin-top:2px;">
                <div class="partTitle">
                    挂号结果
                </div>
                <div class="partContent">
                    <div v-if="registerInfo.no">
                        <span>订单号：</span><span>{{registerInfo.ddh}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <span>挂号单号：</span><span>{{registerInfo.no}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <span>结果：</span><span class="red">{{registerInfo.type?'成功': registerInfo.warnMsg}}</span>
                    </div>
                    <div v-if="registerInfo.no">
                        <!-- <span class="tips red">请于{{registerInfo.time}}到院就诊</span> -->
                        <span class="tips red">请{{registerInfo.time.split(' ')[0]}}到院就诊</span>
                    </div>
                </div>
            </div>
            <div>
                <span class="red" style="margin-left:20px;">{{registerInfo.warnMsg}}</span>
            </div>
            <div v-if="confirmBtnShow" style="margin-left:10%;width:80%;position: absolute;bottom: 10px;">
                <button class="mint-button mint-button--primary mint-button--large green" @click="sureCharge()">
                    <!---->
                    <label class="mint-button-text font18">挂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
                </button>
            </div>
           
        </div>
        <zffs @confirmZffs="selectZffs" v-if="ChooseZffsShow"></zffs>
    </div>
</template>
<script type="text/javascript">
import zffs from "@/components/registerConfirm/zffs.vue";
import { getUrlParams, checkBrowser } from "@/util/util.js";
export default {
  data() {
    return {
      registerInfo: {},
      tempHandleUser: {},
      timeValue: true,
      param: {},
      ChooseZffsShow: false,
      confirmBtnShow: true,
      ableTimeList: [],
      timeItem: {}
    };
  },
  methods: {
    chooseTime(item) {
      this.timeItem = item;
    },
    getMsgGhxx(id) {
      var param = { id: id };
      this.api.getMsgGhxx(param).then(res => {
        if (res.data.length > 0) {
          this.sendWxMsg(res.data[0]);
        }
      });
    },
    sendWxMsg(data) {
      let wxmsg =[];
            wxmsg.push(`　　   在线挂号信息`);
            wxmsg.push(`　门诊号:${data.no}`);
            wxmsg.push(`　就诊人:${data.xm}`);
            wxmsg.push(`就诊科室:${data.ksmc+'　'+data.ysxm}`);
            wxmsg.push(`就诊时间:${data.jzsj}`);
            wxmsg.push(`就诊序号:${data.hx+'号'}`);
            wxmsg.push(`　门诊号:${data.no}`);
            wxmsg.push(`挂号金额:￥${data.je}`);
            wxmsg.push(`支付方式: ${data.zffs}`);
            wxmsg.push(`凭此信息或打开公众号就诊记录到科室诊治。如需票据请到窗口打印`);
            wxmsg.push(`当日就诊有效，过期未就诊自动作废不退`);
      // let wxmsg = `尊敬的${data.xm},您已成功预约本院${data.jzsj + ' ' + data.ksmc+data.ysxm}的门诊,
      // 门诊号【${data.no}】,请提前到院排队就诊。`;
      let param = {
        openid: this.$store.getters.getOpenid,
        jgid: this.$route.query.jgid,
        msg: wxmsg
      };
      this.api.sendWxMsg(param).then(res => {
        if (res.code == "1") {
        //   this.$messagebox("已发送微信通知.");
        } else {
          this.$messagebox("微信通知发送失败" + res.msg);
        }
      });
    },
    init() {
      this.registerInfo = this.$route.query;

      this.tempHandleUser = this.handleUser;
      this.searchTimeArr();
    },
    searchTimeArr() {
      let params = {
        ghsj: this.registerInfo.shortDay,
        ghapid: this.registerInfo.id
      };
      this.api.getGhTimeArr(params).then(res => {
        console.log(res);
        if (res.code == 1) {
          debugger;
          if (res.xx.length) {
            this.ableTimeList = res.xx;
          } else {
            if (this.registerInfo.workTime == "上午") {
              this.ableTimeList = [
                {
                  sjd: "09:00-11:30",
                  ygs: 0,
                  xgs: this.registerInfo.yhs
                }
              ];
            }
            if (this.registerInfo.workTime == "下午") {
              this.ableTimeList = [
                {
                  sjd: "14:30-17:30",
                  ygs: 0,
                  xgs: this.registerInfo.yhs
                }
              ];
            }
            if (this.registerInfo.workTime == "全天") {
              this.ableTimeList = [
                {
                  sjd: "09:00-11:30",
                  ygs: 0,
                  xgs: this.registerInfo.yhs
                },
                {
                  sjd: "14:30-17:30",
                  ygs: 0,
                  xgs: this.registerInfo.yhs
                }
              ];
            }
          }
        } else {
          this.$toast("获取挂号时间信息失败！");
          this.$route.back();
        }

        this.selectDefaultTime();
      });
    },
    selectDefaultTime() {
      for (var i = 0; i < this.ableTimeList.length; i++) {
        if (this.ableTimeList[i].xgs - this.ableTimeList[i].ygs > 0) {
          this.timeItem = this.ableTimeList[i];
          return;
        }
      }
    },
    selectZffs(a) {
      let params = this.getGhxx(a);
      if (a === "1") {
        this.payForWx(params);
      } else if (a === "2") {
        this.payForAlipay(params);
      }
      this.ChooseZffsShow = false;
    },
    payForAlipay(params) {
      this.api.OrderGeneration(params).then(
        res => {
          if (res.code === "1" && res.msg === "成功") {
            this.$set(this.registerInfo, "ddh", res.Trade_No);
            location.href = `static/alipay.html?id=${res.id}&openid=${this.$store.getters.getOpenid}`;
          } else if (res.code === "0") {
            this.$messagebox(res.msg);
          }
        },
        err => {
          this.$messagebox("挂号异常,请再次尝试或到窗口挂号");
        }
      );
    },
    payForWx(params) {
      this.api.OrderGeneration(params).then(
        res => {
          if (res.code == "1" && res.msg === "成功") {
            this.$set(this.registerInfo, "ddh", res.Trade_No);
            let lx = checkBrowser();
            let param = {
              id: res.id,
              returnurl: location.href + `&ddid=${res.id}&payBack=true`
            };
            if (lx == "1") {
              param.bz = "1";
            }
            var openid = this.$store.getters.getOpenid;
            param.openid = openid;
            this.api.getOnlinePay(param).then(
              res => {
                if (res.code == "1") {
                  this.startPay(res, lx, param.id);
                }
              },
              err => {
                this.$messagebox(err);
              }
            );
          } else if (res.code == "0") {
            this.$messagebox(res.msg);
          }
        },
        err => {
          this.$messagebox("挂号异常,请再次尝试或到窗口挂号");
        }
      );
    },
    startPay(res, lx, id) {
      this.confirmBtnShow = false;
      if (lx == "1") {
        this.wxBridge(res.data, id);
      } else {
        location.href = res.data;
      }
    },
    wxBridge(data, id) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, res => {
        if (res.err_msg === "get_brand_wcpay_request:ok") {
          // this.$messagebox("支付成功！");
          this.getPayResult(id);
        } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
          this.$toast("取消支付！");
          this.$set(this.registerInfo, "warnMsg", '取消支付');
        } else {
          this.$messagebox(res.err_msg);
        }
      });
    },
    sureCharge() {
      if (this.timeItem.xgs - this.timeItem.ygs <= 0) {
        this.$toast("该时段已无余号。");
      }
      if (this.registerInfo.ghfy == "0.00" || this.registerInfo.ghfy == "0") {
        let params = this.getGhxx();
        this.api.OrderGeneration(params).then(
          res => {
            if (res.code === "1" && res.msg === "成功") {
              this.$set(this.registerInfo, "ddh", res.Trade_No);
              this.param = res;
              this.confirmPayment(res);
            } else if (res.code == "0") {
              this.$set(this.registerInfo, "no", "");
              this.$set(this.registerInfo, "type", res.code);
              this.$set(this.registerInfo, "warnMsg", res.msg);
            }
          },
          err => {
            this.$messagebox(err);
          }
        );
      } else {
        this.ChooseZffsShow = true;
      }
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
            this.$toast("挂号成功！");
            this.getMsgGhxx(id);
          } else if (
            res.data[0] &&
            res.data[0].zt == "1" &&
            res.data[0].hiszt != "1"
          ) {
            this.$set(this.registerInfo, "warnMsg", '支付成功，挂号异常!,请到在线缴费异常记录查看并退费');
          } else if (
            res.data[0] &&
            res.data[0].zt == "0" &&
            res.data[0].hiszt != "0"
          ) {
            setTimeout(() => {
              this.getPayResult(param.id);
            }, 1000);
          }
        } else {
          this.$messagebox("系统异常！");
        }
      });
    },
    confirmPayment(data) {
      let param = {
        id: this.param.id,
        out_trade_no: this.param.Trade_No,
        jgid: this.registerInfo.jgid
      };
      this.api.ConfirmPayment(param).then(
        res => {
          this.registerInfo.type = +res.code;
          if (res.code == "1") {
            this.$set(this.registerInfo, "no", res.msg);
            this.getMsgGhxx(param.id);
          } else {
            if (res.msg.indexOf("重复挂号") != "-1") {
              this.$set(this.registerInfo, "warnMsg", "失败, 今天已经挂过该号别，不能重复挂号");
            } else {
              this.$set(this.registerInfo, "warnMsg", "失败, 请到窗口挂号");
            }
          }
        },
        err => {}
      );
    },
    getGhxx(zffs) {
      let tempTime = this.timeItem.sjd.split("-")[0] + ":01";
      if (!this.timeValue) {
        this.registerInfo.time = this.registerInfo.shortDay + " " + tempTime;
      } else {
        this.registerInfo.time = this.registerInfo.shortDay + " " + tempTime;
      }

      let params = {
        brxx: {
          brid: this.handleUser.hzid
        },
        ghxx: {
          ghapid: this.registerInfo.id,
          jsfs: "在线支付",
          ysje: this.registerInfo.ghfy,
          yysj: this.registerInfo.time
        }
      };
      return {
        ddlx: "1",
        jgid: this.registerInfo.jgid,
        brid: this.handleUser.hzid,
        userid: this.$store.getters.getAppUserId,
        ly: '1-机构公众号',
        zffs: zffs ? zffs : "1",
        total_fee: params.ghxx.ysje,
        body: "预约挂号-" + this.handleUser.hzxm.slice(0, -1) + "*",
        scene_info: "预约挂号-" + this.handleUser.hzxm.slice(0, -1) + "*",
        mxxx: [],
        ghxx: JSON.stringify(params)
      };
    },
    changeHandleUser() {
      this.$router.push({
        name: "boundManage"
      });
    }
  },
  mounted() {
    this.init();
  },
  components: {
    zffs
  },
  computed: {
    handleUser() {
      return this.$store.getters.getHandleUser;
    }
  }
};
</script>
<style scoped>
.timeItem.chooseItem {
}

.timeItem {
  width: 250px;
  margin: 5px;
  display: flex;
}

.partContent {
  margin-left: 20px;
  padding-top: 5px;
  font-size: 14px;
}

.partTitle {
  color: #3dbbaa;
  font-size: 16px;
  margin-left: 10px;
  border-bottom: 1px solid #b3b3b3;
}

.red {
  color: red;
}

.t2 {
  width: 100%;
  font-size: 12px;
  color: #999999;
}

.item {
  padding: 5px;
  border: 1px solid #e6e6e6;
}

.tips {
  font-size: 16px;
  padding-left: 25px;
}

.modeHead {
  height: 25px;
  width: 100%;
  background: #cccccc;
  padding-top: 6px;
}

.headTitle {
  margin-left: 10px;
  font-size: 14px;
  color: #7f7f7f;
}
</style>
