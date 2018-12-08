<template>
  <div class="user-list">
    <shared-basic-table ref="shareTable" :originalData="userList"
                       @createEvent="createUser()"
                       :columnHeader="columnHeader" :exportFileName="exportFileName">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('user.operation')">
          <template slot-scope="scope">
            <el-button  v-if="!scope.row.isEdit" type="primary" size="mini" @click="editUser(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button  v-if="scope.row.isEdit" type="success" size="mini" @click="saveUser(scope.row, scope.$index)">
              {{ $t('operation.save') }}
            </el-button>
            <el-button  v-if="scope.row.isEdit" type="warning" size="mini" @click="cancelEdit(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
            <span :class="scope.row.isEdit ? 'margin-btn' : ''">
               <el-button  v-if="scope.row.status == 'open'" size="mini" type="warning"
                           @click="handleModifyStatus(scope.row, 'locked')">
              {{ $t('user.unOpen')}}
            </el-button>
            <el-button v-if="scope.row.status == 'locked'"
                       @click="handleModifyStatus(scope.row, 'open')"
                       size="mini" type="success">
              {{ $t('user.unLock')}}
            </el-button>
            </span>
            <span style="display: inline-block; margin-top: 2px;" :class="scope.row.isEdit ? 'margin-left' : ''">
              <el-button type="danger" size="mini" @click="deleteUser(scope.row, scope.$index)">
              {{ $t('operation.delete') }}
            </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.id')" prop="id" sortable/>
        <el-table-column :label="$t('user.name')" prop="name" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
            <el-input size="mini" v-if="scope.row.isEdit" :placeholder="scope.row.name" v-model="scope.row.editName">
            </el-input>
          </span>
            <span v-else>
            {{ scope.row.name }}
          </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.registerDate')" prop="registerDate" sortable sort-by="registerDate">
          <template slot-scope="scope">
            <span>{{ scope.row.registerDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.credit')" prop="credit" sortable>
          <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.credit" :key="n" icon-class="star" class="meta-item__icon credit"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.status')" prop="status" sortable>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'open' ? 'success' : 'danger'">{{ $t('user.status_enum.' + scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <user-add-dialog
      @addEvent="addUser"
      :title="$t('userDialog.addUser')"
      ref="userAddDialog">
    </user-add-dialog>
  </div>
</template>
<script>
  import SharedBasicTable from '@/views/shared/shared-basic-table'
  import { fetchUser, addUser, updateUser } from '@/api/user'
  import UserAddDialog from '@/views/shared/user-add-dialog'

  export default {
    name: 'User',
    components: {
      'shared-basic-table': SharedBasicTable,
      'user-add-dialog': UserAddDialog
    },
    data() {
      return {
        userList: [],
        columnHeader: ['id', 'name', 'registerDate', 'credit', 'status'],
        exportFileName: 'user_list'
      }
    },
    mounted() {
      this.loadUser()
    },
    methods: {
      loadUser() {
        fetchUser({}).then(response => {
          this.userList = response.data.items
          this.$nextTick(() => {
            this.$refs.shareTable.initData()
          })
        })
      },
      createUser() {
        this.$refs.userAddDialog.showDialog()
      },
      addUser(user) {
        console.log(user)
        addUser(user).then(res => {
          const item = res.data.item
          console.log(item)
          this.userList.push(item)
          this.$message({
            message: this.$t('userDialog.addUserSuccess'),
            type: 'success'
          })
          this.$refs.userAddDialog.closeDialog()
        })
      },
      editUser(user, index) {
        const item = Object.assign({}, user, {isEdit: true, editName: ''})
        index = this.$refs.shareTable.getIndexInList(index)
        this.$set(this.userList, index, item)
      },
      cancelEdit(user, index) {
        const item = Object.assign({}, user, { isEdit: false, editName: '' })
        index = this.$refs.shareTable.getIndexInList(index)
        this.$set(this.userList, index, item)
      },
      deleteUser(user, index) {
        index = this.$refs.shareTable.getIndexInList(index)
        this.userList.splice(index, 1)
        this.$message({
          message: this.$t('user.deleteUserSuccess'),
          type: 'success'
        })
      },
      saveUser(user, index) {
        updateUser(user).then(res => {
          let item = res.data.item
          Object.assign(item, { isEdit: false, name: user.editName ? user.editName : user.name, editName: ''})
          index = this.$refs.shareTable.getIndexInList(index)
          this.$set(this.userList, index, item)
          this.$message({
            message: this.$t('user.updateUserSuccess'),
            type: 'success'
          })
        })
      },
      handleModifyStatus(row, status) {
        const item = Object.assign(row, { status: status})
        updateUser(item).then(res => {
          this.$message({
            message: this.$t('operationSuccess'),
            type: 'success'
          });
          row.status = status
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .credit {
    color: green;
  }
  .pager {
    margin-top: 10px;
  }
  .user-list {
    span.margin-left {
      margin-left: 10px;
    }
    .margin-btn {
      display: inline-block;
      margin-top: 2px;
    }
  }
</style>
