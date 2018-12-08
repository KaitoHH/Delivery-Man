<template>
  <div>
    <el-dialog
      title="Add Goods"
      :before-close="handleClose"
      :visible.sync="dialogVisible">
      <el-form
        :model="goodsForm" :rules="rules" ref="goodsFormRef"
               label-width="200px">
        <el-form-item :label="$t('goods.name')" prop="name">
          <el-input :placeholder="$t('goods.name')" v-model="goodsForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('goods.img')" prop="img">
          <div class="goods-img-block" @click="uploadGoodsImage">
            <img class="goods-img" :src="goodsForm.img"/>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
         <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
    <image-upload
      v-model="imgUploadVisible"
      :noCircle="true"
      :noSquare="true"
      @crop-success="cropSuccess"
      :width="300"
      url=""
      :height="300">
    </image-upload>
  </div>
</template>
<script>
  import ImageUpload from 'vue-image-crop-upload'
  export default {
    name: 'GoodAddDialog',
    components: {
      'image-upload': ImageUpload
    },
    data() {
      return {
        dialogVisible: false,
        imgUploadVisible: false,
        goodsForm: {
          name: '',
          img: ''
        },
        rules: {
          name: [
            { required: true, message: this.$t('goods.nameInvalidMessage'), trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {

    },
    methods: {
      showDialog() {
        this.dialogVisible = true
      },
      closeDialog() {
        this.dialogVisible = false
        this.goodsForm = {
          name: '',
          img: ''
        }
        this.$refs.goodsFormRef.resetFields();
      },
      addGoods() {
        this.$refs.goodsFormRef.validate((valid) => {
          if (valid) {
            this.$emit('goodAddEvent', this.goodsForm)
          }
        })
      },
      handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.closeDialog()
          })
          .catch(_ => {});
      },
      uploadGoodsImage() {
        this.imgUploadVisible = true
      },
      cropSuccess(imgDataUrl, field){
        this.goodsForm.img = imgDataUrl
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .goods-img-block {
    cursor: pointer;
    height: 250px;
    width: 250px;
    .goods-img {
      width: 250px;
      height: 250px;
    }
  }
</style>
