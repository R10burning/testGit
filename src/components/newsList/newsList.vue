<template>
    <div>
        <div class="header" ref='header'>
            <div @click="changeWzfl(item, index)"  class="header-item" :class="{active:headerCkList[index]}" v-for="(item, index) in headerList">
                {{item.mc}}
            </div>
        </div>
        <!-- 新闻列表 -->
        <div ref="contain" class="container"> 
            <mt-loadmore :autoFill=false :bottom-all-loaded="allLoaded" :bottom-method="loadTottom" ref="loadmore" >
            <div class="flex Newsletter" v-for="item,index in newsList" @click="goArticle(item)">
                <!-- 判断是否有图片 有则显示 -->
                <div class="package" v-if="item.zst">
                    <img  :src="completeHeadImgSrc(item.zst)">
                </div>
                <!-- 判断是否有图片 没有则才会有背景色  不然会在原图上加背景框颜色 -->
                <!-- 获取图片所在位置 index(下标)  -->
                <div class="package" v-if="!item.zst" :style="'background-color:'+color[index%3][0]">
                    <icon  v-if="!item.zst" name="news_deauflt" :style="'color:'+color[index%3][1]+';border-radius:5px;'+'width:40px;position:relative;left:25px;'"></icon>  
                </div>
                <div class="Newsdetail">
                    <div class="twoRow">
                        {{item.wzbt}}
                    </div>
                    <div class="newsDate" style="">
                        {{item.qyrq.split(' ')[0]}}
                    </div>
                </div>
            </div>
            <p v-if="showTip" style="color:#ccc;text-align:center;height:35px;line-height:35px">{{tips}}</p>
        </mt-loadmore>
        </div>
        
    </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      allLoaded: false,
      headerList: [],
      headerCkList: [1, 0, 0, 0],
      newsList: [],
      pagesize: 6,
      pageNumber: 1,
      tips: "没有更多文章了",
      showTip: false,
      color:[['#d1f5de',"#a5ebbc"],["#fdedcb","#f7d7a9"],["#f9dada","#f7bfbf"]]
    };
  },
  methods: {
    loadNewMenu(id) {
      let param = {
        sjid: id ? id : "0",
        fljgid: this.axios.defaults.jgid
      };
      this.api
        .getNewListFl(param)
        .then(res => {
          if (res.data.length) {
            this.headerList = [{ sjid: "0", mc: "最新" }];
            this.headerList.push(...res.data);
            this.loadNewsList();
          }
        })
        .catch(err => {
          this.$toast(err);
        });
    },
    renderCrumbs(item) {
      let str = this.getSjmc(item);
      this.CrumbsText = str;
    },
    getSjmc(item) {
      if (item.sjid == 0)  {
        return item.mc;
      } else {
        let data = this.headerList.filter((v, i) => {
          return v.id === item.sjid;
        })
        console.log(data);
        return this.getSjmc(data[0]) + ` / ${item.mc}`
      }
    },
    loadTottom() {
      this.$refs.loadmore.onBottomLoaded();
      this.loadNewsList();
    },
    changeWzfl(item, index) {
      this.showTip = false;
      this.allLoaded = false;
      this.pageNumber = 1;
      this.newsList = [];
      this.headerCkList = [];
      this.$set(this.headerCkList, index, 1);
      this.loadNewsList();
    },
    goArticle(item) {
      this.$router.push({
        path: "/index/articlePage",
        query: {
          id: item.wzid
        }
      });
    },
    loadNewsList() {
      let index = this.headerCkList.indexOf(1);
      let id = this.headerList[index].id;
      let params = {
        flid: id == 0 ? "" : id,
        xgjgid: this.axios.defaults.jgid,
        rn_s: this.pagesize * (this.pageNumber - 1) + 1 + "",
        rn_e: this.pagesize * this.pageNumber + ""
      };
      this.api.getArticleListByPagination(params).then(
        res => {
          if (res.code == 1) {
            if (res.data.length) {
              if (res.data.lnegth < this.pagesize) {
                this.allLoaded = true;
              }
              this.newsList.push(...res.data);
              this.pageNumber++;
            } else {
              this.allLoaded = true;
              this.showTip = true;
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    /* 随机选择颜色 */
    setColor(){
      let color=this.color;
      let iNum=parseInt(Math.random()*(color.length));
      let colorArr=[];
      colorArr.push(color[iNum]);
      console.log(colorArr[0][0],colorArr[0][1]);
      return colorArr;
      //console.log(this.$el);
      /* this.$refs.noImg.style.fill=colorArr[0][0];
      this.$refs.noImg.style.backgroundColor=colorArr[0][1]; */
    }
  },
  created() {
    this.$store.commit('setPageTitle', '新闻中心');
    this.loadNewMenu("");
    /* 一来就调用setColor方法 */
    // 如果多个图片 没有则会只显示一种颜色
    //this.color=this.setColor();
    //console.log(this.color);
  },
  mounted() {
    setTimeout(() => {
      let contain = this.$refs.contain;
      contain.style.height =
        contain.parentNode.offsetHeight - this.$refs.header.offsetHeight + "px";
    }, 20);
  },
  components: {},
  computed: {}
};
</script>
<style scoped>
/* body */
*{font-family:'MicrosoftYaHei';}
/* 头部样式 */
.header {overflow-x:auto;overflow-y:hidden;z-index: 2;height: 44px;white-space: nowrap;
              position: relative;color:#666666;}
/* 伪类样式 加下面横线 */
.header:after {height: 1px;content: "";width: 100%;border-top: 1px solid #e6e6e6;position: absolute;bottom: -1px;
                right: 0;transform: scaleY(0.5);-webkit-transform: scaleY(0.5);}
/* 头部选项卡-标题 */
.header-item {display: inline-block;width: 80px;padding: 1%;text-align: center;height: 30px;line-height: 30px;
              margin: 5px 0px;color:#666666;font-size: 15px;}
/* 激活选项卡的样式 */
.active{position: relative;color:#333333;}
/* 保证每个item 下面border长度 */
.active:after{height:2px;content:"";width:40px;border-top:4px solid #00b678;position:absolute;bottom:-4px;left:25%;
              transform:scaleY(0.5);-webkit-transform:scaleY(0.5);}
/* 新闻列表容器 */
.container{height:300px;overflow-y: scroll;}
/* 包裹每个新闻简讯的样式 */
.Newsletter{width:auto;font-size: 12px;position: relative;margin:15px;} 
.flex{position:relative;height:100px;}
/* 每个新闻简讯的伪类 */
.flex:after{height:1px;content:"";width:100%;border-top:2px solid #e6e6e6;position:absolute;bottom:-1px;right:0;transform:scaleY(0.5);-webkit-transform:scaleY(0.5);}
/* 包裹 图片/新闻详情 的样式 */
/* 圆角 */
.package{width:90px;height:70px;border:1px solid transparent;border-radius:5px;overflow:hidden;}
/* 图片 */
.package>img,svg{width:100%;height:100%;}
/* 新闻详情 */
.Newsdetail{flex:1;margin-left: 10px; height:100px;}
.Newsdetail>.twoRow{font-size:16px;line-height: 24px;height:48px;color:#333333;}
/* 字体时间 */
.Newsdetail>.newsDate{color:#999999;font-size: 12px;margin-top:15px;float:right;}
</style>
