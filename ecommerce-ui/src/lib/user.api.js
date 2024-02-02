import { $axios } from "./axios";

export const loginUser = async (values) => {
  const res = await $axios.post("/user/login", values);
};