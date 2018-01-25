<template>
    <div style="padding:10px;position:relative;">
        <mt-field label="手机号" v-model="info.lxdh" :state="info.lxdh?'':'warning'"></mt-field>
        <mt-field label="姓名" v-model="info.xm" :state="info.xm?'':'warning'" disabled></mt-field>
        <mt-field label="身份证号" v-model="info.sfzh" :state="info.sfzh?'':'warning'" disabled></mt-field>
        <mt-field label="性别" v-model="info.xb" :state="info.xb?'':'warning'" disabled></mt-field>
        <mt-field label="出生日期" v-model="info.birthday" disabled></mt-field>
        <mt-field label="家庭地址" v-model="areaText" disabled @click.native="editArea()" :state="info.jtqhdm?'':'warning'"></mt-field>
        <mt-field label="门牌号" v-model="info.jtdz" :state="info.jtdz?'':'warning'"></mt-field>
        <div style="padding-left:20px;padding-top:10px;margin-top:10px;border-top:1px solid #B3B3B3;"><i class="mintui mintui-field-warning" style="color:#ffc107;"></i>&nbsp;为必填项</div>
        <div class="btnA">
            <button class="mint-button mint-button--primary mint-button--large green" @click="confireUser()">
                <label class="mint-button-text font18">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</label>
            </button>
        </div>
        <area-select v-show="areaEditVisible" ref="areaSelect" :visible="areaEditVisible" :value="info.jtqhdm" @closeWin="closeAreaWin" @getAreaText="setAreaText" @sureValue="setAreaValue"></area-select>
    </div>
</template>
<script type="text/javascript">
import areaSelect from '@/components/common/areaSelect/areaSelect.vue';

export default {
    data() {
        return {
            info: {},
            areaEditVisible: false,
            areaText: '',
            relation: {
                value: '0',
                label: '本人'
            },
        }
    },
    methods: {
        init() {
            debugger
            this.info = this.$route.query;
            this.loadPatientInfo();
            // this.getInfoFromId(this.info)
        },
        setAreaValue(obj) {
            this.info.jtqhdm = obj.value;
            this.areaText = obj.text;
            this.areaEditVisible = false;
        },
        setAreaText(value) {
            this.areaText = value;
        },
        closeAreaWin() {
            this.areaEditVisible = false;
        },
        editArea() {
            this.areaEditVisible = true;
        },
        getInfoFromId(value) {
            if (value.sfzh.length == 18) {
                let tempday = value.sfzh.substring(6, 14)
                let year = tempday.substring(0, 4)
                let month = tempday.substring(4, 6)
                let day = tempday.substring(6, 8)
                tempday = year + '-' + month + '-' + day;
                value.birthday = tempday;

                if ((value.sfzh.charAt(16) % 2) == 1) {
                    value.xb = '1-男';
                } else {
                    value.xb = '2-女';
                }
            } else if (value.sfzh.length == 15) {
                let tempday = value.sfzh.substring(6, 12)
                tempday = '19' + tempday;
                let year = tempday.substring(0, 4)
                let month = tempday.substring(4, 6)
                let day = tempday.substring(6, 8)
                tempday = year + '-' + month + '-' + day;
                value.birthday = tempday;

                if ((value.sfzh.charAt(14) % 2) == 1) {
                    value.xb = '1-男';
                } else {
                    value.xb = '2-女';
                }
            } else {
                this.$toast('身份证号格式错误');
            }
            debugger
        },
        loadPatientInfo() {
            let params = {
                brid: this.info.hzid
            }
            this.api.getPatientInfo(params)
                .then(
                    res => {
                        debugger
                        // this.patient = res.data[0];
                        this.$set(this.$data, 'info', res.data[0]);
                        this.$set(this.$data.info, 'jtqhdm', res.data[0].jtqhdm);
                        this.$refs.areaSelect.init(res.data[0].jtqhdm);
                        this.getInfoFromId(this.info)

                    }
                )
        },
        confireUser() {
            let params = {
                brxx: {
                    brid: this.info.id,
                    lxdh: this.info.lxdh,
                    xm: this.info.xm,
                    sfzh: this.info.sfzh,
                    xb: this.info.xb,
                    jtqhdm: this.info.jtqhdm,
                    jtdz: this.info.jtdz
                }
            }
            this.api.updateHisUser(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            this.$router.back();
                            this.$toast('病人信息更新成功！');
                        }
                    }
                )
        },
    },
    mounted() {
        this.init();
    },
    components: {
        areaSelect
    },
    computed: {

    }
}

</script>
<style scoped>


</style>
