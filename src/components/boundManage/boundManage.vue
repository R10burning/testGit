<template>
    <div style="position:relative;">
        <div v-for="item in boundList" class="listItem">
            <div style="width:50px;text-align: center;" @click="setHandleUser(item);">
                <icon style="" :name="checkDefault(item)" :scale="3"></icon>
            </div>
            <div style="flex:1;">
                {{item.hzxm}}
            </div>
            <div style="width:70px;text-align: center;font-size: 16px;color:#66CCFF" @click="editInfo(item);">
                编辑
            </div>
            <div style="width:70px;text-align: center;font-size: 16px;color:#66CCFF" @click="unbound(item);">
                解绑
            </div>
        </div>
        <div class="btn" style="position: absolute;bottom: 20px;left:0px;width:100%;text-align: center;" @click="addUser();">
            <icon style="color:#66CCFF;" name="add" :scale="8"></icon>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {

        }
    },
    methods: {
        init() {

        },
        editInfo(item) {
            debugger
            this.$router.push({
                name: 'boundEdit',
                query: item
            })
        },
        unbound(item) {
            this.$messagebox.confirm('', {
                message: '是否确认解绑？',
                title: '提示',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                let params = {
                    hzid: item.hzid,
                    yhid: this.$store.getters.getAppUserId,
                    bz: '0' //0为解除绑定
                }
                this.api.treatmentCardunBind(params)
                    .then(
                        res => {
                            if(res.code==1){
                                this.$store.commit('removeBoundItem', item.hzid);
                                this.$toast('解绑成功！');
                            }else{
                                this.$toast('解绑失败！'+res.msg);
                            }
                        }
                    );
            });

        },
        addUser() {
            this.$router.push({
                name: 'cardBound'
            })
        },
        checkDefault(item) {
            return (this.handleUser == item) ? 'radio' : 'radioO';
        },
        setHandleUser(item) {
            this.$store.commit('setHandleUser', item)
            this.$toast('已切换"' + this.handleUser.hzxm + '"为当前默认绑定人员')
        }
    },
    mounted() {
        this.init();
    },
    components: {

    },
    computed: {
        handleUser() {
            return this.$store.getters.getHandleUser;
        },
        boundList() {
            return this.$store.getters.getBoundList;
        }
    }
}

</script>
<style scoped>
.listItem {
    height: 50px;
    border: 1px solid #CCCCCC;
    display: flex;
    align-items: center;
}

</style>
