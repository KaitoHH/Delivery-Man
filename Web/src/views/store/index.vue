<template>
  <div>
    <shared-basic-table
      ref="sharedTable"
      :column-header="columnHeader"
      :filter-column="filterColumnVal"
      :export-file-name="exportFileName"
      :original-data="stores"
      @createEvent="createStore()">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('user.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" type="primary" style="margin-left: 10px" size="mini" @click="editStore(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" style="margin-left: 10px" type="success" size="mini" @click="saveStore(scope.row, scope.$index)">
              {{ $t('operation.save') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" type="warning" size="mini" @click="cancelEdit(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
            <el-button type="info" size="mini" @click="detailStore(scope.row)">
              {{ $t('operation.detail') }}
            </el-button>
            <el-button
              type="danger"
              size="mini"
              style="margin-top: 5px"
              @click="deleteStore(scope.row, scope.$index)">
              {{ $t('operation.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('store.id')" style="width: 200px;" prop="id" sortable/>
        <el-table-column :label="$t('store.name')" prop="name" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input v-model="scope.row.editName" :placeholder="scope.row.name" size="mini"/>
            </span>
            <span v-else>
              {{ scope.row.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('store.address')" prop="address" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input v-model="scope.row.editAddress" :placeholder="scope.row.address" size="mini" />
            </span>
            <span v-else>
              {{ scope.row.address }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('store.star')" prop="star" sortable>
          <template slot-scope="scope">
            <svg-icon v-for="n in +scope.row.star" :key="n" icon-class="star" class="meta-item__icon star"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('store.contactPhone')" prop="contactPhone">
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input v-model="scope.row.editContactPhone" :placeholder="scope.row.contactPhone" size="mini" />
            </span>
            <span v-else>
              {{ scope.row.contactPhone }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('store.serviceTime')" prop="serviceTime">
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-time-picker
                v-model="scope.row.editServiceTime"
                :start-placeholder="$t('store.startTime')"
                :end-placeholder="$t('store.endTime')"
                :placeholder="$t('store.serviceTime')"
                is-range
                size="mini"
                range-separator="-"/>
            </span>
            <span v-else>
              {{ scope.row.serviceTime }}
            </span>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <store-add-dialog
      ref="storeAddDialog"
      @storeAddEvent="addStore"/>
  </div>

</template>

<script>
import { fetchStore, addStore, updateStore, deleteStore } from '@/api/store'
import { parseTime } from '@/utils'
import ShareBasicTable from '@/views/shared/shared-basic-table'
import StoreAddDialog from '@/views/store/store-add-dialog'
export default {
  name: 'Store',
  components: {
    'shared-basic-table': ShareBasicTable,
    'store-add-dialog': StoreAddDialog
  },
  data() {
    return {
      stores: [],
      columnHeader: ['Id', 'Name', 'Address', 'Contact Phone', 'Star', 'RegisterDate', 'Service Time'],
      filterColumnVal: ['id', 'name', 'address', 'contactPhone', 'star', 'registerDate', 'serviceTime'],
      exportFileName: 'store_list'
    }
  },
  mounted: function() {
    this.loadStore()
  },
  methods: {
    createStore() {
      this.$refs.storeAddDialog.showDialog()
    },
    addStore(store) {
      const that = this
      delete store['img']
      Object.assign(store, { serviceTime: that.handleServiceTime(store.serviceTime) })
      addStore(store).then(res => {
        const store = res.data
        this.stores.push(store)
        this.$message({
          message: this.$t('store.addStoreSuccess'),
          type: 'success'
        })
        this.$refs.storeAddDialog.closeDialog()
      })
    },
    handleServiceTime(serviceTime) {
      if (!serviceTime || serviceTime.length < 2) {
        return ''
      }
      const startTime = serviceTime[0]
      const endTime = serviceTime[1]
      serviceTime = `${parseTime(startTime, '{h}:{i}:{s}')} - ${parseTime(endTime, '{h}:{i}:{s}')}`
      return serviceTime
    },
    deleteStore(store, index) {
      deleteStore(store.id).then(res => {
        console.log(res)
        index = this.$refs.sharedTable.getIndexInList(index)
        this.stores.splice(index, 1)
        this.$message({
          message: this.$t('store.deleteStoreSuccess'),
          type: 'success'
        })
      }).catch(e => {
        console.log(e)
      })
    },
    saveStore(store, index) {
      const serviceTime = this.handleServiceTime(store.editServiceTime)
      const item = Object.assign({}, store, { isEdit: false,
        name: store.editName ? store.editName : store.name, address: store.editAddress ? store.editAddress : store.address,
        contactPhone: store.editContactPhone ? store.editContactPhone : store.contactPhone,
        serviceTime: serviceTime || store.serviceTime })
      Object.assign(item, { editName: '', editAddress: '', editContactPhone: '', editServiceTime: '' })
      index = this.$refs.sharedTable.getIndexInList(index)
      updateStore(store.id, {
        name: item.name,
        address: item.address,
        contactPhone: item.contactPhone,
        serviceTime: item.serviceTime
      }).then(res => {
        console.log(res)
        this.$set(this.stores, index, item)
        this.$message({
          message: this.$t('store.updateStoreSuccess'),
          type: 'success'
        })
      })
    },
    editStore(store, index) {
      const item = Object.assign({}, store, { isEdit: true })
      index = this.$refs.sharedTable.getIndexInList(index)
      this.$set(this.stores, index, item)
    },
    cancelEdit(store, index) {
      const item = Object.assign({}, store,
        { isEdit: false, editName: '', editAddress: '', editContactPhone: '', editServiceTime: [] })
      index = this.$refs.sharedTable.getIndexInList(index)
      this.$set(this.stores, index, item)
    },
    detailStore(store) {
      const storeId = store.id
      this.$router.push({ path: `/storeDetail/${storeId}` })
    },
    loadStore() {
      fetchStore({}).then(response => {
        this.stores = response.data
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .star {
    color: red;
  }
</style>
