<template>
  <shared-basic-table
    :useNameFilter="false"
    :originalData="originalData"
    :columnHeader="columnHeaders"
    :filterColumn="filterColumns"
    :exportFileName="exportFileName"
    ref="sharedTable">
    <template slot="table-columns" slot-scope="scope">
      <el-table-column :label="$t('order.operation')">
        <template slot-scope="scope">
          <!--<el-button size="mini" type="primary" @click="editOrder(scope.row)">
            {{ $t('operation.edit') }}
          </el-button>-->
          <el-button size="mini" type="danger" @click="deleteOrder(scope.row, scope.$index)">
            {{ $t('operation.delete') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.id')" prop="id" sortable/>
      <el-table-column :label="$t('order.username')" prop="username" sortable/>
      <el-table-column :label="$t('order.address')" prop="address" sortable/>
      <el-table-column :label="$t('order.receiver')" prop="receiver" sortable/>

      <el-table-column :label="$t('order.orderDate')" prop="orderDate" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.orderDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.totalPrice')" prop="totalPrice" sortable/>
      <el-table-column :label="$t('order.paidDate')" prop="paidDate" sortable>
        <template slot-scope="scope">
          <span> {{ scope.row.paidDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </template>
  </shared-basic-table>
</template>
<script>
import ShareBasicTable from '@/views/shared/shared-basic-table'
import { fetchWaitDeliveryOrder } from '@/api/order'
export default {
  name: 'WaitDeliveryOrder',
  components: {
    'shared-basic-table': ShareBasicTable
  },
  mounted: function () {
    this.loadData()
  },
  data() {
    return {
      originalData: [],
      columnHeaders: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice', 'PaidDate'],
      filterColumns: ['id', 'username', 'address', 'receiver', 'orderDate', 'totalPrice', 'paidDate'],
      exportFileName: 'wait_delivery_order'
    }
  },
  methods: {
    loadData() {
      fetchWaitDeliveryOrder({}).then(res => {
        setTimeout(() => {
          this.originalData = res.data.items
          this.$nextTick(() => {
            this.$refs.sharedTable.initData()
          })
        }, 1.5 * 1000)
      })
    },
    deleteOrder(order, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      this.originalData.splice(index, 1)
      this.$message({
        message: this.$t('order.deleteSuccess'),
        type: 'success'
      })
    },
    editOrder(order) {
      alert(order.id)
    }
  }
}
</script>
<style rel="stylesheet" lang="scss">
  .wait-delivery-order {
    color: green;
  }
</style>
