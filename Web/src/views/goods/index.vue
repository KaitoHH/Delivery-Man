<template>
  <div>
    <shared-basic-table
      ref="sharedTable"
      :column-header="columnHeader"
      :filter-column="filterColumnVal"
      :export-file-name="exportFileName"
      :original-data="goods"
      @createEvent="showAddGoodsDialog()">
      <template slot="table-columns" slot-scope="scope">
        <el-table-column :label="$t('goods.operation')">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" size="mini" type="primary" @click="editGoods(scope.row, scope.$index)">
              {{ $t('operation.edit') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" size="mini" type="success" @click="saveGoods(scope.row, scope.$index)">
              {{ $t('operation.save') }}
            </el-button>
            <el-button v-if="scope.row.isEdit" size="mini" type="warning" @click="cancelEdit(scope.row, scope.$index)">
              {{ $t('operation.cancel') }}
            </el-button>
            <el-button size="mini" type="danger" @click="deleteGoods(scope.row, scope.$index)">
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
              <el-input
                :placeholder="scope.row.name"
                v-model="scope.row.editName"
                size="mini"/>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('goods.desc')" prop="desc" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">
              {{ scope.row.desc }}
            </span>
            <span v-else>
              <el-input
                :placeholder="scope.row.desc"
                v-model="scope.row.editDesc"
                size="mini"/>
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('goods.img')" prop="img" width="200px" align="center">
          <template slot-scope="scope">
            <span class="image-block" @click="showBiggerImg(scope.row, scope.$index)">
              <img
                :src="(scope.row.isEdit && scope.row.tempImageUpload) ? scope.row.tempImageUpload: scope.row.img"
                style="vertical-align: middle"
                height="25px"
                width="25px">
            </span>
          </template>
        </el-table-column>
      </template>
    </shared-basic-table>
    <image-upload
      v-model="imgUploadVisible"
      :no-circle="true"
      :no-square="true"
      :width="300"
      :height="300"
      url=""
      @crop-success="cropSuccess"/>
    <el-dialog :title="selectGoods.name" :visible.sync="imgDialogVisible">
      <div class="bigger-good-img-block">
        <img :src="selectGoods.img" class="img">
      </div>
    </el-dialog>
    <good-add-dialog
      ref="goodAddDialog"
      @goodAddEvent="addGoods"/>
  </div>
</template>
<script>
import { fetchGoods, addGoods, updateGoods, deleteGoods } from '@/api/goods'
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
      columnHeader: ['Id', 'Name', 'Desc'],
      filterColumnVal: ['id', 'name', 'desc'],
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
        this.goods = response.data
        this.$nextTick(() => {
          this.$refs.sharedTable.initData()
        })
      })
    },
    editGoods(item, index) {
      index = this.$refs.sharedTable.getIndexInList(index)
      const newGoods = Object.assign({}, item, { isEdit: true })
      this.$set(this.goods, index, newGoods)
    },
    deleteGoods(item, index) {
      deleteGoods(item.id).then(res => {
        index = this.$refs.sharedTable.getIndexInList(index)
        this.goods.splice(index, 1)
        this.$message({
          message: this.$t('goods.deleteGoodsSuccess'),
          type: 'success'
        })
      }).catch(e => {
        console.log(e)
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
        Object.assign(newGoods, { img: item.tempImageUpload })
      }
      if (item.editName && item.editName.trim() !== '' && item.editName !== item.name) {
        Object.assign(newGoods, { editName: '', name: item.editName })
      }
      if (item.editDesc && item.editDesc.trim() !== '' && item.editDesc !== item.desc) {
        Object.assign(newGoods, { editDesc: '', desc: item.editDesc })
      }
      delete newGoods['img']
      updateGoods(item.id, newGoods).then(res => {
        index = this.$refs.sharedTable.getIndexInList(index)
        this.$set(this.goods, index, res.data)
        this.$message({
          message: this.$t('goods.updateGoodsSuccess'),
          type: 'success'
        })
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
    cropSuccess(imgDataUrl, field) {
      const newGoods = Object.assign({}, this.selectGoods, { tempImageUpload: imgDataUrl })
      const index = this.$refs.sharedTable.getIndexInList(this.selectIndex)
      this.$set(this.goods, index, newGoods)
    },
    showAddGoodsDialog() {
      this.$refs.goodAddDialog.showDialog()
    },
    addGoods(goods) {
      addGoods({
        name: goods.name,
        desc: goods.desc
      }).then((res) => {
        console.log(res)
        this.goods.push(res.data)
        this.$message({
          message: this.$t('goods.addGoodsSuccess'),
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
