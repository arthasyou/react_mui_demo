import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useState, useEffect, useCallback, useRef } from "react";

// 定义 API 函数返回的数据格式
interface PaginatedData<T> {
  rows: T[]; // 表格数据
  totalCount: number; // 总数据量
}

interface DataTableProps<T extends GridValidRowModel> {
  columns: GridColDef[]; // 表格列定义
  fetchData: (page: number, pageSize: number) => Promise<PaginatedData<T>>; // API 获取数据的函数，新增 queryParams 参数
  getRowIdKey?: string; // 可选的自定义字段名，用于指定唯一 id 字段
}

export default function DataTable<T extends GridValidRowModel>({
  columns,
  fetchData,
  getRowIdKey = "id",
}: DataTableProps<T>) {
  const [rows, setRows] = useState<GridRowsProp>([]); // 表格数据
  const [page, setPage] = useState(0); // 当前页
  const [pageSize, setPageSize] = useState(5); // 每页条数
  const [totalCount, setTotalCount] = useState(0); // 总数据量
  const [loading, setLoading] = useState(false); // 加载状态

  const isFirstRender = useRef(true);

  // 使用 useCallback 来稳定 loadData 的引用
  const loadData = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      try {
        const data = await fetchData(page, pageSize); // 传递查询参数
        setRows(data.rows); // 更新表格数据
        setTotalCount(data.totalCount); // 更新总数据量
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 不调用 loadData，防止初始化时触发多次 API 请求
    }
    loadData(page, pageSize); // 初始加载数据时传递查询参数
  }, [page, pageSize, loadData]); // 添加 queryParams 到依赖数组

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={{ page, pageSize }} // 使用 paginationModel 来设置分页
        onPaginationModelChange={(newPaginationModel) => {
          setPage(newPaginationModel.page);
          setPageSize(newPaginationModel.pageSize);
        }} // 监听分页变化，更新 page 和 pageSize
        rowCount={totalCount} // 数据总量
        paginationMode="server" // 使用服务器端分页模式
        pageSizeOptions={[5, 10, 15, 20]} // 分页选项
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading} // 加载状态
        getRowId={(row) => row[getRowIdKey]}
      />
    </Box>
  );
}
