<template>
  <share-basic-table
    ref="sharedTable"
    :originalData="orders"
    :columnHeaders="columnHeaders"
    :exportFileName="exportFileName"
    :filterColumns="filterColumns"
    :useNameFilter="false">
    <template slot="table-columns" slot-scope="scope">
      <el-table-column :label="$t('order.operation')">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteOrder(scope.row, scope.$index)">
            {{ $t('operation.delete') }}
          </el-button>
          <!--<el-button type="primary" size="mini" @click="editOrder(scope.row)">
            {{ $t('operation.edit') }}
          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.id')" prop="id" sortable/>
      <el-table-column :label="$t('order.username')" prop="username" sortable/>
      <el-table-column :label="$t('order.address')" prop="address" sortable/>
      <el-table-column :label="$t('order.receiver')" prop="receiver" sortable/>

      <el-table-column :label="$t('order.orderDate')" prop="orderDate" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.orderDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.totalPrice')" prop="totalPrice" sortable/>

    </template>
  </share-basic-table>
</template>
<script>
import { fetchUnpaidOrder } from '@/api/order'
import ShareBasicTable from '@/views/shared/shared-basic-table'
export default {
  name: 'UnpaidOrder',
  components: {
    'share-basic-table': ShareBasicTable
  },
  mounted: function () {
    this.loadData()
  },
  data() {
    return {
      orders: [],
      columnHeaders: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice'],
      filterColumns: ['id', 'username', 'address', 'receiver', 'orderDate', 'totalPrice'],
      exportFileName: 'unpaid_order_list'
    }
  },
  methods: {
    loadData() {
      fetchUnpaidOrder({}).then(res => {
        setTimeout(() => {
          this.orders = res.data.items
          this.$nextTick(() => {
            this.$refs.sharedTable.initData()
          })
        })
      })
    },
    deleteOrder(order, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      this.orders.splice(index, 1)
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
<style rel="stylesheet/scss" lang="scss">
  .unpaid-order {
    color: green;
  }
</style>
