<template>
    <div style="padding:30px;">
        <div style="color:#7F7F7F;height:60px;">请填写身份信息</div>
        <div class="infoItem" style="border-bottom: 0px;">
            <div class="infoText">姓名：</div>
            <div class="inputBox">
                <input placeholder="请输入姓名" type="text" name="" class="infoInput" v-model="name">
            </div>
        </div>
        <div style="margin-top:5px;" class="infoItem">
            <div class="infoText">身份证号：</div>
            <div class="inputBox">
                <input placeholder="请输入身份证号" type="text" name="" class="infoInput" v-model="idCard">
            </div>
        </div>
        <div style="background-color:#008040;width:100%;height:45px;border-radius: 5px;margin-top:20px;text-align: center;line-height: 45px;font-size: 20px;color:#E6E6E6;margin-bottom: 20px;" @click="search" class="btn">
            查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询
        </div>
        <div>
            <div v-for="item in userList" class="item" @click="editBoundInfo(item)" style="position:relative;">
                <div>
                    {{item.lxdh?item.lxdh:'无电话号码'}}
                </div>
                <div class="t2">
                    {{item.mc}}{{item.jtdz?item.jtdz:'无家庭地址'}}
                </div>
                <div v-if="item.has" style="position:absolute;right:5px;top:5px;color:#FF6666;">
                    此人已绑定
                </div>
                <div v-if="!item.has" style="position:absolute;right:5px;top:15px;color:#008040;">
                    绑&nbsp;&nbsp;定
                </div>
            </div>
        </div>
        <div v-if="msg" style="text-align: center;font-size: 20px;color: #B3B3B3;width:100%;">
            {{msg}}
        </div>
        <div v-if="promptVisible&&userList.length<=0" style="text-align: center;font-size: 20px;color: #B3B3B3;width:100%;" @click="addBoundInfo">
            暂无记录，<span style="text-decoration:none;color:rgb(61,187,170);">自助添加</span>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            name: '',
            idCard: '',
            promptVisible: false,
            userList: [],
            msg:'',
        }
    },
    methods: {
        search() {
            if(!this.name){
                this.$toast('请输入姓名');
                this.msg = '请输入姓名';
                return ;
            }
            if(!this.idCard){
                this.$toast('请输入身份证号');
                this.msg = '请输入身份证号';
                return ;
            }
            if(!(this.idCard.length==15||this.idCard.length==18)){
                this.$toast('身份证号格式不正确')
                this.msg = '身份证号格式不正确';
                return ;
            }
            this.msg = '';
            let params = {
                xm: this.name,
                sfzh: this.idCard
            }
            this.api.searchUserList(params).then(res => {
                if (res.code == 1) {
                    this.promptVisible = true;
                    this.checkList(res.data);
                    this.userList = res.data;


                }
            })
        },
        checkList(list) {
            let boundList = this.$store.getters.getBoundList;
            for (var i = 0; i < boundList.length; i++) {
                for (var j = 0; j < list.length; j++) {
                    if (boundList[i].hzid == list[j].id) {
                        list[j].has = true;
                    }
                }
            }
        },
        editBoundInfo(item) {
            if (item.has) {
                return;
            }
            item.sfzh = this.idCard;
            this.$router.push({
                name: 'editBoundInfo',
                query: item
            })
        },
        addBoundInfo() {
            this.$router.push({
                name: 'addBoundInfo',
                query: {
                    xm: this.name,
                    sfzh: this.idCard
                }
            })
        },
    },
    mounted() {

    },
    components: {

    },
    computed: {

    }
}

</script>
<style scoped>
.inputBox {
    flex: 1;
    border: 1px solid #B3B3B3;
    border-radius: 3px;
    height: 25px;
}

::placeholder {
    color: #CCCCCC;
    font-size: 16px;
}

.infoItem {
    display: flex;
    height: 40px;
}

.item {
    padding: 5px;
    border: 1px solid #E6E6E6;
}

.infoText {
    width: 80px;
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
