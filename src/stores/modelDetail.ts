import { ref } from "vue";
import { defineStore } from "pinia";
import type { brandT } from "./brand";
import { delete_model, get_models, set_model } from "@/api";

export type ModelDetailT = {
  modelId?: number;
  modelName?: string;
  modelBrandId?: number;
  brand?: brandT;
};

export const useModelDetailStore = defineStore("modelDetail", () => {
  const models = ref<ModelDetailT[]>([
    {
      modelId: 111,
      modelName: "111",
      modelBrandId: 111,
      brand: { brandId: 1, brandName: "211" },
    },
    {
      modelId: 22,
      modelName: "11221",
      modelBrandId: 11221,
      brand: { brandId: 21, brandName: "2112" },
    },
  ]);

  const get = async () => {
    try {
      const result = await get_models<ModelDetailT[]>();
      models.value = result;
    } catch (error) {
      console.log(error);
    }
  };

  const del = async (id: number) => {
    try {
      await delete_model(id);
    } catch (error) {
      console.log(error);
    }
    models.value = models.value.filter((item) => item.modelId !== id);
  };

  const edit = async (data: ModelDetailT) => {
    try {
      await set_model(data);
    } catch (e) {
      console.log(e);
    }
    const idx = models.value.findIndex((element) => {
      return element.modelId === data.modelId;
    });
    console.log(data);

    models.value[idx] = data;
  };

  const add = async (data: ModelDetailT) => {
    try {
      await set_model(data);
    } catch (error) {
      console.log(error);
    }
    models.value.push(data);
  };

  return { models, get, del, edit, add };
});
