<template>
  <shared-basic-table class="in-transit-order"
                      ref="sharedTable"
       :useNameFilter="false"
       :columnHeader="columnHeader"
       :filterColumn="filterColumn"
       :exportFileName="exportFileName"
       :originalData="inTransitOrders">
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
      <el-table-column :label="$t('order.deliveryUserName')" prop="deliveryUserName" sortable/>
      <el-table-column :label="$t('order.deliveryAcceptDate')" prop="deliveryAcceptDate" sortable>
        <template slot-scope="scope">
          <span> {{ scope.row.deliveryAcceptDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </template>
  </shared-basic-table>
</template>
<script>
import SharedBasicTable from '@/views/shared/shared-basic-table'
import { fectchInTransitOrder } from '@/api/order'
export default {
  name: 'InTransitOrder',
  components: {
    'shared-basic-table': SharedBasicTable
  },
  data() {
    return {
      inTransitOrders: [],
      columnHeader: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice', 'PaidDate', 'DeliveryUserName', 'DeliveryAcceptDate'],
      filterColumn: ['id', 'username', 'address', 'receiver', 'orderDate', 'totalPrice', 'paidDate', 'deliveryUserName', 'deliveryAcceptDate'],
      exportFileName: 'in_transit_order_list'
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData() {
      fectchInTransitOrder({}).then((res) => {
        setTimeout(() => {
          this.inTransitOrders = res.data.items
          this.$nextTick(() => {
            this.$refs.sharedTable.initData()
          })
        }, 1.5 * 1000)
      })
    },
    deleteOrder(order, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      this.inTransitOrders.splice(index, 1)
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .in-transit-order {
    color: green;
  }
</style>
