import { ref } from "vue";
import { defineStore } from "pinia";
import { delete_product, get_product, set_product } from "@/api";

export type ProductT = {
  /**
   * 车辆标识号
   */
  carVin: number;

  /**
   * 经销商编号
   */
  carDistributorId: number;

  /**
   * 车辆所属模型
   */
  carModelId: number;
};

// 产品管理
export const useProductStore = defineStore("distributor", () => {
  const cars = ref<ProductT[]>([
    {
      carVin: 12,
      carDistributorId: 12,
      carModelId: 12,
    },
    {
      carVin: 121,
      carDistributorId: 121,
      carModelId: 121,
    },
    {
      carVin: 1234,
      carDistributorId: 1234,
      carModelId: 1234,
    },
  ]);

  const get = async () => {
    try {
      const result = await get_product<ProductT[]>();
      cars.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_product(id);
    } catch (error) {
      console.log(error);
    }
    cars.value = cars.value.filter((item) => item.carVin !== id);
  };

  const edit = async (data: ProductT) => {
    try {
      await set_product(data);
    } catch (e) {
      console.log(e);
    }
    const idx = cars.value.findIndex((element) => {
      return element.carVin === data.carVin;
    });
    console.log(data);

    cars.value[idx] = data;
  };

  const add = async (data: ProductT) => {
    try {
      await set_product(data);
    } catch (error) {
      console.log(error);
    }
    cars.value.push(data);
  };

  return {
    cars,
    get,
    del,
    edit,
    add,
  };
});
