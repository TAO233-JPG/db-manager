import { ref } from "vue";
import { defineStore } from "pinia";
import { delete_staff, get_staffs, set_staff } from "@/api";

export type StaffT = {
  staffId: number;

  /**
   * 销售人员用户名
   */
  staffName: string;

  /**
   * 销售人员手机号
   */
  staffPhone: string;

  /**
   * 销售人员密码
   */
  staffPassword: string;

  /**
   * 所属经销商的id
   */
  staffDistributorId: number;
};

export const useStaffStore = defineStore("staff", () => {
  const staffs = ref<StaffT[]>([
    {
      staffId: 111,
      staffName: "111",
      staffPhone: "111",
      staffPassword: "111",
      staffDistributorId: 11,
    },
    {
      staffId: 122111,
      staffName: "11221",
      staffPhone: "11221",
      staffPassword: "11221",
      staffDistributorId: 1221,
    },
    {
      staffId: 11331,
      staffName: "13311",
      staffPhone: "11331",
      staffPassword: "11331",
      staffDistributorId: 13331,
    },
  ]);

  const get = async () => {
    try {
      const result = await get_staffs<StaffT[]>();
      staffs.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_staff(id);
    } catch (error) {
      console.log(error);
    }
    staffs.value = staffs.value.filter((item) => item.staffId !== id);
  };

  const edit = async (data: StaffT) => {
    try {
      await set_staff(data);
    } catch (e) {
      console.log(e);
    }
    const idx = staffs.value.findIndex((element) => {
      return element.staffId === data.staffId;
    });
    console.log(data);

    staffs.value[idx] = data;
  };

  const add = async (data: StaffT) => {
    try {
      await set_staff(data);
    } catch (error) {
      console.log(error);
    }
    staffs.value.push(data);
  };

  return { staffs, get, del, edit, add };
});
