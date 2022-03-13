<template>
  <div class="upload-container">
    <!-- action是图片上传的接口地址 -->
    <!-- name是后端接收图片的属性 -->
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :before-upload="beforeUpload"
      class="image-uploader"
      drag
      :action="$img.imgUpd"
      name='img'
      :headers='{"Authorization": token}'
    >
      <div v-if='!value'>
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </div>
      <img v-else :src='`${$img.imgBase}${value}`' alt="qf"/>
    </el-upload>
    <div class="image-preview" style="display:none;">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getToken } from '@/api/qiniu'
import { mapState } from 'vuex'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    ...mapState('user', ['token']),
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(response) {
      console.log('el-upload图片传成功', response.data.img)
      // this.emitInput(this.tempUrl)
      this.emitInput(response.data.img)
    },
    beforeUpload(file) {

      console.log('上传之前',file)
      // 对图片大小尺寸、图片格式、图片命名等校验。。。
      // 在上传之前，对图片进行自定义切割
      if (file.size/1024 > 2048) {
        this.$message.error('图片不能超出2M')
        return false
      }

      // 【参考】把图片上传到七牛CDN上
      // const _self = this
      //     const key = response.data.qiniu_key
      //     const token = response.data.qiniu_token
      //     _self._data.dataObj.token = token
      //     _self._data.dataObj.key = key
      //     this.tempUrl = response.data.qiniu_url
      //     resolve(true)
      //   }).catch(err => {
      //     console.log(err)
      //     reject(false)
      //   })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        width: 200px;
        height: 200px;
        position: relative;
        @include clearfix;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>
