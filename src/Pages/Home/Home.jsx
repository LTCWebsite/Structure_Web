import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import { Button, Grid, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { USER_KEY } from "../../Constants/index";
import logo2 from "../../Image/VIP-logo.svg";
import book from "../../Image/VIP_Inhouse.pdf";

import {
  IconCate,
  IconMenuDown,
  IconMenuUp,
  IconPackage,
  IconReport,
  Icondashborad,
  IconGroup,
  Iconmanage,
  IconSetting,
  IconExit,
  IconManual,
} from "../Icon/Icon";
import Auth from "../../Components/Auth/Auth";
import Profile from "../Profile/Profile";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeReport from "../Report/HomeReport";
import HomeRole from "../UserSetting/HomeRole";
import Dashboard1 from "../Dashboard/Dashboard1";
import Promotions from "../Promotions/Promotions";
import Grouppromotion from "../Promotions/Grouppromotion";
import Reportpromotion from "../Report/Reportpromotion";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledMenuItem = styled({
  root: {
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
})(MenuItem);

export default function PersistentDrawerLeft() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;

  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const [openSub, setOpenSub] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openBtn = Boolean(anchorEl);
  const userClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const userClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setOpenSub(!openSub);
    // console.log(openSub);
    history.push("/home/report");
  };

  const { pathname } = useLocation();
  // console.log(pathname);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" className="home_drawer_appbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon className="home_drawer_button" />
          </IconButton>

          <Stack
            className="home_drawer_userIcon"
            direction="row"
            sx={{ marginLeft: "auto" }}
          >
            <Avatar
              alt="User"
              src="/static/images/avatar/1.jpg"
              sx={{
                background: "#F14D58",
                width: "34px",
                height: "34px",
                fontSize: "16px",
              }}
            />
          </Stack>

          <Typography>
            <Button
              className="home_drawer_userBtn"
              sx={{ color: "#2d3436" }}
              id="basic-button"
              aria-controls={openBtn ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openBtn ? "true" : undefined}
              onClick={userClick}
            >
              <span className="user-text">{userName}</span>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openBtn}
              onClose={userClose}
              sx={{
                fontFamily: "Noto Sans Lao",
              }}
              elevation={1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem
                onClick={userClose}
                sx={{
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
                }}
                className="menu-setting"
              >
                <span style={{ marginRight: "1rem" }}>
                  <IconSetting />
                </span>
                <p>ຕັ້ງຄ່າ</p>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.logout(() => {
                    history.push("/");
                  });
                }}
                className="menu-setting"
                sx={{
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
                }}
              >
                <span style={{ marginRight: "1rem" }}>
                  <IconExit />
                </span>
                <p>ອອກຈາກລະບົບ</p>
              </MenuItem>
            </Menu>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="home_drawer_tabmenu">
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5em",
              marginBottom: "2em",
            }}
          >
            <Grid xs={8}>
              <u className="H-promotion">Promotion Control</u>
              {/* <img src={logo2} width="170" /> */}
            </Grid>
            <Grid
              xs={4}
              style={{
                position: "relative",
                marginLeft: "0.5em",
                marginRight: "1.5em",
              }}
            >
              <div style={{ position: "absolute", top: "-25%" }}>
                <IconButton
                  className="home_drawer_back"
                  onClick={handleDrawerClose}
                >
                  <ChevronLeftIcon
                    style={{ color: "#fff", fontSize: "1.3em" }}
                  />
                </IconButton>
              </div>
            </Grid>
          </Grid>

          <Grid>
            <Grid xs={12}>
              <List>
                <ListItemButton
                  className={
                    pathname === "/home"
                      ? "home_drawer_menu menu-active"
                      : "home_drawer_menu"
                  }
                  onClick={() => history.push("/home")}
                >
                  <ListItemIcon style={{ minWidth: "30px" }}>
                    <span style={{ paddingBottom: ".2rem" }}>
                      <>
                        <Icondashborad />
                      </>
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    className="home_drawer_menuText"
                    primary="ການຄວບຄຸມໂປຣໂມເຊີ້ນ"
                  />
                </ListItemButton>
              </List>

              <List>
                <ListItemButton
                  className={
                    pathname === "/home/promotion"
                      ? "home_drawer_menu menu-active"
                      : "home_drawer_menu"
                  }
                  onClick={() => history.push("/home/promotion")}
                >
                  <ListItemIcon style={{ minWidth: "30px" }}>
                    <span style={{ paddingBottom: ".2rem" }}>
                      <Iconmanage />
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    className="home_drawer_menuText"
                    primary="ໂປຣໂມເຊີ້ນ"
                  />
                </ListItemButton>
              </List>

              <List>
                <ListItemButton
                  className={
                    pathname === "/home/promotions/grouppromotion"
                      ? "home_drawer_menu menu-active"
                      : "home_drawer_menu"
                  }
                  onClick={() =>
                    history.push("/home/promotions/grouppromotion")
                  }
                >
                  <ListItemIcon style={{ minWidth: "30px" }}>
                    <span style={{ paddingBottom: ".2rem" }}>
                      <IconCate />
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    className="home_drawer_menuText"
                    primary="ປະເພດໂປຣໂມເຊີ້ນ"
                  />
                </ListItemButton>
              </List>

              {/* <List>
                <ListItemButton
                  className={
                    pathname === "/home/package"
                      ? "home_drawer_menu menu-active"
                      : "home_drawer_menu"
                  }
                  onClick={() => history.push("/home/package")}
                >
                  <ListItemIcon style={{ minWidth: "30px" }}>
                    <span style={{ paddingBottom: ".2rem" }}>
                      <IconPackage />
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    className="home_drawer_menuText"
                    primary="ແພັກເກັດ"
                  />
                </ListItemButton>
              </List> */}

              <List>
                <ListItemButton
                  className={
                    pathname === "/home/report"
                      ? "home_drawer_menu menu-active"
                      : "home_drawer_menu"
                  }
                  onClick={() => history.push("/home/report")}
                >
                  <ListItemIcon style={{ minWidth: "30px" }}>
                    <span style={{ paddingBottom: ".2rem" }}>
                      <IconReport />
                    </span>
                  </ListItemIcon>
                  <ListItemText
                    className="home_drawer_menuText"
                    primary="ການລາຍງານ"
                  />
                </ListItemButton>
              </List>

              <List>
                <a className="openbook" href={book} target="_blank">
                  <ListItemButton>
                    <ListItemIcon style={{ minWidth: "30px" }}>
                      <span>
                        <IconManual />
                      </span>
                    </ListItemIcon>
                    <ListItemText
                      className="home_drawer_menuText"
                      primary="ຄູ່ມື"
                    />
                  </ListItemButton>
                </a>
              </List>
            </Grid>
          </Grid>
          <Grid xs={12} style={{ marginTop: "4rem" }}>
            <List>
              <ListItemButton
                className={
                  pathname === "/home/report"
                    ? "home_drawer_menu menu-active"
                    : "home_drawer_menu"
                }
                onClick={() => {
                  Auth.logout(() => {
                    history.push("/");
                  });
                }}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <span style={{ paddingTop: ".1rem" }}>
                    <IconExit />
                  </span>
                </ListItemIcon>
                <ListItemText
                  className="home_drawer_menuText"
                  primary="ອອກຈາກລະບົບ"
                />
              </ListItemButton>
            </List>
          </Grid>

          {/* <List>
            <ListItemButton
              className={
                pathname === "/home/report"
                  ? "home_drawer_menu menu-active"
                  : "home_drawer_menu"
              }
              onClick={handleClick}
            >
              <ListItemIcon style={{ minWidth: "30px" }}>
                <IconReport />
              </ListItemIcon>
              <ListItemText
                className="home_drawer_menuText"
                primary="ການລາຍງານ"
              />
              {openSub ? <IconMenuDown /> : <IconMenuUp />}
            </ListItemButton>
            <Collapse in={openSub} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemText
                    className="home_drawer_menuText"
                    sx={{ fontFamily: "Noto Sans Lao" }}
                    primary="ແພັກເກັດໃກ້ໝົດອາຍຸ"
                  />
                </ListItemButton>
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemText
                    className="home_drawer_menuText"
                    sx={{ fontFamily: "Noto Sans Lao" }}
                    primary="ແພັກເກັດໝົດອາຍຸ"
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List> */}

          {/* <List>
            <ListItemButton
              className={
                pathname === "/home/setting"
                  ? "home_drawer_menu menu-active"
                  : "home_drawer_menu"
              }
              onClick={() => history.push("/home/setting")}
            >
              <ListItemIcon style={{ minWidth: "30px" }}>
                <span style={{ paddingBottom: ".2rem" }}>
                  <IconGroup />
                </span>
              </ListItemIcon>
              <ListItemText
                className="home_drawer_menuText"
                primary="ຈັດການຜູ້ໃຊ້"
              />
            </ListItemButton>
          </List> */}
        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Switch>
            <Route path={"/home/"} component={Dashboard1} exact />
            <Route path={"/home/promotion"} component={Promotions} exact />
            <Route
              path={"/home/promotions/grouppromotion"}
              component={Grouppromotion}
            />
            {/* <Route path={"/home/category"} component={CategoryPage} exact />
            <Route path={"/home/category/group"} component={GroupPage} /> */}
            {/* <Route path={"/home/package"} component={PackagePage} exact /> */}
            <Route path={"/home/profile"} component={Profile} exact />
            <Route path={"/home/report"} component={Reportpromotion} exact />
            <Route path={"/home/setting"} component={HomeRole} exact />
            {/* <Route path={"/home/manual"} component={HomeRole} exact /> */}
          </Switch>
        </Typography>
      </Main>
    </Box>
  );
}
