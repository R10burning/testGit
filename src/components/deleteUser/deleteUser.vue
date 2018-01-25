<template>
    <div>
        <div class="text">
            deleteUser
        </div>
        <img class="img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2764371306,3467823016&fm=27&gp=0.jpg">
        <input type="" name="" v-model="user">
        <button @click="deleteUser">删除</button>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            user: '15828051331'
        }
    },
    methods: {
        init() {

        },
        deleteUser() {
            let params = {
                sjh: this.user,
            }
            this.api.deleteUser(params)
                .then(res => {
                    console.log(res);
                })
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
.text {
    font-size: 1rem;
}

.img {
    width: 2rem;
}

@media (min-width: 840px) {

    html,
    body {
        font-size: 32px;
    }
    .border{
        border:1px solid #999999;
    }
}

</style>
