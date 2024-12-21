import { TreeViewBaseItem } from "@mui/x-tree-view/models/items";

export const permissionData: TreeViewBaseItem[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      {
        id: "grid-pro",
        label: "@mui/x-data-grid-pro",
        children: [
          { id: "3", label: "3" },
          { id: "4", label: "4" },
        ],
      },
      {
        id: "grid-premium",
        label: "@mui/x-data-grid-premium",
        children: [
          { id: "1", label: "1" },
          {
            id: "2",
            label: "2",
            children: [
              { id: "5", label: "5" },
              { id: "6", label: "6" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];
