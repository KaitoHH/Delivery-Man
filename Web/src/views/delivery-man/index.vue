<template>
  <div class="delivery-man">
    <shared-basic-table ref="shareTable" :originalData="deliveryMan"
                       @createEvent="createDeliveryMan()"
                  :columnHeader="columnHeader" :exportFileName="exportFileName">
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
              <el-button type="danger" size="mini" @click="deleteDeliveryMan(scope.row, scope.$index)">
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
      ref="userAddDialog"
      @addEvent="addDeliverMan"
      :title="$t('userDialog.addDeliveryMan')">
    </user-add-dialog>
  </div>
</template>
<script>
  import SharedBasicTable from '@/views/shared/shared-basic-table'
  import { fetchDeliveryMan, addDeliveryMan, updateDeliveryMan } from '@/api/deliveryMan'
  import UserAddDialog from '@/views/shared/user-add-dialog'

  export default {
  name: 'DeliveryMan',
  components: {'shared-basic-table': SharedBasicTable, 'user-add-dialog': UserAddDialog },
  data() {
    return {
      deliveryMan: [],
      columnHeader: ['id', 'name', 'registerDate', 'credit', 'status'],
      exportFileName: 'delivery_man_list'
    }
  },
  mounted() {
    this.loadDeliveryMan()
  },
  methods: {
    loadDeliveryMan() {
      fetchDeliveryMan({}).then(response => {
        this.deliveryMan = response.data.items
        this.$nextTick(() => {
          this.$refs.shareTable.initData()
        })
      })
    },
    createDeliveryMan() {
      this.$refs.userAddDialog.showDialog()
    },
    addDeliverMan(user) {
      addDeliveryMan(user).then(res => {
        this.deliveryMan.push(res.data.item)
        this.$message({
          message: this.$t('userDialog.addDeliveryManSuccess'),
          type: 'success'
        })
        this.$refs.userAddDialog.closeDialog()
      })
    },
    editDeliveryMan(man, index) {
      index = this.$refs.shareTable.getIndexInList(index)
      const item = Object.assign({}, man, { isEdit: true })
      this.$set(this.deliveryMan, index, item)
    },
    deleteDeliveryMan(man, index) {
      index = this.$refs.shareTable.getIndexInList(index)
      this.deliveryMan.splice(index, 1)
      this.$message({
        message: this.$t('user.deleteDeliveryManSuccess'),
        type: 'success'
      })
    },
    cancelEdit(man, index) {
      const item = Object.assign({}, man, {isEdit: false, editName: ''})
      index = this.$refs.shareTable.getIndexInList(index)
      this.$set(this.deliveryMan, index, item)
    },
    saveDeliveryMan(item, index) {
      updateDeliveryMan(item).then(res => {
        let item = res.data.item
        Object.assign(item, { isEdit: false, name: item.editName ? item.editName : item.name, editName: ''})
        index = this.$refs.shareTable.getIndexInList(index)
        this.$set(this.deliveryMan, index, item)
        this.$message({
          message: this.$t('user.updateDeliveryManSuccess'),
          type: 'success'
        })
      })
    },
    handleModifyStatus(row, status) {
      const item = Object.assign(row, { status: status })
      updateDeliveryMan(item).then(res => {
        this.$message({
          message: this.$t('operationSuccess'),
          type: 'success'
        });
      })
    },
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
