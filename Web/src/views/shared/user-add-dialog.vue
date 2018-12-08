<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-form :model="userForm" :rules="rules" ref="userFormRef" labelWidth="100px">
      <el-form-item :label="$t('user.name')" prop="name">
        <el-input v-model="userForm.name" :placeholder="$t('user.name')">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.account')" prop="account">
        <el-input v-model="userForm.account" :placeholder="$t('user.account')">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.password')" prop="password">
        <el-input type="password" v-model="userForm.password" :placeholder="$t('user.password')">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.confirmPassword')" prop="confirmPassword">
        <el-input  type="password" v-model="userForm.confirmPassword" :placeholder="$t('user.confirmPassword')">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('dialog.cancel') }}</el-button>
         <el-button type="primary" @click="addUser">{{ $t('dialog.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'UserAddDialog',
    data() {
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('userDialog.confirmPasswordEmpty')));
        } else if (value !== this.userForm.password) {
          callback(new Error(this.$t('userDialog.confirmPasswordDiff')));
        } else {
          callback();
        }
      };
      return {
        dialogVisible: false,
        userForm: {
          name: '',
          account: '',
          password: '',
          confirmPassword: '',
        },
        rules: {
          name: [
            { required: true, message: this.$t('userDialog.nameInvalid'), trigger: 'blur' }
          ],
          account: [
            { required: true, message: this.$t('userDialog.accountInvalid'), trigger: 'blur' }
          ],
          password: [
            { required: true, message: this.$t('userDialog.passwordInvalid'), trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, validator: validatePass2,  trigger: 'blur' }
          ]
        }
      }
    },
    props: {
      title: {  default: () => ''}
    },
    mounted: function () {

    },
    methods: {
      handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.closeDialog()
          })
          .catch(_ => {});
      },
      addUser() {
        this.$refs.userFormRef.validate((valide) => {
          if (valide) {
            this.$emit('addEvent', this.userForm)
          }
        })
      },
      showDialog() {
        this.dialogVisible = true
      },
      closeDialog() {
        this.userForm = {
          name: '',
          account: '',
          password: '',
          confirmPassword: '',
        }
        this.$refs.userFormRef.resetFields()
        this.dialogVisible = false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
