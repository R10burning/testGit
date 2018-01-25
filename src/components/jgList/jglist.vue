<!-- by wzk -->
<template>
  <div style="width:100%;height:100%">
    <div class="header">
      <mt-search
      v-model="searchText"
      cancel-text="取消"
      :show="true"
      placeholder="机构搜索">
      <slot>
        <div style="margin-top:10px;padding-bottom:65px"> 
          <div v-if="!!tips" style="heihgt:35px;line-height:35px;color:red;text-align:center;font-size:20px">
            <p>{{tips}}</p>
          </div>
          <ul>
            <li v-for="item in filterData" @click="details(item)">
              <p>{{item.text}}</p>
            </li>
          </ul>
        </div> 
      </slot>
    </mt-search>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      tipShow: false,
      tips: "",
      jglist: [],
      filterData: []
    };
  },
  watch: {
    searchText: function(newVal, oldVal) {
      this.filterData = this.jglist.filter((item, index) => {
        let searchString = "";
        for (var key in item) {
          if (key != "id") {
            searchString += item[key];
          }
        }
        if (
          searchString.indexOf(newVal.trim().toUpperCase()) !== -1 ||
          searchString.indexOf(newVal.trim()) !== -1
        ) {
          return true;
        }
      });
    }
  },
  created() {
    this.$store.commit("setPageTitle", "机构选择");
    var query = this.$route.query;
    this.target = query.target;
    this.loadJgList();
    this.init();
  },
  methods: {
    init() {
      if (this.target === 'gh') {
        this.tips = '下列机构已开通在线挂号功能'
      } else if (this.target === 'jf') {
        this.tips = '下列机构已开通在线缴费功能'
      }
    },
    details(item) {
      if (this.target == "ksjs") {
        this.$router.push({
          path: "/index/departmentList",
          query: { dqjgid: item.value }
        });
      } else if (this.target == "ysjs") {
        this.$router.push({
          path: "/index/doctorDepartmentList",
          query: { dqjgid: item.value }
        });
      } else if (this.target == "jgjs" || this.target == 'gh' || this.target == 'jf') {
        item.xgid = item.value,
        item.lx = '1';
        this.$router.push({
          path: "/index/introArticle",
          query: item
        });
      }
    },
    loadJgList() {
      let param = {
        ghjf: (this.target == 'gh' || this.target == 'jf') ?'1':'',
        jgbs: (this.target == "jgjs" )? "1" : "",
        bmbs: this.target == "ksjs" ? "1" : "",
        rybs: this.target == "ysjs" ? "1" : ""
      };
      this.api.getJgList(param).then(res => {
        if (!res.data.length) {
          this.tips = '当前没有机构开通微信公众号服务'
        } else {
          this.jglist = res.data;
          this.filterData = res.data;
        }
        
      });
    }
  }
};
</script>
<style scoped>
li {
  display: flex;
  flex-flow: row;
  height: 45px;
  line-height: 45px;
  position: relative;
  padding-right: 5px;
}
li p {
  padding-left: 10px;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
li:after {
  height: 1px;
  content: "";
  width: 100%;
  border-top: 1px solid #f0f0f0;
  position: absolute;
  bottom: -1px;
  right: 0;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
.map {
  width: 30px;
  text-align: center;
  padding-top: 3px;
}
.detail {
  color: red;
  width: 40px;
  text-align: center;
}
.follow {
  color: green;
  width: 40px;
  text-align: center;
}
</style>