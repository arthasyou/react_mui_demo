import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { menu, MenuItem } from "@/hook/menu";
import { useTranslation } from "react-i18next";

const height = "35px";

// Helper functions
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

const convertMenuToPermissionData = (
  menu: MenuItem[],
  t: (key: string) => string
): TreeViewBaseItem[] => {
  return menu.map((item) => ({
    id: item.name,
    label: t(item.label),
    children: item.children
      ? convertMenuToPermissionData(item.children, t)
      : undefined,
  }));
};

const processParentSelection = (
  id: string,
  children: TreeViewBaseItem[],
  select: boolean,
  selectedSet: Set<string>
) => {
  const childIds = getAllChildIds(children);
  if (select) {
    selectedSet.add(id);
    childIds.forEach((childId) => {
      selectedSet.add(childId);
      const childNode = getCurrentNode(childId, children);
      if (childNode && isParent(childNode)) {
        processParentSelection(
          childId,
          childNode.children || [],
          true,
          selectedSet
        );
      }
    });
  } else {
    selectedSet.delete(id);
    childIds.forEach((childId) => {
      selectedSet.delete(childId);
      const childNode = getCurrentNode(childId, children);
      if (childNode && isParent(childNode)) {
        processParentSelection(
          childId,
          childNode.children || [],
          false,
          selectedSet
        );
      }
    });
  }
};

const processChildSelection = (
  id: string,
  select: boolean,
  selectedSet: Set<string>,
  permissionData: TreeViewBaseItem[]
) => {
  if (select) {
    selectedSet.add(id);
  } else {
    selectedSet.delete(id);
  }

  const parent = getParent(id, permissionData);
  if (!parent) return;

  const parentId = parent.id;
  const siblingIds = parent.children?.map((child) => child.id) || [];
  const shouldSelectParent = siblingIds.some((siblingId) =>
    selectedSet.has(siblingId)
  );

  if (shouldSelectParent) {
    selectedSet.add(parentId);
  } else {
    selectedSet.delete(parentId);
  }

  processChildSelection(
    parentId,
    shouldSelectParent,
    selectedSet,
    permissionData
  );
};

interface PermissionProps {
  onSubmit: (selectedIds: string[]) => void;
  initialSeleted?: string[];
}

export default function PermissionLib({
  onSubmit,
  initialSeleted = [],
}: PermissionProps) {
  const { t } = useTranslation();
  const permissionData = convertMenuToPermissionData(menu, t);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSeleted);
  const [groupName, setGroupName] = useState("");

  const handleSelectionChange = (
    _event: React.SyntheticEvent,
    newSelectedIds: string[]
  ) => {
    const currentClickedId =
      newSelectedIds.find((id) => !selectedIds.includes(id)) ||
      selectedIds.find((id) => !newSelectedIds.includes(id));
    if (!currentClickedId) return;

    const selectedSet = new Set<string>(selectedIds);
    const currentNode = getCurrentNode(currentClickedId, permissionData);
    if (!currentNode) return;

    const isParentFlag = isParent(currentNode);
    const isChildFlag = isChild(currentClickedId, permissionData);
    const select = !selectedIds.includes(currentClickedId);

    if (isParentFlag) {
      processParentSelection(
        currentClickedId,
        currentNode.children || [],
        select,
        selectedSet
      );
    }

    if (isChildFlag || !(isParentFlag && isChildFlag)) {
      processChildSelection(
        currentClickedId,
        select,
        selectedSet,
        permissionData
      );
    }

    setSelectedIds(Array.from(selectedSet));
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleButtonClick = () => {
    onSubmit(selectedIds);
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
