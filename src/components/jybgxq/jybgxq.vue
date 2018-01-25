<template>
  <div>
      <div class="head">
          <p>仅能查询部分检验报告，</p>
          <p>此结果仅供参考，以医院字纸报告为准。</p>
      </div>
      <div class="row">
          <span class="name">姓名：{{tjxx.name||''}}</span>
          <span>性别：{{tjxx.sex||''}}</span>
          <span>年龄：{{tjxx.age||''}}</span>
      </div>
      <div class="row">
          就诊机构：{{tjxx.jzjg||''}}
      </div>
      <div class="row">
          就诊科室：{{tjxx.jzks||''}}
      </div>
      <div class="row">
          病 人 号：{{tjxx.id||''}}
      </div>
      <div class="row" style="border:none">
          标本类型：{{tjxx.bblx||''}}
      </div>
      <table>
          <thead>
              <tr>
                  <th>项目</th>
                  <th>结果</th>
                  <th style="width:55px!important">单位</th>
                  <th>参考值</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="item of tjxq">
                  <td style="max-width:100px;">{{item.xmzwm}}</td>
                  <td>{{item.jyjg}}</td>
                  <td>{{item.dw}}</td>
                  <td>{{item.jgck}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>
<script>
export default {
  data(){
      return{
          tjxx:{
              name:'',
              sex:'',
              age:'',
              jzjg:'',
              jzks:'',
              id:'',
              bblx:''
          },
          tjxq:[],
          id:""
      }
  },
  created() {
    this.$store.commit("setPageTitle", "检验报告详情");
    this.loadTjxx();
    this.loadPhysicalExaminationDetails();
  },
  methods:{
        loadTjxx(){
            //console.log(this.$route.query);
            var tj=this.$route.query.details;
            var id=this.$route.query.id;
            this.tjxx.name=tj.xm;
            this.tjxx.sex=tj.xb;
            this.tjxx.age=tj.nl;
            this.tjxx.jzjg=tj.mc;
            this.tjxx.jzks=tj.sqksmc;
            this.tjxx.id=tj.mzh;
            this.tjxx.bblx=tj.bblx;
            this.id=id;
            //console.log(this.id);
        },
        loadPhysicalExaminationDetails(){
            this.api.getInspectionReportXqByHzid(this.id).then(
                res=>{
                    //console.log(res);
                    this.tjxq=res.data;
                }
            );
        }
  }
}
</script>
<style>
    .head{
        background-color: #FEEBC6;
        color:#DE9E68;
        width: 100%;
        font-size: 12px;
        font-weight: bold;
        padding: 10px;
        line-height: 18px;
        box-sizing: border-box;
    }
    .row span{margin-right: 15px;display: inline-block;overflow: hidden;}
    .row{
        color:#666666;
        font-size: 12px;
        padding: 8px 0;
        width:350px;
        margin: 0 auto;
        position: relative;
    }
    .row:after,td:after{
        height: auto;
        content: "";
        width: 100%;
        border-top: 1px solid #f0f0f0;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
    }
    .name{
        max-width: 170px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    table{
        border-spacing: 0;
        width: 100%;
    }
    th,td{
        color:#666666;
        font-size: 12px;
        text-align: left;
        padding:5px;
        position: relative;
    }
    th{
        background-color: #e6e6e6;
    }
</style>
