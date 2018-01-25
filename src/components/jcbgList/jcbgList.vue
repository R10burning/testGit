
<template>
  <div class="record-details">
    <div class="headers">
      <span style="margin-left:15px"> 本月</span>   
      <!-- 下箭头 -->
      <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>  
    </div>
    <!-- 只显示前面三个 item index   index <length -->
    <div class="myTab" v-for="(item,index) in details" v-if="index<length">
      <div class="first">
        <span class="date">{{item.date}}</span>
        <span class="jg" >{{item.jgmc}}</span>
        <span @click="toDetails(index)">详情</span>
      </div>
      <div class="details">{{item.xm}}</div>
    </div>
    <div class="ago" @click="toDisplayMore">
      <span style="margin-left:15px">更早</span>   
      <!-- 下箭头 -->
      <b class="bottom"><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b> 
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // 只显示前三个
        length:3,
        details:
        [
          {
            name:"theflash0",
            jgmc:"五块石社区卫生服务中心",
            date:"2017-12-29",
            xm:"彩超检查报告单",
            jybgid:"1"
          }
        ]
    }
  },
  methods:{
    // 跳转去详情页面 传递下标
    toDetails(index){
      console.log(index);
      console.log(this.details[index]);
      this.$router.push({
        path:'/index/jcbgxq',
        query:this.details  
      })
    },
    /* 显示更多 */
    toDisplayMore(){
      this.length=this.details.length;
    }
  },
  mounted(){
  },
  created(){
        this.$store.commit("setPageTitle", "个人检查记录");
  },
  components:{},
  computed:{},

}
</script>
<style scoped>
 
  .record-details{background-color: #f6f6f6; 
  color:#989898;position: relative;
  width:100%;box-sizing: border-box;
  overflow-x: hidden;
  }
  /*下箭头*/
  .bottom{
      width:20px;
      height:20px;
      position:absolute;
      right:5px;
      top:16.5px;
      z-index: 2;/*兼容ie8-*/
      border:1px solid transparent;
  }
  .bottom-arrow1,.bottom-arrow2{
      width:0;
      height:0;
      display:block;
      position:absolute;
      left:0;
      top:0;
      z-index: 5;/*兼容ie8-*/
      border-bottom:7px transparent dashed;
      border-left:7px transparent dashed;
      border-right:7px transparent dashed;
      border-top:7px white solid;
      overflow:hidden;
  }
  .bottom-arrow1{
      top:2px;/*重要*/
      border-top:7px #b6b6b6 solid;
  }
  .bottom-arrow2{border-top:7px #F6F6F6 solid;}
  /* 头部样式 */
  .headers,.ago{height:40px;background-color:#F6F6F6;line-height: 40px;color:#B6B6B6;width:100%;}
  /* 内容样式 */
  .myTab{width:100%;height:50px;line-height:25px;background-color: #fff;padding:0 0 0 4%;}
  .myTab>div{display: inline-block;width:100%;font-size:13px;}
  .myTab>div>span{display: inline-block;}
  .myTab>div>span:nth-child(2){margin-left:20%;color:#aaa;}
  .myTab>div>span:last-child{color:#8BB6C9;float:right;margin-right:6%;cursor: pointer}
  .details{width:100%;border-bottom: 1px solid #efefef}
  /* 更早样式 让箭头能够定位准确*/
  .ago{position: relative;}
</style>

