<template>
  <div class="app-container">
    <el-table
      v-loading="userLoading"
      :table-key="tableKey"
      :data="users"
      border
      fit
      highlight-current-row>
      <el-table-column :label="$t('user.id')" prop="id" sortable/>
      <el-table-column :label="$t('user.name')" prop="name" sortable/>
      <el-table-column :label="$t('user.registerDate')" sortable sort-by="registerDate">
        <template slot-scope="scope">
          <span>{{ scope.row.registerDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.credit')" prop="credit" sortable>
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.credit" :key="n" icon-class="star" class="meta-item__icon credit"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.status')" prop="credit" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'open' ? 'success' : 'danger'">{{ $t('user.status_enum.' + scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('user.operation')"/>
    </el-table>
  </div>
</template>
<script>
import { fetchUser } from '@/api/user'
import { parseTime } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      users: [],
      tableKey: 0,
      userLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser: function() {
      this.userLoading = true
      fetchUser(this.listQuery).then(response => {
        this.users = response.data.items
        this.total = response.data.total
        console.log(this.users)
        setTimeout(() => {
          this.userLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .credit {
    color: green;
  }
</style>
