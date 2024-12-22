import { Box, Toolbar, Button } from "@mui/material";

function CustomToolbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box></Box>

        {/* 右侧按钮 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse", // 从右到左排列
            gap: 1, // 按钮之间的间距
          }}
        >
          <Button
            color="primary"
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
          >
            弹窗
          </Button>
          <Button color="secondary" variant="outlined" size="small">
            按钮2
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default CustomToolbar;
