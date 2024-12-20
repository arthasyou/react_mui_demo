import { useState } from "react";

// 定义一个类型，表示查询参数的值可以是 string、number、boolean、null 或 undefined
export type QueryParamsType = Record<
  string,
  string | number | boolean | null | undefined
>;

export const useQueryParams = <T extends QueryParamsType>(
  initialParams: T = {} as T
) => {
  const [queryParams, setQueryParams] = useState<T>(initialParams);

  const updateQueryParams = (newParams: Partial<T>) => {
    setQueryParams((prevParams: T) => {
      const updatedParams = { ...prevParams };
      for (const [key, value] of Object.entries(newParams)) {
        if (value === null || value === undefined || value === "") {
          delete updatedParams[key];
        } else {
          updatedParams[key as keyof T] = value;
        }
      }
      return updatedParams;
    });
  };

  return [queryParams, updateQueryParams] as const;
};
