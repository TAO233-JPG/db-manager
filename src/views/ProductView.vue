<template>
  <div class="operation-group">
    <el-button @click="add" type="primary">新增</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    size="large"
    :border="true"
    fit
    :max-height="tableHeight"
    stripe
    :highlight-current-row="true"
    header-row-class-name="table-header"
    :header-row-style="{ backgroundColor: '#f5f7fa' }"
  >
    <el-table-column type="index" width="50" fixed />
    <el-table-column fixed prop="carVin" label="车辆标识号" />
    <el-table-column
      prop="distributor.distributorUsername"
      label="经销商名称"
    />
    <el-table-column prop="modelDetail.modelName" label="品牌名称" />
    <el-table-column prop="modelDetail.brand.brandName" label="模型名称" />
    <el-table-column label="Operations" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
        <el-button size="small" @click="handleOption(scope.row)"
          >修改选项</el-button
        >
        <!-- <el-button size="small" @click="handleOption(scope.row)"
          >修改选项</el-button
        > -->
        <el-button size="small" type="danger" @click="handleDelete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableDataTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 编辑产品 -->
  <div>
    <el-dialog v-model="dialogFormVisible" title="编辑经销商" center>
      <el-form :model="form" label-width="140px" style="max-width: 580px">
        <el-form-item label="车辆标识号">
          <el-input v-model="form.carVin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商编号">
          <el-input v-model="form.carDistributorId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="车辆所属模型">
          <el-input v-model="form.carModelId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit"> 确定修改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- 新增产品 -->
  <div>
    <el-dialog v-model="addFormVisible" title="新增经销商" center>
      <el-form :model="addForm" label-width="140px" style="max-width: 580px">
        <el-form-item label="车辆标识号">
          <el-input v-model="addForm.carVin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商编号">
          <el-input v-model="addForm.carDistributorId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="车辆所属模型">
          <el-input v-model="addForm.carModelId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd"> 确定修改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- 修改选项 -->
  <div>
    <el-dialog v-model="optionFormVisible" title="修改选项" center>
      <el-checkbox-group v-model="checkedIDOption">
        <el-checkbox v-for="op in optionList" :key="op" :label="op">{{
          optionName[op]
        }}</el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="optionFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmHandleOption">
            确定修改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { throttle } from "lodash";
import { useProductStore, type OptionT, type ProductT } from "@/stores/product";

const tableHeight = ref(500);

function setHeight() {
  const mainEl = document.querySelector(".el-main");
  tableHeight.value = mainEl!.clientHeight - 102;
  console.log(tableHeight.value, "tableHeight.value");
}
const setHeightThrottle = throttle(setHeight, 230);
onMounted(() => {
  window.addEventListener("resize", setHeightThrottle, false);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setHeightThrottle);
});

const store = useProductStore();

onMounted(async () => {
  await store.get();
});
const tableData = computed(() => {
  return store.cars;
});
const tableDataTotal = computed(() => {
  return tableData.value.length;
});
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const handleEdit = (data: ProductT) => {
  console.log("handleEdit", data);
  dialogFormVisible.value = true;
  form.value = { ...form.value, ...data };
};

const handleDelete = (data: ProductT) => {
  console.log("handleDelete", data);
  ElMessageBox.confirm(`是否删除: ${data.carVin}`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      store.del(data.carVin);
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

/* 编辑 */
const dialogFormVisible = ref(false);
const form = ref<ProductT>({
  carVin: 0,
  carDistributorId: 0,
  carModelId: 0,
});

const confirmEdit = async () => {
  await store.edit(form.value);
  dialogFormVisible.value = false;
  ElMessage({
    type: "success",
    message: "edit completed",
  });
};

/* 新增 */
const addFormVisible = ref(false);
const addForm = ref<ProductT>({
  carVin: 0,
  carDistributorId: 0,
  carModelId: 0,
});
const add = () => {
  addFormVisible.value = true;
};

const confirmAdd = () => {
  addFormVisible.value = false;
  store.add(addForm.value);
  addForm.value = {
    carVin: 0,
    carDistributorId: 0,
    carModelId: 0,
  };
};

/* 修改选项 */
const optionFormVisible = ref(false);
const optionList = ref<number[]>([]);
const checkedIDOption = ref<number[]>([]);
const options = ref<OptionT[]>([]);
const carVin = ref<number>(0);

const optionName = computed(() => {
  const res: { [key in number]: string } = {};
  options.value.forEach((item) => {
    res[item.option.optionId] = item.option.optionName;
  });
  return res;
});
const handleOption = async (params: ProductT) => {
  optionFormVisible.value = true;
  carVin.value = params.carVin;
  options.value = await store.getOption(params.carVin);
  checkedIDOption.value = options.value
    .filter((item) => item.choose === 1)
    .map((item) => item.option.optionId);

  optionList.value = options.value.map((item) => item.option.optionId);
  console.log(params, "handleOption");
  console.log(optionName, "optionList", optionList, options);
};

const confirmHandleOption = async () => {
  console.log(checkedIDOption);
  const res = await store.update_car_option(
    carVin.value,
    checkedIDOption.value
  );
  optionFormVisible.value = false;
};
</script>

<style lang="scss">
.operation-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 10px 8px;
}

.table-header {
  background-color: #f5f7fa;
}

.pagination {
  margin-top: 25px;
}
</style>
