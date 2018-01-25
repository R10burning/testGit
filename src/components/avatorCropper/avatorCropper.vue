<template>  
  <div class="v-simple-cropper"  @click.stop>  
    <slot>  
      <button @click="upload">上传图片</button>  
    </slot>  
    <input  class="file" ref="file" type="file" accept="image/*" @change="uploadChange">  
    <div class="v-cropper-layer" ref="layer">  
      <div class="layer-header">  
        <button class="cancel" @click="cancelHandle">取消</button>  
        <button class="confirm" @click="confirmHandle">确定</button>  
      </div>  
      <img ref="cropperImg">  
    </div>  
  </div>  
</template>  
  
<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
export default {
  name: "avator-cropper",
  props: {
    initParam: Object,
    successCallback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      cropper: {},
      filename: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let cropperImg = this.$refs["cropperImg"];
      this.cropper = new Cropper(cropperImg, {
        autoCropArea: 0.75,
        aspectRatio: 1 / 1,
        dragMode: "move"
      });
    },
    upload() {
      this.$refs["file"].click();
    },
    uploadChange(e) {
      let file = e.target.files[0];
      this.filename = file["name"];
      let URL = window.URL || window.webkitURL;
      this.$refs["layer"].style.display = "block";
      this.cropper.replace(URL.createObjectURL(file));
    },
    cancelHandle() {
      this.cropper.reset();
      this.$refs["layer"].style.display = "none";
      this.$refs["file"].value = "";
    },
    confirmHandle() {
      let cropBox = this.cropper.getCropBoxData();
      let scale = this.initParam["scale"] || 1;
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale
      });
      let imgData = cropCanvas.toDataURL("image/jpeg");
      // let formData = new window.FormData();
      // formData.append("fileType", this.initParam["fileType"]);
      // formData.append("img", imgData);
      let param = {
        daid: this.initParam.daid,
        grtp: imgData
      }
      this.api.uploadAvator(param)
      .then(res => {
        this.successCallback(res, imgData);
        this.cancelHandle();
      })
      .catch(err => {
        this.$toast('上传头像失败')
      })
    }
  }
};
</script>  
  
<style scoped>
.file {
  display: none;
}
.v-cropper-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 99999;
  display: none;
}
.layer-header {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background: #fff;
  width: 100%;
  height:60px;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
}
.cancel,
.confirm {
  line-height: 40px;
  font-size: 24px;
  width:100px;
  text-align: center;
  background: inherit;
  border: 0;
  outline: 0;
  float: left;
}
.confirm {
  float: right;
}
img {
  position: inherit !important;
  border-radius: inherit !important;
  float: inherit !important;
}
</style> 