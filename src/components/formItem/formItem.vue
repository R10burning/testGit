<template>
  <div class="formItem" :class="item.class">
    <div class="label">
      <label for="" :class="data[item.id]&&'fill'" v-html="item.title">{{item.title}}</label>
    </div>
    <div class="input" @click="event(item)">
      <div class="radio" v-if="item.type==='radio'" >
        <div class="radioItem" v-for="valItem of item.val">
          <input type="radio" style="width:auto" :disabled='item.readonly' :value="valItem.val||valItem.txt" v-model="data[item.id]">{{valItem.txt||''}}
        </div>
      </div>
      <div class="date" v-else-if="item.type==='date'">
        <input :readonly='item.readonly' type="text" :placeholder="item.tip" v-model="data[item.id]" />
      </div>
      <div class="chooseItem" v-else-if="item.type==='choose'">
        <input :readonly='item.readonly' type="text" :placeholder="item.tip" v-model="data[item.id]" /> 
        <icon name="arrow" class="arrowIcon"></icon>
      </div>
      <div class="multiseriate" v-else-if="item.type==='multiseriate'" >
        <div class="multiseriateItem" v-for="valItem,index of item.val">
          <input type="text" @click.stop="event(item,valItem)" :placeholder="valItem.tip" :readonly='valItem.readonly||item.readonly' v-model="data[item.id].split(item.space)[index]">
          <span class="space" v-if="valItem.space===undefined||valItem.space">{{item.space}}</span>
        </div>
      </div>
      <div class="multi" v-else-if="item.type==='multi'">
        <div class="multiItem" :class="data[item.id].indexOf(valItem[txt])>-1&&'selected'" v-for="valItem,index of item.val" @click.stop="event(item,valItem)">
          {{valItem[txt]}}
        </div>
      </div>
      <div v-else>
        <input style="width:100%" :readonly='item.readonly' type="text" :placeholder="item.tip" v-model="data[item.id]" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'formItem',
  props:{
    item: {  // 必须提供字段
      required: true
    },
    data: {   // 可选字段，有默认值
      default: '',
      required:true
    },
    event:{

    },
    txt:{
      default:'txt'
    }
  }
}
</script>
<style>  
  .formItem{
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
    position: relative;
  }
  label{
    font-size: 16px;
    color: #333333;
  } 
  label.fill{
    color: #999999;
  }
  .arrowIcon{
    position: absolute;
    right: 5px;
    top:10px;
    height: 15px;
    width: 15px;
    color:#999999;
  }
  .label{
    width: 80px;
  }
  .input{
    width: 275px;
    display: flex;
    justify-content: flex-start;
    align-items:center;
  }
  .input>div{
    width: 100%;
  }
  input{
    border: 0;
    font-size: 16px;
    color: #333333;
    width: 100%;
  }
  .radio{
    display: flex;
  }
  .radioItem{
    margin-right: 20px;
  }
  .multiseriate{
    display: flex;
    justify-content: flex-start;
    align-items:center;
  }
  .multiseriate input{
    width:84%;
  }
</style>
