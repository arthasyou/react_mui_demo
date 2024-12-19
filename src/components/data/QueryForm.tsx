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

type QueryValueType = string | number | boolean | null | undefined;

// 定义 QueryFormProps 类型
interface QueryFormProps {
  onSearch: (queryParams: QueryParamsType) => void; // 查询触发函数，传递查询参数
  children: React.ReactNode; // 用于自定义输入内容的组件，可以是 TextField、Select 等
  searchButtonText?: string; // 自定义查询按钮文本
  resetButtonText?: string; // 自定义重置按钮文本
  onReset?: () => void; // 自定义重置事件
}

const QueryForm: React.FC<QueryFormProps> = ({
  onSearch,
  children,
  searchButtonText = "查询", // 默认查询按钮文本
  resetButtonText = "重置", // 默认重置按钮文本
  onReset, // 重置事件
}) => {
  // 维护内部查询参数状态
  const [internalParams, setInternalParams] = useState<QueryParamsType>({});

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
              onChange: (e: any) =>
                handleChange(child.props.name, e.target.value), // 将内部 onChange 传递给子组件
              value: internalParams[child.props.name] || "", // 控制每个组件的值
            })}
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
      >
        {/* 查询和重置按钮 */}
        <Button variant="contained" color="primary" onClick={handleSearch}>
          {searchButtonText}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          {resetButtonText}
        </Button>
      </Box>
    </Box>
  );
};

// 自定义查询组件示例（例如：TextField、Select 等）
const QueryTextField = ({ label, value, onChange, name }: any) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      variant="outlined"
      fullWidth
    />
  );
};

const QuerySelect = ({ label, value, onChange, name, options, width }: any) => {
  return (
    <FormControl fullWidth sx={{ width: width || "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange} name={name}>
        {options.map((option: string, idx: number) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { QueryForm, QueryTextField, QuerySelect };
