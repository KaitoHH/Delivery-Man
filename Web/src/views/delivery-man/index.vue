<template>
  <div class="delivery-man">
    <shared-basic-table
      ref="shareTable"
      :original-data="deliveryMan"
      :column-header="columnHeader"
      :filter-column="filterColumnVal"
      :export-file-name="exportFileName"
      @createEvent="createDeliveryMan()">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('user.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" type="primary" size="mini" @click="editDeliveryMan(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" type="primary" size="mini" @click="saveDeliveryMan(scope.row, scope.$index)">
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
            <span :class="scope.row.isEdit ? 'margin-left' : ''" style="display: inline-block; margin-top: 2px;">
              <el-button type="danger" size="mini" @click="deleteDeliveryMan(scope.row, scope.$index)">
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
      </template>
    </shared-basic-table>
    <user-add-dialog
      ref="userAddDialog"
      :title="$t('userDialog.addDeliveryMan')"
      @addEvent="addDeliverMan"/>
  </div>
</template>
<script>
import SharedBasicTable from '@/views/shared/shared-basic-table'
import { fetchDeliveryMan, addDeliveryMan, updateDeliveryMan } from '@/api/deliveryMan'
import { updateUser, addUser, deleteUser } from '@/api/user'
import UserAddDialog from '@/views/shared/user-add-dialog'

export default {
  name: 'DeliveryMan',
  components: { 'shared-basic-table': SharedBasicTable, 'user-add-dialog': UserAddDialog },
  data() {
    return {
      deliveryMan: [],
      columnHeader: ['id', 'name', 'registerDate', 'credits', 'status'],
      filterColumnVal: ['id', 'nickname', 'register_date', 'credits', 'status'],
      exportFileName: 'delivery_man_list'
    }
  },
  mounted() {
    this.loadDeliveryMan()
  },
  methods: {
    loadDeliveryMan() {
      fetchDeliveryMan().then(response => {
        console.log(response)
        this.deliveryMan = response.data.filter(d => {
          return d.id !== 0
        })
        this.$nextTick(() => {
          this.$refs.shareTable.initData()
        })
      })
    },
    createDeliveryMan() {
      this.$refs.userAddDialog.showDialog()
    },
    addDeliverMan(user) {
      addUser({
        nickname: user.name,
        openid: 'none',
        verified: true
      }).then(res => {
        this.deliveryMan.push(res.data)
        this.$message({
          message: this.$t('userDialog.addDeliveryManSuccess'),
          type: 'success'
        })
        this.$refs.userAddDialog.closeDialog()
      }).catch(e => {
        console.log(e)
      })
    },
    editDeliveryMan(man, index) {
      index = this.$refs.shareTable.getIndexInList(index)
      const item = Object.assign({}, man, { isEdit: true })
      this.$set(this.deliveryMan, index, item)
    },
    deleteDeliveryMan(man, index) {
      deleteUser(man.id).then(res => {
        console.log(res)
        index = this.$refs.shareTable.getIndexInList(index)
        this.deliveryMan.splice(index, 1)
        this.$message({
          message: this.$t('user.deleteDeliveryManSuccess'),
          type: 'success'
        })
      }).catch(e => {
        console.log(e)
      })
    },
    cancelEdit(man, index) {
      const item = Object.assign({}, man, { isEdit: false, editName: '' })
      index = this.$refs.shareTable.getIndexInList(index)
      this.$set(this.deliveryMan, index, item)
    },
    saveDeliveryMan(item, index) {
      updateUser(item.id, {
        nickname: item.editName ? item.editName : item.nickname
      }).then(res => {
        index = this.$refs.shareTable.getIndexInList(index)
        this.$set(this.deliveryMan, index, res.data)
        this.$message({
          message: this.$t('user.updateDeliveryManSuccess'),
          type: 'success'
        })
      })
    },
    handleModifyStatus(row, status) {
      updateUser(row.id, {
        status: status
      }).then(res => {
        Object.assign(row, res.data)
        this.$message({
          message: this.$t('operationSuccess'),
          type: 'success'
        })
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .message {
    color: green;
  }
  .delivery-man {
    span.margin-left {
      margin-left: 10px;
    }
    .margin-btn {
      display: inline-block;
      margin-top: 2px;
    }
  }
</style>
