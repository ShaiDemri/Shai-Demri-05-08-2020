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
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  Grade as StarIcon,
  Menu as MenuIcon,
  AcUnit as SnowIcon,
} from "@material-ui/icons/";
import AnimatedLinkButton from "../components/AnimatedLinkButton";

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
  link: {
    textDecoration: "none",
    color: "yellow",
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
          <ListItemText
            primary={
              <Link className={classes.link} to="/Shai-Demri-05-08-2020">
                Weather
              </Link>
            }
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <StarIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Link
                className={classes.link}
                to="/Shai-Demri-05-08-2020/favorite"
              >
                Favorite
              </Link>
            }
          />
        </ListItem>
      </List>
    </div>
  );
  const anchor = "left";
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          justify="flex-end"
          direction="row"
          spacing={2}
          alignItems="center"
        >
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

          <Grid item>
            <AnimatedLinkButton
              className={classes.link}
              linkTo="/Shai-Demri-05-08-2020/favorite"
              buttonText={"Favorite"}
            />
          </Grid>
          <Grid item>
            <AnimatedLinkButton
              className={classes.link}
              linkTo="/Shai-Demri-05-08-2020/"
              buttonText={"Weather"}
            />
          </Grid>

          <Grid item>
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
