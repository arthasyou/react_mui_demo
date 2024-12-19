import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { CssBaseline } from "@mui/material";
import DataTable from "@/components/data/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getGameRecord } from "@/api/gameRecordApi";
import useQueryParams from "@/hook/useQeuryParams";

// 传入示例数据
const columns: GridColDef[] = [
  { field: "tid", headerName: "ID", width: 90 },
  {
    field: "type",
    headerName: "type",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
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

// 使用 useState 来管理查询参数
const Home = () => {
  const { t, i18n } = useTranslation();

  // 更新语言
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // 修改查询参数
  const [queryParams, updateQueryParams] = useQueryParams();

  // 修改 fetchGameRecords，接受动态的 queryParams
  const fetchGameRecords = async (page: number, pageSize: number) => {
    const payload = {
      skip: page * pageSize, // 计算分页的偏移量
      limit: pageSize, // 每页条数
      ...queryParams, // 将 queryParams 传递给 API
    };
    const response = await getGameRecord(payload);
    return {
      rows: response.records, // 返回数据记录
      totalCount: response.total, // 返回总记录数
    };
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

        {/* 动态查询按钮示例 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateQueryParams({ type: "newType" })} // 更新查询参数
          style={{ marginTop: "20px" }}
        >
          更新查询参数
        </Button>

        {/* 动态查询按钮示例 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateQueryParams({ type: null })} // 更新查询参数
          style={{ marginTop: "20px" }}
        >
          减少查询参数
        </Button>

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
