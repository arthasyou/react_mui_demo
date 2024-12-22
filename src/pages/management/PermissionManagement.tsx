// import { useState } from "react";

import { Box, CssBaseline, Typography } from "@mui/material";
import DataTable from "@/components/data/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import { getGameRecord } from "@/api/gameRecordApi";
import { useTranslation } from "react-i18next";
import Permission from "@/components/permission/Permission";
import { rowsWithSn } from "@/utils/tableUtils";
import { useCallback, useState } from "react";
import {
  EditIconButton,
  DeleteIconButton,
} from "@/components/common/iconButton";
import Toolbar from "@/components/common/Toolbar";

// 主页组件
const PermissionManagement = () => {
  const { t } = useTranslation();

  // 动态更新的数据获取函数
  const fetchData = useCallback(async (page: number, pageSize: number) => {
    const payload = {
      skip: page * pageSize, // 计算分页的偏移量
      limit: pageSize, // 每页条数
    };

    const response = await getGameRecord(payload);
    const newRows = rowsWithSn(response.records);
    return {
      rows: newRows, // 返回数据记录
      totalCount: response.total, // 返回总记录数
    };
  }, []);

  const [initialIds, setInitialIds] = useState<string[]>([]);

  const handleCustomAction = (id: number) => {
    // console.log("Custom Action", id);
    if (id == 10279) {
      setInitialIds([]);
    } else {
      setInitialIds([]);
    }
  };

  const handleSubmit = async (data: string[]) => {
    console.log("submit: ", data);
  };

  const handelDelete = async (id: number) => {
    console.log("delete: ", id);
  };

  // 示例数据的列定义
  const columns: GridColDef[] = [
    { field: "sn", headerName: t("sn"), width: 200 },
    { field: "tid", headerName: t("id"), width: 200 },
    { field: "name", headerName: t("name"), width: 200 },
    {
      field: "action",
      headerName: t("action"),
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: 3 }}>
            {/* <Button variant="contained">新增权限</Button> */}
            <Permission
              triggerButton={
                <EditIconButton
                  onClick={() => handleCustomAction(params.row.tid)}
                />
              }
              initialSeleted={initialIds}
              onSubmit={handleSubmit}
            ></Permission>
            <DeleteIconButton onClick={() => handelDelete(params.row.tid)} />
          </Box>
        );
      },
    },
  ];

  // onClick={() => handelDelete(params.row.tid)}

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CssBaseline />
      <Typography variant="h5">{t("menu.permission_management")}</Typography>
      <Toolbar></Toolbar>

      <Box sx={{ width: "100%", height: "100%" }}>
        <DataTable
          columns={columns}
          fetchData={fetchData} // 将 fetchGameRecords 传递给 DataTable
          getRowIdKey="tid"
        />
      </Box>
    </Box>
  );
};

export default PermissionManagement;
