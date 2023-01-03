import type { DistributorT } from "@/stores/distributor";
import type { ProductT } from "@/stores/product";
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

export const get_staffs = async <T = any>(): Promise<T> => {
  const result = await instance.get("/staff");
  return result.data;
};

/* 获取品牌 */
export const get_brands = async <T = any>(): Promise<T> => {
  const result = await instance.get("/brand");
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
  const result = await instance.post("/distributor/save", params);
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
  const result = await instance.post("/car/save", params);
  return result.data;
};

/* 查看这个车所对应的品牌的选项，已选的选项则进行标记 */
export const get_product_option = async <T = any>(id: number): Promise<T> => {
  const result = await instance.get(`/car/${id}/option`);
  return result.data;
};
/* 改这个车所具有的选项 */
export const set_product_option = async <T = any>(
  params: ProductT
): Promise<T> => {
  const result = await instance.post(
    `/car/${params.carVin}/option/update`,
    params
  );
  return result.data;
};

export const delete_product = async <T = any>(id: number): Promise<T> => {
  const result = await instance.delete(`/car/${id}`);
  return result.data;
};
