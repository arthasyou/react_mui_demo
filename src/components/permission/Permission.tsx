import * as React from "react";
import Popover from "@mui/material/Popover";
import PermissionLib from "./PermissionLib";

interface PermissionProps {
  triggerButton: React.ReactNode; // 外部传入的触发按钮（带样式和内容）
  initialSeleted: string[];
}

const Permission: React.FC<PermissionProps> = ({
  triggerButton,
  initialSeleted,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        <PermissionLib onSubmit={handleClose} initialSeleted={initialSeleted} />
      </Popover>
    </div>
  );
};

export default Permission;
