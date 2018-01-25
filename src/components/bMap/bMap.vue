<!-- by wzk -->
<template>
  <div>
    <div class="header">
      <!-- <div>
        <icon style="color:#fff;margin-top:10px;" name="navigation_to" :scale="2.4"></icon>
      </div> -->
      <h3 style="position:relative;text-align:center">{{dhmc}}
        <div @click="toLocal()" style="position:absolute;top:-10px;right:15px;padding:10px">
          <icon style="color:#fff;" name="navigation_to" :scale="3.4"></icon>
        </div>
      </h3>
      <p>{{lxdh?"联系电话:"+lxdh:''}}</p>
      <p>{{dz?"地址:"+dz:'地址: 暂未填写'}}</p>
      <!-- <p><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.BaiduMap" class="map">去这里</a></p> -->
      <!-- <p><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.autonavi.minimap" class="map">去这里</a></p> -->
    </div>
    <div style="padding:10px;height:calc(100% - 150px)">
      <div id="map" style="width:100%;height: 100% "></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dhmc: "",
      lxdh: "",
      dz: "",
      pointArr: [],
      xzdzArr: []
    };
  },
  created() {
    let param = this.$route.query;
    console.log(param)
    this.dhmc = param.text;
    this.lxdh = param.lxdh;
    this.dz = param.szddz;
    this.initPointData(param.dhdz);
  },
  mounted() {
    this.loadScript();
  },
  methods: {
    initPointData(str) {
      var arrA = str.split(";;");
      console.log(arrA)
      for (let v of arrA) {
        let a = v.split("|");
        this.pointArr.push(a[0]);
        this.xzdzArr.push(a[1]);
      }
    },
    toLocal() {
      location.href = `http://map.baidu.com/mobile/webapp/search/search/qt=con&wd=${this
        .xzdzArr[0]}&c=75/newmap=1&from=alamap&tpl=mapdots`;
    },
    loadScript() {
      window.initMap = () => {
        let map = new BMap.Map("map");
        let arrp = this.pointArr[0].split(",");
        let point = new BMap.Point(arrp[0], arrp[1]);
        function addMarker(point, index) {
          let myIcon = new BMap.Icon(
            "http://api.map.baidu.com/img/markers.png",
            new BMap.Size(23, 25),
            {
              anchor: new BMap.Size(10, 25),
              imageOffset: new BMap.Size(0, 0 - index * 25)
            }
          );
          let marker = new BMap.Marker(point, {
            icon: myIcon
          });
          marker.disableDragging();
          map.addOverlay(marker);
        }
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom();
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl());
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        for (let [key, value] of this.pointArr.entries()) {
          addMarker(
            new BMap.Point(value.split(",")[0], value.split(",")[1]),
            key
          );
        }
      };
      let bmap = document.getElementById("bmap");
      if (bmap == null) {
        let script = document.createElement("script");
        script.id = "bmap";
        script.src =
          "http://api.map.baidu.com/api?v=2.0&ak=CPmjUUg3Hh4oy3UntSCzGSU5TGWkRGzw&callback=initMap";
        document.body.appendChild(script);
      } else {
        initMap();
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.header {
  height: 100px;
  text-align: center;
  padding-top: 15px;
  box-sizing: border-box;
}
.header p {
  font-size: 18px;
}
</style>