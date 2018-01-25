<template>
    <div>
        <!-- 搜索栏 -->
        <div style="width:100%;height:65px;background: #E6E6E6;display: flex;">
            <div style="width:10px;"></div>
            <div style="margin-top:10px;height:40px;border-radius: 4px;border:1px solid #CCCCCC;flex:1;display: flex;background: #fff;">
                <div style="width:40px;">
                    <svg viewBox="0 0 1024 1024" class="svgIcon" style="margin-top:10px;margin-left:10px;height:20px;fill:##666666;">
                        <path d="M72.824471 591.540706C29.786353 390.234353 151.913412 192.542118 345.569882 149.925647c193.656471-42.586353 385.536 86.016 428.544 287.322353 43.068235 201.306353-78.998588 399.028706-272.685176 441.645176C307.742118 921.449412 115.892706 792.816941 72.824471 591.540706L72.824471 591.540706zM753.302588 790.347294l227.388235 152.395294 41.923765-67.915294-226.484706-151.853176c45.357176-88.214588 61.650824-193.264941 39.002353-299.128471-50.537412-236.272941-275.757176-387.312941-503.115294-337.287529C104.658824 136.553412-38.671059 368.609882 11.866353 604.912941c50.537412 236.333176 275.757176 387.343059 503.115294 337.317647C612.954353 920.696471 695.326118 865.28 753.302588 790.347294L753.302588 790.347294z"></path>
                    </svg>
                </div>
                <div style="flex:1;">
                    <input style="flex:1;height:100%;width:100%;background: none;border:0px;font-size: 15px;" type="" name="" placeholder="请输入关键字搜索" v-model="searchKeyWord">
                </div>
            </div>
            <div style="width:10px;"></div>
        </div>
        <!-- 科室列表 -->
        <div v-for="item in filterDepartmentList" class="itemLi" @click="goArticleDetail(item);">
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
            departmentList: [],
            searchKeyWord:'',
        }
    },
    created() {
        this.$store.commit("setPageTitle", "科室选择");
    },
    methods: {
        init() {
            this.loadDepartmentList();
        },
        loadDepartmentList() {
            let params = {
                jgid: this.$route.query.dqjgid,
            }
            this.api.getDepartmentList(params)
                .then(
                    res => {
                        
                        this.departmentList = res.data;
                    }
                )
        },
        goArticleDetail(item) {
            
            this.$router.push({
                name: 'introArticle',
                query: {
                    xgid: item.id,
                    lx: '2',
                    mc: item.mc
                },
            })
        },
    },
    mounted() {
        this.init();
    },
    computed: {
        filterDepartmentList() {
            var departmentList = this.departmentList;
            return departmentList.filter((value) => {
                
                if (!this.searchKeyWord) {
                    return value;
                }
                if (value.mc.indexOf(this.searchKeyWord) >= 0) {
                    return value;
                } else {
                    return '';
                }
            });
        }
    }
}

</script>
<style scoped>


</style>
