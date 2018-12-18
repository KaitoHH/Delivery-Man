<template>
  <div class="user-list">
    <shared-basic-table
      ref="shareTable"
      :original-data="userList"
      :column-header="columnHeader"
      :filter-column="filterColumnVal"
      :export-file-name="exportFileName"
      @createEvent="createUser()">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('user.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" type="primary" size="mini" @click="editUser(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" type="success" size="mini" @click="saveUser(scope.row, scope.$index)">
              {{ $t('operation.save') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" type="warning" size="mini" @click="cancelEdit(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
            <span :class="scope.row.isEdit ? 'margin-btn' : ''">
              <el-button
                v-if="scope.row.status == true"
                size="mini"
                type="warning"
                @click="handleModifyStatus(scope.row, !scope.row.status)">
                {{ $t('user.unOpen') }}
              </el-button>
              <el-button
                v-if="scope.row.status == false"
                size="mini"
                type="success"
                @click="handleModifyStatus(scope.row, !scope.row.status)">
                {{ $t('user.unLock') }}
              </el-button>
            </span>
            <span :class="scope.row.isEdit ? 'margin-btn' : ''">
              <el-button
                v-if="scope.row.verified == true"
                size="mini"
                type="info"
                @click="handleModifyVerified(scope.row, !scope.row.verified)">
                {{ $t('user.set_unverified') }}
              </el-button>
              <el-button
                v-if="scope.row.verified == false"
                size="mini"
                type="success"
                @click="handleModifyVerified(scope.row, !scope.row.verified)">
                {{ $t('user.set_verified') }}
              </el-button>
            </span>
            <span :class="scope.row.isEdit ? 'margin-left' : ''" style="display: inline-block; margin-top: 2px;">
              <el-button type="danger" size="mini" @click="deleteUser(scope.row, scope.$index)">
                {{ $t('operation.delete') }}
              </el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.id')" prop="id" sortable/>
        <el-table-column :label="$t('user.name')" prop="nickname" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input v-if="scope.row.isEdit" :placeholder="scope.row.nickname" v-model="scope.row.editName" size="mini"/>
            </span>
            <span v-else>
              {{ scope.row.nickname }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.registerDate')" prop="register_date" sortable sort-by="register_date">
          <template slot-scope="scope">
            <span>{{ scope.row.register_date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.credit')" prop="credits" sortable>
          <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.credits" :key="n" icon-class="star" class="meta-item__icon credit"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.status')" prop="status" sortable>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === true ? 'success' : 'danger'">{{ $t('user.status_enum.' + scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.verified')" prop="verified" sortable>
          <template slot-scope="scope">
            <el-tag :type="scope.row.verified === true ? 'success' : 'danger'">{{ $t('user.verified_enum.' + scope.row.verified) }}</el-tag>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <user-add-dialog
      ref="userAddDialog"
      :title="$t('userDialog.addUser')"
      @addEvent="addUser"/>
  </div>
</template>
<script>
import SharedBasicTable from '@/views/shared/shared-basic-table'
import { fetchUser, addUser, updateUser, deleteUser } from '@/api/user'
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
      columnHeader: ['id', 'name', 'register_date', 'credits', 'status'],
      filterColumnVal: ['id', 'nickname', 'register_date', 'credits', 'status'],
      exportFileName: 'user_list'
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      fetchUser({}).then(response => {
        this.userList = response.data.filter(d => {
          return d.id !== 0
        })
        console.log(this.userList)
        this.$nextTick(() => {
          this.$refs.shareTable.initData()
        })
      })
    },
    createUser() {
      this.$refs.userAddDialog.showDialog()
    },
    addUser(user) {
      addUser({
        nickname: user.name,
        openid: 'none'
      }).then(res => {
        const item = res.data
        this.userList.push(item)
        this.$message({
          message: this.$t('userDialog.addUserSuccess'),
          type: 'success'
        })
        this.$refs.userAddDialog.closeDialog()
      })
    },
    editUser(user, index) {
      const item = Object.assign({}, user, { isEdit: true, editName: '' })
      index = this.$refs.shareTable.getIndexInList(index)
      this.$set(this.userList, index, item)
    },
    cancelEdit(user, index) {
      const item = Object.assign({}, user, { isEdit: false, editName: '' })
      index = this.$refs.shareTable.getIndexInList(index)
      this.$set(this.userList, index, item)
    },
    deleteUser(user, index) {
      deleteUser(user.id).then(res => {
        index = this.$refs.shareTable.getIndexInList(index)
        this.userList.splice(index, 1)
        this.$message({
          message: this.$t('user.deleteUserSuccess'),
          type: 'success'
        })
      })
    },
    saveUser(user, index) {
      updateUser(user.id, {
        nickname: user.editName ? user.editName : user.nickname
      }).then(res => {
        const item = res.data
        index = this.$refs.shareTable.getIndexInList(index)
        this.$set(this.userList, index, item)
        this.$message({
          message: this.$t('user.updateUserSuccess'),
          type: 'success'
        })
      })
    },
    handleModifyStatus(row, status) {
      updateUser(row.id, {
        status: status
      }).then(res => {
        console.log(res)
        this.$message({
          message: this.$t('operationSuccess'),
          type: 'success'
        })
        Object.assign(row, { status: status })
      })
    },
    handleModifyVerified(row, verified) {
      updateUser(row.id, {
        verified: verified
      }).then(res => {
        console.log(res)
        this.$message({
          message: this.$t('operationSuccess'),
          type: 'success'
        })
        Object.assign(row, { verified: verified })
      })
    }
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
