import React from "react";
import {
  CardMedia,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";
import getDayOfTheWeek from "../utils/getDayOfTheWeek";
import getIconById from "../utils/getIconById";
import { CelsiusToFahrenheit } from "../utils/convertTempUnits";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    marginBottom: theme.spacing(2),
  },
}));

const FavoriteCard = ({ favoriteWeather, favorite }) => {
  const classes = useStyles();
  const [partOfDay, setPartOfDay] = React.useState("Day");
  const [temperatureFahrenheit, setTemperatureFahrenheit] = React.useState(
    false
  );

  const onChangePartOfDay = () => {
    return setPartOfDay((p) => {
      return p === "Day" ? "Night" : "Day";
    });
  };
  const onChangeTempratureUnit = (tempInCelsius) => {
    return temperatureFahrenheit
      ? CelsiusToFahrenheit(tempInCelsius)
      : tempInCelsius;
  };

  return (
    <>
      <Grid
        className={classes.container}
        container
        direction="row"
        spacing={3}
        justify="center"
        alignItems="center"
      >
        <Button
          size="small"
          onClick={() => setTemperatureFahrenheit((b) => !b)}
        >
          Change To {temperatureFahrenheit ? "Celsius" : "Fahrenheit"}
        </Button>

        <Button size="small" onClick={() => onChangePartOfDay()}>
          View {partOfDay === "Day" ? "Night" : "Day"}
        </Button>
      </Grid>
      <Grid
        className={classes.container}
        container
        direction="row"
        spacing={3}
        justify="space-around"
        alignItems="center"
      >
        {favorite.map((fav) => {
          const weather = favoriteWeather[fav.key];
          const title = fav.name;
          if (isEmpty(weather)) return <h1 key={fav.key}>loading...</h1>;
          return (
            <Grid key={fav.key} item xs={"auto"}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography className={classes.pos}>
                    {`The Temperature will range`} <br />
                    {`from ${onChangeTempratureUnit(
                      weather.Temperature.Minimum
                    )}${
                      temperatureFahrenheit ? "F" : "C"
                    } to ${onChangeTempratureUnit(
                      weather.Temperature.Maximum
                    )}${temperatureFahrenheit ? "F" : "C"}`}
                  </Typography>
                  <Typography variant="body2" component="p">
                    The {partOfDay} will be {weather[partOfDay].IconPhrase}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={getIconById(weather[partOfDay].Icon)}
                  title={weather[partOfDay].IconPhrase}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default FavoriteCard;
