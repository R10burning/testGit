<template>
    <div>
        <div v-show="article.wzbt" style="font-size: 22px;font-weight: bold;line-height: 24px;text-align: center;margin:5px;">{{article.wzbt}}</div>
        <div v-show="article.qyrq" style="font-size: 12px;color:#B3B3B3;text-align: center;">{{article.qyrq?article.qyrq.split(' ')[0]:''}}</div>
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
            article: {},
        }
    },
    created() {
        this.$store.commit("setPageTitle", "文章详情");
    },
    methods: {
        loadArticle(id) {
            var params = {
                id: id
            }
            this.api.getActicleDetail(params).then(
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

                        // if (!data.nr) {
                        //     data.nr = '';
                        // }
                        // data.nr = Base64.decode(data.nr)

                        // data.nr = this.completeImgSrc(data.nr, this.axios.defaults.imgUrl)
                        // this.article = data;
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
    },
    components: {

    },
    mounted() {

        this.loadArticle(this.$route.query.id);
    }
}

</script>
<style scoped>
.acticleBox {
    width: 100%;
}

</style>
