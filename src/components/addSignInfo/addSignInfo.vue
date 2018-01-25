<template>
  <div class="addSignInfo">
    <ul>
      <li v-for="item of list" :class="item.class">
        <formItem :item="item" :data='data' :txt='txt' :event="event"></formItem>
      </li>
    </ul>
    <button :class="!disabled&&'clicked'" class="submit" @click="submit">提交申请</button>
    <choose :data="listdata" v-if="show" v-on:getValue='getValue' :value='data[index]' :txt='listIndex'></choose>
    <mt-datetime-picker ref="picker" @confirm="getDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"></mt-datetime-picker>    
  </div>
</template>
<script>
import { DatetimePicker,MessageBox } from 'mint-ui';
import choose from '../choose/choose';
import formItem from '../formItem/formItem'
export default {
  data(){
    return {
      qyjgxx:[],
      qyxyxx:[],
      qytdxx:[],
      qyysxx:[],
      qyfwbxx:[],
      list:[
        {title:'身份证号',id:'sfzh',tip:'请填写有效身份证号',readonly:true},
        {title:'<span>姓</span>名',id:'xm',tip:'请填写姓名',class:'font',event:this.event,readonly:true},
        {title:'<span>性</span>别',id:'xb',type:'radio',class:'font',val:[{txt:'男',val:'男'},{txt:'女',val:'女'}],readonly:true},
        {title:'联系电话',id:'brdh',tip:'请填写联系电话'},
        {title:'建档机构',id:'gljgmc',tip:'请填写机构名称',readonly:true,class:'spacing'},
        {title:'签约日期',id:'qyrq',tip:'请选择签约日期',type:'date',readonly:true,class:'border'},
        {title:'签约机构',id:'qyjg',tip:'请选择签约机构',type:'choose',readonly:true},
        {title:'签约团队',id:'qytdmc',tip:'请选择签约团队',type:'choose',readonly:true},
        {title:'签约医生',id:'qyysxm',tip:'请选择签约医生',type:'choose',readonly:true},
        {title:'签约协议',id:'qyxy',tip:'请选择签约协议',type:'choose',readonly:true},
        {title:'服务日期',id:'fwrq',type:'multiseriate',readonly:true,space:'~',val:[{type:'date',tip:'请选择开始日期'},{type:'text',tip:'请选择结束日期',space:false}]},
        {title:'签约服务包',id:'qyfwb',type:'multi',class:'qyfwb',readonly:true,space:'',val:[]},
      ],
      data:{sfzh:'',xm:'',xb:'',brdh:'',gljgmc:'',qyrq:'',qyjg:'',qytdmc:'',qyysxm:'',qyxy:'',fwrq:'',qyfwb:[]},
      index:'xm',
      listdata:[],
      show:false,
      listIndex:'',
      txt:'',
      disabled:'true'
    }
  },
  watch:{
    data: {
      deep: true,
      handler (val) {
        for(let index of this.list){
          console.log(index.id,!val[index.id])
          if(!val[index.id]){
            this.disabled=true
            return
          }
        }
        this.disabled=false
        !this.data.qyfwb.length&&(this.disabled=true)
        console.log(this.disabled);
      }
    }
  },
  created(){
    let data=this.$route.query
    this.data.sfzh=data.sfzh
    this.data.xm=data.xm
    this.data.xb=data.xb
    this.data.brdh=data.lxdh
    this.data.xzzmph=data.xzzmph
    this.data.xzzdm=data.dm
    this.data.gljgid=data.gljgid||''
    this.data.gljgmc="未建档"
    this.getDate(new Date(),'qyrq')
    data.gljgid&&this.api.getjgDetail({id:data.gljgid}).then((data)=>{
        data=this.qyjgxx=this.teledataProcessing(data,"未查询到机构数据，检查是否存在机构数据")
        if(data){
          this.data.gljgmc=data[0].mc||"未建档"
        }
      })
  },
  beforeMount() {
    this.getQyjgxx()
  },
  methods:{
    getValue (data,index,item) {
      item=item||this.index
      this.show=false
      if(item==='qyjg'){
        this.data.qyjgid=data.id
        this.data.qyjg=data.mc
        this.getQytdxx()
        this.getQyxyxx()
        this.getqyfwbxx()
      }else if(item==='qytdmc'){
        this.data.qytdmc=data.mc
        this.data.qytdid=data.id
        this.getQyysxx()
      }else if(item==='qyxy'){
        this.data.qyxy=data.mc
        this.data.qyxyid=data.id
        this.data.qyyxq=data.yxq
        this.setFwrq()
      }else if(item==='qyysxm'){
        this.data.qyysxm=data.xm
        this.data.qyysid=data.ysid
      }else if(item==='qyfwb'){
        let a=this.data.qyfwb.indexOf(data.mc)
        if(a===-1){
          this.$set(this.data.qyfwb,this.data.qyfwb.length,data.mc)
        }else {
          this.data.qyfwb.splice(a,1)
          this.$set(this.data,'qyfwb',this.data.qyfwb)
        }
      }
    },
    getDate(val,index){
      index=index||this.index
      if(index==='qyrq'){
        this.data[index]=val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate()
        this.data.fwrq=this.data.qyrq+'~'

      }else if(index==='fwrq'){
        this.data.fwrq=val.getFullYear()+'/'+(val.getMonth()+1)+'/'+val.getDate()
        this.setFwrq()
      }
    },
    getQyjgxx(params){
      this.api.getjgInfo(params||{}).then((data)=>{
        data=this.qyjgxx=this.teledataProcessing(data,"未查询到机构数据，检查是否存在机构数据")
        if(data){
          this.getValue(data[0],'','qyjg')
        }
      })
    },
    getqyfwbxx(params){
      this.api.getjgfwbInfo(params||{gljgid:this.data.qyjgid,zt:'1'}).then((data)=>{
        data=this.qyjgxx=this.teledataProcessing(data,"未查询到机构服务包数据，检查是否存在机构服务包数据")
        if(data){
          this.qyfwbxx=data
          this.txt='mc'
          this.list[11].val=this.qyfwbxx
        }
      })
    },
    getQyxyxx(params){
      this.api.getjgxyInfo(params||{gljgid:this.data.qyjgid,zt:'1',lx:'1'}).then((data)=>{
        data=this.qyxyxx=this.teledataProcessing(data,"当前机构未查询到协议数据，检查当前机构是否存在协议数据")
        if(data){
          this.getValue(data[0],'','qyxy')
        }
      })
    },
    getQytdxx(params){
      this.api.getjgtdInfo(params||{jgid:this.data.qyjgid}).then((data)=>{
        data=this.qytdxx=this.teledataProcessing(data,"当前机构未查询到团队数据，检查当前机构是否存在机构团队数据")
        if(data){
          this.getValue(data[0],'','qytdmc')
        }
      })
    },
    getQyysxx(params){
      this.api.getjgtdryInfo(params||{jgid:this.data.qyjgid,tdid:this.data.qytdid}).then((data)=>{
        data=this.qyysxx=this.teledataProcessing(data,"当前机构未查询到团队数据，检查当前机构是否存在机构团队数据")
        if(data){
          this.getValue(data[0],'','qyysxm')
        }
      })
    },
    setFwrq(){
      if(this.data.fwrq){
        let dateTime=this.data.fwrq.split('~')[0]
        let date=new Date(dateTime)
        date.setFullYear(Number(date.getFullYear())+Number(this.data.qyyxq))
        this.data.fwrq =dateTime + "~" + date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
      }
    },
    teledataProcessing(data,msg){
      if(data.code==='1'){
        if(data.data.length){
          return data.data
        }else{
          MessageBox.alert(msg)
        }
      }else{
        MessageBox.alert(data.msg||"相关信息获取失败")
      }
    },
    event(data,dataItem){
      let index=this.index=data.id||this.index
      this.listdata=[]
      if(index==='qyjg'){
        this.listdata=this.qyjgxx||[]
        this.listIndex='mc'
      }else if(index==='qytdmc'){
        this.listdata=this.qytdxx||[]
        this.listIndex='mc'
      }else if(index==='qyxy'){
        this.listdata=this.qyxyxx||[]
        this.listIndex='mc'
      }else if(index==='qyysxm'){
        this.listdata=this.qyysxx||[]
        this.listIndex='xm'
      }else if(data.type==='date'){
        this.$refs.picker.currentValue=new Date(this.data[index].split('~')[0])
        this.$refs.picker.open()
      }else if(index==='fwrq' && data.type==='multiseriate'){
        this.event(dataItem)
      }else if(data.type==='multi'){
        this.getValue(dataItem)
      }
      if(this.listdata.length>1){
        this.show=true
      }
    },
    submit(){
      let msg=''
      if(this.disabled){
        for(let index of this.list){
          if(!this.data[this.index.id]){
            msg=this.index.title+"不能为空"
            break
          }
        }
        MessageBox.alert(msg)
        return
      }
      let data=this.data
      data.sqsjhm=this.$store.getters.getTelephoneNum
      data.sqopenid=this.$store.getters.getOpenid
      data.sqyhid=this.$store.getters.getAppUserId
      this.api.setqyjl(data).then((data)=>{
        console.log(data)
      })
    }
  },
  components:{ DatetimePicker,choose,formItem},
  computed:{
  }
}
</script>
<style>
  .addSignInfo{
    width: 375px;
    font-size: 14px;
    line-height: 40px;
  }
  .addSignInfo ul{
    background-color: #eeeeee;
    margin-bottom: 56px;
  }
  .addSignInfo ul li{
    list-style: none;
    border-bottom: 1px solid #e6e6e6;
    background-color:white;
  }
  .addSignInfo .select{
    position: absolute;
    background-color:white;
  }
  .addSignInfo .font label span{
    letter-spacing:36px;
  }
  .multiseriateItem{
    width:50%;
  }
  .addSignInfo .qyfwb.formItem{
    display: block;
  }
  .addSignInfo .qyfwb.formItem .input{
    width: 100%;
  }
  .addSignInfo .qyfwb .multi{
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    flex-wrap: wrap;
  }
  .addSignInfo .qyfwb .multi .multiItem{
    width: 45%;
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    margin-bottom: 5px;
    line-height: 30px;
  }
  .addSignInfo .qyfwb .multi .multiItem.selected{
    background-color: #8adfc2;
    color:#00b678;
  }
  .submit{
    line-height: 38px;
    height: 40px;
    width: 96%;
    border-radius: 5px;
    background-color: #fafafa;
    color:#00b678;
    position: fixed;
    bottom: 66px;
    margin: 0 auto;
    left:7px;
    font-size: 18px;
  }
  .submit.clicked{
    background: #8adfc2;
  }
  li.spacing{
    margin-bottom: 12px;
  }
  li.border{
    border-top: 1px solid #e6e6e6;
  }
</style>
