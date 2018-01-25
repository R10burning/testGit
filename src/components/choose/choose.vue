<template>
  <ul class="select" @click="hide">
    <li v-for="item,index of data" @click.stop="getValue(index,item)" :class="index ==judge && 'selected'">
      <span v-html="item[text]">{{item[text]}}</span><icon v-show="index == judge" name='choose' style="width:15px;height:15px;"></icon>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'choose',
  data () {
    return {
      setValue: '',
      text: 'txt',
      judge: 0
    }
  },
  beforeMount () {
    let value = this.setValue = this.value
    let index = this.text = this.txt || this.text
    let length=this.data.length
    for(let i=0; i<length; i++){
      if(value === this.data[i][index]){
        this.judge = i
      }
    }
   // console.log(this.txt, this.data);
  },
  watch : {
    data(val){
      this.getJudge()
      //console.log(this.txt, this.data);
    },
    value(val){
      this.setValue = val
      this.getJudge()
    },
    txt(val){this.text = val}
  },
  props: ['data', 'value', 'txt'],
  methods: {
    click () {
      this.show = true
    },
    getValue (index, item) {
      this.judge = index
      this.$emit('getValue', item, index)
    },
    hide () {
      this.$emit('getValue', this.data[this.judge])
    },
    getJudge(){
      let data=this.data
      let length=data.length
      let value = this.setValue
      let index = this.text
      for(let i=0; i<length; i++){
        if(value === data[i][index]){
          this.judge = i
        }
      }
    }
  }
}
</script>
<style>
   .select{
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 20;
    position: relative;
    top:5px;
  }
  ul.select li{
    padding: 0 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    vertical-align:baseline;
    box-sizing: border-box;
    border-bottom: 1px solid #e6e6e6;
    height:50px;
  }
  .select .selected {
    color:#00B678;
  }
</style>
