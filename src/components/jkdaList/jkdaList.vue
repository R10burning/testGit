<template>
  <div v-if="listInfo.length" class="jkdaList">
    <div class="total">当前就诊人共有{{listInfo.length}}份健康档案</div>
    <div class="listInfo"  v-for="item of listInfo" :key="item.id" @click="skip(item)">
      <div class="presonInfo">
        <div :class="'icon'+' ' +(item.xb=='男'&&'man')">
          <icon :name="item.xb=='男'?'man':'woman'" style="height:40px;width:40px;margin-top:2px"></icon>
        </div>
        <div class="info">
          <p>
            <b>{{item.xm}}</b>
            <span>{{item.xb}}</span>
            <span>{{item.age}}岁</span>
            <span v-if="item.gxyzt==1" class="block" style="background:#f57f6b">高</span>
            <span v-if="item.tnbzt==1" class="block" style="background:#fdb24a">糖</span>
            <span v-if="item.dbrqzt==1" class="block" style="background:#00c369">低</span>
            <span v-if="item.lnrzt==1" class="block " style="background:#42c2ef">老</span>
            <span v-if="item.gwrqzt==1" class="block " style="background:#f44f29">危</span>
            <span v-if="item.cjrqzt==1" class="block " style="background:#6ca3f5">残</span>
          </p>
          <p>
            <span class="icon">
              <icon name='shenfenzheng' style="height:14px;width:auto;position:relative;top:-2px"></icon>
            </span>{{item.sfzh}}
          </p>
          <p>
            <span class="icon">
              <icon name='dianhua' style="height:14px;width:auto;position:relative;top:-2px"></icon>
            </span>{{item.brdh}}
          </p>
        </div>
        <div class="state">{{item.qyzt}}</div>
      </div>
      <div class="jgInfo">
        <h2>{{item.mc}}</h2>
        <p>责任医生：{{item.zrtdmc}}{{(item.zrtdmc&&(item.ysxm||item.lxdh))&&"|"}}{{item.ysxm}}{{item.ysxm&&item.lxdh&&"|"}}{{item.lxdh}}</p>
        <p>档案编号：{{item.dm}}</p>
        <p>现 住 址：{{item.mc||''+""+(item.xzzmph||'')}}</p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { MessageBox } from 'mint-ui';
export default {
  data(){
    return {
      listInfo:[],
      to:null
    }
  },
  mounted(){
      this.$store.commit("setPageTitle", "档案列表");
      this.to = this.$route.query.to
      this.hzid&&this.getInfo()
  },
  watch: {
      listInfo (val,oldval){
      },
      hzid(val){
        this.getInfo()
      }
  },
  methods:{
    skip(obj,to){
      let path=to||this.to

      console.log(path,"123123123",to,this.to)  
      this.$router.push({path: path, query: obj});
    },
    getInfo(){
      this.api.getjkdaList({hzid:this.hzid}).then((data)=>{
        if(data.data.length===1){
          this.$store.commit("backPage",-2)
          this.skip(data.data[0],this.$route.query.to)
        }
        else if(data.data.length){
          this.listInfo=data.data
        } else{
          MessageBox.alert('该成员暂无档案信息').then(action => {
            this.$router.back();
          })
        }
      });
    }
  },
  computed:{
    hzid(){
      return this.$store.getters.getHandleUser.hzid
    }
  }
}
</script>
<style scoped>
  div.jkdaList{
    background-color: #f0efed;
  }
  div.jkdaList>div{
    width: 100%;
  }
  div.jkdaList>.total{
    text-align: center;
    background-color: #fff5e4;
    color: #ff9933;
    font-size: 12px;
    line-height: 35px;
  }
  div.jkdaList>.listInfo{
    width:350px;
    border-radius: 4px;
    box-shadow:  5px 5px 10px rgba(153,153,153,0.1);
    background-color: #ffffff;
    margin: 15px auto 0;
  }
  div.jkdaList>.listInfo>div{
    width:320px;
    padding: 15px 0;
    margin: 0 auto;
  }
  div.jkdaList>.listInfo>.presonInfo{
    border-bottom: 1px solid #e6e6e6;
  }
  div.jkdaList>.listInfo>.presonInfo>div{
    display: inline-block;
  }
  div.jkdaList>.listInfo>.presonInfo>.icon{
    height: 40px;
    width:40px;
    border-radius: 20px ;
    overflow: hidden;
    margin-right: 5px;
    background-color: #F7BAB5;
  }
  div.jkdaList>.listInfo>.presonInfo>.icon.man{background-color:#B1E0BD; }
  div.jkdaList>.listInfo>.presonInfo p{
    font-size:12px ;
    color: #666666;
    line-height: 12px;
    padding-top:5px; 
  }
  div.jkdaList>.listInfo>.presonInfo>.info>p>*{
    margin-right: 5px;
    height: 9px;
    display: inline-block;
    overflow: hidden;
  }
  div.jkdaList>.listInfo>.presonInfo>.info>p:first-child{
    line-height: 14px;
    padding-top:0;
  }
  div.jkdaList>.listInfo>.presonInfo>.info>p:first-child>*{
    margin-right: 7px;
    height:auto;
  }
  div.jkdaList>.listInfo>.presonInfo>.info>p b{
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #000000;
  }
  div.jkdaList .block{
    line-height: 14px;
    font-size: 12px;
    color: #ffffff;
    background-color: #6ca3f5;
    text-align: center;
    border-radius: 3px;
    width:14px;
    display: inline-block;
  }
  div.jkdaList .block.danger{background-color: #f57f6d;}
  div.jkdaList>.listInfo>.presonInfo>.state{
    float: right;
    font-size: 15px;
    color: #ff9400;
  }
  div.jkdaList>.listInfo>.jgInfo>h2{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  div.jkdaList>.listInfo>.jgInfo p{
    font-size: 14px;
    color: #666666;
    padding-top:9px;
    line-height: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
