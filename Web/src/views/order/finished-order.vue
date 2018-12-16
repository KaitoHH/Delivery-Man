<template>
  <shared-basic-table
    ref="sharedTable"
    :original-data="finishedOrder"
    :column-header="columnHeader"
    :filter-column="filterColumn"
    :use-name-filter="false"
  >
    <template slot="table-columns" slot-scope="scope">
      <el-table-column :label="$t('order.operation')" align="left">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteOrder(scope.row, scope.$index)">
            {{ $t('operation.delete') }}
          </el-button>
          <!--<el-button style="margin-left: 10px; margin-bottom: 2px" size="mini" type="primary" @click="editOrder(scope.row)">
            {{ $t('operation.edit') }}
          </el-button>
          <el-button  size="mini" type="warning" @click="detailOrder(scope.row)">
            {{ $t('operation.detail') }}
          </el-button>-->
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
      <el-table-column :label="$t('order.deliveryDate')" prop="finishTime" sortable>
        <template slot-scope="scope">
          <span> {{ scope.row.finishTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </template>
  </shared-basic-table>
</template>
<script>
import SharedBasicTable from '@/views/shared/shared-basic-table'
import { fetchFinishedOrder } from '@/api/order'
import { fetchOneUser } from '@/api/user'
export default {
  name: 'FinishedOrder',
  components: {
    'shared-basic-table': SharedBasicTable
  },
  data() {
    return {
      finishedOrder: [],
      columnHeader: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice', 'PaidDate', 'DeliveryUserName', 'DeliveryAcceptDate', 'DeliveryDate'],
      filterColumn: ['id', 'username', 'address', 'receiver', 'orderDate', 'totalPrice', 'paidDate', 'deliveryUserName', 'deliveryAcceptDate', 'deliveryDate']
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      fetchFinishedOrder({}).then(res => {
        this.finishedOrder = res.data
        let i = 0
        this.finishedOrder.forEach(o => {
          const index = i++
          Object.assign(o, {
            totalPrice: (Number.parseFloat(o.price) +
              Number.parseFloat(o.ship)).toFixed(2)
          })
          fetchOneUser(o.user).then(res => {
            this.$set(this.finishedOrder, index, Object.assign(o, {
              username: res.data.nickname
            }))
          }).catch(e => {
            console.log(e)
          })
          fetchOneUser(o.courier).then(res => {
            this.$set(this.finishedOrder, index, Object.assign(o, {
              deliveryUserName: res.data.nickname
            }))
          }).catch(e => { console.log(e) })
        })
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
      })
    },
    detailOrder(order) {
      alert(`Order Detail: ${order.id}`)
    },
    deleteOrder(order, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      this.finishedOrder.splice(index, 1)
      this.$message({
        'message': this.$t('order.deleteSuccess'),
        'type': 'success'
      })
    },
    editOrder(order) {
      alert(`Edit Order: ${order.id}`)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .message {
    color: green;
  }
</style>
