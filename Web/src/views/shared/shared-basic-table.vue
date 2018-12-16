<template>
  <div class="app-container">
    <div class="filter-container">
      <span v-if="useNameFilter">
        <el-input
          :placeholder="$t('user.name')"
          v-model="queryName"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="handleSearch"/>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
          {{ $t('table.search') }}
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate">{{ $t('table.add') }}
        </el-button>
      </span>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        {{ $t('table.export') }}
      </el-button>
    </div>
    <el-table
      v-loading="isLoading"
      :table-key="tableKey"
      :data="filterData"
      border
      fit
      highlight-current-row
      @sort-change="sortChange">
      <div>
        <slot name="table-columns"/>
      </div>
    </el-table>
    <div class="pager">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // Waves directive
export default {
  name: 'SharedBasicTable',
  directives: { waves },
  props: {
    originalData: { default: () => [] },
    columnHeader: { default: () => [] },
    exportFileName: { default: () => 'excel_list' },
    filterColumn: { default: () => {} },
    useNameFilter: { default: () => true }
  },
  data() {
    return {
      tableKey: 0,
      filterData: [],
      tempData: [],
      total: 0,
      isLoading: false,
      pageSize: 10,
      currentPage: 1,
      queryName: '',
      downloadLoading: false
    }
  },
  watch: {
    originalData(newValue, oldValue) {
      this.originalData = newValue
      this.refreshData()
    }
  },
  mounted: function() {
    this.isLoading = true
  },
  methods: {
    initData() {
      this.copyData()
      this.currentPage = 1
      this.isLoading = false
      this.updatePagination()
    },
    copyData() {
      this.filterData = this.originalData
      this.tempData = this.originalData
      this.total = this.tempData.length
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.updatePagination()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.updatePagination()
    },
    updatePagination() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.filterData = this.tempData.slice(start, end)
    },
    getIndexInList(index) {
      return (this.currentPage - 1) * this.pageSize + index
    },
    refreshData() {
      this.filterData = this.originalData
      this.tempData = this.originalData
      this.total = this.tempData.length
      this.updatePagination()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: this.$t('operationSuccess'),
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      this.tempData = this.tempData.sort((a, b) => {
        if (a === b) {
          return 0
        }
        if (order === 'ascending') {
          return a[`${prop}`] < b[`${prop}`] ? -1 : 1
        }
        return a[`${prop}`] < b[`${prop}`] ? 1 : -1
      })
      this.updatePagination()
    },
    handleSearch() {
      this.tempData = this.originalData.filter(u => {
        const keyword = this.queryName.toLowerCase()
        console.log(keyword)
        return keyword === '' || u.name.toLowerCase().indexOf(keyword) >= 0
      })
      this.total = this.tempData.length
      this.updatePagination()
    },
    handleCreate() {
      this.$emit('createEvent')
    },
    handleDownload() {
      this.downloadLoading = true
      const that = this
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = this.columnHeader
          const filterVal = this.filterColumn
          const data = this.formatJson(filterVal, this.tempData)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: that.exportFileName
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      const dateColumns = ['register_date', 'payTime', 'createTime', 'acceptTime', 'finishTime',
        'registerDate', 'orderDate', 'paidDate', 'deliveryAcceptDate', 'deliveryDate']
      return jsonData.map(v => filterVal.map(j => {
        if (dateColumns.indexOf(j) >= 0) {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .credit {
    color: green;
  }
  .pager {
    margin-top: 10px;
  }
</style>
