import { ref } from "vue";
import { defineStore } from "pinia";
import { delete_inventory, get_inventory, set_inventory } from "@/api";

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
};

// 产品管理
export const useInventoryStore = defineStore("inventory", () => {
  const inventory = ref<InventoryT[]>([
    {
      inventoryId: 9,
      inventoryModelId: 9,
      inventoryDistributorId: 9,
      inventoryCount: 9,
    },
    {
      inventoryId: 19,
      inventoryModelId: 19,
      inventoryDistributorId: 19,
      inventoryCount: 19,
    },
    {
      inventoryId: 222239,
      inventoryModelId: 2239,
      inventoryDistributorId: 2239,
      inventoryCount: 9223,
    },
  ]);

  const get = async () => {
    try {
      const result = await get_inventory<InventoryT[]>();
      inventory.value = result;
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
