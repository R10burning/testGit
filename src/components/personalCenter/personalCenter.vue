<template>
    <div style="background: #f4f3f2;">
    	<div style="width:100%;display: flex;height:100px;margin-bottom: 10px;background: #fff;"  @dblclick="consoleTool();">
            <div style="width:100px;">
                <img :src="weixinHeadImg" style="margin:10px;width:75px;height:75px;border-radius: 50%;background: #B3B3B3;"></img>
            </div>
            <div style="line-height: 100px;">
                {{weixinNickName}}
            </div>
        </div>
        <div style="background:#fff;">
            <div v-for="item in menu" class="itemLi"  @click="action(item)">
                <div class="liIcon" >
                    <div class="IconImg" :style="{background: item.bgColor}">
                        <icon style="margin:7px;color:#fff;" :name="item.icon" :scale="2.2"></icon>
                    </div>
                </div>
                <div class="liText">
                    <div style="flex:1;">{{item.name}}</div>
                    <div style="width:50px;">
                        <icon style="margin-top:17px;color:#999999;" name="enter" :scale="2.2"></icon>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div>
            <div>
                机构名称
            </div>
            <div>
                地址
            </div>
            <div>
                咨询电话
            </div>
        </div> -->
    </div>
</template>
<script type="text/javascript">
import VConsole from "vConsole";
export default {
  data() {
    return {
      time: '',
      menu: [
        {
          name: "就诊人管理",
          path: "/index/boundManage",
          icon: "cardBound",
          bgColor: "#8cd466",
          boundNecessary: true,
          query: {
            xgjgid: this.axios.defaults.jgid,
            lx: "1",
            title: "机构介绍"
          }
        },
        {
          name: "就诊记录查询",
          path: "/index/visitingRecord",
          icon: "visitingRecord",
          boundNecessary: true,
          bgColor: "#22c2be",
          query: {}
        },
        {
          name: "自助缴费记录",
          path: "/index/onlinePay",
          icon: "payment",
          bgColor: "#fa7ca2",
          boundNecessary: true,
          flag: true,
          query: {}
        }
      ]
    };
  },
  created() {
    this.$store.commit("setPageTitle", "个人中心");
  },
  methods: {
    consoleTool() {
      debugger;
      let vConsole = new VConsole();
    },
    action(item) {
      if (item.flag) {
        this.$messagebox("功能暂未开放");
        return;
      }
      if (item.path == "/index/navigation") {
        location.href =
          `http://map.baidu.com/mobile/webapp/search/search/qt=con&wd=` +
          this.api.getSys().searchAdress +
          `&c=75/newmap=1&from=alamap&tpl=mapdots`;
        return;
      }
      if (item.boundNecessary) {
        if (!this.$store.getters.getTelephoneNum) {
          this.$messagebox
            .confirm("", {
              message: "首次使用需绑定手机号。",
              title: "提示",
              confirmButtonText: "去绑定",
              cancelButtonText: "留在本页"
            })
            .then(() => {
              this.$router.push({
                name: "telephoneBound"
              });
            });
          return;
        }
        if (this.handleUser && !this.handleUser.hzxm) {
          this.$messagebox
            .confirm("", {
              message: "没有就诊人员绑定。",
              title: "提示",
              confirmButtonText: "去绑定",
              cancelButtonText: "留在本页"
            })
            .then(() => {
              this.$router.push({
                name: "cardBound"
              });
            });
          return;
        }
        this.$router.push({
          path: item.path,
          query: item.query
        });
      } else {
        this.$router.push({
          path: item.path,
          query: item.query
        });
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.time  = this.time + 'a';
    },1000)
  },
  computed: {
    weixinHeadImg() {
      return this.$store.getters.getWeixinHeadImg;
    },
    weixinNickName() {
      return this.$store.getters.getWeixinNickName;
    }
  }
};
</script>
<style scoped>
.IconImg {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: #b3b3b3;
  margin: 10px;
}
.itemLi {
  height: 60px;
  display: flex;
}
.liIcon {
  width: 60px;
}
.liText {
  line-height: 60px;
  flex: 1;
  display: flex;
}
</style>
