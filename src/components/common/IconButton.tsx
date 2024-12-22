import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ButtonExample() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <Button
      variant="text"
      color="primary"
      startIcon={<DeleteIcon />} // 图标位于左侧
      onClick={handleClick}
    >
      Delete
    </Button>
  );
}
