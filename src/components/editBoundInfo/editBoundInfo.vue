<template>
    <div style="padding:10px;position:relative;">
        <mt-field label="手机号" v-model="info.lxdh" :state="info.lxdh?'':'warning'"></mt-field>
        <mt-field label="姓名" v-model="info.xm" :state="info.xm?'':'warning'" disabled></mt-field>
        <mt-field label="身份证号" v-model="info.sfzh" :state="info.sfzh?'':'warning'" disabled></mt-field>
        <mt-field label="性别" v-model="info.xb" :state="info.xb?'':'warning'" disabled></mt-field>
        <mt-field label="出生日期" v-model="info.birthday" disabled></mt-field>
        <mt-field label="家庭地址" v-model="areaText" disabled @click.native="editArea()" :state="info.jtqhdm?'':'warning'"></mt-field>
        <mt-field style="border-bottom: 1px solid #CCCCCC;" label="门牌号" v-model="info.jtdz" :state="info.jtdz?'':'warning'"></mt-field>
        <div class="center" style="margin-top: 5px;">
            <mt-button type="default" @click="confireUser">保存信息</mt-button>
        </div>
        <div style="padding-left:20px;padding-top:10px;margin-top:10px;border-top:1px solid #B3B3B3;"><i class="mintui mintui-field-warning" style="color:#ffc107;"></i>&nbsp;为必填项</div>
        <div class="btnA">
            <button class="mint-button mint-button--primary mint-button--large green" @click="boundUser()">
                <label class="mint-button-text font18">绑&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</label>
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
            areaEditVisible: false,
            info: {},
            areaText: '',
            relation: {
                value: '0',
                label: '本人'
            },
        }
    },
    methods: {
        init() {
            this.info = this.$route.query;
            this.getInfoFromId(this.info)
            this.$refs.areaSelect.init(this.info.jtqhdm);
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
        boundUser() {
            let params = {
                hzid: this.info.id,
                yhid: this.$store.getters.getAppUserId,
                gx: this.relation.value,
                gxmc: this.relation.label,
            }
            console.log(params);
            this.api.treatmentCardBind(params).then(res => {
                console.log(res);
                if (res.code == 1) {
                    this.$store.commit('pushBoundItem', res);
                    this.$toast('绑定成功！');
                    this.$router.push({
                        name: 'boundManage'
                    })
                }else{
                    this.$toast('请求失败'+res.msg);
                }
            })
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
                            this.$toast('病人信息更新成功！');
                        }
                    }
                )
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
        }
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

.btnA{
    width:80%;
    margin-left:10%;
}

</style>
