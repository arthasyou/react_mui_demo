/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Popover from "@mui/material/Popover";
import PermissionLib from "./PermissionLib";

interface PermissionProps {
  triggerButton: React.ReactElement; // 外部传入的触发按钮（带样式和内容）
}

const Permission: React.FC<PermissionProps> = ({ triggerButton }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "permission-popover" : undefined;

  return (
    <div>
      {React.cloneElement(triggerButton as React.ReactElement<any>, {
        onClick: handleClick,
        "aria-describedby": id, // 可选属性，增加无障碍支持
      })}
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
        <PermissionLib onSubmit={handleClose} />
      </Popover>
    </div>
  );
};

export default Permission;
