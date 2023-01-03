import type { DistributorT } from "@/stores/distributor";
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
