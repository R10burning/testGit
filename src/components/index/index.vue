<template>
    <div>
        <router-view keep-alive transition transition-mode="out-in" class="body"></router-view>
        <div style="position: absolute;bottom: 0px;left:0px;width:100%;height:60px;border-top:1px solid #E6E6E6;display: flex;background: #fff;">
            <div class="menuBtn" @click="go('home')" :class="{'activeBtn':($router.history.current.name=='home')}">
                <div class="btnArea">
                    <icon name="home" :scale="3"></icon>
                </div>
                <div style="text-align: center;width:100%;">
                    首页
                </div>
            </div>
            <div class="menuBtn" @click="goback();">
                <div v-if="backBtn" class="btnArea">
                    <icon name="back" :scale="3"></icon>
                </div>
                <div v-if="backBtn" style="text-align: center;width:100%;">
                    返回
                </div>
            </div>
            <div class="menuBtn" @click="go('personalCenter')" :class="{'activeBtn':($router.history.current.name=='personalCenter')}">
                <div class="btnArea">
                    <icon name="personal-center" :scale="3"></icon>
                </div>
                <div style="text-align: center;width:100%;">
                    个人中心
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { getUrlParams, checkBrowserBackStr } from '@/util/util.js'

export default {
    data() {
        return {
            code: ''
        }
    },
    methods: {
        go(url) {
            this.$router.push({
                name: url
            })
        },
        goback() {
            let backpage=this.$store.getters.backPage
            this.$store.commit("backPage",-1)
            this.$router.go(backpage);
        },
        checkCode() {
            let params = getUrlParams(location.href.split('?')[1]);
            if (params.code) {
                this.code = params.code;
                this.getInfoByCode();
            } else {
                this.getCode();
            }
        },
        getInfoByCode() {
            let params = {
                code: this.code,
                jgid: this.api.getSys().jgid,
                openid: '',
            }
            this.api.getInfoByCode(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            let openid = res.data.openid;
                            this.setCookie(res.data);
                            this.$store.commit('setOpenid', openid);
                            this.$store.commit('setWeixinNickName', res.data.nickname);
                            this.$store.commit('setWeixinHeadImg', res.data.headimgurl);
                            this.loginByOpenid(openid);
                        } else {
                            // 未关注用户
                            // location.href = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2ODE2OTgwNg==&scene=124#wechat_redirect`
                            // this.$toast(res.msg);
                        }
                    }
                )
        },
        loginByOpenid(openid) {
            let params = {
                bsh: openid,
                lx: '2',
            }
            this.api.searchOpenid(params)
                .then(
                    res => {
                        if (res.code == 1) {
                            // 已注册用户登录成功
                            this.$store.commit('setTelephoneNum', res.appuser[0].sjh);
                            this.$store.commit('setAppUserId', res.appid);
                            if (res.user) {
                                this.$store.commit('setBoundList', res.user);
                            }
                        } else {
                            // 未注册用户
                            // this.$messagebox.confirm('', {
                            //     message: '你尚未绑定账号，是否去登录？',
                            //     title: '提示',
                            //     confirmButtonText: '是',
                            //     cancelButtonText: '否'
                            // }).then(() => {
                            //     this.$router.push({
                            //         name: 'login'
                            //     })
                            // });
                        }
                    }
                )
        },
        requestCode(appid) {
            var preUrl = location.href.split('#')[0];
            let redirect_uri = encodeURIComponent(preUrl);
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
            location.href = url;
        },
        getCode() {
            this.api.GetAppId({ "jgid": this.axios.defaults.jgid })
                .then(res => {
                    if (res.code === '1') {
                        if (res.data.length && res.data[0].appid) {
                            this.requestCode(res.data[0].appid);
                        } else {
                            // this.$messagebox('此机构未开通微信公众号支付')
                        }
                    } else {
                        this.$toast('系统异常')
                    }
                }, err => {})
        },
    },
    mounted() {
        if (window.location.hostname != 'localhost') {
            let cookieData = this.getCookie();
            if (cookieData) {
                this.$store.commit('setOpenid', cookieData.openid);
                this.$store.commit('setWeixinNickName', cookieData.nickname);
                this.$store.commit('setWeixinHeadImg', cookieData.headimgurl);
                this.loginByOpenid(cookieData.openid);
            } else {
                this.checkCode();
            }
        } else {
            let cookieData = {
                "subscribe": 1,
                "openid": "oTlDMwq0hTBLeCQTaTLtyLOtyBEg",
                "nickname": "　",
                "sex": 1,
                "language": "zh_CN",
                "city": "成都",
                "province": "四川",
                "country": "中国",
                "headimgurl": "http://wx.qlogo.cn/mmopen/TYzNZySeBKPAho08pvEYYj7UISWstAiaAr2SpFSt6CenAKb5Anlj1mHib8dSmf5v8qrNtWIyq7RwGFABeHp2dJlRnCrVsLcdJQ/0",
                "subscribe_time": 1507714049,
                "remark": "",
                "groupid": 0,
                "tagid_list": []
            }
            this.$store.commit('setOpenid', cookieData.openid);
            this.$store.commit('setWeixinNickName', cookieData.nickname);
            this.$store.commit('setWeixinHeadImg', cookieData.headimgurl);
            this.loginByOpenid(cookieData.openid);
        }

    },
    computed: {
        backBtn(){
            return this.$store.getters.getBackBtn;
        }
    }
}

</script>
<style scoped>
.menuBtn {
    flex: 1;
    color: #000000;
}

.btnArea {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
}

.body {
    height: calc(100% - 60px);
    overflow-y: auto;
}

.activeBtn {
    color: #008040;
}

</style>
