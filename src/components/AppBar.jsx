import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  FormControlLabel,
  Switch,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  Grade as StarIcon,
  Menu as MenuIcon,
  AcUnit as SnowIcon,
} from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const TopBar = ({ colorScheme, setColorScheme }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    console.log(anchor, open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleChange = () => {
    setColorScheme(() => {
      return colorScheme === "dark" ? "light" : "dark";
    });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <SnowIcon />
          </ListItemIcon>
          <ListItemText primary={"Weather"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={"Favorite"} />
        </ListItem>
      </List>
    </div>
  );
  const anchor = "left";
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(anchor, true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
        <Typography variant="h6" className={classes.title}>
          Forecast Displayer
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={colorScheme === "dark"}
              onChange={handleChange}
              name="darkMode"
            />
          }
          label="Dark Mode"
        />
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
