import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { permissionData } from "./permissionData";
import { Button, FormControl, TextField, Typography } from "@mui/material";

const height = "35px";

const getAllChildIds = (items: TreeViewBaseItem[]): string[] => {
  return items.flatMap((child) => [
    child.id,
    ...getAllChildIds(child.children || []), // 递归处理子项
  ]);
};

const getParentId = (id: string, items: TreeViewBaseItem[]): string | null => {
  for (const item of items) {
    if (item.children?.some((child) => child.id === id)) return item.id;
    const parentId = getParentId(id, item.children || []);
    if (parentId) return parentId;
  }
  return null;
};

const getParent = (
  id: string,
  items: TreeViewBaseItem[]
): TreeViewBaseItem | null => {
  for (const item of items) {
    if (item.children?.some((child) => child.id === id)) {
      return item; // 返回父节点对象
    }
    const parent = getParent(id, item.children || []);
    if (parent) return parent; // 递归查找父节点
  }
  return null; // 如果找不到父节点，返回null
};

const getCurrentNode = (
  id: string,
  items: TreeViewBaseItem[]
): TreeViewBaseItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = getCurrentNode(id, item.children);
      if (found) return found;
    }
  }
  return null;
};

const isParent = (item: TreeViewBaseItem) => {
  return Array.isArray(item.children) && item.children.length > 0;
};

const isChild = (id: string, items: TreeViewBaseItem[]) => {
  return getParentId(id, items) !== null;
};

interface PermissionProps {
  onSubmit: () => void;
  initialSeleted?: string[];
}

export default function PermissionLib({
  onSubmit,
  initialSeleted = [],
}: PermissionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSeleted);

  const handleSelectionChange = (
    _event: React.SyntheticEvent,
    newSelectedIds: string[]
  ) => {
    // 1. 函数定义部分
    const currentClickedId =
      newSelectedIds.find((id) => !selectedIds.includes(id)) ||
      selectedIds.find((id) => !newSelectedIds.includes(id));
    if (!currentClickedId) return;

    const selectedSet = new Set<string>(selectedIds);

    const processParentSelection = (
      id: string,
      children: TreeViewBaseItem[],
      select: boolean
    ) => {
      const childIds = getAllChildIds(children);
      if (select) {
        selectedSet.add(id);
        childIds.forEach((childId) => {
          selectedSet.add(childId);
          const childNode = getCurrentNode(childId, children);
          if (childNode && isParent(childNode)) {
            const subChildren = childNode.children || [];
            processParentSelection(childId, subChildren, true); // 递归处理子节点
          }
        });
      } else {
        selectedSet.delete(id);
        childIds.forEach((childId) => {
          selectedSet.delete(childId);
          const childNode = getCurrentNode(childId, children);
          if (childNode && isParent(childNode)) {
            const subChildren = childNode.children || [];
            processParentSelection(childId, subChildren, false); // 递归处理子节点
          }
        });
      }
    };

    const processChildSelection = (id: string, select: boolean) => {
      if (select) {
        selectedSet.add(id);
      } else {
        selectedSet.delete(id);
      }

      const parent = getParent(id, permissionData);
      if (!parent) return;

      const parentId = parent.id;

      if (parentId) {
        const siblingIds = parent?.children?.map((child) => child.id) || [];
        // 如果有任何一个子节点被选中，则选中父节点
        const shouldSelectParent = siblingIds.some((siblingId) =>
          selectedSet.has(siblingId)
        );

        if (shouldSelectParent) {
          selectedSet.add(parentId); // 任何子节点被选中时，选中父节点
        } else {
          selectedSet.delete(parentId); // 如果所有子节点都没有选中，则取消父节点选中
        }

        if (select) {
          processChildSelection(parentId, true); // 递归处理上级节点
        }

        if (!shouldSelectParent) {
          processChildSelection(parentId, false);
        }
      }
    };

    // 2. 函数调用部分
    // 判断并处理当前选项的角色

    const currentNode = getCurrentNode(currentClickedId, permissionData);

    if (!currentNode) return;

    if (isParent(currentNode)) {
      const select = !selectedIds.includes(currentClickedId);
      // 确保传入 processParentSelection 的第二个参数是一个数组
      const children = currentNode.children || [];
      processParentSelection(currentClickedId, children, select);
    }

    if (isChild(currentClickedId, permissionData)) {
      const select = !selectedIds.includes(currentClickedId);
      processChildSelection(currentClickedId, select);
    }

    // 最终更新状态
    setSelectedIds(Array.from(selectedSet));
  };

  const [groupName, setGroupName] = React.useState("");
  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("selected:", JSON.stringify(selectedIds, null, 2));
    onSubmit();
  };

  return (
    <Box sx={{ p: 3, minHeight: 352, minWidth: 290 }}>
      <Typography>权限管理</Typography>
      <Box sx={{ mt: 2, mb: 5, gap: 2, display: "flex", alignItems: "center" }}>
        <FormControl sx={{ height }}>
          <TextField
            label="Group Name"
            variant="standard"
            value={groupName}
            onChange={handleGroupChange}
          />
        </FormControl>
        <FormControl sx={{ height }}>
          <Button
            variant="contained"
            sx={{ mt: 2, ml: 1 }}
            onClick={handleButtonClick}
            size="small"
          >
            Submit
          </Button>
        </FormControl>
      </Box>
      <RichTreeView
        multiSelect
        checkboxSelection
        items={permissionData}
        selectedItems={selectedIds}
        onSelectedItemsChange={handleSelectionChange}
      />
    </Box>
  );
}
