<!-- by wzk -->
<template>
  <div>
    <div class="header">
      <div class="header-left">
        <div @click="toJkdaPrint()" class="avator">
            <img :src="src" alt="">
        </div>
      </div>
      <div class="header-main">
        <div class="header-main-top">
          <div style="color:#fff;">
           <span style="font-size:16px">{{personInfo.xm}}</span> 
           <span style="font-size:13px">{{personInfo.xb}}</span> 
           <span style="font-size:13px">{{personInfo.age}}岁</span> 
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
            <span style="overflow:hidden">{{personInfo.xzzmc?personInfo.xzzmc:'' + personInfo.xzzmph?personInfo.xzzmph:''}}</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div>
          {{personInfo.sfqy}}
        </div>
        {{personInfo.hehe}}
      </div>
    </div>
    <div class="mes">
      <div v-for="item in ysInfo" class="mes-item">
        <div>
          <icon style="color:#00c369;" :name="item.icon" :scale="2.4"></icon>
        </div>
          <p>
            {{item.ms}}
          </p>
      </div>
    </div>
    <div class="contain">
      <div v-if="showBz.jktj" class="archieves-tiem tjxx" @click="toCheck(jktjData)">
        <div class="item-top">
          <div class="icon-left">
            <img src="../../../static/img/tijianxinxi.svg" alt="">
           </div>
           <p>体检信息</p>
           <div class="icon-right">
            <icon style="color:#cccccc;" name="arrow" :scale="2.4"></icon>
           </div>
        </div>
        <div class="item-body">
         <div class="per50">体检日期: {{jktjData.tjrq}}</div>
         <div class="per50">责任医生: {{jktjData.zrys}}</div>
         <div class="per100">健康评价: {{jktjData.jkpj}}</div>
         <div class="per100">健康指导: {{jktjData.jkzd}}</div>
        </div>
      </div>
      <div v-if="showBz.zyfw" class="archieves-tiem zyfw" @click="toCheck(zyfwData)">
        <div class="item-top">
          <div class="icon-left">
            <img src="../../../static/img/zhongyi.svg" alt="">
           </div>
           <p>中医健康服务</p>
           <div class="icon-right">
            <icon style="color:#cccccc" name="arrow" :scale="2.4"></icon>
           </div>
        </div>
        <div class="item-body">
         <div class="per50">服务日期: {{zyfwData.fwrq}}</div>
         <div class="per50">责任医生: {{zyfwData.zrys}}</div>
         <div class="per100" ><span>{{zyfwData.bslx}}:</span> {{zyfwData.zttz}}</div>
         <div class="per100" ><span>调养建议:</span> {{zyfwData.qzts}}</div>
        </div>
      </div>
      <div v-if="showBz.gxy" class="archieves-tiem gxy" @click="toCheck(gxyData)">
        <div class="item-top">
          <div class="icon-left">
            <img src="../../../static/img/gaoxueya.svg" alt="">
           </div>
           <p>高血压信息</p>
           <div class="icon-right">
            <icon style="color:#cccccc" name="arrow" :scale="2.4"></icon>
           </div>
        </div>
        <div class="item-body">
         <div class="per50">服务日期: {{gxyData.jdrq}}</div>
         <div class="per50">责任医生: {{gxyData.zrys}}</div>
         <div class="per50">上次随访: {{gxyData.scsf}}</div>
         <div class="per50">下次随访: {{gxyData.xcsf}}</div>
         <div class="per50"><span style="letter-spacing:7px">收缩</span>压: {{gxyData.ssy}}mmHg</div>
         <div class="per50"><span style="letter-spacing:7px">舒张</span>压: {{gxyData.szy}}mmHg</div>
        </div>
      </div>
      <div v-if="showBz.tnb" class="archieves-tiem tnb" @click="toCheck(tnbData)">
        <div class="item-top">
          <div class="icon-left">
            <img src="../../../static/img/tangniaobing.svg" alt="">
           </div>
           <p>糖尿病信息</p>
           <div class="icon-right">
            <icon style="color:#cccccc" name="arrow" :scale="2.4"></icon>
           </div>
        </div>
        <div class="item-body">
          <div class="per50">服务日期: {{tnbData.jdrq}}</div>
          <div class="per50">责任医生: {{tnbData.zrys}}</div>
          <div class="per50">上次随访: {{tnbData.scsf}}</div>
          <div class="per50">下次随访: {{tnbData.xcsf}}</div>
          <div class="per50">空腹血糖: {{tnbData.kfxtz}}mmol/L</div>
          <div class="per50">随访控制: {{tnbData.ccsffl}}</div>
        </div>
      </div>
      <div v-if="showBz.lnr" class="archieves-tiem lnr">
        <div class="item-top">
          <div class="icon-left">
            <img src="../../../static/img/laonianren.svg" alt="">
           </div>
           <p>老年人信息</p>
           <div class="icon-right">
            <icon style="color:#cccccc" name="arrow" :scale="2.4"></icon>
           </div>
        </div>
        <div class="item-body">
         <div class="per50">评估日期: {{lnrData.pgrq}}</div>
         <div class="per50">责任医生: {{lnrData.pgys}}</div>
         <div class="per100">评分说明: {{lnrData.pgdf}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "",
      series: [],
      showBz: {
        jktj: false,
        zyfw: false,
        gxy: false,
        tnb: false,
        lnr: false
      },
      personInfo: {},
      ysInfo: [
        { ms: "", icon: "shequ" },
        { ms: "", icon: "yisheng" },
        { ms: "", icon: "dianhua2" }
      ],
      jktjData: {},
      zyfwData: {},
      gxyData: {},
      tnbData: {},
      lnrData: {}
    };
  },
  created() {
    //let query = this.$route.query;
    //console.log(query); 
    // this.daid = query.id;
    this.daid = 'aa642ce90fc5496281fb03635af52f8d';
    this.daid = 'aa642ce90fc5496281fb03635af52f8d'
    this.$store.commit("setPageTitle", "个人档案中心");
    this.loadJkdaxx();
    this.loadQtdaxx(this.daid);
  },
  methods: {
    toJkdaPrint() {
      this.$router.push({
        name:'healthRecord',
        query: {
          daid: this.daid
        }
      });
    },
    toCheck(obj) {
      if (obj == this.zyfwData) {
        this.$router.push({
          name: "zyHealthService",
          query: { daid: this.daid }
        });
      }
      if (obj == this.jktjData) {
        this.$router.push({ name: "jktjRecord", query: { daid: this.daid } });
      }
      if (obj == this.gxyData) {
        this.$router.push({ name: "gxyRecord", query: { daid: this.daid } });
      }
      if (obj == this.tnbData) {
        this.$router.push({ name: "tnbRecord", query: { daid: this.daid } });
      }
      if (obj == this.lnrData) {
        this.$router.push({
          name: "zyHealthService",
          query: { daid: this.daid }
        });
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
          this.$set(this.ysInfo[0], "ms", data.wgmc ? data.wgmc : "/");
          this.$set(this.ysInfo[1], "ms", data.ysxm ? data.ysxm : "/");
          this.$set(this.ysInfo[2], "ms", data.lxdh ? data.lxdh : "/");
          if (data.xb == "男") {
            this.src = "static/img/man.svg";
          } else if (data.xb == "女") {
            this.src = "static/img/woman.svg";
          }
        }
      });
    },
    loadQtdaxx(id) {
      let param = {
        daid: id
      };
      this.api.getqtdaxx(param).then(res => {
        if (res.code == 1) {
          this.assembleData(res.data[0].daxx);
        }
      });
    },
    assembleData(data) {
      if (data.gxy) {
        this.showBz.gxy = true;
        this.gxyData = data.gxy;
        this.series.push({ mc: "高", color: "#f5806e" });
      }
      if (data.lnr) {
        this.showBz.lnr = true;
        this.lnrData = data.lnr;
        this.series.push({ mc: "老", color: "#0dc6ef" });
      }
      if (data.jktj) {
        this.showBz.jktj = true;
        this.jktjData = data.jktj;
        this.series.push({ mc: "体", color: "#6ca3f5" });
      }
      if (data.tnb) {
        this.showBz.tnb = true;
        this.tnbData = data.tnb;
        this.series.push({ mc: "糖", color: "#ffac43" });
      }
      if (data.zyfw) {
        this.showBz.zyfw = true;
        this.zyfwData = data.zyfw;
        this.series.push({ mc: "中", color: "#01c769" });
      }
    }
  },
  components: {}
};
</script>
<style  scoped>
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
.header-right {
  position: relative;
  width: 65px;
  height: 100%;
}
.header-right > div {
  box-sizing: border-box;
  width: 65px;
  height: 25px;
  line-height: 25px;
  padding-left: 15px;
  background: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 12.5px;
  border-bottom-left-radius: 12.5px;
  color: #ff9400;
  font-size: 14px;
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
  height: 60px;
  display: flex;
}
.mes .mes-item {
  width: 33.33%;
  position: relative;
  text-align: center;
  font-size: 14px;
}
.mes-item:not(:last-child):after {
  position: absolute;
  content: "";
  height: 40px;
  top: 10px;
  right: 0;
  border-left: 1px solid #ccc;
}
.mes-item > div {
  width: 18px;
  height: 18px;
  margin: 9px auto 4px;
}
.contain {
  min-height: calc(100% - 205px);
  background: #efeeec;
  padding-top: 25px;
  padding-bottom: 5px;
}
.archieves-tiem {
  box-sizing: border-box;
  width: 350px;
  min-height: 115px;
  margin: 0 auto 25px;
  background: #fff;
  border-radius: 5px;
  padding: 15px 25px;
  box-shadow: 1px 1px 15px #e8e7e5, -1px -1px 15px #e8e7e5;
}
.archieves-tiem .item-top {
  display: flex;
  height: 35px;
  position: relative;
}
.archieves-tiem .item-top:after {
  position: absolute;
  bottom: 0;
  content: "";
  width: 300px;
  height: 0;
  border-bottom: 1px solid #dcdcdc;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.archieves-tiem .icon-left {
  width: 20px;
  height: 20px;
  padding-top: 1px;
}
.archieves-tiem p {
  flex: 1;
  font-size: 16px;
  padding-left: 10px;
}
.item-body {
  width: 300px;
  display: flex;
  font-size: 14px;
  flex-wrap: wrap;
}
.item-body > div {
  min-height: 20px;
  line-height: 20px;
  margin-top: 5px;
  color: #666;
}
.per50 {
  width: 150px;
}
.per100 {
  width: 300px;
}
.zyjk span {
  font-weight: bold;
  color: #000;
}
</style>