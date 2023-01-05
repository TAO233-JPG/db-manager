import { ref } from "vue";
import { defineStore } from "pinia";
import { delete_order, get_order, set_order } from "@/api";

export type OrderT = Partial<{
  /**
   * 订单编号
   */
  orderId: number;

  /**
   * 订单所属销售人员
   */
  orderStaffId: number;

  /**
   * 顾客电话
   */
  orderCustomerPhone: string;

  /**
   * 订单金额
   */
  orderMoney: number;

  /**
   * 车辆标识号
   */
  orderVin: number;

  /**
   * 顾客姓名
   */
  orderCustomerName: string;
}>;

export const useOrderStore = defineStore("order", () => {
  const staffs = ref<OrderT[]>([
    {
      orderId: 11,
      orderStaffId: 11,
      orderCustomerPhone: "11",
      orderMoney: 11,
      orderVin: 11,
      orderCustomerName: "11",
    },
    {
      orderId: 22,
      orderStaffId: 22,
      orderCustomerPhone: "22",
      orderMoney: 22,
      orderVin: 22,
      orderCustomerName: "22",
    },
    {
      orderId: 33,
      orderStaffId: 33,
      orderCustomerPhone: "33",
      orderMoney: 33,
      orderVin: 33,
      orderCustomerName: "33",
    },
  ]);

  const get = async () => {
    try {
      const result = await get_order<OrderT[]>();
      staffs.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_order(id);
    } catch (error) {
      console.log(error);
    }
    staffs.value = staffs.value.filter((item) => item.orderId !== id);
  };

  const edit = async (data: OrderT) => {
    try {
      await set_order(data);
    } catch (e) {
      console.log(e);
    }
    const idx = staffs.value.findIndex((element) => {
      return element.orderId === data.orderId;
    });
    console.log(data);

    staffs.value[idx] = data;
  };

  const add = async (data: OrderT) => {
    try {
      await set_order(data);
    } catch (error) {
      console.log(error);
    }
    staffs.value.push(data);
  };

  return { staffs, get, del, edit, add };
});
