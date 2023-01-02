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
    <el-table-column fixed prop="distributorName" label="经销商名称" />
    <el-table-column prop="distributorUsername" label="经销商用户名" />
    <el-table-column prop="distributorPhone" label="经销商电话" />
    <el-table-column prop="distributorAddress" label="经销商所在地址" />
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
  <!-- 编辑经销商 -->
  <div>
    <el-dialog v-model="dialogFormVisible" title="编辑经销商" center>
      <el-form :model="form" label-width="140px" style="max-width: 580px">
        <el-form-item label="经销商名称">
          <el-input v-model="form.distributorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商用户名">
          <el-input v-model="form.distributorUsername" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商电话">
          <el-input v-model="form.distributorPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商所在地址">
          <el-input v-model="form.distributorAddress" autocomplete="off" />
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

  <!-- 新增经销商 -->
  <div>
    <el-dialog v-model="addFormVisible" title="新增经销商" center>
      <el-form :model="addForm" label-width="140px" style="max-width: 580px">
        <el-form-item label="经销商名称">
          <el-input v-model="addForm.distributorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商用户名">
          <el-input v-model="addForm.distributorUsername" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商电话">
          <el-input v-model="addForm.distributorPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商所在地址">
          <el-input v-model="addForm.distributorAddress" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经销商密码">
          <el-input v-model="addForm.distributorPassword" autocomplete="off" />
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
import { computed, onMounted, ref } from "vue";
import { throttle } from "lodash";
import { useDistributorStore, type DistributorT } from "@/stores/distributor";

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

const distributorStore = useDistributorStore();

onMounted(async () => {
  await distributorStore.getDistributors();
});
const tableData = computed(() => {
  return distributorStore.distributors;
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

const handleEdit = (data: DistributorT) => {
  console.log("handleEdit", data);
  dialogFormVisible.value = true;
  form.value = { ...form.value, ...data };
};

const handleDelete = (data: DistributorT) => {
  console.log("handleDelete", data);
  ElMessageBox.confirm(`是否删除: ${data.distributorName}`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      distributorStore.deleteDistributor(data.distributorId);
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
const form = ref<DistributorT>({
  distributorAddress: "",
  distributorId: 0,
  distributorName: "",
  distributorPassword: "",
  distributorPhone: "",
  distributorUsername: "",
});

const confirmEdit = async () => {
  await distributorStore.editDistributor(form.value);
  dialogFormVisible.value = false;
  ElMessage({
    type: "success",
    message: "edit completed",
  });
};

/* 新增 */
const addFormVisible = ref(false);
const addForm = ref<DistributorT>({
  distributorAddress: "",
  distributorId: 0,
  distributorName: "",
  distributorPassword: "",
  distributorPhone: "",
  distributorUsername: "",
});
const add = () => {
  addFormVisible.value = true;
};

const confirmAdd = () => {
  addFormVisible.value = false;
  distributorStore.addDistributor(addForm.value);
  addForm.value = {
    distributorAddress: "",
    distributorId: 0,
    distributorName: "",
    distributorPassword: "",
    distributorPhone: "",
    distributorUsername: "",
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
