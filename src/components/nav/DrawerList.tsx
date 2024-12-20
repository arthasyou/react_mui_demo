import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { MenuItem } from "./Menu";

interface DrawerListProps {
  items: MenuItem[]; // 菜单项列表
  open: boolean; // Drawer 是否打开
}

const DrawerList: React.FC<DrawerListProps> = ({ items, open }) => {
  const [openChildren, setOpenChildren] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedIndex, setSelectedIndex] = useState<string>("");

  // 获取主题
  const theme = useTheme();
  const navigate = useNavigate();

  // 处理子菜单展开/收起
  const handleClick = (index: string) => {
    setOpenChildren((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 处理菜单项点击
  const handleItemClick = (
    index: string,
    url?: string,
    children?: MenuItem[]
  ) => {
    if (children) {
      return;
    }
    setSelectedIndex(index);
    if (url) {
      navigate(url); // 跳转到对应的 url
    }
  };

  // 递归渲染菜单
  const renderList = (
    items: MenuItem[],
    parentIndex: string = "",
    level: number = 0
  ) => {
    return (
      <List>
        {items.map((item, index) => {
          const itemIndex = `${parentIndex}-${index}`;
          // 判断当前项是否为选中项
          const isSelected = selectedIndex === itemIndex;

          return (
            <ListItem key={itemIndex} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 20,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  pl: open ? level * 3 + 2 : 2,
                  backgroundColor: isSelected
                    ? theme.palette.action.selected
                    : "transparent",
                  color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
                onClick={() => {
                  if (item.children) {
                    handleClick(itemIndex); // 展开/收起子菜单
                  } else {
                    handleItemClick(itemIndex, item.url, item.children); // 跳转
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {item.children &&
                  (openChildren[itemIndex] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {item.children && openChildren[itemIndex] && (
                <Collapse
                  in={openChildren[itemIndex]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderList(item.children, itemIndex, level + 1)}
                  </List>
                </Collapse>
              )}
            </ListItem>
          );
        })}
      </List>
    );
  };

  return renderList(items); // 渲染过滤后的菜单项
};

export default DrawerList;
