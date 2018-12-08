<template>
  <div>
    <shared-basic-table
      @createEvent="showAddGoodsDialog()"
      ref="sharedTable" :columnHeader="columnHeader" :filterColumn="filterColumnVal" :exportFileName="exportFileName" :originalData="goods">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('goods.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" size="mini"  type='primary' @click="editGoods(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" size="mini" type="success" @click="saveGoods(scope.row, scope.$index)">
              {{ $t('operation.save') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" size="mini" type="warning" @click="cancelEdit(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
            <el-button  size="mini" type="danger" @click="deleteGoods(scope.$index)">
              {{ $t('operation.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('goods.id')" prop="id" sortable/>
        <el-table-column :label="$t('goods.name')" prop="name" sortable>
          <template slot-scope="scope">
          <span v-if="!scope.row.isEdit">
            {{ scope.row.name }}
          </span>
            <span v-else>
            <el-input size="mini" :placeholder="scope.row.name"
                      v-model="scope.row.editName">
            </el-input>
          </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('goods.img')" prop="img" width="200px" align="center">
          <template slot-scope="scope">
          <span class="image-block" @click="showBiggerImg(scope.row, scope.$index)">
            <img style="vertical-align: middle" height="25px" width="25px"
                 :src="(scope.row.isEdit && scope.row.tempImageUpload) ? scope.row.tempImageUpload: scope.row.img"/>
          </span>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <image-upload
      v-model="imgUploadVisible"
      :noCircle="true"
      :noSquare="true"
      @crop-success="cropSuccess"
      :width="300"
       url=""
      :height="300">
    </image-upload>
    <el-dialog :title="selectGoods.name" :visible.sync="imgDialogVisible">
      <div class="bigger-good-img-block">
        <img class="img" :src="selectGoods.img"/>
      </div>
    </el-dialog>
    <good-add-dialog
      ref="goodAddDialog"
      @goodAddEvent="addGoods">

    </good-add-dialog>
  </div>
</template>
<script>
import { fetchGoods, addGoods } from '@/api/goods'
import ImageUpload from 'vue-image-crop-upload'
import SharedBasicTable from '@/views/shared/shared-basic-table'
import GoodAddDialog from '@/views/goods/good-add-dialog'
export default {
  name: 'Good',
  components: {
    'shared-basic-table': SharedBasicTable,
    'image-upload': ImageUpload,
    'good-add-dialog': GoodAddDialog
  },
  data() {
    return {
      goods: [],
      columnHeader: ['Id', 'Name'],
      filterColumnVal: ['id', 'name'],
      exportFileName: 'goods_list',
      imgDialogVisible: false,
      imgUploadVisible: false,
      selectIndex: -1,
      selectGoods: {},
      imgDataUrl: ''
    }
  },
  mounted: function() {
    this.loadGoods()
  },
  methods: {
    loadGoods() {
      fetchGoods({}).then(response => {
        setTimeout(() => {
          this.goods = response.data.items
          this.$nextTick(() => {
            this.$refs.sharedTable.initData()
          })
        }, 1.5 * 1000)
      })
    },
    editGoods(item, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      const newGoods = Object.assign({}, item, {isEdit: true})
      this.$set(this.goods, index, newGoods)
    },
    deleteGoods(index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      this.goods.splice(index, 1)
      this.$message({
        message: 'Delete Goods Successfully',
        type: 'success'
      })
    },
    cancelEdit(item, index) {
      const newGoods = Object.assign({}, item, { editName: '', isEdit: false, tempImageUpload: item.img })
      index = this.$refs.sharedTable.getIndexInList(index)
      this.$set(this.goods, index, newGoods)
    },
    saveGoods(item, index) {
      const newGoods = Object.assign({}, item)
      if (item.tempImageUpload) {
        Object.assign(newGoods, {img: item.tempImageUpload })
      }
      if (item.editName && item.editName.trim() !== '' && item.editName !== item.name) {
        Object.assign(newGoods, { editName: '', name: item.editName })
      }
      Object.assign(newGoods, {isEdit: false })
      index = this.$refs.sharedTable.getIndexInList(index)
      console.log(index)
      this.$set(this.goods, index, newGoods)
      this.$message({
        message: 'Update Goods Successfully',
        type: 'success'
      })
    },
    showBiggerImg(goods, index) {
      this.selectGoods = goods
      this.selectIndex = index
      if (goods.isEdit) {
        this.imgUploadVisible = true
      } else {
        this.imgDialogVisible = true
      }
    },
    cropSuccess(imgDataUrl, field){
      const newGoods = Object.assign({}, this.selectGoods, {tempImageUpload: imgDataUrl})
      const index = this.$refs.sharedTable.getIndexInList(this.selectIndex)
      this.$set(this.goods, index, newGoods)
    },
    showAddGoodsDialog() {
      this.$refs.goodAddDialog.showDialog()
    },
    addGoods(goods) {
      addGoods(goods).then((res) => {
        console.log(res)
        this.goods.push(res.data.item)
        this.$message({
          message: 'Add Goods Successfully!',
          type: 'success'
        })
        this.$refs.goodAddDialog.closeDialog()
      })
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
  .good {
    color: green;
  }
  .image-block {
    cursor: url('../../assets/img/bigger.jpg'), pointer;
  }
  .bigger-good-img-block {
    text-align: center;

    .img {
      height: 200px;
      width: 200px;
    }
  }
</style>
