import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { DrawerHeader } from "../Header";
import DrawerList from "./DrawerList";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Role } from "@/hook/permission";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const items = [
  {
    text: "Inbox",
    icon: <InboxIcon />,
    url: "/",
    permission: ["root", "admin", "user"] as Role[],
    children: [
      {
        text: "Starred",
        icon: <MailIcon />,
        url: "/about",
        permission: ["root", "user"] as Role[],
      },
      {
        text: "Drafts",
        icon: <MailIcon />,
        url: "/about",
        permission: ["root", "admin"] as Role[],
        children: [
          {
            text: "Archived",
            icon: <MailIcon />,
            url: "/about",
            permission: ["root"] as Role[],
          },
        ],
      },
    ],
  },
  {
    text: "Sent mail",
    icon: <MailIcon />,
    url: "/",
    permission: ["root"] as Role[],
  },
];

export default function Navbar({
  open,
  handleDrawerClose,
  currentRole,
}: {
  open: boolean;
  handleDrawerClose: () => void;
  currentRole: Role;
}) {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerList items={items} open={open} currentRole={currentRole} />
    </Drawer>
  );
}
