<!-- by wzk -->
<template>
  <div>
    <div class="img-wrap">
      <img :src="src" alt="">
    </div>
    <p>{{tips}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "static/img/code.png",
      tips: "长按图片,扫描二维码关注微信公众号!"
    };
  },
  created() {
    this.$store.commit('setPageTitle','扫码关注')
    let imgurl = this.$route.query;
    console.log(imgurl)
    if (imgurl) {
      // this.src = imgurl;
      this.src = this.axios.defaults.imgUrl + '/rest/downLoadFileById?fileId=' + imgurl;
                        this.type = 3
    }
  },
  mounted() {},
  computed: {},
  methods: {},
  components: {}
};
</script>
<style  scoped>
.img-wrap {
  height: 200px;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 25px;
}
.img-wrap img {
  width: 200px;
  height: 200px;
}
p {
  font-size: 28px;
  text-align: center;
  padding: 10px 20px;
  line-height: 45px;
  color:red;
}
</style>