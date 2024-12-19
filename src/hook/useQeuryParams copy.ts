/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

const useQueryParams = (initialParams: any = {}) => {
  const [queryParams, setQueryParams] = useState(initialParams);

  // 更新 queryParams，可以增加、修改或删除参数
  const updateQueryParams = (newParams: any) => {
    setQueryParams((prevParams: any) => {
      const updatedParams = { ...prevParams };

      // 遍历 newParams，并根据需要进行增删操作
      for (const [key, value] of Object.entries(newParams)) {
        if (value === null || value === undefined) {
          // 如果值是 null 或 undefined，删除这个字段
          delete updatedParams[key];
        } else {
          // 否则，更新或者增加字段
          updatedParams[key] = value;
        }
      }

      return updatedParams;
    });
  };

  return [queryParams, updateQueryParams];
};

export default useQueryParams;
