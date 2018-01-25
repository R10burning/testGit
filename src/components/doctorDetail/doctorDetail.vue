<template>
    <div>
        <div style="position: relative;">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510813138084&di=7b0777ead843563f329fd3bd30ed8d57&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110325%2F514-110325120R330.jpg" style="width:100%;height:250px;">
            <div style="position:absolute;width:100px;height:150px;background: #fff;bottom: 30px;left:40px;">
                <img :src="completeHeadImgSrc(zst)" style="height:130px;margin:10px;width:80px; `">
            </div>
        </div>
        <div style="height:10px;width:100%;background: #E6E6E6;"></div>
        <!-- 擅长 -->
        <div v-if="scly" style="margin:10px;">
            <div style="display: flex;border-bottom: 1px solid #E6E6E6;height:40px;font-weight: 500;margin-bottom: 20px;">
                <div>
                    <icon style="color:#66CCFF" name="starO" :scale="3.5"></icon>
                </div>
                <div style="line-height: 30px;font-size: 18px;margin-left:10px;">
                    擅长
                </div>
            </div>
        <div  style="font-size: 18px;">
                
            </div>
        </div>
        <!-- 简介 -->
        <div style="margin:10px;margin-top:30px;">
            <div style="display: flex;border-bottom: 1px solid #E6E6E6;height:40px;font-weight: 500;margin-bottom: 20px;">
                <div>
                    <icon style="color:#66CCFF" name="introduce" :scale="3.5"></icon>
                </div>
                <div style="line-height: 30px;font-size: 18px;margin-left:10px;">
                    简介
                </div>
            </div>
            <div class="html ql-editor acticleBox" style="height: auto;">
                <div v-html="nr">
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            nr:{},
            zst:'',
            scly:'',
        }
    },
    methods: {
        init() {
            
            this.nr = this.$route.query.nr;
            this.zst = this.$route.query.zst;
            console.log(this.nr);
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
