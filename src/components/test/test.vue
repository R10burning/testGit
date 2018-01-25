<template>
  <div>
      <input type="text" readonly  >
      <input type="text" readonly  >
      <input type="text" v-model="value" readonly @click="click" >
      <choose :data="data" v-show='show' v-on:getValue='getValue' :txt='"sex"'></choose>
  </div>
</template>
<script>
import choose from '../choose/choose'
export default {
  name: 'test',
  data () {
    return {
      data: [{txt: '何波', value: '1',sex:'man'}, {txt: '代业',value:'2',sex:'woman'}],
      value: '',
      show: false
    }
  },
  components: {
    choose
  },
  methods: {
    getValue (data) {
      this.value = data.txt
      this.show = false
    },
    click () {
        this.show=true

    }
  }
}
</script> 
<style>
    input{
        width: 30%;
    }
</style>
