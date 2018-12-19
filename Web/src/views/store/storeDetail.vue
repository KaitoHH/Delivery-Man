<template>
  <div>
    <shared-basic-table
      ref="sharedTable"
      :original-data="storeGoods"
      :filter-column="filterColumn"
      :column-header="columnHeader"
      :export-file-name="exportFileName"
      @createEvent="addGoods()"
    >
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('storeGoods.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" class="operation-btn" size="mini" type="primary" @click="edit(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" class="operation-btn" size="mini" type="success" @click="update(scope.row, scope.$index)" >
              {{ $t('operation.save') }}
            </el-button>
            <el-button class="operation-btn" size="mini" type="danger" @click="deleteItem(scope.row, scope.$index)">
              {{ $t('operation.delete') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" class="operation-btn" size="mini" type="warning" @click="cancel(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('storeGoods.storeId')" prop="store" sortable/>
        <el-table-column :label="$t('storeGoods.goodsId')" prop="good" sortable/>
        <el-table-column :label="$t('storeGoods.goodsName')" prop="good_name" sortable/>
        <el-table-column :label="$t('storeGoods.goodsPrice')" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input-number :precision="2" v-model="scope.row.editGoodsPrice" :controls="false" :min="0" size="mini"/>
            </span>
            <span v-if="!scope.row.isEdit">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('storeGoods.goodsCount')" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit">
              <el-input-number v-model="scope.row.editGoodsCount" :precision="0" :min="0" :controls="false" size="mini"/>
            </span>
            <span v-if="!scope.row.isEdit">{{ scope.row.count }}</span>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <el-dialog
      :visible.synb="dialogVisible"
      :before-close="handleClose"
      title="Add Goods Item For Store">
      <el-form
        v-loading="isGoodsLoading"
        ref="goodsStockForm"
        :model="addGoodsStockForm"
        :rules="goodsStockRules"
        label-width="150px"
        class="demo-ruleForm">
        <el-form-item :label="$t('storeGoods.storeId')" prop="storeId">
          <el-input v-model="storeId" :disabled="true"/>
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsIdName')" prop="selectGoodsLabel">
          <el-autocomplete
            v-model="addGoodsStockForm.selectGoodsLabel"
            :fetch-suggestions="querySearchAsync"
            :placeholder="$t('storeGoods.goodsIdName')"
            style="width: 100%"
            @select="handleSelectGoods"
          />
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsPrice')" prop="goodsPrice">
          <el-input-number v-model="addGoodsStockForm.goodsPrice" :precision="2" :step="0.1" :min="0"/>
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsCount')" prop="goodsCount">
          <el-input-number v-model="addGoodsStockForm.goodsCount" :precision="0" :step="1" :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmAddGoodsItem">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { fetchStoreGoods, updateStoreStock, addStoreStock, deleteStoreGoods } from '@/api/store'
import { fetchGoods } from '@/api/goods'
import SharedBasicTable from '@/views/shared/shared-basic-table'
export default {
  name: 'StoreDetail',
  components: {
    'shared-basic-table': SharedBasicTable
  },
  data() {
    return {
      num7: 12,
      storeId: -1,
      dialogVisible: false,
      storeGoods: [],
      goods: [],
      filterGoods: [],
      isGoodsLoading: false,
      columnHeader: ['StoreId', 'GoodsId', 'GoodsName', 'GoodsPrice', 'GoodsCount'],
      filterColumn: ['storeId', 'goodsId', 'goodsName', 'goodsPrice', 'goodsCount'],
      exportFileName: 'store_goods_list',
      addGoodsStockForm: {
        selectGoodsLabel: '',
        selectGoods: null,
        goodsPrice: 0.00,
        goodsCount: 0
      },
      goodsStockRules: {
        selectGoodsLabel: [
          { required: true, message: this.$t('storeGoods.goodsIdNameInvalidMessage'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function() {
    this.storeId = this.$route.params.id
    this.loadStoreDetail()
  },
  methods: {
    loadStoreDetail() {
      fetchStoreGoods(this.storeId).then(res => {
        this.storeGoods = res.data.store_goods
        for (let i = 0; i < this.storeGoods.length; i++) {
          const item = this.storeGoods[i]
          Object.assign(item, { editGoodsCount: item.count, editGoodsPrice: item.price })
        }
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
      })
    },
    edit(item, index) {
      Object.assign(item, { isEdit: true })
      this.$set(this.storeGoods, index, item)
    },
    cancel(item, index) {
      Object.assign(item, { editGoodsCount: item.count, editGoodsPrice: item.price, isEdit: false })
      this.$set(this.storeGoods, index, item)
    },
    deleteItem(item, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      deleteStoreGoods(item.id).then(res => {
        this.storeGoods.splice(index, 1)
        this.$message({
          message: this.$t('storeGoods.deleteStoreGoodsSuccessfully'),
          type: 'success'
        })
      }).catch(e => {})
    },
    update(item, index) {
      if (item.count !== item.editGoodsCount || item.price !== item.editGoodsPrice) {
        Object.assign(item, { count: item.editGoodsCount, price: item.editGoodsPrice })
        index = this.$refs.sharedTable.getIndexInList(index)
        this.save(item, index)
      }
    },
    save(item, index) {
      updateStoreStock(item.id, {
        count: item.count,
        price: item.price
      }).then(res => {
        this.$message({
          message: this.$t('store.updateStoreGoodsDetailSuccess'),
          type: 'success'
        })
        Object.assign(item, { isEdit: false })
        this.$set(this.storeGoods, index, item)
      }).catch(e => {
        console.log(e)
      })
    },
    querySearchAsync(queryString, cb) {
      fetchGoods({}).then(res => {
        setTimeout(() => {
          this.goods = res.data
          const result = this.goods.filter(goods => {
            const identify = `${goods.id}-${goods.name}`
            goods['value'] = identify
            return identify.indexOf(queryString) >= 0
          })
          cb(result)
        }, 0.5 * 1000)
      })
    },
    handleSelectGoods(item) {
      this.addGoodsStockForm.selectGoods = item
    },
    addGoods() {
      this.dialogVisible = true
      this.isGoodsLoading = true
      fetchGoods({}).then(res => {
        setTimeout(() => {
          this.goods = res.data.items
          this.isGoodsLoading = false
          console.log(this.goods)
        }, 1.5 * 1000)
      })
    },
    closeAddDialog() {
      this.dialogVisible = false
      this.clearDialogFormData()
    },
    clearDialogFormData() {
      Object.assign(this.addGoodsStockForm, { selectGoodsLabel: '', selectGoods: null, goodsPrice: 0.00, goodsCount: 0 })
    },
    confirmAddGoodsItem() {
      const data = {
        storeId: this.storeId,
        goodsId: this.addGoodsStockForm.selectGoods.id,
        goodsPrice: this.addGoodsStockForm.goodsPrice,
        goodsCount: this.addGoodsStockForm.goodsCount,
        goodsName: this.addGoodsStockForm.selectGoods.name
      }
      let existItem = null
      let existItemIndex = -1
      for (let i = 0; i < this.storeGoods.length; i++) {
        if (this.storeGoods[i].good === data.goodsId) {
          existItemIndex = i
          existItem = this.storeGoods[i]
          break
        }
      }
      console.log(existItem)
      if (existItem !== null) {
        const item = { id: existItem.id, store: data.storeId, good: data.goodsName, good_name: data.goodsName,
          count: existItem.count + data.goodsCount,
          price: data.goodsPrice }
        this.save(item, existItemIndex)
      } else {
        addStoreStock({
          store: data.storeId,
          good: data.goodsId,
          price: data.goodsPrice,
          count: data.goodsCount
        }).then(res => {
          this.addStockToLocalStockList(res.data)
          this.$message({
            message: this.$t('store.updateStoreGoodsDetailSuccess'),
            type: 'success'
          })
        })
      }
      this.closeAddDialog()
    },
    addStockToLocalStockList(data) {
      this.storeGoods.push( Object.assign(data, { editGoodsCount: data.count, editGoodsPrice: data.price }))
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.closeAddDialog()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .operation-btn {
    margin-left: 10px;
    margin-bottom: 2px;
  }
</style>
