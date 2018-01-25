<!-- by wzk -->
<template>
  <div>
    <div ref="wrap" class="wrap" @dblclick="changeScale" >
      <div ref="domWrap" :style="myStyle" v-html="htmlStr">
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/util/util.js";
export default {
  data() {
    return {
      isShow: false,
      scale: 1,
      spots: {},
      initDis: "",
      curDis: "",
      scaleCoe: 3000,
      initX: "",
      initY: "",
      wrapWidth: 1020,
      minScale: "",
      maxScale: "",
      htmlStr: ``
    };
  },
  props:['url'],
  computed: {
    myStyle() {
      return {
        transform: `scale(${this.scale})`,
        transformOrigin: "0 0"
      };
    }
  },
  created() {
    //this.$store.commit('setPageTitle','个人健康档案')
    this.loadJkda(this.url);
    console.log(this.url);
  },
  watch : {
    url(val) {
      val&&this.loadJkda(val);
    }
  },
  mounted() {
    // this.initDaWrap();
  },
  methods: {
    changeScale() {
      if (this.scale < this.maxScale) {
        this.scale = this.maxScale;
      } else {
        this.scale = this.minScale;
      }
    },
    initDaWrap() {
      setTimeout(() => {
        // let rate = (window.screen.width / this.$refs.domWrap.scrollWidth) ;
        //console.log(window.screen.width)
        //console.log(this.$refs.domWrap.scrollWidth)
        let rate =window.screen.width /this.$refs.domWrap.scrollWidth /(window.screen.width / 375);
        this.$refs.wrap.style.height =this.$refs.domWrap.scrollHeight * rate + "px";
        this.wrapWidth = this.$refs.domWrap.scrollWidth;
        this.$refs.domWrap.style.width = this.wrapWidth + "px";
        this.maxScale = this.$refs.domWrap.scrollWidth / window.screen.width;
        this.minScale = rate;
        this.scale = rate;
        this.$refs.wrap.addEventListener("touchstart", this.touchstart);
        this.$refs.wrap.addEventListener("touchmove", this.touchmove);
      },0);
    },
    /* // 高血压 完成
        // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/gxy/2011_gxysf_p.html?pages=1&daid=818C4491D4942C57C9181E84E3BC6DB1&totals=1`;
        //  老年人中医体质  完成
        //var url =`http://172.16.110.220:8020/his/app/webs/ggws/lnr/2011_lnrzytzbs_p.html?bglyid=24FA098BC7FF536B68D9ACF68FE8CF24&user={"jqxzqh":"510106040","jgid":"70","ryid":"1091","xm":"何波","ksid":"127","ksmc":"中药库","yhm":"hebo","jgmc":"万达信息测试机构"}`;
        // 糖尿病 完成
        // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/tnb/2011_tnbsf_P.html?pages=1&daid=790033279|52012700000000230934|JN&totals=7`;
        // 个人健康档案 完成
        // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/jkda/2011_grjkdaxx_p_test.html?id=818C4491D4942C57C9181E84E3BC6DB1&page=all`;
        // 签约记录 完成
        // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/qyjl/2011_qyjl_p.html?jlid=5DD9B3388E43CADBE05010AC296E5069&user={"jgid":"70","jgmc":"万达测试机构"}`;
        // 学生体检信息 完成
        //  var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/xxtjgl/xstjgl_p.html?tjid=1111`;
        //var url=`http://172.16.110.220:8020/his/app/webs/ggws/jktj/2011_jktj_p.html?daid=790033279|52012700000000230934|JN&id=33a63d945ce741c8a94b3542df5c9c27`;
      //高血压干预 辩证分析报告打印
      //var url=`http://172.16.110.220:8020/his/app/webs/ggws/gxy/bzfxbgdy.html?bglyid=03AA28B4AD91636CEE3871B19AC4625A&user={"jgid": "70","jgmc": "万达信息测试机构","jgxzqh": "510106040"}`;
      //高血压干预 干预记录打印
      //var url=`http://172.16.110.220:8020/his/app/webs/ggws/gxy/zygydy.html?zygydy.html?daid=790033279|52012700000000230934|JN&year=2017&urlParam={"daid": "790033279|52012700000000230934|JN", "year": "2017"}`;
        // 高血压 完成
        // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/gxy/2011_gxysf_p.html?pages=1&daid=818C4491D4942C57C9181E84E3BC6DB1&totals=1`;
      //  老年人中医体质  完成
      //var url =`http://172.16.110.220:8020/his/app/webs/ggws/lnr/2011_lnrzytzbs_p.html?bglyid=24FA098BC7FF536B68D9ACF68FE8CF24&user={"jqxzqh":"510106040","jgid":"70","ryid":"1091","xm":"何波","ksid":"127","ksmc":"中药库","yhm":"hebo","jgmc":"万达信息测试机构"}`;
      // 糖尿病 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/tnb/2011_tnbsf_P.html?pages=1&daid=790033279|52012700000000230934|JN&totals=7`;
      // 个人健康档案 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/jkda/2011_grjkdaxx_p_test.html?id=818C4491D4942C57C9181E84E3BC6DB1&page=all`;
      // 签约记录 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/qyjl/2011_qyjl_p.html?jlid=5DD9B3388E43CADBE05010AC296E5069&user={"jgid":"70","jgmc":"万达测试机构"}`;
      // 学生体检信息 完成
      //  var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/xxtjgl/xstjgl_p.html?tjid=1111`;
      //var url=`http://172.16.110.220:8020/his/app/webs/ggws/jktj/2011_jktj_p.html?daid=790033279|52012700000000230934|JN&id=33a63d945ce741c8a94b3542df5c9c27`;
     //高血压干预 辩证分析报告打印
     //var url=`http://172.16.110.220:8020/his/app/webs/ggws/gxy/bzfxbgdy.html?bglyid=03AA28B4AD91636CEE3871B19AC4625A&user={"jgid": "70","jgmc": "万达信息测试机构","jgxzqh": "510106040"}`; */
    loadJkda(url) {
     //console.log(url)
     url=encodeURI(url);
      this.api.getPrintHtml(url).then(res => {
        this.htmlStr="<style>.printone{display:none}</style>";//给健康体检页面不显示打印按钮
        this.htmlStr += res;
        //console.log(res);
        this.initDaWrap();
      });
    },
    touchstart(e) {
      if (e.touches.length >= 2) {
        this.starttime = new Date();
        let a1 = e.touches[0];
        let a2 = e.touches[1];
        let dX = a1.screenX - a2.screenX;
        let dY = a1.screenY - a2.screenY;
        this.initDis = Math.sqrt(dX * dX + dY * dY);
      }
    },
    touchmove(e) {
      // e.stopPropagation();
      // e.preventDefault();
      if (e.touches.length >= 2) {
        this.endTime = new Date();
        this.cz = this.endTime - this.starttime;
        console.log(this.endTime - this.starttime);
        if (this.cz > 20) {
          this.starttime = new Date();
          let a1 = e.touches[0];
          let a2 = e.touches[1];
          let dX = a1.screenX - a2.screenX;
          let dY = a1.screenY - a2.screenY;
          this.curDis = Math.sqrt(dX * dX + dY * dY);
          let dD = this.curDis - this.initDis;
          let curScale = this.getCurScale(dD);
          if (dD > 0) {
            if (curScale <= this.maxScale) {
              this.scale = curScale;
            } else {
              this.scale = this.maxScale;
            }
          } else {
            if (curScale >= this.minScale) {
              this.scale = curScale;
            } else {
              this.scale = this.minScale;
            }
          }
        }
      }
    },
    getCurScale(dd) {
      return this.scale + dd / this.scaleCoe;
    }
  }
};
</script>
<style  scoped>
  
</style>