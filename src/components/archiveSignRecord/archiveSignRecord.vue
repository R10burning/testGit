<template>
    <div>
        <div class="archiveSignRecord"> 
            <div class="contain" v-for="(item,index) in data">
                <div class="jgjs">
                    <div>
                      <img style="width:22px;height:22px" src="../../../static/img/fdshequ.svg" alt="">
                    </div>
                    <div style="padding-left:0px;color:#333;font-weight:bold;font-size:20px;">
                        &nbsp;&nbsp;{{item.sqmc}}
                    </div>  
                    <div class="sfqy">{{item.qyzt}}</div> 
                </div>
                <div class="detail" style="color:#666;">
                    <p>签约医生:&nbsp;&nbsp;{{item.qytd}}&nbsp;|&nbsp;{{item.qyys}}&nbsp;|&nbsp;{{item.lxdh}}</p>
                    <p>有效日期:&nbsp;&nbsp;{{item.sqsj}}&nbsp;~&nbsp;{{item.yxrq}}</p>
                    <p>签约服务包:</p>
                    <div class="fwb" v-for="(item1,index1) in item.qyfwb">
                        <span>{{item1}}</span>
                        <span>{{item1}}</span>
                    </div>
                    <div class="noPass" v-if="showNoPass">
                        未通过：您申请的社区不在服务范围内，请求该并重新发起签约申请。
                    </div>
                </div>
                 <div class="qysj" style="font-size:13px;color:#999;display:flex;height:50px;line-height:50px" >
                    <div style="flex:1">签约时间:&nbsp;&nbsp;{{item.sqsj}}</div>
                    <div style="width:100px;display:flex;justify-content: center;align-items: center;">
                        <img style="width:18px;height:18px;margin-bottom:0px;" src="../../../static/img/fdxieyi.svg" alt="">
                        <span>签约协议</span>    
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            showNoPass:true,
            data:
                [{
                    sqmc:"银桂桥社区",
                    qyzt:"审核未通过 ",
                    qytd:"银桂桥团队",
                    qyys:"王小艺",
                    lxdh:"13299256332",
                    yxrq:"2018-12-22",
                    qyfwb:['儿童服务包E','重型精神病患者服务包D'],
                    sqsj:"2017-12-22",
                }],
            
        }
    },
    computed:{},
    created(){
        this.$store.commit("setPageTitle", "签约档案记录");
    },
    mounted(){},
    methods:{
        init(){}
    },
    component:{}
}
</script>
<style scoped>
    .archiveSignRecord{
        height:100%;
        background-color: #F0EFED;
        padding-top:0;
        box-sizing: border-box;
        overflow: scroll;
        font-family: "Microsoft YaHei"; 
    }
    .contain{
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        padding:10px 0 0 10px;
        box-shadow:  0 0 1px #e8e7e5, -1px -1px 1px #e8e7e5;
        overflow: hidden;
        margin-bottom:12.5px;
    }
    .jgjs{
        display:flex;
        height:25px;
        line-height:25px;
        font-size:16px;
        margin-bottom:10px;
    }
    .sfqy{
        position: absolute;
        top:15px;
        right:15px;
        font-size: 15px;
        color:#ff9400;
    }
    .contain .detail p {
        font-size: 15px;
        /* height: 30px; */
        /* line-height: 30px; */
        margin-bottom: 4px;
    }
    .contain .detail .fwb {
        display: flex;
        flex-wrap: wrap;
        padding: 5px 0 0 0;
    }
    .contain .detail {
        position: relative;
    }
    .contain .detail:after {
        position: absolute;
        bottom: -7px;
        content: "";
        width: 100%;
        height: 0;
        border-bottom: 1px solid #dcdcdc;
        transform: scaleY(0.5);
        -webkit-transform: scaleY(0.5);
    }
    .fwb span {
        display: inline-block;
        color: #07B77B;
        font-size: 14px;
        width: 150px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #A7E6D0;
        text-align: center;
        border-radius: 4px;
        background: #DCF7EB;
        margin-bottom: 8px;
        overflow: hidden;
    }
    .fwb span:first-child {
        margin-right: 12.5px;
    }
    /* 审核未通过 */
    .noPass{
        width:330px;
        height: 70px;
        background-color:#f0f0f0;
        padding:10px 10px;
        font-size: 15px;
        color:#333333;
        margin:7px  0 0 0;
    }
</style>

