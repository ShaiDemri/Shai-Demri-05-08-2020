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

const defaultWeather = [
  {
    Date: "2020-08-09T07:00:00+03:00",
    Unit: "C",
    Temperature: {
      Minimum: 25.6,
      Maximum: 30.2,
    },
    Day: {
      Icon: 2,
      IconPhrase: "Mostly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: "Partly cloudy",
      HasPrecipitation: false,
    },
  },
  {
    Date: "2020-08-10T07:00:00+03:00",
    Unit: "C",
    Temperature: {
      Minimum: 24.9,
      Maximum: 30.7,
    },
    Day: {
      Icon: 3,
      IconPhrase: "Partly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: "Partly cloudy",
      HasPrecipitation: false,
    },
  },
  {
    Date: "2020-08-11T07:00:00+03:00",
    Unit: "C",
    Temperature: {
      Minimum: 26.1,
      Maximum: 31,
    },
    Day: {
      Icon: 3,
      IconPhrase: "Partly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: "Partly cloudy",
      HasPrecipitation: false,
    },
  },
  {
    Date: "2020-08-12T07:00:00+03:00",
    Unit: "C",
    Temperature: {
      Minimum: 25.3,
      Maximum: 30.7,
    },
    Day: {
      Icon: 3,
      IconPhrase: "Partly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 34,
      IconPhrase: "Mostly clear",
      HasPrecipitation: false,
    },
  },
  {
    Date: "2020-08-13T07:00:00+03:00",
    Unit: "C",
    Temperature: {
      Minimum: 25.6,
      Maximum: 31.4,
    },
    Day: {
      Icon: 2,
      IconPhrase: "Mostly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: "Partly cloudy",
      HasPrecipitation: false,
    },
  },
];
const WeatherCard = ({ weather = defaultWeather }) => {
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
        {weather.map((dayForcast) => {
          const title = getDayOfTheWeek(dayForcast.Date);
          return (
            <Grid key={dayForcast.Date} item xs={"auto"}>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography className={classes.pos}>
                    {`The Temperature will range`} <br />
                    {`from ${onChangeTempratureUnit(
                      dayForcast.Temperature.Minimum
                    )}${
                      temperatureFahrenheit ? "F" : "C"
                    } to ${onChangeTempratureUnit(
                      dayForcast.Temperature.Maximum
                    )}${temperatureFahrenheit ? "F" : "C"}`}
                  </Typography>
                  <Typography variant="body2" component="p">
                    The {partOfDay} will be {dayForcast[partOfDay].IconPhrase}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={getIconById(dayForcast[partOfDay].Icon)}
                  title={dayForcast[partOfDay].IconPhrase}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
WeatherCard.propTypes = {
  weather: PropTypes.array,
};
export default WeatherCard;
