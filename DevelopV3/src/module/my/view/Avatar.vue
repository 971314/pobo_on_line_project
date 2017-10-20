<template>
  <div class="avatar">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        头像
      </div>
      <div slot="footer">
        <a class="message" href="javascript:void(0);" @click="slide = true">
          <img src="../images/ellipsis-h.png">
        </a>
      </div>
    </navbar>
    <div class="body">
      <div class="avatar-container">
        <img v-if="userInfo.avatar" :src="userInfo.avatar">
        <img v-else src="../images/avatar.png">
      </div>
    </div>
    <slideup v-model="slide">
      <slideup-body noPadding>
        <div class="file-input">
          拍照
          <input type="file" accept="image/*" capture="camera" @change="readImage">
        </div>
        <div class="file-input">
          从手机相册选择
          <input type="file" accept="image/*" @change="readImage">
        </div>
        <div @click="saveImg">保存图片</div>
        <div @click="slide = false">取消</div>
      </slideup-body>
    </slideup>
    <div v-show="imgCropper" class="cropper-page" id="cropperPage">
      <img src="" class="cropper-img" :style="imageStyle" id="cropperImg">
      <div class="cropper-cover" :style="{height: coverHeight + 'px'}"></div>
      <div class="cropper-box" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" id="cropBox"></div>
      <div class="cropper-cover" :style="{height: coverHeight + 'px'}"></div>
      <div class="cropper-bottom">
        <span @click="imgCropper = false">取消</span>
        <span @click="saveHead">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
const getDinstance = function(point0, point1) {
  return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2));
}
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      slide: false,
      imgCropper: false,
      coverHeight: 0,
      cropperHeight: 0,
      imgInitTop: 0,
      amplitude: 0,
      imageState: {
        left: 0,
        top: 0,
        scale: 1,
        width: 0,
        height: 0,
        originX: 0,
        originY: 0
      },
      distance: 0,
      imageStyle: {
        top: '0',
        transform: 'translate3d(0px, 0px, 0px) scale(1)',
        transformOrigin: 'left top'
      },
      cropBoxRect: {},
      touchPos: {
        x: 0,
        y: 0
      },
      minScale: 0,
      info: ''
    }
  },
  watch: {
    'imageState': {
      handler(val, oldVal) {
        this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
      },
      deep: true
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    readImage(event) {
      var _this = this;
      var file = event.target.files[0];
      if(!file){
        return false;
      }

      var reader = new window.FileReader();
      reader.onload = () => {
        _this.slide = false;
        // 通过 reader.result 来访问生成的 DataURL
        var img = document.getElementById("cropperImg");
        img.src = reader.result;
        //图片加载之后调用initCropper
        img.onload = () => {
          _this.initCropper();
        }
      }
      reader.readAsDataURL(file)
    },
    initCropper() {
      this.imgCropper = true;
      // 回调会在dom更新后调用，如果不使用$nextTick，无法获取元素正确的高度
      this.$nextTick(() => {
        let cropperPage = document.getElementById("cropperPage");
        let pageWidth = cropperPage.clientWidth
        let pageHeight = cropperPage.clientHeight
        let headerHeight = 0;
        this.coverHeight = (pageHeight - headerHeight - pageWidth) / 2
        let cropBoxTop = this.coverHeight + headerHeight
        this.imageState.left = 0
        this.imageState.top = 0
        this.imageStyle.top = cropBoxTop + 'px'
        document.getElementById("cropBox").style.height = pageWidth + 'px'
        this.cropBoxRect = {
          left: 0,
          top: cropBoxTop,
          width: pageWidth,
          height: pageWidth
        }

        let img = document.getElementById("cropperImg")

        var width = this.imageState.width = img.width
        var height = this.imageState.height = img.height
        // 计算imageState
        if (width > height) {
          this.minScale = this.imageState.scale = this.cropBoxRect.height / height
          this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2
        } else {
          this.minScale = this.imageState.scale = this.cropBoxRect.width / width
          this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2
        }
      })
    },
    saveHead () {
      var _this = this;
      _this.imgCropper = false;
      let imageState = _this.imageState
      let cropBoxRect = _this.cropBoxRect
      let scale = imageState.scale
      let image = document.getElementById("cropperImg")
      let height = cropBoxRect.height
      let width = cropBoxRect.width
      let canvas = document.createElement('canvas')
      canvas.width = cropBoxRect.width
      canvas.height = cropBoxRect.height
      let ctx = canvas.getContext('2d')
          // 添加白色背景
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //画图
      ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, 0, 0, width, height);

      var encoder = 0.1;
      if (image.src.length < 60 * 1024) {
        encoder = 1.0;
      } else {
        encoder = 60 * 1024 / image.src.length;
      }
      let data = canvas.toDataURL('image/jpeg', encoder);
      if (data.length > 60 * 1024) {
        encoder = image.src.length / 60 * 1024;
        data = canvas.toDataURL('image/jpeg', encoder);
      }
      _this.userInfo.avatar = data;
      if (pbE.isPoboApp) {
        var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
        localUserInfo.cIcon = data;
        pbE.SYS().storePrivateData('H5_Local_User_Info', JSON.stringify(localUserInfo));
      }
      _this.$axios.post(_this.ws, {
        func: 612,
        cOrgid: _this.userAutInfo.cOrgid,
        cUserid: _this.userAutInfo.cUserid,
        token: _this.userAutInfo.token,
        data: {
          cId: _this.userInfo.id,
          cLoginname: _this.userAutInfo.cLoginname,
          cIcon: data
        }
      }).then(function (axiosData) {
        var data = axiosData.data;
      }).catch(function (error) {
        console.error(error);
      });
    },
    getFocalPoint(point0, point1) {
      return {
        x: (point0.pageX + point1.pageX) / 2,
        y: (point0.pageY + point1.pageY) / 2
      }
    },
    touchStart(event) {
      var fingerCount = event.touches.length
      if (fingerCount) {
        // 记录触摸初始位置
        let touchEvent = event.touches[0]
        this.touchPos = {
          x: touchEvent.pageX,
          y: touchEvent.pageY
        }
      }
      if (fingerCount >= 2) {
          // 获取两点距离、中点位置；两点距离old/new=放大倍数；中点位置，缩放中心；
        let point0 = event.touches[0]
        let point1 = event.touches[1]
        this.distance = getDinstance(point0, point1)
        this.touchPos = this.getFocalPoint(point0, point1)
      }
    },
    touchMove(event) {
      // 根据触摸点位移，移动图片，重置触摸点位置
      var fingerCount = event.touches.length
      var touchEvent = event.touches[0]
      if (fingerCount === 1) {
        let distX = touchEvent.pageX - this.touchPos.x
        let distY = touchEvent.pageY - this.touchPos.y
        let newX = this.imageState.left - distX
        let newY = this.imageState.top - distY
        let scale = this.imageState.scale
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
        this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        this.touchPos.x = touchEvent.pageX
        this.touchPos.y = touchEvent.pageY
      } else if (fingerCount > 1) {
        let point0 = event.touches[0]
        let point1 = event.touches[1]
        let distance = getDinstance(point0, point1)
        let zoom = distance / this.distance
        let scale = zoom * this.imageState.scale
        let maxX = this.imageState.width * scale - this.cropBoxRect.width
        let maxY = this.imageState.height * scale - this.cropBoxRect.height
        let touchPos = this.getFocalPoint(point0, point1)
        let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
        let newY = zoom * ((this.imageState.top - this.imgInitTop) + touchPos.y) - touchPos.y + this.imgInitTop
        // 限制缩放
        // 图片新位置:由中点位置确认;(新位置到中点)/(旧位置到中点)=(new scale)/(old scale)
        // newLeft - touchPos.x = (distance / this.distance) * (oldLetf - touchPos.x)
        // oldLeft = 0 - this.imageState.left
        // oldTop = imgInitTop - this.imageState.top
        this.distance = distance
        if (scale < this.minScale) {
          this.imageState.scale = this.minScale
        } else {
          this.imageState.scale = scale
          this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
          this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
        }
        this.touchPos = touchPos
      }
    },
    saveImg () {
      this.slide = false;
    }
  }
}
</script>

<style>
.user-info .avatar .navbar-footer .message img {
  height: 4px;
}
.avatar .body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.avatar .avatar-container {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.avatar .avatar-container img {
  width: 100%;
}
.slideup {
  background-color: #b6bbc2;
}
.slideup .slideup-body div {
  border-bottom: 1px solid #e4e7f0;
  height: 41px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  color: #1c89ea;
  background-color: #fff;
}
.slideup .slideup-body div:last-child {
  margin-top: 5px;
  border-top: 1px solid #e4e7f0;
  border-bottom: none;
}
.slideup .slideup-body .file-input {
  position: relative;
}
.slideup .slideup-body .file-input input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.avatar .cropper-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  overflow: hidden;
  z-index: 1040;
}
.avatar .cropper-img {
  position: absolute;
  z-index: -1;
}
.avatar .cropper-cover {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}
.avatar .cropper-page .cropper-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  font-size: 14px;
  color: #fff;
}
.avatar .cropper-page .cropper-bottom span:first-child {
  float: left;
}
.avatar .cropper-page .cropper-bottom span:last-child {
  float: right;
}
</style>
