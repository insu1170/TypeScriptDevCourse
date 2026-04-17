import { Category } from "../models/category.model";
import { httpClient } from "./http";

// fetch는 인자가 필요 없다. 카테고리 목록을 가져오는 fetchCategory
export const fetchCategory = async () => {
  const response = await httpClient.get<Category[]>("/category");
  return response.data;
};
