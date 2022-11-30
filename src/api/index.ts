import instance from "./instance";

export const get_list = async <T = any>(): Promise<T> => {
  const result = await instance.get("/todos/1");
  return result.data;
};
export const post_list = async <T = any>(): Promise<T> => {
  const result = await instance.post("/posts", { a: 1, b: [1, 2, 34, 5] });
  return result.data;
};
