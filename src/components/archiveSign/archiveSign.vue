<template>
    <div>
        <div class="header">
            <div class="header-left">
                <div class="avator">
                    <img :src="src" alt="">
                </div>
            </div>
            <div class="header-main">
                <div class="header-main-top">
                <div style="color:#fff;">
                <span style="font-size:16px">{{personInfo.xm}}</span> 
                <span style="font-size:13px">{{personInfo.xb}}</span> 
                <span style="font-size:13px">{{personInfo.age?personInfo.age+'岁' : ''}}岁</span> 
                </div>
                <div class="icon-group">
                    <div v-for="item in series" class="icon-item" >
                        <span :style="`background:${item.color}`">{{item.mc}}</span>
                    </div>
                </div>
                </div>
                <div class="header-main-body">
                <div>
                    <span class="icon">
                    <icon style="color:#fff;" name="shenfenzheng" :scale="2"></icon>
                    </span>
                    <span>{{personInfo.sfzh}}</span>
                </div>
                <div>
                    <span class="icon">
                    <icon style="color:#fff" name="dianhua" :scale="2"></icon>
                    </span>
                    <span>{{personInfo.brdh}}</span>
                </div>
                <div>
                    <span class="icon">
                    <icon style="color:#fff" name="dizhi" :scale="2"></icon>
                    </span>
                    <span style="overflow:hidden">{{personInfo.mc?personInfo.mc:'' + personInfo.xzzmph?personInfo.xzzmph:''}}</span>
                </div>
                </div>
            </div>
        </div>
        <div class="mes">
            <div class="mesa">
                <div  class="mes-item">
                    <img  src="../../../static/img/fdadd.svg" alt="">
                    <p>新增签约 </p>
                </div>
                <div  class="mes-item">
                    <img  src="../../../static/img/fdjilu.svg" alt="">
                    <p>申请记录 </p>
                </div>
            </div>
            
        </div>
        <div class="contain">
            <div class="contain-top ">
                <div class="jgjs" style="display:flex;height:18px;line-height:18px;font-size:16px;margin-bottom:10px">
                    <div>
                      <img style="width:18px;height:18px" src="../../../static/img/fdshequ.svg" alt="">
                    </div>
                    <div style="padding-left:5px;color:#333;font-weight:bold">
                        银桂桥社区
                    </div>   
                </div>
                <div class="detail" style="color:#666;">
                    <p>签约医生:</p>
                    <p>有效日期:</p>
                    <p>签约服务包:</p>
                    <div class="fwb">
                        <span>老年人服务包B</span>
                        <span>老年人服务包B</span>
                        <span>慢性病患者服务包C</span>
                    </div>
                </div>
                <div class="qysj" style="font-size:13px;color:#999;display:flex;height:50px;line-height:50px" >
                    <div style="flex:1">签约时间:</div>
                    <div style="width:100px;display:flex;justify-content: center;align-items: center;">
                        <img style="width:16px;height:18px;margin-bottom:4px" src="../../../static/img/fdxieyi.svg" alt="">
                        <span>签约协议</span>    
                    </div>
                </div>
            </div>
            <div class="contain-main">
              <div class="contain-main-header">
                历史签约记录
              </div>
              <div class="historyRecord">
                <ul>
                  <li class="parentLi">
                    <div style="display:flex">
                      <div>
                        <icon style="margin-top:4px;color:#cccccc" name="fdzhankai" :scale="3.2"></icon>
                      </div>
                      <div style="font-size:16px;flex:1;padding-left:5px">
                        营门口社区
                      </div>
                      <div style="font-size:14px;width:200px">
                        2012-10-10 ~ 2014-12-12
                      </div>
                    </div>
                    <div class="recordDetail">
                      <p>签约医生</p>
                      <p>签约服务包</p>
                      <div>
                        <span></span>
                      </div>
                      <!-- <div class="qysj" style="font-size:13px;color:#999;display:flex;height:50px;line-height:50px" >
                          <div style="flex:1">签约时间:</div>
                          <div style="width:100px;display:flex;justify-content: center;align-items: center;">
                              <img style="width:16px;height:18px;margin-bottom:4px" src="../../../static/img/fdxieyi.svg" alt="">
                              <span>签约协议</span>    
                          </div>
                      </div> -->
                    </div>
                  </li>
                </ul>
              </div>
              
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      src: "",
      series: [],
      personInfo: {}
    };
  },
  computed: {},
  created() {
    let query = this.$route.query;
    this.initSeries(query);
    this.daid = query.id;
    this.$store.commit("setPageTitle", "签约档案中心");
    // this.loadJkdaxx();
    // this.loadQtdaxx(this.daid);
    // this.daid = '450797635|52012700000000268680|JN'
  },
  mounted() {
    this.$nextTick(function() {
      this.init();
    });
  },
  methods: {
    init() {},
    initSeries(data) {
      if (data.gxyzt) {
        this.series.push({ mc: "高", color: "#f57f6d" });
      }
      if (data.tnbzt) {
        this.series.push({ mc: "糖", color: "#fdb24a" });
      }
      if (data.dbrqzt) {
        this.series.push({ mc: "低", color: "#00c369" });
      }
      if (data.lnrzt) {
        this.series.push({ mc: "老", color: "#42c2ef" });
      }
      if (data.gwrqzt) {
        this.series.push({ mc: "危", color: "#f44f29" });
      }
      if (data.cjrqzt) {
        this.series.push({ mc: "残", color: "#6ca3f5" });
      }
    },
    loadJkdaxx() {
      let param = {
        daid: this.daid
      };
      this.api.getJkdaxx(param).then(res => {
        if (res.code == 1 && res.data.length) {
          var data = res.data[0];
          this.personInfo = data;
          if (data.xb == "男") {
            this.src = "static/img/man.svg";
          } else if (data.xb == "女") {
            this.src = "static/img/woman.svg";
          }
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped>
.header {
  display: flex;
  height: 120px;
  box-sizing: border-box;
  background: -webkit-linear-gradient(right, #00ad72, #00cc6e);
  padding-top: 15px;
  flex-direction: row;
}
.header-left {
  width: 75px;
  height: 100%;
  text-align: center;
}
.header-left .avator {
  box-sizing: border-box;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  border: 1.5px solid #fff;
  overflow: hidden;
  padding-top: 8px;
  margin: auto;
  background: #b2e1be;
}
.header-main {
  height: 100%;
  flex: 1;
}
.header-main-top {
  display: flex;
}
.header-main-body {
  /* display: flex; */
  font-size: 0;
  color: #fff;
}
.header-main-body > div {
  margin-top: 2px;
  height: 20px;
  line-height: 20px;
  width: 100%;
}
.header-main-body span {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  vertical-align: top;
  font-size: 13px;
}
.header-main-body .icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.icon-group {
  display: flex;
  align-items: flex-end;
  padding-bottom: 1px;
}
.icon-item span {
  display: inline-block;
  font-size: 9px;
  color: #fff;
  border-radius: 1px;
  padding: 1px;
  margin-left: 5px;
  height: 13px;
  width: 13px;
  line-height: 13px;
  text-align: center;
}
.mes {
  background: -webkit-linear-gradient(right, #00ad72, #00cc6e);
}
.mes .mesa {
  height: 60px;
  display: flex;
  background: rgba(0, 0, 0, 0.2);
}
.mes .mes-item {
  width: 50%;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: #fff;
}
.mes-item img {
  height: 24px;
  width: 24px;
  margin-top: 7.5px;
}
.mes-item:not(:last-child):after {
  position: absolute;
  content: "";
  height: 45px;
  top: 10px;
  right: 0;
  border-left: 1px solid rgba(221, 221, 221, 0.2);
}
.mes-item > div {
  width: 18px;
  height: 18px;
  margin: 9px auto 4px;
}
.contain {
  height: calc(100% - 180px);
  background: #efeeec;
  padding-top: 12.5px;
  box-sizing: border-box;
  overflow: scroll;
}
.contain-top {
  box-sizing: border-box;
  position: relative;
  background: #fff;
  padding: 15px 0 0 15px;
  box-shadow: 1px 1px 10px #e8e7e5, -1px -1px 10px #e8e7e5;
  overflow: hidden;
}
.contain-top:after {
  content: "当前签约";
  position: absolute;
  top: 14px;
  right: -55px;
  width: 160px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  background: #fff6e1;
  color: #ff9400;
  transform: rotate(45deg);
}
.contain-main {
  box-sizing: border-box;
  height: auto;
  background: #fff;
  box-shadow: 1px 1px 15px #e8e7e5, -1px -1px 15px #e8e7e5;
}
.contain-top .detail p {
  font-size: 14px;
  /* height: 30px; */
  /* line-height: 30px; */
  margin-bottom: 8px;
}
.contain-top .detail .fwb {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0 0 0;
}
.contain-top .detail {
  position: relative;
}
.contain-top .detail:after {
  position: absolute;
  bottom: -5px;
  content: "";
  width: 100%;
  height: 0;
  border-bottom: 1px solid #dcdcdc;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.fwb span {
  color: #00b678;
  font-size: 14px;
  width: 160px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #c0e1d6;
  text-align: center;
  border-radius: 8px;
  background: #e1f4eb;
  margin-bottom: 8px;
  overflow: hidden;
}
.fwb span:first-child {
  margin-right: 12.5px;
}
.contain-main {
  margin-top: 12.5px;
  min-height: calc(427px - 253px);
}
.contain-main-header {
  font-size: 15px;
  font-weight: bold;
  padding: 12.5px 0 12.5px 25px;
  position: relative;
}
.contain-main-header:after {
  position: absolute;
  bottom: 0px;
  left: 0;
  content: "";
  width: 100%;
  height: 0;
  border-bottom: 1px solid #dcdcdc;
  transform: scaleY(0.5);
}
.contain-main-header:before {
  position: absolute;
  left: 16px;
  top: 16px;
  content: "";
  width: 0;
  height: 14px;
  border-left: 4px solid #00a65a;
}
.historyRecord ul {
  padding-left: 12.5px;
}
.parentLi {
  min-height: 40px;
  line-height: 40px;
}
.recordDetail{
  padding-left: 35px;
  height:25px;
}
</style>
