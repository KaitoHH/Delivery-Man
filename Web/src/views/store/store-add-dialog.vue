<template>
  <div>
    <el-dialog
      :title="$t('store.addStoreDialogTitle')"
      :before-close="handleClose"
      :visible.sync="dialogVisible">
      <el-form
        ref="storeFormRef"
        :model="storeForm"
        :rules="rules"
        label-width="150px">
        <el-form-item :label="$t('store.name')" prop="name">
          <el-input :placeholder="$t('store.name')" v-model="storeForm.name"/>
        </el-form-item>
        <el-form-item :label="$t('store.address')" prop="address">
          <el-input :placeholder="$t('store.address')" v-model="storeForm.address"/>
        </el-form-item>
        <el-form-item :label="$t('store.longitudeLatitude')" required>
          <el-col :span="11">
            <el-form-item prop="longitude">
              <el-input v-model="storeForm.longitude" :placeholder="$t('store.longitude')" style="width: 100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="line" style="text-align: center"> - </el-col>
          <el-col :span="11">
            <el-form-item prop="latitude">
              <el-input v-model="storeForm.latitude" :placeholder="$t('store.latitude')" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          :label="$t('store.serviceTime')"
          required
          prop="serviceTime">
          <el-time-picker
            v-model="storeForm.serviceTime"
            :start-placeholder="$t('store.startTime')"
            :end-placeholder="$t('store.endTime')"
            :placeholder="$t('store.serviceTime')"
            is-range
            required
            style="width: 100%"
            range-separator="-"/>
        </el-form-item>
        <el-form-item :label="$t('store.contactPhone')" prop="contactPhone" required>
          <el-input v-model="storeForm.contactPhone" :placeholder="$t('store.contactPhone')"/>
        </el-form-item>
        <el-form-item :label="$t('store.desc')" prop="desc">
          <el-input v-model="storeForm.desc" :placeholder="$t('store.desc')"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('dialog.cancel') }}</el-button>
        <el-button type="primary" @click="addStore">{{ $t('dialog.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'StoreAddDialog',
  data() {
    return {
      dialogVisible: false,
      storeForm: {
        name: '',
        address: '',
        longitude: '',
        latitude: '',
        contactPhone: '',
        startTime: '',
        endTime: '',
        serviceTime: '',
        detailAddress: '',
        desc: '',
        img: ''
      },
      rules: {
        name: [
          { required: true, message: this.$t('store.nameInvalid'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('store.addressInvalid'), trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: this.$t('store.longitudeInvalid'), trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: this.$t('store.latitudeInvalid'), trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: this.$t('store.contactPhoneInvalid'), trigger: 'blur' }
        ],
        serviceTime: [
          {
            required: true, message: this.$t('store.serviceTimeInvalid'), trigger: 'change'
          }
        ]
      }
    }
  },
  mounted: function() {

  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
      this.storeForm = {
        name: '',
        address: '',
        longitude: '',
        latitude: '',
        contactPhone: '',
        serviceTime: '',
        img: ''
      }
      this.$refs.storeFormRef.resetFields()
    },
    showDialog() {
      this.dialogVisible = true
    },
    addStore() {
      this.$refs.storeFormRef.validate((valid) => {
        if (valid) {
          this.$emit('storeAddEvent', this.storeForm)
        }
      })
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.closeDialog()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
