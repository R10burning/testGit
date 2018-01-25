<template>
    <div>
        <!-- 科室列表 -->
        <div v-for="item in clinicalList" class="itemLi" @click="goDoctorList(item);">
            <div class="itemText">{{item.mc}}</div>
            <div class="itemIcon">
                <icon style="margin-top:12px;color:#999999;" name="enter" :scale="2.2"></icon>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            clinicalList: [],
        }
    },
    methods: {
        init() {
            this.loadClinicalList();
        },
        goDoctorList(item) {
            console.log(item.id);
            this.$router.push({
                name: 'doctorList',
                query: {
                    bmid: item.id,
                    bmmc:item.mc
                }
            })
        },
        loadClinicalList() {
            let params = {
                xgjgid: this.$route.query.dqjgid
            }
            this.api.getClinicalList(params)
                .then(
                    res => {
                        
                        if (res.code == 1) {
                            this.clinicalList = res.data;
                        }
                    }
                )
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


</style>
