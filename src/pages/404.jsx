import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core/";

import PageNotFoundImage from "../assets/page-404.png";
import ButtonLink from "../components/AnimatedLinkButton";
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
    textDecoration: "none",
  },
}));
const PageNotFound = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" justify="flex-end" alignItems="center">
        <ButtonLink
          className={classes.btn}
          linkTo="/"
          buttonText={"Go Back Home"}
        />
      </Grid>
    </Paper>
  );
};
export default PageNotFound;
