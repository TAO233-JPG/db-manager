import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { get_staffs } from "@/api";

type StaffT = {
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
  const staffs = ref<StaffT[]>([]);

  const getStaffs = async () => {
    try {
      const result = await get_staffs<StaffT[]>();
      staffs.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  return { staffs, getStaffs };
});
