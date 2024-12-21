import { CssBaseline, Typography, Button } from "@mui/material";
import DataTable from "@/components/data/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getGameRecord } from "@/api/gameRecordApi";
import {
  QueryForm,
  QueryTextField,
  QuerySelect,
  QueryDateTime,
} from "@/components/data/QueryForm"; // 引入 QueryForm 组件
import { useQueryParams, QueryParamsType } from "@/hook/useQeuryParams";
import { useTranslation } from "react-i18next"; // 引入 useTranslation

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
  const { t, i18n } = useTranslation(); // 使用 i18n 和 t 函数
  const [queryParams, updateQueryParams] = useQueryParams({
    type: "123",
    lastName: "234",
    age: "10",
    time: 1734152314000,
  });

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

  // 切换语言函数
  const switchLanguage = (lang: "en" | "zh") => {
    i18n.changeLanguage(lang); // 切换语言
  };

  return (
    <div>
      <CssBaseline />
      <Typography variant="h5">{t("home")}</Typography> {/* 动态渲染文本 */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {/* 查询表单组件 */}
        <QueryForm onSearch={handleSearch} queryParams={queryParams}>
          <QueryTextField
            label={t("type")}
            name="type"
            value={queryParams.type || ""}
            width={100}
          />
          <QueryTextField
            label={t("lastName")}
            name="lastName"
            value={queryParams.lastName || ""}
          />
          <QuerySelect
            label={t("age")}
            name="age"
            value={queryParams.age || ""}
            options={["10", "20", "30", "40"]} // 示例选项
            width="200px"
          />
          <QueryDateTime
            label={t("createTime")}
            name="time"
            value={queryParams.time}
          />
        </QueryForm>

        <DataTable
          columns={columns}
          fetchData={fetchGameRecords} // 将 fetchGameRecords 传递给 DataTable
          getRowIdKey="tid"
        />

        {/* 语言切换按钮 */}
        <div style={{ marginTop: "20px" }}>
          <Button onClick={() => switchLanguage("en")} variant="outlined">
            English
          </Button>
          <Button
            onClick={() => switchLanguage("zh")}
            variant="outlined"
            style={{ marginLeft: "10px" }}
          >
            中文
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
