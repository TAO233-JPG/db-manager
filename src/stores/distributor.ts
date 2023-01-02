import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { delete_distributor, get_distributors, set_distributor } from "@/api";

export type DistributorT = {
  distributorId: number;

  /**
   * 经销商名称
   */
  distributorName: string;

  /**
   * 经销商用户名
   */
  distributorUsername: string;

  /**
   * 经销商电话
   */
  distributorPhone: string;

  /**
   * 经销商密码
   */
  distributorPassword: string;

  /**
   * 经销商所在地址
   */
  distributorAddress: string;
};

// 经销商管理
export const useDistributorStore = defineStore("distributor", () => {
  const distributors = ref<DistributorT[]>([
    {
      distributorId: 1,
      distributorName: "distributorName",
      distributorUsername: "distributorUsername",
      distributorPhone: "distributorPhone",
      distributorPassword: "distributorPassword",
      distributorAddress: "distributorAddress",
    },
    {
      distributorId: 2,
      distributorName: "distributorName2",
      distributorUsername: "distributorUsername",
      distributorPhone: "distributorPhone",
      distributorPassword: "distributorPassword",
      distributorAddress: "distributorAddress",
    },
    {
      distributorId: 3,
      distributorName: "distributorName3",
      distributorUsername: "distributorUsername",
      distributorPhone: "distributorPhone",
      distributorPassword: "distributorPassword",
      distributorAddress: "distributorAddress",
    },
  ]);

  const getDistributors = async () => {
    try {
      const result = await get_distributors<DistributorT[]>();
      distributors.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDistributor = async (id: number) => {
    await delete_distributor(id);
    distributors.value = distributors.value.filter(
      (item) => item.distributorId !== id
    );
  };

  const editDistributor = async (data: DistributorT) => {
    console.log("data", data);
    const _data = JSON.parse(JSON.stringify(data));
    delete _data.distributorId;
    await set_distributor(_data);
    const idx = distributors.value.findIndex((element) => {
      return element.distributorId === data.distributorId;
    });

    distributors.value[idx] = {
      ...distributors.value[idx],
      ...data,
    };
  };

  const addDistributor = async (data: DistributorT) => {
    console.log("data", data);
    const _data = JSON.parse(JSON.stringify(data));
    delete _data.distributorId;
    await set_distributor(_data);

    distributors.value.push({
      ...data,
      distributorId: distributors.value.length,
    });
  };

  return {
    distributors,
    getDistributors,
    deleteDistributor,
    editDistributor,
    addDistributor,
  };
});
