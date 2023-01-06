import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { delete_brand, get_brands, set_brand } from "@/api";
import type { brandT } from "./brand";

export type ModelDetailT = Partial<{
  modelId: number;
  modelName: string;
  modelBrandId: number;
  brand: brandT;
}>;

export const useModelDetailStore = defineStore("modelDetail", () => {
  const brands = ref<brandT[]>([{ brandId: 1, brandName: "211" }]);

  const get = async () => {
    try {
      const result = await get_brands<brandT[]>();
      brands.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_brand(id);
    } catch (error) {
      console.log(error);
    }
    brands.value = brands.value.filter((item) => item.brandId !== id);
  };

  const edit = async (data: brandT) => {
    try {
      await set_brand(data);
    } catch (e) {
      console.log(e);
    }
    const idx = brands.value.findIndex((element) => {
      return element.brandId === data.brandId;
    });
    console.log(data);

    brands.value[idx] = data;
  };

  const add = async (data: brandT) => {
    try {
      await set_brand(data);
    } catch (error) {
      console.log(error);
    }
    brands.value.push(data);
  };

  return { brands, get, del, edit, add };
});
