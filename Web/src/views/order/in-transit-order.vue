<template>
  <shared-basic-table
    ref="sharedTable"
    :use-name-filter="false"
    :column-header="columnHeader"
    :filter-column="filterColumn"
    :export-file-name="exportFileName"
    :original-data="inTransitOrders"
    class="in-transit-order">
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
      <el-table-column :label="$t('order.orderDate')" prop="createTime" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.totalPrice')" prop="totalPrice" sortable/>
      <el-table-column :label="$t('order.paidDate')" prop="payTime" sortable>
        <template slot-scope="scope">
          <span> {{ scope.row.payTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.deliveryUserName')" prop="deliveryUserName" sortable/>
      <el-table-column :label="$t('order.deliveryAcceptDate')" prop="acceptTime" sortable>
        <template slot-scope="scope">
          <span> {{ scope.row.acceptTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </template>
  </shared-basic-table>
</template>
<script>
import SharedBasicTable from '@/views/shared/shared-basic-table'
import { fectchInTransitOrder } from '@/api/order'
import { fetchOneUser } from '@/api/user'
export default {
  name: 'InTransitOrder',
  components: {
    'shared-basic-table': SharedBasicTable
  },
  data() {
    return {
      inTransitOrders: [],
      columnHeader: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice', 'PaidDate', 'DeliveryUserName', 'DeliveryAcceptDate'],
      filterColumn: ['id', 'username', 'address', 'receiver', 'createTime', 'totalPrice', 'payTime', 'deliveryUserName', 'acceptTime'],
      exportFileName: 'in_transit_order_list'
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      fectchInTransitOrder({}).then((res) => {
        this.inTransitOrders = res.data
        let i = 0
        this.inTransitOrders.forEach(o => {
          const index = i++
          Object.assign(o, {
            totalPrice: (Number.parseFloat(o.price) +
              Number.parseFloat(o.ship)).toFixed(2)
          })
          fetchOneUser(o.user).then(res => {
            this.$set(this.inTransitOrders, index, Object.assign(o, {
              username: res.data.nickname
            }))
          }).catch(e => {
            console.log(e)
          })
          fetchOneUser(o.courier).then(res => {
            this.$set(this.inTransitOrders, index, Object.assign(o, {
              deliveryUserName: res.data.nickname
            }))
          }).catch(e => { console.log(e) })
        })
        console.log(res.data)
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
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
