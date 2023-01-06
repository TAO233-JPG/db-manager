import { ref } from "vue";
import { defineStore } from "pinia";
import {
  delete_product,
  get_product,
  get_product_option,
  set_product,
  set_product_option,
} from "@/api";
import type { DistributorT } from "./distributor";
import type { ModelDetailT } from "./modelDetail";

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
  modelDetail?: ModelDetailT;
  distributor?: DistributorT;
};

export type OptionT = {
  option: {
    optionId: number;
    optionName: string;
  };
  choose?: number;
};

// 产品管理
export const useProductStore = defineStore("product", () => {
  const cars = ref<ProductT[]>([
    {
      carVin: 12,
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
  const option = ref<OptionT[]>([
    { option: { optionId: 2, optionName: "innt222" }, choose: 1 },
    { option: { optionId: 1, optionName: "11" }, choose: 1 },
    { option: { optionId: 3, optionName: "252" }, choose: 1 },
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

  const getOption = async (id: number) => {
    try {
      const result = await get_product_option(id);
      option.value = result;
    } catch (error) {
      console.log(error);
    }
    // if(option.value.length)
    // return [
    //   { option: { optionId: 2, optionName: "222" }, choose: 1 },
    //   { option: { optionId: 1, optionName: "11" }, choose: 1 },
    //   { option: { optionId: 3, optionName: "252" }, choose: 1 },
    // ];

    return option.value;
  };

  const update_car_option = async (id: number, optionId: number[]) => {
    const res = await set_product_option(id, optionId);
    console.log(res, "update_car_option");
  };
  return {
    cars,
    get,
    del,
    edit,
    add,
    getOption,
    update_car_option,
  };
});
