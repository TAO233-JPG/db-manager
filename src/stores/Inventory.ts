import { ref } from "vue";
import { defineStore } from "pinia";
import {
  delete_inventory,
  get_all_inventory,
  get_inventory,
  set_inventory,
} from "@/api";
import { useUserStore } from "./user";
import type { DistributorT } from "./distributor";
import type { ModelDetailT } from "./modelDetail";

export type InventoryT = {
  /**
   * 库存编号
   */
  inventoryId: number;

  /**
   * 模型编号
   */
  inventoryModelId: number;

  /**
   * 经销商编号
   */
  inventoryDistributorId: number;

  /**
   * 库存数量
   */
  inventoryCount: number;

  distributor?: DistributorT;
  modelDetail?: ModelDetailT;
};
const userStore = useUserStore();
// 产品管理
export const useInventoryStore = defineStore("inventory", () => {
  const inventory = ref<InventoryT[]>([
    {
      inventoryId: 9,
      inventoryModelId: 9,
      inventoryDistributorId: 9,
      inventoryCount: 9,
      distributor: {
        distributorId: 1,
        distributorName: "distributorName",
        distributorUsername: "distributorUsername",
        distributorPhone: "distributorPhone",
        distributorPassword: "distributorPassword",
        distributorAddress: "distributorAddress",
      },
      modelDetail: {
        modelId: 111,
        modelName: "111name",
        modelBrandId: 111,
        brand: { brandId: 1, brandName: "211" },
      },
    },
    {
      inventoryId: 19,
      inventoryModelId: 19,
      inventoryDistributorId: 19,
      inventoryCount: 19,
      distributor: {
        distributorId: 1,
        distributorName: "distributorName",
        distributorUsername: "distributorUsername",
        distributorPhone: "distributorPhone",
        distributorPassword: "distributorPassword",
        distributorAddress: "distributorAddress",
      },
      modelDetail: {
        modelId: 111,
        modelName: "111",
        modelBrandId: 111,
        brand: { brandId: 1, brandName: "211" },
      },
    },
    {
      inventoryId: 222239,
      inventoryModelId: 2239,
      inventoryDistributorId: 2239,
      inventoryCount: 9223,
      distributor: {
        distributorId: 1,
        distributorName: "distributorName",
        distributorUsername: "distributorUsername",
        distributorPhone: "distributorPhone",
        distributorPassword: "distributorPassword",
        distributorAddress: "distributorAddress",
      },
      modelDetail: {
        modelId: 111,
        modelName: "111",
        modelBrandId: 111,
        brand: { brandId: 1, brandName: "211" },
      },
    },
  ]);

  const get = async (id: number) => {
    try {
      if (userStore.auth === 1) {
        const result: InventoryT[] = await get_all_inventory<InventoryT[]>();
        inventory.value = result;
      } else {
        const result: InventoryT[] = await get_inventory<InventoryT[]>(id);
        inventory.value = result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_inventory(id);
    } catch (error) {
      console.log(error);
    }
    inventory.value = inventory.value.filter((item) => item.inventoryId !== id);
  };

  const edit = async (data: InventoryT) => {
    try {
      await set_inventory(data);
    } catch (e) {
      console.log(e);
    }
    const idx = inventory.value.findIndex((element) => {
      return element.inventoryId === data.inventoryId;
    });
    console.log(data);

    inventory.value[idx] = data;
  };

  const add = async (data: InventoryT) => {
    try {
      await set_inventory(data);
    } catch (error) {
      console.log(error);
    }
    inventory.value.push(data);
  };

  return {
    inventory,
    get,
    del,
    edit,
    add,
  };
});
