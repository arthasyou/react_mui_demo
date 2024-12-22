// import { useState } from "react";

import { CssBaseline, Typography } from "@mui/material";
import DataTable from "@/components/data/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getGameRecord } from "@/api/gameRecordApi";
import {
  QueryForm,
  QueryTextField,
  QuerySelect,
  QueryDateTime,
} from "@/components/data/QueryForm";
import { useQueryParams, QueryParamsType } from "@/hook/useQeuryParams";
import { useCallback } from "react";

// 示例数据的列定义
const columns: GridColDef[] = [
  { field: "tid", headerName: "ID", width: 90 },
  { field: "type", headerName: "Type", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

// 主页组件
const Home = () => {
  // 使用 queryParams 存储查询参数
  const [queryParams, updateQueryParams] = useQueryParams({
    type: "123",
    lastName: "234",
    age: "10",
    time: 1734152314000,
  });

  const fetchData = useCallback(
    async (page: number, pageSize: number) => {
      const payload = {
        skip: page * pageSize, // 计算分页的偏移量
        limit: pageSize, // 每页条数
        ...queryParams, // 将查询参数传递给 API
      };

      // console.log(payload);
      const response = await getGameRecord(payload);
      return {
        rows: response.records, // 返回数据记录
        totalCount: response.total, // 返回总记录数
      };
    },
    [queryParams]
  );

  // 处理搜索按钮的点击事件，更新查询参数
  const handleSearch = (newParams: QueryParamsType) => {
    updateQueryParams(newParams); // 更新查询参数
  };

  return (
    <div>
      <CssBaseline />
      <Typography variant="h5">Home</Typography>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {/* 查询表单组件 */}
        <QueryForm onSearch={handleSearch} queryParams={queryParams}>
          <QueryTextField
            label="type"
            name="type"
            value={queryParams.type || ""}
            width={100}
          />
          <QueryTextField
            label="Last Name"
            name="lastName"
            value={queryParams.lastName || ""}
          />
          <QuerySelect
            label="Age"
            name="age"
            value={queryParams.age || ""}
            options={["10", "20", "30", "40"]} // 示例选项
            width="200px"
          />
          <QueryDateTime
            label="创建时间"
            name="time"
            value={queryParams.time}
          />
        </QueryForm>

        <DataTable
          columns={columns}
          fetchData={fetchData} // 将 fetchGameRecords 传递给 DataTable
          getRowIdKey="tid"
        />
      </div>
    </div>
  );
};

export default Home;
