<template>
  <div>
    <shared-basic-table
      ref="sharedTable"
      :originalData="storeGoods"
      @createEvent="addGoods()"
      :filterColumn="filterColumn"
      :columnHeader="columnHeader"
      :exportFileName="exportFileName"
    >
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('storeGoods.operation')">
          <template slot-scope="scope">
              <el-button class="operation-btn"  v-if="!scope.row.isEdit" @click="edit(scope.row, scope.$index)" size="mini" type="primary">
              {{ $t('operation.edit') }}
              </el-button>
            <el-button class="operation-btn" v-if="scope.row.isEdit" size="mini" type="success" @click="save(scope.row, scope.$index)" >
              {{ $t('operation.save') }}
            </el-button>
            <el-button class="operation-btn" size="mini" type="danger" @click="deleteItem(scope.row, scope.$index)">
              {{ $t('operation.delete') }}
            </el-button>
            <el-button class="operation-btn" v-if="scope.row.isEdit" size="mini" type="warning" @click="cancel(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('storeGoods.storeId')" prop="storeId" sortable/>
        <el-table-column :label="$t('storeGoods.goodsId')" prop="goodsId" sortable/>
        <el-table-column :label="$t('storeGoods.goodsName')" prop="goodsName" sortable/>
        <el-table-column :label="$t('storeGoods.goodsPrice')" sortable>
          <template slot-scope="scope">
           <span v-if="scope.row.isEdit">
             <el-input-number :precision="2" v-model="scope.row.editGoodsPrice" :controls="false"  size="mini"  :min="0">
             </el-input-number>
           </span>
            <span v-if="!scope.row.isEdit">{{ scope.row.goodsPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('storeGoods.goodsCount')" sortable>
          <template slot-scope="scope">
          <span v-if="scope.row.isEdit">
            <el-input-number v-model="scope.row.editGoodsCount" :precision="0" :min="0" :controls="false"  size="mini"></el-input-number>
          </span>
            <span v-if="!scope.row.isEdit">{{ scope.row.goodsCount }}</span>
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
        :model="addGoodsStockForm" :rules="goodsStockRules" ref="goodsStockForm" label-width="150px" class="demo-ruleForm">
        <el-form-item :label="$t('storeGoods.storeId')" prop="storeId">
          <el-input v-model="storeId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsIdName')" prop="selectGoodsLabel">
          <el-autocomplete
            v-model="addGoodsStockForm.selectGoodsLabel"
            style="width: 100%"
            :fetch-suggestions="querySearchAsync"
            :placeholder="$t('storeGoods.goodsIdName')"
            @select="handleSelectGoods"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsPrice')" prop="goodsPrice">
          <el-input-number v-model="addGoodsStockForm.goodsPrice" :precision="2" :step="0.1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('storeGoods.goodsCount')" prop="goodsCount">
          <el-input-number v-model="addGoodsStockForm.goodsCount" :precision="0" :step="1" :min="0"></el-input-number>
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
  import { fetchStoreGoods, addStoreStockGoods } from '@/api/store'
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
          goodsCount: 0,
        },
        goodsStockRules: {
          selectGoodsLabel: [
            {required: true, message: this.$t('storeGoods.goodsIdNameInvalidMessage'), trigger: 'blur'}
          ],
        }
      }
    },
    mounted: function () {
      this.storeId = this.$route.params.id;
      this.loadStoreDetail()
    },
    methods: {
      loadStoreDetail() {
        fetchStoreGoods(this.storeId).then(res => {
          setTimeout(() => {
            this.storeGoods = res.data.items
            for (let i = 0; i < this.storeGoods.length; i++ ) {
              const item = this.storeGoods[i]
              Object.assign(item, { editGoodsCount: item.goodsCount, editGoodsPrice: item.goodsPrice })
            }
            this.$nextTick(() => {
              this.$refs.sharedTable.initData()
            })
          }, 1.5 * 1000)
        })
      },
      edit(item, index) {
        Object.assign(item, {isEdit: true})
        this.$set(this.storeGoods, index, item)
      },
      cancel(item, index) {
        Object.assign(item, {editGoodsCount: item.goodsCount, editGoodsPrice: item.goodsPrice , isEdit: false})
        this.$set(this.storeGoods, index, item)
      },
      deleteItem(item, index) {
        this.storeGoods.splice(index, 1)
        this.$message({
          message: 'Delete successfully',
          type: 'success'
        })
      },
      save(item, index) {
        if (item.goodsCount !== item.editGoodsCount || item.goodsPrice !== item.editGoodsPrice) {
          Object.assign(item, {goodsCount: item.editGoodsCount, goodsPrice: item.editGoodsPrice })
          this.$message({
            message: 'Update successfully',
            type: 'success'
          })
        }
        Object.assign(item, {isEdit: false})
        this.$set(this.storeGoods, index, item)
      },
      querySearchAsync(queryString, cb) {
        fetchGoods({}).then(res => {
          setTimeout(() => {
            this.goods = res.data.items
            const result  = this.goods.filter(goods => {
              const identify = `${goods.id}-${goods.name}`
              goods['value'] = identify
              return identify.indexOf(queryString) >= 0
            })
            cb(result)
          }, 0.5 * 1000)
        });
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
        Object.assign(this.addGoodsStockForm, { selectGoodsLabel: '', selectGoods: null, goodsPrice: 0.00, goodsCount: 0})
      },
      confirmAddGoodsItem() {
        const data = {
          storeId: this.storeId,
          goodsId: this.addGoodsStockForm.selectGoods.id,
          goodsPrice: this.addGoodsStockForm.goodsPrice,
          goodsCount: this.addGoodsStockForm.goodsCount,
          goodsName: this.addGoodsStockForm.selectGoods.name
        }
        addStoreStockGoods(data).then(res => {
          this.addStockToLocalStockList({
            storeId: this.storeId,
            goodsId: data.goodsId,
            goodsName: data.goodsName,
            goodsPrice: data.goodsPrice,
            goodsCount: data.goodsCount
          })
          this.$message({
            message: 'Add Store Stock Successfully!',
            type: 'success'
          })
        })
        this.closeAddDialog()
      },
      addStockToLocalStockList(data) {
        this.storeGoods.push(data)
      },
      handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.closeAddDialog()
          })
          .catch(_ => {});
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
