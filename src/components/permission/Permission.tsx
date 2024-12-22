import * as React from "react";
import Popover from "@mui/material/Popover";
import PermissionLib from "./PermissionLib";

interface PermissionProps {
  triggerButton: React.ReactNode; // 外部传入的触发按钮（带样式和内容）
  initialSeleted: string[];
  onSubmit: (data: string[]) => void; // 添加 onClose 回调函数
}

const Permission: React.FC<PermissionProps> = ({
  triggerButton,
  initialSeleted,
  onSubmit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = (data: string[]) => {
    onSubmit(data);
    setAnchorEl(null);
  };

  const handleClose = () => {
    console.log("permission-popover closed");
  };

  const open = Boolean(anchorEl);
  const id = open ? "permission-popover" : undefined;

  return (
    <div>
      {/* 外部定义的按钮 */}
      <div onClick={handleClick}>{triggerButton}</div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <PermissionLib
          onSubmit={handleSubmit}
          initialSeleted={initialSeleted}
        />
      </Popover>
    </div>
  );
};

export default Permission;
