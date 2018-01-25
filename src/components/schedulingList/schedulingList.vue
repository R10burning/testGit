<template>
    <div style="background: #E6E6E6;">
        <div style="width:100%;overflow-x: auto;height:70px;background:#fff;">
            <div style="width:350px;margin-left: 10px;margin-right:10px;">
                <div v-for="item in dateArray" class="dayitem" @click="chooseDate(item)">
                    <div style="width:50px;height:50px;border-radius: 50%;" :class="item==currentDay?'chooseDay':''">
                        <div style="margin-top:10px;text-align: center;padding-top:8px;">{{item.date}}</div>
                        <div style="text-align: center;">
                            {{item.day}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top:10px;">
            <div v-for="item in schedulingList" style="width:100%;background: #fff;margin-bottom: 5px;display:flex;" v-if="item[currentDay.letter]!='-'" @click="goSchedulingDetail(item);">
                <div style="width:80px;">
                    <img v-if="item.ystx" :src="item.ystx" style="background: red;height:50px;border-radius: 50%;width:50px;margin:10px;">
                    <div v-if="!item.ystx" style="background: #B3B3B3;height:50px;border-radius: 50%;width:50px;margin:10px;">
                        <icon style="color:#4C4C4C;margin:2px;" name="doctor" :scale="5"></icon>
                    </div>
                </div>
                <div style="flex:1;margin-top:10px;">
                    <div>
                        {{item.ysxm}}&nbsp;<span style="font-size: 12px;color:#FF8000;border:1px solid #ff8000;border-radius: 4px;">{{item.xmmc}}</span>
                    </div>
                    <div v-if="item.ysid" style="color:#7F7F7F;margin-top:10px;font-size: 13px;" class="twoRow">
                        擅长：{{item.yssc}}
                    </div>
                    <div v-for="(day,index) in item.days" style="border-top:1px solid #CCCCCC;line-height: 30px;height:30px;position: relative;color:#4C4C4C;font-size: 14px;" v-if="day.workTime!='-'&&index<3">
                        <icon style="color:#008000;" name="date" :scale="1.8"></icon>&nbsp;
                        <span style="width:45px;display:inline-block;">{{day.date}}</span>
                        <span style="width:40px;display:inline-block;">{{day.day}}</span>
                        <span style="width:40px;display:inline-block;">{{day.workTime}}</span>
                        <span style="width:70px;display:inline-block;">余号{{day.yhs}}</span>
                        <icon style="position: absolute;right:10px;top:7px;color:#B3B3B3;" name="enter" :scale="1.8"></icon>
                    </div>
                    <div style="border-top:1px solid #CCCCCC;line-height: 30px;height:30px;">
                        <span style="color:#4C4C4C;font-size: 1px;">查看全部排班</span>
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
            schedulingList: [],
            dateArray: [],
            currentDay: {},
        }
    },
    methods: {
        init() {
            this.dateArray = this.initData(7);
            this.loadDepartmentList();
        },
        loadHasRegisterNum(schedulingList) {
            let dateArr = ['2017-11-22'];
            for (var i = 0; i < this.dateArray.length; i++) {
                dateArr.push(this.dateArray[i].shortDay);
            }
            let dateStr = dateArr.join('|');
            console.log(dateStr);
            let params = {
                jgid: this.api.getSys().jgid,
                ksid: this.$route.query.ksid,
                rq: dateStr
            }
            this.api.getHasRegisterNum(params)
                .then(res => {
                    console.log(res);
                    let data = res.data;

                    for (var i = 0; i < data.length; i++) {
                        this.rebuild(schedulingList, data[i]);
                    }
                    this.schedulingList = schedulingList;

                })
        },
        rebuild(schedulingList, ygsObj) {
            for (var i = 0; i < schedulingList.length; i++) {
                let dateList = [];
                for (var j = 0; j < this.dateArray.length; j++) {
                    let tempObj = {
                        date: this.dateArray[j].date1,
                        day: this.dateArray[j].day,
                        workTime: schedulingList[i][this.dateArray[j].letter],
                        xhs: schedulingList[i][this.dateArray[j].letter + 'xhs'],
                        xys: schedulingList[i][this.dateArray[j].letter + 'xys'],
                        shortDay:this.dateArray[j].shortDay
                    }
                    if (this.dateArray[j].shortDay == ygsObj.ghrq.split(' ')[0] && schedulingList[i].hb == ygsObj.hb) {
                        tempObj.ygs = ygsObj.ygs;
                    }else{
                        tempObj.ygs = 0;
                    }
                    if (j == 0) {
                        tempObj.yhs = tempObj.xhs - tempObj.ygs;
                    } else {
                        tempObj.yhs = tempObj.xys - tempObj.ygs;
                        console.log(tempObj.yhs,tempObj.xys,tempObj.ygs);
                    }
                    dateList.push(tempObj)
                }
                schedulingList[i].days = dateList;
            }
            return schedulingList;
        },
        goSchedulingDetail(item) {
            this.$router.push({
                name: 'schedulingDetail',
                params: item,
            })
        },
        chooseDate(date) {
            if(this.currentDay==date){
                this.currentDay = {};
            }else{
                this.currentDay = date;
            }
        },
        initData(totalDays) {
            let dayArr = ['日', '一', '二', '三', '四', '五', '六']
            let dayxqArr = ['日', '一', '二', '三', '四', '五', '六']
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
                    date1: m + '-' + d,
                    day: '周' + dayArr[day],
                    time: year + "-" + m + "-" + d + " " + "09:00:00",
                    shortDay: year + "-" + m + "-" + d,
                }
                arr.push(dateObj);
            }
            return arr;
        },
        loadDepartmentList() {
            let params = {
                jgid: this.api.getSys().jgid,
                ksid: this.$route.query.ksid,
            }
            this.api.getAllWorkList(params)
                .then(
                    res => {
                        console.log(res);
                        
                        // this.schedulingList = res.data;
                        this.loadHasRegisterNum(res.data);
                    }
                )
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
.chooseDay {
    background: #FF6666;
    color: #fff;
}

.dayitem {
    font-size: 12px;
    color: #7F7F7F;
    width: 50px;
    display: inline-block;
}

</style>
