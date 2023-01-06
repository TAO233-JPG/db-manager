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
    <!-- <el-table-column fixed prop="orderId" label="订单编号" /> -->
    <el-table-column fixed prop="staff.staffName" label="销售人员" />
    <el-table-column prop="orderVin" label="车辆标识号" />
    <el-table-column
      prop="carDetail.modelDetail.brand.brandName"
      label="品牌"
    />
    <el-table-column prop="carDetail.modelDetail.modelName" label="模型" />
    <el-table-column prop="orderCustomerPhone" label="顾客电话" />
    <el-table-column prop="orderMoney" label="订单金额" />
    <el-table-column prop="orderCustomerName" label="顾客姓名" />
    <el-table-column label="Operations" fixed="right" width="250">
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
    <el-dialog v-model="dialogFormVisible" title="编辑订单" center>
      <el-form :model="form" label-width="140px" style="max-width: 580px">
        <el-form-item label="订单编号">
          <el-input v-model="form.orderId" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="订单所属销售人员">
          <el-input v-model="form.orderStaffId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="顾客电话">
          <el-input v-model="form.orderCustomerPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="form.orderMoney" autocomplete="off" />
        </el-form-item>
        <el-form-item label="车辆标识号">
          <el-input v-model="form.orderVin" autocomplete="off" />
        </el-form-item>
        <el-form-item label="顾客姓名">
          <el-input v-model="form.orderCustomerName" autocomplete="off" />
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
    <el-dialog v-model="addFormVisible" title="新增订单" center>
      <el-form :model="addForm" label-width="140px" style="max-width: 580px">
        <!-- <el-form-item label="订单编号">
          <el-input v-model="addForm.orderId" autocomplete="off" />
        </el-form-item> -->
        <el-form-item label="订单所属销售人员">
          <el-input
            v-model="addForm.orderStaffId"
            autocomplete="off"
            :disabled="userStore.auth === 3"
          />
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="addForm.orderMoney" autocomplete="off" />
        </el-form-item>
        <el-form-item label="车辆标识号">
          <!-- <el-input v-model="addForm.orderVin" autocomplete="off" /> -->
          <el-select
            v-model="addForm.orderVin"
            placeholder="please select your zone"
            style="width: 100%"
          >
            <el-option
              v-for="item in addFormOrderVins"
              :key="item.carVin"
              :label="item.modelDetail.modelName"
              :value="item.carVin"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="顾客电话">
          <el-input v-model="addForm.orderCustomerPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="顾客姓名">
          <el-input v-model="addForm.orderCustomerName" autocomplete="off" />
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
import { useOrderStore, type OrderT } from "@/stores/order";
import { useUserStore } from "@/stores/user";
import { get_car } from "@/api";

const userStore = useUserStore();

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

const store = useOrderStore();

onMounted(async () => {
  await store.get();
});
const tableData = computed(() => {
  return store.staffs;
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

const handleEdit = (data: OrderT) => {
  console.log("handleEdit", data);
  dialogFormVisible.value = true;
  form.value = { ...form.value, ...data };
  console.log(form);
};

const handleDelete = (data: OrderT) => {
  console.log("handleDelete", data);
  ElMessageBox.confirm(`是否删除: ${data.orderId}`, "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await store.del(data.orderId);
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
const form = ref<OrderT>({
  orderId: 0,
  orderStaffId: 0,
  orderCustomerPhone: "",
  orderMoney: 0,
  orderVin: 0,
  orderCustomerName: "",
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
const addFormOrderVins = ref<any[]>([
  {
    carVin: 12,
    carDistributorId: 123,
    carModelId: 12,
    modelDetail: {
      modelName: "123-1",
      modelId: 11,
      modelBrandId: 12,
      brand: {
        brandId: 22,
        brandName: "1",
      },
    },
    distributor: {
      distributorId: 1,
      distributorName: "distributorName",
      distributorUsername: "distributorUsername",
      distributorPhone: "distributorPhone",
      distributorPassword: "distributorPassword",
      distributorAddress: "distributorAddress",
    },
  },
  {
    carVin: 1233,
    carDistributorId: 12,
    carModelId: 12,
    modelDetail: {
      modelName: "1-1",
      modelId: 11,
      modelBrandId: 12,
      brand: {
        brandId: 22,
        brandName: "1",
      },
    },
    distributor: {
      distributorId: 1,
      distributorName: "distributorName",
      distributorUsername: "distributorUsername",
      distributorPhone: "distributorPhone",
      distributorPassword: "distributorPassword",
      distributorAddress: "distributorAddress",
    },
  },
]);
const addFormVisible = ref(false);
const addForm = ref<OrderT>({
  orderId: undefined,
  orderStaffId: undefined,
  orderCustomerPhone: "",
  orderMoney: undefined,
  orderVin: undefined,
  orderCustomerName: "",
});
const add = async () => {
  addFormVisible.value = true;
  if (userStore.auth === 3) {
    addForm.value.orderStaffId = userStore.user?.staffId ?? 9999;
  }
  const staffDistributorId = userStore.user?.staffDistributorId ?? 888;
  addFormOrderVins.value = await get_car<any>(staffDistributorId);
};

const confirmAdd = async () => {
  addFormVisible.value = false;
  await store.add(addForm.value);
  addForm.value = {
    orderId: 0,
    orderStaffId: 0,
    orderCustomerPhone: "0",
    orderMoney: 0,
    orderVin: 0,
    orderCustomerName: "0",
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
