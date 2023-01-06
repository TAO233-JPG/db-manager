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
    <el-table-column fixed prop="optionId" label="选项编号" />
    <el-table-column fixed prop="optionName" label="选项名字" />

    <el-table-column label="Operations" fixed="right">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
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
  <!-- 编辑 -->
  <div>
    <el-dialog v-model="dialogFormVisible" title="编辑" center>
      <el-form :model="form" label-width="140px" style="max-width: 580px">
        <el-form-item label="选项编号">
          <el-input v-model="form.optionId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="选项名字">
          <el-input v-model="form.optionName" autocomplete="off" />
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

  <!-- 新增 -->
  <div>
    <el-dialog v-model="addFormVisible" title="新增选项" center>
      <el-form :model="addForm" label-width="140px" style="max-width: 580px">
        <el-form-item label="选项编号">
          <el-input v-model="addForm.optionId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项名字">
          <el-input v-model="addForm.optionName" autocomplete="off" />
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
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { throttle } from "lodash";
import { useProductStore, type AllOptionT } from "@/stores/product";

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
  await store.getAllOption();
});
const tableData = computed(() => {
  return store.allOption;
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

const handleEdit = (data: AllOptionT) => {
  console.log("handleEdit", data);
  dialogFormVisible.value = true;
  form.value = { ...form.value, ...data };
  console.log(form);
};

const handleDelete = (data: AllOptionT) => {
  console.log("handleDelete", data);
  ElMessageBox.confirm(`是否删除: ${data.optionName}`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await store.delOption(data.optionId as number);
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

// /* 编辑 */
const dialogFormVisible = ref(false);
const form = ref<AllOptionT>({
  optionId: 1,
  optionName: "string",
});

const confirmEdit = async () => {
  await store.editOption(form.value);
  dialogFormVisible.value = false;
  ElMessage({
    type: "success",
    message: "edit completed",
  });
};

// /* 新增 */
const addFormVisible = ref(false);
const addForm = ref<AllOptionT>({
  optionId: 0,
  optionName: "",
});
const add = () => {
  addFormVisible.value = true;
};

const confirmAdd = async () => {
  addFormVisible.value = false;
  // addForm.value.modelId = tableData.value.length + 1;
  await store.addOption(addForm.value);
  addForm.value = {
    optionId: 0,
    optionName: "",
  };
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
