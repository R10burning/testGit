<template>
    <div>
    	navigation
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        location.href=`http://map.baidu.com/mobile/webapp/search/search/qt=con&wd=`+this.axios.defaults.searchAdress+`&c=75/newmap=1&from=alamap&tpl=mapdots`
    },
    components: {
        
    },
    computed: {

    }
}

</script>
<style scoped>


</style>
