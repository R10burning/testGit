<template>
    <div>
        <div class="banner">
            <img src="../../../static/img/banner.jpg" alt=""  @click="toIntroduce()">
            <!-- 轮播图部分 -->
            <!-- <mt-swipe >
                <mt-swipe-item :style="autoFix" v-for="item in adList" :key="item.id">
                    <div style="height:100%;display: flex;align-items:center;">
                        <img :style="autoFix" class="img" :src="completeHeadImgSrc(item.zst)" @click="goArticle(item)">
                    </div>
                </mt-swipe-item>
            </mt-swipe> -->
        </div>
        <div style="width:100%;display: flex;flex-wrap:wrap;">
            <div v-for="item in baseArr" style="height:80px;width:25%;box-sizing: border-box;" @click="action(item)">
                <div style="margin: auto;width:40px;height:40px;background: red;border-radius: 50%;margin-top:10px;margin-bottom: 6px;text-align: center;" :style="{background: item.bgColor}">
                    <icon style="color:#fff;margin-top:10px;" :name="item.icon" :scale="2.4"></icon>
                </div>
                <div style="text-align: center;">
                    {{(item.path=='/index/boundManage'&&handleUser&&handleUser.hzxm)?handleUser.hzxm:item.name}}
                </div>
            </div>
        </div>
        <div style="width:100%;height:50px;border-top:10px solid #f1f0f6;border-bottom:10px solid #f1f0f6" @click="action(bindItem)">
            <div style="display:flex;justify-content:center" @click="">
                <div style="height:50px;text-align:center">
                  <div v-if="!handleUser.hzxm">
                      <icon style="color:#66CCFF;" name="boundAdd" :scale="5"></icon>
                  </div>
                  <div v-else  style="line-height:50px;height:50px;text-align:center;color:#66CCFF">
                      当前就诊人:
                  </div>
                </div>
                <div style="color:#66CCFF;height:50px;line-height:50px;margin-left:25px">
									{{(handleUser&&handleUser.hzxm)?handleUser.hzxm:bindItem.name}}
								</div>              
            </div>
        </div>
        <div style="width:100%;display: flex;flex-wrap:wrap;">
            <div v-for="item in detailArr" style="height:80px;width:25%;box-sizing: border-box;" @click="action(item)">
                <div style="margin: auto;width:40px;height:40px;background: red;border-radius: 50%;margin-top:10px;margin-bottom: 6px;text-align: center;" :style="{background: item.bgColor}">
                    <icon style="color:#fff;margin-top:10px;" :name="item.icon" :scale="2.4"></icon>
                </div>
                <div style="text-align: center;">
                    {{(item.path=='/index/boundManage'&&handleUser&&handleUser.hzxm)?handleUser.hzxm:item.name}}
                </div>
            </div>
        </div>
				<div class="mesBlock">
					<div class="mesTitle">卫计新闻</div>
          <div class="more" @click="toDtlm">
            <span style="vertical-align:top">更多</span> 
           <icon style="color:#fff;margin-top:8px;margin-right:8px;" name="Arrow-right" :scale="2.4"></icon>
          </div>
					<ul>
						<li v-for="item in wjNewsArr" @click="goArticle(item)">
							<p>{{item.wzbt}}</p>
							<div class="icon">
								<icon style="color:#fff;margin-top:10px;" name="Arrow-right" :scale="2.4"></icon>
							</div>
						</li>
					</ul>
				</div>
    </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      adList: [],
      wjNewsArr: [],
      bindItem: {
        name: "绑定就诊人",
        path: "/index/boundManage",
        boundNecessary: true,
        icon: "cardBound",
        bgColor: "#7e91dd",
        query: {}
      },
      baseArr: [
        {
          name: "就诊导航",
          icon: "introArticle",
          bgColor: "#8cd466",
          target: "jgjs",
          query: {}
        },
        {
          name: "特色专科",
          path: "/index/departmentList",
          icon: "departmentList",
          bgColor: "#22c2be",
          target: "ksjs",
          query: {}
        },
        {
          name: "专家介绍",
          path: "/index/doctorDepartmentList",
          icon: "doctorDepartmentList",
          bgColor: "#fa7ca2",
          target: "ysjs",
          query: {}
        },
        {
          name: "动态资讯",
          path: "/index/newsList",
          icon: "newsList",
          bgColor: "#378afa",
          query: {}
        }
      ],
      detailArr: [
        {
          name: "就诊查询",
          path: "/index/visitingRecord",
          icon: "search",
          boundNecessary: true,
          bgColor: "#35d587",
          query: {}
        },
        {
          name: "检验报告",
          path: "/index/jybgList",
          icon: "visitingRecord",
          //boundNecessary: true,
          bgColor: "#35d587",
           // flag: true,
          query: {}
        },
        {
          name: "检查报告",
          path: "/index/jcbgList",
          icon: "jc",
          // boundNecessary: true,
          bgColor: "#35d587",
          flag: true,
          query: {}
        },
        {
          name: "健康档案",
          path: "/index/jkdaList",
          icon: "jkda",
          boundNecessary: true,
          bgColor: "#35d587",
          query: { to: "/index/archivesCenter" }
        },
        {
          name: "在线挂号",
          path: "/index/jgList",
          icon: "appointment",
          // boundNecessary: true,
          bgColor: "#5aace4",
          target: "gh"
        },
        {
          name: "在线缴费",
          path: "/index/jgList",
          // boundNecessary: true,
          icon: "payment",
          bgColor: "#f35c5d",
          target: "jf"
        },
        {
          name: "家医签约",
          path: "/index/jkdaList",
          boundNecessary: false,
          icon: "qy",
          bgColor: "#f35c5d",
          flag:false,
          query: { 
            to: "/index/addSignInfo" 
          }
        }
      ]
    };
  },
  methods: {
    init() {
      this.loadJgjs();
      this.$store.commit("setBackBtn", false);
    },
    toIntroduce() {
      this.$router.push({
        path: "/index/introArticle",
        query: {
          xgid: this.axios.defaults.jgid,
          lx: 1
        }
      });
      //  this.$router.push({
      //   path: "/index/articlePage",
      //   query: {
      //     id: '35'
      //   }
      // });
    },
    toDtlm() {
      this.$router.push({
        path: "/index/newsList"
      });
    },
    goArticle(item) {
      this.$router.push({
        path: "/index/articlePage",
        query: {
          id: item.id
        }
      });
    },
    loadJgjs() {
      let params = {
        xgjgid: this.axios.defaults.jgid
      };
      this.api.getJgjs(params).then(
        res => {
          this.adList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    loadNewsList() {
      let params = {
        wzlx: "03",
        xgjgid: this.axios.defaults.jgid,
        length: "5"
      };
      this.api.getArticleList(params).then(
        res => {
          this.wjNewsArr = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    action(item) {
      if (item.flag) {
        this.$messagebox("功能暂未开放");
        return;
      }
      if (item.boundNecessary) {
        if (!this.$store.getters.getTelephoneNum) {
          this.$messagebox
            .confirm("", {
              message: "首次使用需绑定手机号。",
              title: "提示",
              confirmButtonText: "去绑定",
              cancelButtonText: "留在本页"
            })
            .then(() => {
              this.$router.push({
                name: "telephoneBound",
                query: item.query
              });
            });
          return;
        }
        if (
          this.handleUser &&
          !this.handleUser.hzxm &&
          item.path != "/index/boundManage"
        ) {
          this.$messagebox
            .confirm("", {
              message: "没有就诊人员绑定。",
              title: "提示",
              confirmButtonText: "去绑定",
              cancelButtonText: "留在本页"
            })
            .then(() => {
              this.$router.push({
                name: "cardBound"
              });
            });
          return;
        }
        this.$router.push({
          path: item.path,
          query: item.query
        });
      } else {
        if (item.target) {
          this.$router.push({
            name: "jgList",
            query: { target: item.target }
          });
        } else {
          this.$router.push({
            path: item.path,
            query: item.query
          });
        }
      }
    }
  },
  mounted() {
    // this.autoFix = {
    //     height: window.screen.width *  0.618 + 'px',
    //     maxHeight:'200px'
    // }
    this.init();
  },
  created() {
    this.$store.commit("setPageTitle");
    this.loadNewsList();
  },
  components: {},
  computed: {
    handleUser() {
      // console.log(this.$store.getters.getHandleUser)
      return this.$store.getters.getHandleUser;
    }
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  height: 120px;
}
img {
  width: 100%;
  height: 120px;
}
.mesBlock {
  margin-top: 10px;
  position: relative;
}
.mesBlock .more {
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  line-height: 40px;
}
.mesBlock li {
  display: flex;
  flex-flow: row;
  height: 45px;
  line-height: 45px;
  position: relative;
}
.mesBlock li:after {
  height: 1px;
  content: "";
  width: 100%;
  border-top: 1px solid #f0f0f0;
  position: absolute;
  bottom: -1px;
  right: 0;
  transform: scaleY(1.5);
  -webkit-transform: scaleY(1.5);
}
.mesBlock li p {
  padding-left: 25px;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.mesBlock li .icon {
  width: 40px;
  text-align: center;
}
.mesTitle {
  font-size: 16px;
  font-weight: bold;
  padding-left: 25px;
  background: #f1f0f6;
  height: 40px;
  line-height: 40px;
  padding-left: 25px;
}
.mesTitle:before {
  content: "";
  width: 0;
  height: 10px;
  border: 4px solid #1a7d65;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
