<template>
    <div>
        <div v-if="info.lx == 2" style="font-size: 20px;line-height: 50px;margin-left:20px;font-weight: bold;">
            {{title}}
        </div>
        <div v-if="info.lx == 1" style="padding:10px;">
            <div style="line-height: 40px;font-size: 20px;text-align:center;">
                {{hispitalName}}
            </div>
            <div style="text-align:center;line-height: 30px;color:#008000" class="downLine">
                机构简介
            </div>
            <div style="line-height: 50px;color:#008022" class="downLine">
                <span v-if="showMap" @click="toMap">地图导航</span>
                <span v-if="showFollow" @click="toFollow()">微信关注</span>
            </div>
        </div>
        <div v-show="article.wzbt" style="font-size: 22px;font-weight: bold;line-height: 40px;height:40px;text-align: center;">{{article.wzbt}}</div>
        <div v-if="type==3" style="text-align: center;">
            <img :src="article.zst" style="width:33%;height:auto;">
        </div>
        <div class="html ql-editor acticleBox" style="height: auto;">
            <div v-html="article.nr">
            </div>
            <div style="width:100%;height:40px;line-height: 40px;text-align: center;color:#999999;">万达信息股份有限公司 版权所有</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import '@/assets/css/quill.core.css';
let Base64 = require('js-base64').Base64;

export default {
    data() {
        return {
            article: {
            },
            items: [],
            info: {},
            type: '',
            hispitalName: '',
            queryParam:null
        }
    },
    computed: {
        showMap() {
            return this.queryParam.lx == '1' && !!this.queryParam.dhdz;
        },
        showFollow() {
            return this.queryParam.lx == '1' && !!this.queryParam.wxgztp;
        },
    },
    created() {
        this.$store.commit("setPageTitle", "详情介绍");
    },
    mounted() {
        this.info = this.$route.query;
        // this.hispitalName = this.api.getSys().searchAdress;
        this.queryParam = this.$route.query;
        this.loadArticle(this.$route.query);
        this.type = this.$route.query.lx;
        this.title = this.$route.query.mc;
    },
    methods: {
        toMap() {
            this.$router.push({
                name: "bMap",
                query: this.queryParam
            });
        },
        toFollow() {
             this.$router.push({
                name: "wxFollow",
                query: this.queryParam.wxgztp
            });
        },
        loadArticle(item) {
            var params = {
                xgid: item.xgid,
                lx: item.lx+'',
                jgid: this.axios.defaults.jgid
            }
            this.api.getIntro(params).then(
                res => {
                    let data = res.data;
                    if (data.length) {
                        data = data[0];
                        let url = this.axios.defaults.htmlUrl + '/' + res.data[0].cjsj.split(' ')[0] + '/' + res.data[0].id + '.html';
                        this.api.getHtml(url, {})
                            .then((res1) => {　　
                                data.nr = res1;
                                data.nr = this.completeImgSrc(data.nr, this.axios.defaults.imgUrl)
                               this.article = data;
                            }).catch(function(error) {　　
                                console.log(error);
                            });
                    } else {
                        data = {
                            nr: '',
                            id: '',
                            startTime: ''
                        }
                        this.article = data;
                    }
                }
            );
        }
    }
}

</script>
<style scoped>
.downLine {
    border-bottom: 1px solid #CCCCCC;
}

.acticleBox {
    width: 100%;
}

.borderB {
    border-bottom: 1px solid #CCCCCC
}

.marginT5 {
    margin-top: 5px;
}

.marginL20 {
    margin-left: 20px;
}

.infoContent {
    color: #999999;
    font-size: 12px;
}

.infoImg {
    width: 60px;
    padding: 5px;
}

.img {
    width: 100%;
}

.mint-swipe {
    width: 100%;
    height: 150px;
}

</style>
