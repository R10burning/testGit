<template>
    <div class="zyHealth">
        <div class="header" ref="header">
            <div class="header-item">
                体检信息
            </div>
        </div>
        <div class="mid">
           <div class="lastPage" @click="toLastPage(data)">&lt;上一次</div>
            <div class="jkDate" v-if="data">
                <input type="text" v-model="value" readonly @click="click(value,pages)" class="zyDate"><b class="bottom" ><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
            </div> 
            <div class="nextPage" @click="toNextPage(data)">下一次&gt;</div>     
            <choose :data="data" v-show='show' v-on:getValue='getValue' :txt='txt' :value='nowDate'  style="height:530px;line-height:30px;font-size:15px;position:relative;z-index:101;top:-30px;"></choose>
        </div>
        <div  class="container" >
           <zyPresentation v-if="!!url" :url='url'></zyPresentation>
           <zyPresentation v-if="!data">暂无数据</zyPresentation>   
        </div> 
    </div>
</template>
<script>
import { throttle } from "@/util/util.js";
//导入组件
import choose from '../choose/choose';
import zyPresentation from '../zyPresentation/zyPresentation';
import { MessageBox } from 'mint-ui';
export default {
  data(){
      return {
            baseurl:  this.axios.defaults.printUrl+'/ggws/',
            //baseurl: 'http://172.16.110.220:8020/his/app/webs/ggws/',
            url:'',
            midList:[{name:'体检打印预览',url:'jktj/2011_jktj_p.html'}],
            data:[],
            urlList:[],//需要传进去的 日期 id 参数
            lastArr:[], 
            index:0,//默认显示第一个时间的体检信息      
            value: '',
            txt:'',
            show: false,
            user:'',//{"jqxzqh":"510106040","jgid":"70","jgmc":"万达信息测试机构"},
            params:'',
            totals:'',//总页数 
            pages:1,//当前第几页  
            nowDate:'',//当前日期
            query:{}
        }
  },
  components:{
    choose,zyPresentation
  },
  computed:{
    
  },
  created(){
        let hzid=this.$store.getters.getHandleUser.hzid;
        this.$store.commit('setPageTitle','健康档案中心');
        this.checkUserInfo();
        this.query = this.$route.query;//拿到archivesCenter页面传参进来的 对象
        //console.log(query);
        //this.user={"jgmc":"万达信息测试机构","jgxzqh":"510106040"}
  },
  mounted(){
        this.user=this.user;
        this.txt='tjrq';//解决一进入不现实下拉框
        this.checkUserInfoDate();
        //this.url=this.baseurl+this.midList[0].url+"?daid=790033279|52012700000000230934|JN&id="+this.data[0].id;
  },
  methods:{
      //通过患者ID查询出user信息
        checkUserInfo(){
            let user='';
            let id={'hzid':this.query.daid};
            this.api.getUserInfoByHzid(id).then(
                res=>{
                    if(res.code==1&&res.data.length>0){
                        //console.log(res.data); 
                        this.user=res.data[0]; 
                    }
                    //console.log(this.user);
                }
            );
        },
        //通过档案id查询出年检记录  时间ID
        checkUserInfoDate(){
            let id={'daid':this.query.daid};
            this.api.getUserYearlyInspectionByDaid(id).then(
                res=>{
                    if(res.code==1&&res.data.length>0){ 
                        for(let i=0;i<res.data.length;i++){
                            this.data.push(res.data[i]); 
                        }
                        this.value=this.data[0].tjrq;//默认显示第一个时间的内容
                        this.url=this.baseurl+this.midList[0].url+"?daid="+this.query.daid+"&id="+this.data[0].id;
                    }
                }
            );
        },
        /* 切换时间改变页面 */
        getValue (data,index) {
            this.value=data.tjrq;
            this.url=this.baseurl+this.midList[0].url+"?daid="+this.query.daid+"&id="+data.id;
            this.show = false;
            this.pages=index;//下标赋值pages
        },
        click (value,index) {
            this.show=true;
            //console.log(value,index);
            //console.log(e);
        },
        toLastPage(obj){ 
            this.totals=obj.length;
            if(this.pages<=1){
                MessageBox.alert('已经到头了');
            }else{
                this.pages--;
                this.value=this.data[this.pages-1].tjrq;
                this.url=this.baseurl+this.midList[0].url+"?daid="+this.query.daid+"&id="+this.data[this.pages].id;
                this.show = false;
                this.nowDate=this.data[this.pages-1].tjrq;
                //console.log(this.nowDate);
            }
        },
        toNextPage(obj){ 
            this.totals=obj.length;
            if(this.pages>=this.totals){
                MessageBox.alert('已经到尾了');
            }else{
                this.pages++;
                //console.log(this.data,this.pages);
                this.value=this.data[this.pages-1].tjrq;
                this.url=this.baseurl+this.midList[0].url+"?daid="+this.query.daid+"&id="+this.data[this.pages-1].id;
                this.show = false;
                this.nowDate=this.data[this.pages-1].tjrq;
               // console.log(this.nowDate);
            }
        },
    }
}
</script>
<style scoped>
/* body */
*{font-family:'MicrosoftYaHei';}
div.zyHealth{background-color: #f0efed;}
/* 头部样式 */
.header {  
    overflow-x:auto;overflow-y:hidden;
    z-index: 2;height: 44px;white-space: nowrap;
    position: fixed;
    z-index:101;
    width:100%;color:#fff;
    background-color: #00B679
}
/* 伪类样式 加下面横线 */
.header:after {
    height: 1px;content: "";
    width: 100%;border-bottom: 1px solid #e6e6e6;
    position: absolute;bottom: -3px;right: 0;
    transform: scaleY(0.5);-webkit-transform: scaleY(0.5);
}
/* 头部选项卡-标题 */
.header-item {
    display: inline-block;width: 50%;
    padding-left:25%;
    text-align: center;height: 30px;line-height: 30px;
    margin: 5px 0px;color:#84D9A9;font-size: 20px;font-weight: 500;
    cursor: pointer;
    color:#fff;
}
div.zyHealth>.mid{
    height: 40px;
    background-color: #fff;
    position: fixed; 
    z-index:101;
    width:100%;
    top:44px;
    font-size: 12px;
}
div.zyHealth>.mid:after{
    height: 1px;content: "";
    width: 100%;border-top: 1px solid #e6e6e6;
    position: absolute;bottom: -1px;right: 0;
    z-index:101;
    transform: scaleY(0.5);-webkit-transform: scaleY(0.5);
}
div.zyHealth>.mid>div{
    margin-top:7.5px;
    width:35%;
    height: 20px;
    font-size: 15px;
    line-height: 20px;
    display:inline-block;
    text-align: center;
}
div.zyHealth>.container{
    position: relative;
    top:80px;
    z-index:100;
    width:375px;
    height:auto;
    overflow: hidden;
    border-radius: 4px;
    box-shadow:  5px 5px 10px rgba(153,153,153,0.1);
    background-color: #ffffff;
    margin: 15px auto 15px;
  }
/*下箭头*/
.bottom{
    width:20px;
    height:20px;
    position:absolute;
    right:5px;
    top:15px;
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
    border-bottom:4px transparent dashed;
    border-left:4px transparent dashed;
    border-right:4px transparent dashed;
    border-top:4px transparent solid;
    overflow:hidden;
}
.bottom-arrow1{
    top:2px;/*重要*/
    border-top:4px #000 solid;
}
.bottom-arrow2{border-top:4px #fff solid;}
/* 没有数据 */
.container>.noContent{
    width:350px;
    height:400px;
    text-align: center;
}
div.zyHealth>.mid>div.lastPage{
    position: relative;
    top:-35px;
    left:-25px;
}
div.zyHealth>.mid>div.nextPage{
    position: absolute;
    top:0;
    right:-20px;
}
div.zyHealth>.mid div.jkDate{
   position: relative;
   width:30%;
}
div.zyHealth>.mid div.jkDate>input{
   position: relative;
   width:100%;
   border:none;
   height: 30px;
   font-size: 15px;
   top:-5px;
}
div.zyHealth>.mid div.jkDate>b{
   display: inline-block;
   position: relative;
   top:-25px;
   right:-50px;
}
</style>


