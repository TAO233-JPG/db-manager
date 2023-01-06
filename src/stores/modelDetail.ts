import { ref } from "vue";
import { defineStore } from "pinia";
import type { brandT } from "./brand";
import {
  delete_model,
  get_models,
  get_model_options,
  set_model,
  set_model_options,
} from "@/api";

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
      console.log(data, "42378929483");
      const params = {
        modelName: data.modelName,
        modelBrandId: data.brand?.brandId,
      };
      await set_model(params);
    } catch (error) {
      console.log(error);
    }
    models.value.push(data);
  };

  const getModelOptions = async (id: number) => {
    try {
      const result = await get_model_options<any[]>(id);
      return result;
    } catch (error) {
      console.log(error);
    }
    return [
      { optionId: 2, optionName: "innt222" },
      { optionId: 3, optionName: "252" },
    ];
  };

  // 更新模型的选项
  const setModelOptions = async (id: number, optionIds: number[]) => {
    try {
      const result = await set_model_options<any[]>(id, optionIds);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  return { models, get, del, edit, add, getModelOptions, setModelOptions };
});
