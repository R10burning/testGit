<template>
    <div style="background: #E6E6E6">
        <div style="background: #fff;">
            <div class="listItem">
                <div style="width:60px;text-align: center;">
                    <icon style="color:#999999;" name="telephone" :scale="3"></icon>
                </div>
                <div class="inputBox">
                    <input placeholder="请输入手机号" type="text" name="" class="infoInput" v-model="telephone">
                </div>
            </div>
            <div class="listItem">
                <div style="width:60px;text-align: center;">
                    <icon style="color:#999999;" name="dentifyingCode" :scale="3"></icon>
                </div>
                <div class="inputBox flex1;">
                    <input placeholder="请输入短信验证码" type="text" name="" class="infoInput" v-model="code">
                </div>
                <div class="btn getBtn" @click="getCode();">
                    <span>{{sendAble?'发送验证码':'('+secondCount+')秒后重新发送'}}</span>
                </div>
            </div>
        </div>
        <div class="centerBtn btn" @click="sureCode()">
            确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            telephone: '',
            code: '1234',
            secondCount: 30,
            sendAble: true,
            confirmCode: '',
        }
    },
    methods: {
        init() {

        },
        sureCode() {
            if (this.telephone.length != 11 || this.telephone.charAt(0) != 1) {
                this.$toast('请输入正确的手机号！')
                return;
            }
            if (this.code.length != 4) {
                this.$toast('验证码格式不正确！')
                return;
            }
            
            // if (this.confirmCode == this.code) {
                // this.$toast('手机号通过验证！')
                this.register();
            // }
        },
        register() {
            let params = {
                sjh: this.telephone + '',
                lx: "1"
            }
            let openid = this.$store.getters.getOpenid;
            this.api.regist(params)
                .then(res => {
                    this.$store.commit('setAppUserId', res.id);
                    if (res.code == 1) {
                        this.$toast('注册成功！');
                    } else {
                        this.$toast(res.msg);
                    }
                    let param = {
                        sjh: this.telephone,
                        bsh: openid,
                        jgid: this.api.getSys().jgid,
                        lx: '2',
                    }
                    this.$store.commit('setTelephoneNum',this.telephone);
                    this.bondOpenid(param);
                    // let loginObj = {
                    //     sjh: this.number,
                    //     mm: password,
                    // }
                    // this.login(loginObj)
                })
        },
        bondOpenid(params) {
            this.api.bondOpenid(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            this.$toast('微信与手机号绑定成功！');
                            this.$router.push({
                                name:'home'
                            })
                        } else {
                            this.$toast('绑定失败！' + res.msg)
                        }
                    })
        },
        getCode() {
            return;
            if (this.telephone.length != 11 || this.telephone.charAt(0) != 1) {
                this.$toast('请输入正确的手机号！')
                return;
            }
            if (!this.sendAble) {
                this.$toast(this.secondCount + '秒后才能重新发送。');
                return;
            }
            this.doGetCode();
        },
        doGetCode() {
            let confirmCode = (Math.random() + '').substring(2, 6)
            // this.code = this.confirmCode;
            let params = {
                "xxlx": "0001",
                "jgid": this.api.getSys().jgid,
                "ywlx": "注册",
                "ywid": "1",
                "sjhm": this.telephone,
                "mbdm":'',
                "xxnr": {
                    "type": "注册用户",
                    "code": confirmCode
                }
            }
            this.api.getSms(params,{timeout:10000})
                .then(res => {
                    if (res.code == 1) {
                        this.$toast('验证码已发送')
                        this.confirmCode = confirmCode;
                        this.codeInit();
                    } else {
                        this.$toast('验证码发送错误' + res.msg)
                    }
                })
        },
        codeInit() {
            this.sendAble = false;
            this.secondCount = 30;
            this.count();
        },
        count() {
            setTimeout(() => {
                if (this.secondCount != 0) {
                    this.secondCount--;
                    this.count();
                } else {
                    this.sendAble = true;
                }
            }, 1000)
        },
        sure() {

        }
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
.getBtn {
    height: 100%;
    width: 130px;
    background: #B3B3B3;
    text-align: center;
    line-height: 60px;
    color: #666666;
}

.centerBtn {
    background-color: #FD6668;
    width: 80%;
    height: 45px;
    border-radius: 4px;
    margin-top: 20px;
    text-align: center;
    line-height: 45px;
    font-size: 20px;
    color: #E6E6E6;
    margin-bottom: 20px;
    margin-left: 10%;
}

.listItem {
    display: flex;
    height: 60px;
    align-items: center;
    border: 1px solid #CCCCCC;
}

.inputBox {
    flex: 1;
    /*border: 1px solid #B3B3B3;*/
    border-radius: 3px;
    height: 25px;
}

::placeholder {
    color: #CCCCCC;
    font-size: 16px;
}

.infoInput {
    border: 0px;
    width: 100%;
    font-size: 16px;
    line-height: 25px;
    color: #808080;
    outline: none;
}

</style>
