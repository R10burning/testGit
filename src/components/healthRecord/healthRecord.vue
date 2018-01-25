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
  computed: {
    myStyle() {
      return {
        transform: `scale(${this.scale})`,
        transformOrigin: "0 0"
      };
    }
  },
  created() {
    this.$store.commit('setPageTitle','个人健康档案')
    let query = this.$route.query;
    this.daid = query.daid;
    this.loadJkda();
  },
  mounted() {},
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
        let rate =
          window.screen.width /
          this.$refs.domWrap.scrollWidth /
          (window.screen.width / 375);
        this.$refs.wrap.style.height =
          this.$refs.domWrap.scrollHeight * rate + "px";
        this.wrapWidth = this.$refs.domWrap.scrollWidth;
        this.$refs.domWrap.style.width = this.wrapWidth + "px";
        this.maxScale = this.$refs.domWrap.scrollWidth / window.screen.width;
        this.minScale = rate;
        this.scale = rate;
        this.$refs.wrap.addEventListener("touchstart", this.touchstart);
        this.$refs.wrap.addEventListener("touchmove", this.touchmove);
      });
    },
    loadJkda() {
      // 高血压 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/gxy/2011_gxysf_p.html?pages=1&daid=818C4491D4942C57C9181E84E3BC6DB1&totals=1`;
    //  老年人中医体质  未完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/lnr/2011_lnrzytzbs_p.html?bglyid=24FA098BC7FF536B68D9ACF68FE8CF24&user={"jqxzqh":"510106040","jgid":"70","ryid":"1091","xm":"何波","ksid":"127","ksmc":"中药库","yhm":"hebo","jgmc":"万达信息测试机构"}`;
      // 糖尿病 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/tnb/2011_tnbsf_P.html?pages=1&daid=790033279|52012700000000230934|JN&totals=7`;
      // 个人健康档案 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/jkda/2011_grjkdaxx_p_test.html?id=818C4491D4942C57C9181E84E3BC6DB1&page=all`;
      // 签约记录 完成
      // var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/qyjl/2011_qyjl_p.html?jlid=5DD9B3388E43CADBE05010AC296E5069&user={"jgid":"70","jgmc":"万达测试机构"}`;
      // 学生体检信息 完成
      //  var url =`http://172.16.110.237:8020/jshtml/his/app/webs/ggws/xxtjgl/xstjgl_p.html?tjid=1111`;
    
      // var url=`${this.axios.defaults.printUrl}/ggws/jktj/2011_jktj_p.html?daid=790033279|52012700000000230934|JN&id=33a63d945ce741c8a94b3542df5c9c27`;
    //  aa642ce90fc5496281fb03635af52f8d
    //  var url =`${this.axios.defaults.printUrl}/ggws/jkda/2011_grjkdaxx_p.html?id=${this.daid}&page=2`;
     var url =`https://www.baidu.com`;
     url=encodeURI(url);
      this.api.getPrintHtml(url).then(res => {
        this.htmlStr = res;
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
  .wrap{
    width:375px;
    overflow: hidden;
  }
</style>