<template>
    <div style="background: #E6E6E6;">
        <div  style="width:100%;background:#FFFFFF;display: flex;min-height:100px;">
            <div style="width:120px;justify-content:center;align-items:center;display:flex;">
                <img v-if="info.ystx" :src="info.ystx" style="background: red;border-radius: 50%;width:80px;height:80px;">
                <div v-if="!info.ystx" style="background: #B3B3B3;border-radius: 50%;width:80px;height:80px;">
                    <icon style="color:#4C4C4C;margin:3px;" name="doctor" :scale="8.1"></icon>
                </div>
            </div>
            <div style="flex:1;">
                <div style="margin-top:20px;">{{info.ksmc}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.ysxm}}</div>
                <div style="color:#7F7F7F;margin-top:10px;font-size: 13px;">
                    擅长：{{info.yssc}}
                </div>
            </div>
        </div>
        <div style="width:100%;background:#FFFFFF;margin-top:10px;padding-left:10px;padding-top:10px;">
            <div style="display: flex;height:30px;line-height: 30px;">
                <div style="width:30px;">
                    <icon style="color:#FF8000;margin-top:5px;margin-right:10px;" name="medical" :scale="2.2"></icon>
                </div>
                <div>
                    坐诊安排
                </div>
            </div>
            <div v-for="day in info.days" v-if="day.workTime!='-'" style="display:flex;border-top: 1px solid #CCCCCC;height:60px;display:flex;align-items:center;text-align: center;font-size: 14px;">
                <div class="" style="width:80px;">
                    <div>{{day.shortDay}}</div>
                    <div>{{day.day}}</div>
                </div>
                <div class="flex2" style="width:150px;color:#7F7F7F;">
                    {{info.xmmc}}<span style="color:#FF0000">¥{{info.ghfy}}</span>
                </div>
                <div class="flex1" style="width:150px;color:#7F7F7F;">
                    {{day.workTime}}
                </div>
                <div class="flex1" style="color:#7F7F7F;">
                    余<span style="color:#FF0000">{{day.yhs}}</span>
                </div>
                <div style="width:100px;" class="btn" @click="appointment(day);">
                    <div style="height:25px;background: #008040;color:#fff;width:60px;text-align: center;margin-left:20px;margin-top:13px;border-radius: 3px;font-size: 14px;line-height: 25px;">预约</div>
                </div>
            </div>
        </div>
        <div v-if="doctor&&nr" style="min-height:180px;width:100%;background:#FFFFFF;margin-top:10px;padding-left:10px;padding-top:10px;">
            <div style="display: flex;height:30px;line-height: 30px;">
                <div style="width:30px;">
                    <icon style="color:#008040;margin-top:3px;margin-right:10px;margin-left:-3px;" name="intro" :scale="2.7"></icon>
                </div>
                <div>
                    医生简介
                </div>
            </div>
            <div style="display:flex;border-top: 1px solid #CCCCCC;height:50px;">
                <div class="html ql-editor acticleBox" style="height: auto;margin-top: 10px;">
                    <div v-html="doctor&&nr">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            dateArray: [],
            info: {},
            doctor:{},
            nr:'',
        }
    },
    methods: {
        init() {
            
            this.dateArray = this.initData(7);
            this.info = this.$route.params;
            if (!this.info.days) {
                // this.$toast('暂无线上排班安排，请到窗口咨询。')
                this.$router.back()
            }
            console.log(this.$route.params);
            if(this.info.ysid){
                this.loadDoctorInfo();
            }
        },
        loadDoctorInfo(){
            let params = {
                id:this.info.ysid
            }
            this.api.getInfoArticlePath(params)
            .then(res=>{
                if(res.code==1){
                    this.doctor = res.data[0];
                    if(this.doctor&&this.doctor.cjsj){
                        this.getIntro(this.doctor);
                    }
                }else{
                    this.$toast("获取医生简介失败！");
                }
            })
        },
        getIntro(item) {
            
            let url = this.axios.defaults.htmlUrl + '/' + this.doctor.cjsj.split(' ')[0] + '/' + this.doctor.id + '.html';
            this.axios.get(url, {}).then((res) => {　　
                console.log(res);
                // data.nr = Base64.decode(data.nr)
                this.doctor.nr = res.data;
                // this.$set(doctor,'nr',res.data.nr)
                this.nr = this.doctor.nr;
                this.doctor.nr = this.completeImgSrc(this.doctor.nr, this.axios.defaults.imgUrl);
            }).catch(function(error) {　　
                console.log(error);
            });
        },
        appointment(day) {
            console.log('jgid=' + this.info.jgid);
            
            this.$router.push({
                name: 'registerConfirm',
                query: {
                    ksmc: this.info.ksmc,
                    ysxm: this.info.ysxm,
                    xmmc: this.info.xmmc,
                    shortDay: day.shortDay,
                    day: day.day,
                    ghfy: this.info.ghfy,
                    id: this.info.id,
                    jgid: this.info.jgid,
                    workTime:day.workTime,
                    yhs:day.yhs,
                },
            })
        },
        initData(totalDays) {
            let dayArr = ['天', '一', '二', '三', '四', '五', '六']
            let letterArr = ['zr', 'zy', 'ze', 'zs', 'zsi', 'zw', 'zl']
            let arr = [];
            let days = totalDays;
            let today = new Date().getTime();
            for (var i = 0; i < days; i++) {
                let tDay = today + i * 24 * 60 * 60 * 1000;
                let thatDay = new Date(tDay);
                var year = thatDay.getFullYear();
                let m = thatDay.getMonth() + 1;
                if (m < 10) {
                    m = "0" + m;
                }
                let d = thatDay.getDate();
                if (d < 10) {
                    d = "0" + d;
                }
                let day = thatDay.getDay();
                let dateObj = {
                    letter: letterArr[day],
                    date: m + '/' + d,
                    date1: year + '-' + m + '-' + d,
                    day: '星期' + dayArr[day],
                    time: year + "-" + m + "-" + d + " " + "09:00:00",
                    shortDay: year + "-" + m + "-" + d,
                }
                arr.push(dateObj);
            }
            return arr;
        },
    },
    mounted() {
        this.init();
    },
    components: {

    },
    computed: {

    }
}

</script>
<style scoped>


</style>
