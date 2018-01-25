import Vue from 'vue'
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

import store from '@/store'




import axios from 'axios';
Vue.prototype.axios = axios;

import router from './router'

import api from '@/fetch/api.js';
Vue.prototype.api = api;

import App from './App'

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/css/index.css'
Vue.use(MintUI);

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

import md5 from 'js-md5';

import 'babel-polyfill';

// import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload, {
//   loading: 'dist/loading.gif',
//   attempt: 1
// })

axios.get('static/sysConfig/config.json', {}).then(function(res) {
    // 初始化配置
    api.initConfig(res.data);
    if (res.data.devMode == 'true') {
        // vConsole = new VConsole();
    }
    init();
}).catch(function(res) {
    alert('数据初始化出错！');
});
function init() {
    window.wdapp = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
    
    Vue.filter('formatAmount', v => {
        if (!v) return 0;
        return (+v).toFixed(2);
    });


    Vue.prototype.setCookie = function(data) {
        this.$cookie.set(this.api.getSys().cookieName, JSON.stringify(data), { expires: '1D' });
    }

    Vue.prototype.getCookie = function() {
        let str = this.$cookie.get(this.api.getSys().cookieName);
        let obj ='';
        try {
            obj = JSON.parse(str)
        } catch (e) {
            obj = '';
        } finally {　　
            return obj;
        };
    }
    Vue.prototype.completeHeadImgSrc = function(src) {
        let addStr = axios.defaults.imgUrl;
        if (!src) {
            src = 'static/img/noimg.png';
            return src;
        } else {
            if (src.indexOf('http') < 0) {
                let tempStr = addStr + '/rest/downLoadFileById?fileId=' + src;
                return tempStr;
            } else {
                return src;
            }
        }
    }


    Vue.prototype.completeImgSrc = function(content, addStr) {
        let imgReg = /<img.*?(?:>|\/>)/gi;
        let srcReg = /src=[\'"]?([^\'"]*)[\'"]?/i;
        let tarr = content.match(imgReg);
        addStr = addStr + '/rest/downLoadFileById?fileId=';
        if (!tarr) {
            tarr = [];
        }
        for (var i = 0; i < tarr.length; i++) {
            let src = tarr[i].match(srcReg);
            if (src[1].indexOf('http') < 0) {
                let tempStr = addStr + src[1];
                content = content.replace(src[1], tempStr);
            }
        }
        return content;
    }
}
