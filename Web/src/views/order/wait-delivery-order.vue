<template>
  <shared-basic-table
    ref="sharedTable"
    :use-name-filter="false"
    :original-data="originalData"
    :column-header="columnHeaders"
    :filter-column="filterColumns"
    :export-file-name="exportFileName">
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
    </template>
  </shared-basic-table>
</template>
<script>
import ShareBasicTable from '@/views/shared/shared-basic-table'
import { fetchWaitDeliveryOrder } from '@/api/order'
import { fetchOneUser } from '@/api/user'
export default {
  name: 'WaitDeliveryOrder',
  components: {
    'shared-basic-table': ShareBasicTable
  },
  data() {
    return {
      originalData: [],
      columnHeaders: ['Id', 'Username', 'Address', 'Receiver', 'OrderDate', 'TotalPrice', 'PaidDate'],
      filterColumns: ['id', 'username', 'address', 'receiver', 'createTime', 'totalPrice', 'payTime'],
      exportFileName: 'wait_delivery_order'
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      fetchWaitDeliveryOrder({}).then(res => {
        this.originalData = res.data
        let i = 0
        this.originalData.forEach(o => {
          const index = i++
          Object.assign(o, {
            totalPrice: (Number.parseFloat(o.price) +
              Number.parseFloat(o.ship)).toFixed(2)
          })
          fetchOneUser(o.user).then(res => {
            this.$set(this.originalData, index, Object.assign(o, {
              username: res.data.nickname
            }))
          }).catch(e => {
            console.log(e)
          })
        })
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
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
