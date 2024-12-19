import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";
import DataTable from "@/components/data/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getGameRecord } from "@/api/gameRecordApi";
import {
  QueryForm,
  QueryTextField,
  QuerySelect,
} from "@/components/data/QueryForm"; // 引入 QueryForm 组件
import { QueryParamsType } from "@/hook/useQeuryParams";

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
  const { t, i18n } = useTranslation();

  // 更新语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // 使用 queryParams 存储查询参数
  const [queryParams, setQueryParams] = useState<QueryParamsType>({});

  // 更新查询参数函数
  const updateQueryParams = (newParams: QueryParamsType) => {
    setQueryParams((prevParams) => ({ ...prevParams, ...newParams }));
  };

  // 动态更新的数据获取函数
  const fetchGameRecords = async (page: number, pageSize: number) => {
    const payload = {
      skip: page * pageSize, // 计算分页的偏移量
      limit: pageSize, // 每页条数
      ...queryParams, // 将查询参数传递给 API
    };
    const response = await getGameRecord(payload);
    return {
      rows: response.records, // 返回数据记录
      totalCount: response.total, // 返回总记录数
    };
  };

  // 处理搜索按钮的点击事件，更新查询参数
  const handleSearch = (newParams: QueryParamsType) => {
    updateQueryParams(newParams); // 更新查询参数
  };

  return (
    <div>
      <CssBaseline />
      <div>Home</div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("en")}
          style={{ marginRight: "10px" }}
        >
          English
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => changeLanguage("zhCN")}
        >
          中文
        </Button>

        {/* 查询表单组件 */}
        <QueryForm onSearch={handleSearch}>
          <QueryTextField
            label="type"
            name="type"
            value={queryParams.type || ""}
            onChange={() => {}}
          />
          <QueryTextField
            label="Last Name"
            name="lastName"
            value={queryParams.lastName || ""}
            onChange={() => {}}
          />
          <QuerySelect
            label="Age"
            name="age"
            value={queryParams.age || ""}
            onChange={() => {}}
            options={["10", "20", "30", "40"]} // 示例选项
            width="200px"
          />
        </QueryForm>

        <DataTable
          columns={columns}
          fetchData={fetchGameRecords} // 将 fetchGameRecords 传递给 DataTable
          getRowIdKey="tid"
        />
      </div>
    </div>
  );
};

export default Home;
