/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { QueryParamsType } from "@/hook/useQeuryParams";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const HEIGHT = "35px";

type QueryValueType = string | number | boolean | null | undefined;

// 定义 QueryFormProps 类型
interface QueryFormProps {
  onSearch: (queryParams: QueryParamsType) => void;
  children: React.ReactNode;
  searchButtonText?: string;
  resetButtonText?: string;
  onReset?: () => void;
  queryParams?: QueryParamsType;
}

const QueryForm: React.FC<QueryFormProps> = ({
  onSearch,
  children,
  searchButtonText = "查询",
  resetButtonText = "重置",
  onReset,
  queryParams = {},
}) => {
  // 维护内部查询参数状态
  const [internalParams, setInternalParams] =
    useState<QueryParamsType>(queryParams);

  // 查询表单的提交函数
  const handleSearch = () => {
    onSearch(internalParams); // 将内部参数传递给父组件的 onSearch 函数
  };

  // 重置表单
  const handleReset = () => {
    setInternalParams({}); // 重置内部查询参数
    if (onReset) onReset(); // 如果有自定义重置事件，则触发它
  };

  // 处理每个查询组件的 onChange
  const handleChange = (name: string, value: QueryValueType) => {
    setInternalParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: 2, marginBottom: 2 }}>
      <Grid container spacing={2}>
        {/* 渲染传入的自定义查询组件 */}
        {React.Children.map(children, (child: any) => (
          <Grid columnSpacing={{ xs: 12, sm: 6, md: 3 }}>
            {React.cloneElement(child, {
              onChange: (e: any) => {
                handleChange(child.props.name, e.target.value);
              },
              value: internalParams[child.props.name] || "", // 控制每个组件的值
            })}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
        {/* 查询和重置按钮 */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          size="small"
        >
          {searchButtonText}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          size="small"
        >
          {resetButtonText}
        </Button>
      </Box>
    </Box>
  );
};

// 自定义查询组件示例（例如：TextField、Select 等）是否需要
const QueryTextField = ({
  label,
  value,
  onChange,
  name,
  width,
  height = HEIGHT,
}: any) => {
  return (
    <FormControl fullWidth sx={{ width: width || "100%", height }}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        variant="outlined"
        fullWidth
        sx={{ height, "& .MuiInputBase-root": { height } }} // 统一控制高度
      />
    </FormControl>
  );
};

const QuerySelect = ({
  label,
  value,
  onChange,
  name,
  options,
  width,
  height = HEIGHT,
}: any) => {
  return (
    <FormControl fullWidth sx={{ width: width || "100%", height }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        sx={{ height, "& .MuiSelect-select": { height } }} // 统一控制高度
      >
        {options.map((option: string, idx: number) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const QueryDateTime = ({
  label,
  value,
  onChange,
  name,
  height = HEIGHT,
}: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        name={name}
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          console.log(newValue);
          onChange({ target: { value: newValue?.valueOf() } });
        }}
        sx={{ height, "& .MuiInputBase-root": { height } }} // 统一控制高度
      />
    </LocalizationProvider>
  );
};

export { QueryForm, QueryTextField, QuerySelect, QueryDateTime };
