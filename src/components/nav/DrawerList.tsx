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

interface DrawerListItem {
  text: string;
  icon: React.ReactNode;
  url: string;
  children?: DrawerListItem[];
}

interface DrawerListProps {
  items: DrawerListItem[];
  open: boolean;
}

const DrawerList: React.FC<DrawerListProps> = ({ items, open }) => {
  const [openChildren, setOpenChildren] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 用于记录选中的菜单项
  const [selectedIndex, setSelectedIndex] = useState<string>("");

  // 获取主题
  const theme = useTheme();

  const handleClick = (index: string) => {
    setOpenChildren((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navigate = useNavigate();

  const handleItemClick = (
    index: string,
    url?: string,
    children?: DrawerListItem[]
  ) => {
    if (children) {
      // 如果有子菜单，则不进行跳转
      return;
    }

    // 更新选中的菜单项
    setSelectedIndex(index);

    if (url) {
      navigate(url); // 如果没有子菜单且有url，则跳转到对应的url
    }
  };

  const renderList = (
    items: DrawerListItem[],
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
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  pl: open ? level * 4 + 2 : 2, // 当Drawer打开时有缩进，关闭时左侧保持2px的间距
                  // 高亮选中项，使用 theme.palette.primary.main
                  backgroundColor: isSelected
                    ? theme.palette.action.selected
                    : "transparent",
                  // color: theme.palette.primary.main,
                  color: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
                onClick={() => {
                  if (item.children) {
                    handleClick(itemIndex); // 点击展开/收起子菜单
                  } else {
                    handleItemClick(itemIndex, item.url, item.children); // 点击跳转
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
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {item.children &&
                  (openChildren[itemIndex] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Collapse 区域：控制子项的展开和折叠 */}
              {item.children && openChildren[itemIndex] && (
                <Collapse
                  in={openChildren[itemIndex]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderList(item.children, itemIndex, level + 1)}{" "}
                    {/* 递归渲染子项并传递层级 */}
                  </List>
                </Collapse>
              )}
            </ListItem>
          );
        })}
      </List>
    );
  };

  return renderList(items);
};

export default DrawerList;
