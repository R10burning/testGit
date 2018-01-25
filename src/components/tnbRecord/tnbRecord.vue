<template>
    <div class="zyHealth">
        <div class="header" ref="header">
            <div @click="changeLx(item,index)" class="header-item" v-for="(item,index) in headerList">
                {{item.name}}
            </div>
        </div>
        <div class="mid">
            <div class="lastPage" @click="toLastPage(newList)">&lt;上一页</div>
            <div>
                <div class="nowPage">
                    <span>{{pages}}</span><span>/</span><span>{{totals}}</span>    
                </div>
            </div>
            <div class="nextPage" @click="toNextPage(newList)">下一页&gt;</div>  
        </div>
        <!-- <div ref="wrap" class="container" @dblclick="changeScale" >
            <div ref="domWrap" :style="zyStyle" v-html="zyHtmlStr">
            </div>
        </div> -->
        <div  class="container" >
           <zyPresentation v-if="!!url" :url='url'></zyPresentation> 
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
            headerList:[{name:"糖尿病信息",url:"tnb/2011_tnbsf_p.html"}],
            index:0,//标注激活的下标
            newList:[],//把查询出来的 sfid sfrq 保存在这里面
            urlList:[],//需要传进去的 日期 id 参数
            lastArr:[],
            txt:'',
            show: false,
            pages:1,
            totals:0,
            daid:"",
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
        this.query = this.$route.query;//拿到archivesCenter页面传参进来的 对象
        //console.log(query);
        //this.user={"jgmc":"万达信息测试机构","jgxzqh":"510106040"}
  },
  mounted(){
        this.initPage(this.index);
  },
  methods:{
        initPage(index){
            this.querySfid(index);
        },
        //查询出daid对应的数据参数 时间  sfid sfrq
        querySfid(index){
            var params={"daid":this.query.daid};
            this.daid=params.daid;
            //糖尿病
            if(index==0){
                this.newList=[];
                this.pages=1;
                this.api.getDiabetesSfjlByDaid(params).then(
                    res=>{
                       if(res.code==1&&res.data.length>0){
                            this.newList=res.data;
                            //console.log(this.newList);
                            this.urlList=res.data.slice(0,4);
                            this.lastArr=[];
                            for(let i=0;i<this.urlList.length;i++){
                                this.lastArr.push({"sfid":this.urlList[i].id,"sfrq":this.urlList[i].sfrq});
                                //必须这样push 不然得到的只能是最后一组的数据
                            }
                            this.totals=Math.ceil(this.newList.length/4);
                            this.url=this.baseurl+this.headerList[this.index].url+`?pages=`+this.pages+`&dysflist=`+this.lastArr+`&daid=`+this.daid+`&totals=`+this.totals;
                        } 
                    }
                );
            } 
        },
        toLastPage(obj){
            if(this.pages<=1){
                MessageBox.alert('当前已是首页');
            }else{
                this.pages--;
                this.urlList=obj.slice(4*(this.pages-1),4*this.pages);
                this.lastArr=[];
                for(let i=0;i<this.urlList.length;i++){
                    this.lastArr.push({"sfid":this.urlList[i].id,"sfrq":this.urlList[i].sfrq});
                    //必须这样push 不然得到的只能是最后一组的数据
                }
                this.url=this.baseurl+this.headerList[this.index].url+`?pages=`+this.pages+`&dysflist=`+this.lastArr+`&daid=`+this.daid+`&totals=`+this.totals;
            }
        },
        toNextPage(obj){
            if(this.pages>=this.totals){
               MessageBox.alert('当前已是尾页');
            }else{
                this.pages++;
                this.urlList=obj.slice(4*(this.pages-1),4*this.pages);
                this.lastArr=[];
                for(let i=0;i<this.urlList.length;i++){
                    this.lastArr.push({"sfid":this.urlList[i].id,"sfrq":this.urlList[i].sfrq});
                    //必须这样push 不然得到的只能是最后一组的数据
                }
                //console.log(this.lastArr);
                this.url=this.baseurl+this.headerList[this.index].url+`?pages=`+this.pages+`&dysflist=`+this.lastArr+`&daid=`+this.daid+`&totals=`+this.totals;
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
    padding-left:25%;text-align: center;height: 30px;line-height: 30px;
    margin: 5px 0px;color:#fff;font-size: 20px;font-weight: 500;
    cursor: pointer;
}
/* 激活选项卡的样式 */
.active{position: relative;color:#fff;}
/* 保证每个item 下面border长度 */
.active:after{
    height:4px;content:"";width:54%;border-top:4px solid#3DE359;
    position:absolute;bottom:-12px;left:25%;
    transform:scaleY(0.5);-webkit-transform:scaleY(0.5);
}
div.zyHealth>.mid{
    height: 45px;
    background-color: #fff;
    position: fixed; 
    z-index:101;
    width:100%;
    top:44px;
    font-size: 14px;
    color:#333333;
    padding-left:4%; 
}
div.zyHealth>.mid:after{
    height: 1px;content: "";
    width: 100%;border-top: 1px solid #e6e6e6;
    position: absolute;bottom: -1px;right: 0;
    z-index:101;
    transform: scaleY(0.5);-webkit-transform: scaleY(0.5);
}
div.zyHealth>.mid>div{
    width:30%;
    height: 100%;
    display:inline-block;
    line-height: 45px;
    text-align: center;
}
div.zyHealth>.mid>div.lastPage{text-align: left;}
div.zyHealth>.mid>div.nextPage{text-align: right;}
div.zyHealth>.mid div.nowPage{
    height:26px;
    width:75px;
    position: relative;
    top:9.5px;
    left:19px;
    line-height: 45px;
    background-color: #f1f2f6;
    border: 1px solid transparent;
    border-radius: 4px;
}
div.zyHealth>.mid div.nowPage>span{
    position: relative;
    bottom:8px;
    font-size: 15px;
    color: #00B678;
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
/* 没有数据 */
.container>.noContent{
    width:350px;
    height:400px;
    text-align: center;
}
</style>


