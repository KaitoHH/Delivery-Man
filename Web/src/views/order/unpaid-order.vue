<template>
  <share-basic-table
    ref="sharedTable"
    :original-data="orders"
    :column-header="columnHeaders"
    :export-file-name="exportFileName"
    :filter-column="filterColumns"
    :use-name-filter="false">
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

      <el-table-column :label="$t('order.orderDate')" prop="createTime" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('order.totalPrice')" prop="totalPrice" sortable/>

    </template>
  </share-basic-table>
</template>
<script>
import { fetchUnpaidOrder } from '@/api/order'
import { fetchOneUser } from '@/api/user'
import ShareBasicTable from '@/views/shared/shared-basic-table'
export default {
  name: 'UnpaidOrder',
  components: {
    'share-basic-table': ShareBasicTable
  },
  data() {
    return {
      orders: [],
      columnHeaders: ['Id', 'Username', 'Address', 'Receiver', 'CreateTime', 'TotalPrice'],
      filterColumns: ['id', 'username', 'address', 'receiver', 'createTime', 'totalPrice'],
      exportFileName: 'unpaid_order_list'
    }
  },
  mounted: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      fetchUnpaidOrder({}).then(res => {
        this.orders = res.data
        let i = 0
        this.orders.forEach(o => {
          const index = i++
          Object.assign(o, {
            totalPrice: (Number.parseFloat(o.price) +
            Number.parseFloat(o.ship)).toFixed(2)
          })
          fetchOneUser(o.user).then(res => {
            this.$set(this.orders, index, Object.assign(o, {
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
