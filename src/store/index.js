import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        maskShow: false,
        telephoneNum: '',
        openid: '',
        appUserId: '',
        boundList: [],
        handleUser: {},
        weixinNickName: '',
        weixinHeadImg: '',
        backBtn: true,
        backPage:-1
    },
    mutations: {
        maskShow(state, value) {
            state.maskShow = value;
        },
        backPage(state,value){
            state.backPage=value
        },
        systemMessage(state, value) {
            Vue.$toast(value);
        },
        setWeixinNickName(state, value) {
            state.weixinNickName = value;
        },
        setWeixinHeadImg(state, value) {
            state.weixinHeadImg = value;
        },
        setOpenid(state, value) {
            state.openid = value;
        },
        setTelephoneNum(state, value) {
            state.telephoneNum = value;
        },
        setAppUserId(state, value) {
            state.appUserId = value;
        },
        pushBoundItem(state, value) {
            state.boundList.push(value);
            if (state.boundList.length == 1) {
                state.handleUser = state.boundList[0];
            }
        },
        setHandleUser(state, value) {
            debugger
            state.handleUser = value;
            window.localStorage.boundId = state.handleUser.hzid;
        },
        setBoundList(state, value) {
            state.boundList = value;
            for (var i = 0; i < value.length; i++) {
                if (value[i].hzid == window.localStorage.boundId) {
                    thisSetHandleUser(state, value[i])
                    return;
                }
            }
            thisSetHandleUser(state, {});
            // state.handleUser = state.boundList[0];
            // window.localStorage.boundId = state.handleUser.id;
        },
        removeBoundItem(state, value) {
            for (var i = 0; i < state.boundList.length; i++) {
                if (state.boundList[i].hzid == value) {
                    state.boundList.splice(i, 1);
                    if (state.boundList.length) {
                        thisSetHandleUser(state, state.boundList[0])
                        // state.handleUser = state.boundList[0];
                        // window.localStorage.boundId = state.handleUser.id;
                    } else {
                        thisSetHandleUser(state, {})
                        // state.handleUser = {};
                        // window.localStorage.boundId = '';
                    }
                    return;
                }
            }
        },
        setBackBtn(state, value) {
            state.backBtn = value;
        },
        setPageTitle(state, value='健康金牛') {
            document.title = value;
            var i = document.createElement('iframe');
            i.src = '//m.baidu.com/favicon.ico';
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function(){
                i.remove();
                }, 19)
            }
            document.body.appendChild(i);
        }
    },
    getters: {
        getWeixinNickName(state, getters) {
            return state.weixinNickName;
        },
        getBackBtn(state, getters) {
            return state.backBtn;
        },
        backPage(state, getters) {
            return state.backPage;
        },
        getWeixinHeadImg(state, getters) {
            return state.weixinHeadImg;
        },
        getTelephoneNum(state, getters) {
            return state.telephoneNum;
        },
        getOpenid(state, getters) {
            return state.openid;
        },
        getAppUserId(state, getters) {
            return state.appUserId;
        },
        getHandleUser(state, getters) {
            return state.handleUser;
        },
        getBoundList(state, getters) {
            return state.boundList;
        }
    }
})
function thisSetHandleUser(state, value){
    state.handleUser = value;
    !!state.handleUser &&　(window.localStorage.boundId = state.handleUser.hzid);
}
export default store;
