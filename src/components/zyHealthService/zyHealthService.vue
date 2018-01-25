<template>
    <div class="zyHealth">
        <div class="header" ref="header">
            <div @click="changeLx(item,index)" class="header-item" :class="{active:headerCkList[index]}" v-for="(item,index) in headerList">
                {{item}}
            </div>
        </div>
        <div class="mid">
            <div class="zyService">中医药服务</div>
            <div class="zyCheck">
                <span><icon name='choose_nocircle' style="width:25px;height:25px;color:#00b678;background:transparent;position:reletive;top:-2px;left:-4px;"></icon>
                </span>
                {{midList[index].name}}
            </div>
            <input type="text" v-model="value" readonly @click="click($event)" class="zyDate"><b class="bottom" ><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>  
            <choose :data="data" v-show='show' v-on:getValue='getValue' :txt='txt' style="height:530px;line-height:30px;font-size:15px;position:relative;z-index:101;"></choose>
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
export default {
  data(){
      return {
            baseurl: this.axios.defaults.printUrl+'/ggws/',
            url:'',
            headerList:['中医辨识','高血压干预','糖尿病干预'],
            midList:[{name:'体质辨识报告',url:'lnr/2011_lnrzytzbs_p.html'},{name:'高血压辩证分型',url:'gxy/bzfxbgdy.html'},{name:'糖尿病辩证分型',url:'tnb/bzfxbgdy.html'}],
            headerCkList:[1,0,0],
            index:0,//标注激活的下标
            data:
                [
                   
                ],   
            value: '',
            txt:'',
            show: false,
            user:{},//{"jqxzqh":"510106040","jgid":"70","jgmc":"万达信息测试机构"},
            dateNum:'', 
            params:'',
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
        this.$store.commit('setPageTitle','中医健康服务');
        this.checkUserInfo();
        this.query = this.$route.query;//拿到archivesCenter页面传参进来的 对象
        //console.log(query);
        //this.user={"jgmc":"万达信息测试机构","jgxzqh":"510106040"}
  },
  mounted(){
        this.txt='tbrq';//解决一进入不现实下拉框
        this.checkID(this.index);
  },
  methods:{
        //通过患者ID查询出user信息
        checkUserInfo(){
            let user='';
            let id={'hzid':'aa642ce90fc5496281fb03635af52f8d'};
            this.api.getUserInfoByHzid(id).then(
                res=>{
                    if(res.code==1&&res.data.length>0){
                        //console.log(res.data); 
                        this.user=res.data[0]; 
                    }
                }
            );
        },
        //查询出daid对应的数据参数 时间  id
        checkID(index){
            var params={"daid":this.query,daid};
            //高血压的
            if(index==1){
                this.data=[];
                this.api.getHypertensionByDaid(params).then(
                    res=>{
                        if(res.code==1){
                            if(res.data.length>0){ 
                                //时间对应的 ID
                                //console.log(res.data);
                                for(let i=0;i<res.data.length;i++){
                                    this.data.push(res.data[i]); 
                                }
                                this.value=this.data[0].sfrq;//默认显示中高血压第一个时间的内容
                                this.url=this.baseurl+this.midList[this.index].url+"?bglyid="+this.data[0].id+"&user="+JSON.stringify( this.user)
                            }
                        }
                    }
                );
            }
            //糖尿病
            if(index==2){
                this.data=[];
                this.api.getDiabetesByDaid(params).then(
                    res=>{
                        if(res.code==1){
                            if(res.data.length>0){ 
                                //时间对应的 ID
                                for(let i=0;i<res.data.length;i++){
                                    this.data.push(res.data[i]);
                                }
                                this.value=this.data[0].sfrq;//默认显示中糖尿病第一个时间的内容
                                this.url=this.baseurl+this.midList[this.index].url+"?bglyid="+this.data[0].id+"&user="+JSON.stringify( this.user)
                            }
                        }
                    }  
                );
            }
            //中医
            if(index==0){
                this.data=[];
                this.api.getChineseMedicineByDaid(params).then(
                    res=>{
                        if(res.code==1){
                            if(res.data.length>0){ 
                                //时间对应的 ID
                                for(let i=0;i<res.data.length;i++){
                                    this.data.push(res.data[i]);
                                }
                                this.value=this.data[0].tbrq;//默认显示中医选项卡的内容
                                this.url=this.baseurl+this.midList[this.index].url+"?bglyid="+this.data[0].id+"&user="+JSON.stringify( this.user)
                            }
                        }
                    }  
                );  
            }
            return this.data;
        },
        changeLx(item,index){
            this.headerCkList = [];
            this.$set(this.headerCkList, index, 1);
            this.index=index;
            //重新归0显示第一个日期的数据
            //this.value=this.data[0].sfrq?this.data[0].sfrq:this.data[0].tbrq;
            if(this.data){
                if(this.index==0){
                    this.txt='tbrq';
                    this.checkID(this.index); 
                }
                if(this.index==1){
                    this.txt='sfrq';
                    this.checkID(this.index);
                }
                if(this.index==2){
                    this.txt='sfrq';
                    this.checkID(this.index);
                }
            }   
        },
        /* 切换时间 */
        changeDate(item){
            this.url= this.baseurl+this.midList[this.index].url+"?bglyid="+this.data[index].id+"&user="+JSON.stringify(this.user)
        },
        /* 切换时间改变页面 */
        getValue (data) {
            this.value=data.tbrq||data.sfrq;
            this.url=this.baseurl+this.midList[this.index].url+"?bglyid="+data.id+"&user="+JSON.stringify(this.user);
            this.show = false
        },
        click (e) {
            this.show=true;
            
            //console.log(e);
        }
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
    display: inline-block;width: 30%;
    padding-left:3%;text-align: center;height: 30px;line-height: 30px;
    margin: 5px 0px;color:#84D9A9;font-size: 17px;font-weight: 500;
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
    width:30%;
    height: 20px;
    line-height: 20px;
    display:inline-block;
}
div.zyHealth>.mid>div.zyService{
    margin-left:5%;
    width:25%;
    text-align: center;
    background-color: #f0efed;
    border:1px solid transparent;
    border-radius: 4px;
}
div.zyHealth>.mid>div.zyCheck{
    margin-left:1%;
    min-width:25%;
    color:#00B678;
    background-color: #fff;
    border:1px solid #00B678;
    border-radius: 4px;
    text-align: center;
}
div.zyHealth>.mid>div.zyCheck>span{ 
    overflow:hidden;
    display: inline-block;
    position: relative;
    top:0px;
    left:0;  
    width:15px;
    height:15px;
    margin:auto 1%;
   
}
div.zyHealth>.mid>.zyDate{
    width:28%;
    height:80%;
    margin-left:3%;
    text-align: center;
    border:0px;
    border-left:1px solid #ddd;
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
</style>


