import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core/";
import { Link } from "react-router-dom";

import PageNotFoundImage from "../assets/page-404.png";
import Button from "../components/AnimatedButton";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "95vh",
    background: `url(${PageNotFoundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",

    "& > *": {
      margin: theme.spacing(10),
    },
  },
  btn: {
    background: "linear-gradient(45deg, #f39121 30%, #ceb91fc2 90%)",
  },
}));
const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" justify="flex-end" alignItems="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button className={classes.btn}>Go Back Home</Button>
        </Link>
      </Grid>
    </Paper>
  );
};
export default PageNotFound;
