import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { get_brands } from "@/api";

type brandT = {
  brandId: number;
  brandName: string;
};

export const useBrandStore = defineStore("brand", () => {
  const brands = ref<brandT[]>([]);

  const getBrands = async () => {
    try {
      const result = await get_brands<brandT[]>();
      brands.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  return { brands, getBrands };
});
