<template>
	<div style="background: #EeEeEe">
			<!-- <mt-search
      v-model="searchText"
      cancel-text="取消"
      :show="true"
      placeholder="医生搜索">
			<slot> -->
		<div style="text-align: center;line-height: 40px;border-bottom: 1px solid #E6E6E6;color:#008040;">{{bmmc}}</div>
		<div v-for="item in doctorList" style="height:100px;background: #fff;width:100%;border-bottom: 1px solid #E6E6E6;display: flex;">
			<div style="width:80px;text-align: center;margin:auto;">
				<img :src="completeHeadImgSrc(item.zst)" style="height:80px;width:55px;border-radius: 10px;background:#ccc;">
			</div>
			<div style="flex:1;">
				<div style="height:65px;display: flex;">
					<div style="flex:1;">
						<div style="line-height: 30px;font-size: 16px;margin-top:10px;">{{item.xm}}</div>
						<div class="infoText singleRow">擅长：{{item.scly}}</div>
					</div>
					<div style="width:70px;">
						<div @click="goDoctorDetail(item);" style="background:#008040;width:60px;height:30px;text-align: center;color:#fff;border-radius: 15px;line-height: 30px;font-size: 14px;margin-top:10px;">详情</div>
					</div>
				</div>
				<div class="infoText singleRow">简介：{{item.text}}</div>
			</div>
		</div>
			<!-- </slot>
			</mt-search> -->
	</div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      doctorList: [],
      bmmc: "普通部门",
      doctorListLen: 0,
      counter: 0,
      tempList: [],
      searchText: ""
    };
  },
  methods: {
    init() {
      this.loadDoctorList();
      this.bmmc = this.$route.query.bmmc;
    },
    goDoctorDetail(item) {
      this.$router.push({
        name: "doctorDetail",
        query: {
          nr: item.nr,
          zst: item.zst
        }
      });
    },
    loadDoctorList() {
      let params = {
        bmid: this.$route.query.bmid
      };
      this.api.getDoctorList(params).then(res => {
       	if (res.code == 1) {
            this.tempList = res.data;
            // this.doctorList = this.tempList;
            
						this.doctorListLen = res.data.length
						for (var i = 0; i < res.data.length; i++) {
							this.getIntro(res.data[i], i);
						}
						
					} else {

					}

      });
    },
    getIntro(item, i) {
      let url =
        this.axios.defaults.htmlUrl +
        "/" +
        item.cjsj.split(" ")[0] +
        "/" +
        item.id +
        ".html";
      this.api
        .getHtml(url, {})
        .then(res => {
          item.nr = res;
          item.nr = this.completeImgSrc(item.nr, this.axios.defaults.imgUrl);
          item.text = getTextFromHtmlStr(item.nr, 40);
          this.counter++;
          if (this.counter == this.doctorListLen) {
            this.doctorList = this.tempList;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.init();
  },
  created() {
    this.$store.commit("setPageTitle", "医生选择");
  },
  components: {},
  computed: {}
};
function getTextFromHtmlStr(htmlStr, len) {
  var objE = document.createElement("div");
  objE.innerHTML = htmlStr;
  var tempStr = objE.innerText.trim();
  if (tempStr.length >= len) {
    tempStr = tempStr.substr(0, len);
  } else {
    tempStr = tempStr.substr(0, tempStr.length);
  }
  var objE = null;
  return tempStr;
}
</script>
<style scoped>
.infoText {
  line-height: 25px;
  font-size: 12px;
  color: #999999;
}
</style>
