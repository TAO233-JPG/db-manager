import type { brandT } from "@/stores/brand";
import type { DistributorT } from "@/stores/distributor";
import type { InventoryT } from "@/stores/Inventory";
import type { ModelDetailT } from "@/stores/modelDetail";
import type { OrderT } from "@/stores/order";
import type { AllOptionT, OptionT, ProductT } from "@/stores/product";
import type { StaffT } from "@/stores/staff";
import instance from "./instance";

export const get_list = async <T = any>(): Promise<T> => {
  const result = await instance.get("/todos/1");
  return result.data;
};
export const post_list = async <T = any>(): Promise<T> => {
  const result = await instance.post("/posts", { a: 1, b: [1, 2, 34, 5] });
  return result.data;
};

/* login */
export type LoginT = {
  username: string;
  password: string;
};
export const get_login_admin = async <T = any>(params: LoginT): Promise<T> => {
  const result = await instance.get("/admin/login", {
    params,
  });
  return result.data;
};
export const get_login_distributor = async <T = any>(
  params: LoginT
): Promise<T> => {
  const result = await instance.get("/distributor/login", {
    params,
  });
  return result.data;
};
export const get_login_staff = async <T = any>(params: LoginT): Promise<T> => {
  const result = await instance.get("/staff/login", {
    params,
  });
  return result.data;
};

/* 获取员工 */
export const get_staffs = async <T = any>(id: number): Promise<T> => {
  const result = await instance.get(`/staff/distributor/${id}`);
  return result.data;
};
export const set_staff = async <T = any>(params: StaffT): Promise<T> => {
  const result = await instance.post("/staff", params);
  return result.data;
};
export const delete_staff = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/staff/${id}`);
  return result.data;
};

/* 获取经销商 */
export const get_distributors = async <T = any>(): Promise<T> => {
  const result = await instance.get("/distributor");
  return result.data;
};
/* 修改经销商 */
export const set_distributor = async <T = any>(
  params: DistributorT
): Promise<T> => {
  const result = await instance.post("/distributor", params);
  return result.data;
};

/* 删除经销商 */
export const delete_distributor = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/distributor/${id}`);
  return result.data;
};

/* product: car */
export const get_product = async <T = any>(): Promise<T> => {
  const result = await instance.get(`/car`);
  return result.data;
};
export const set_product = async <T = any>(params: ProductT): Promise<T> => {
  const result = await instance.post("/car", params);
  return result.data;
};

/* 获取品牌 */
export const get_brands = async <T = any>(): Promise<T> => {
  const result = await instance.get("/brand");
  return result.data;
};
export const set_brand = async <T = any>(params: brandT): Promise<T> => {
  const result = await instance.post("/brand", params);
  return result.data;
};
export const delete_brand = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/brand/${id}`);
  return result.data;
};

/* 查看这个车所对应的品牌的选项，已选的选项则进行标记 */
export const get_product_option = async <T = any>(id: number): Promise<T> => {
  const result = await instance.get(`/car/${id}/option`);
  return result.data;
};
export const delete_product = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/car/${id}`);
  return result.data;
};
/* 改这个车所具有的选项 */
export const set_product_option = async <T = any>(
  id: number,
  params: number[]
): Promise<T> => {
  const result = await instance.post(`/car/${id}/option/update`, {
    id,
    optionId: params,
  });
  return result.data;
};

export const get_options = async <T = any>(): Promise<T> => {
  const result = await instance.get(`/option`);
  return result.data;
};
export const set_option = async <T = any>(params: AllOptionT): Promise<T> => {
  const result = await instance.post("/option", params);
  return result.data;
};
export const delete_option = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/option/${id}`);
  return result.data;
};

/* 模型 */
export const get_models = async <T = any>(): Promise<T> => {
  const result = await instance.get(`/model`);
  return result.data;
};
export const set_model = async <T = any>(params: ModelDetailT): Promise<T> => {
  const result = await instance.post("/model", params);
  return result.data;
};
export const delete_model = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/model/${id}`);
  return result.data;
};

/* 库存管理 */
export const get_inventory = async <T = any>(): Promise<T> => {
  const result = await instance.get(`/inventory`);
  return result.data;
};
export const set_inventory = async <T = any>(
  params: InventoryT
): Promise<T> => {
  const result = await instance.post("/inventory", params);
  return result.data;
};
export const delete_inventory = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/inventory/${id}`);
  return result.data;
};

/* 订单 */
export const get_order = async <T = any>(): Promise<T> => {
  const result = await instance.get(`/order`);
  return result.data;
};
export const set_order = async <T = any>(params: OrderT): Promise<T> => {
  const result = await instance.post("/order", params);
  return result.data;
};
export const delete_order = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/order/${id}`);
  return result.data;
};
