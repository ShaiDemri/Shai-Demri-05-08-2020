import React from "react";
import {
  TextField,
  Grid,
  IconButton,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@material-ui/icons/";
import Button from "../components/AnimatedButton";
import WeatehrCard from "../components/WeatherCard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchWeather as fetchWeatherAction,
  fetchLocationCode as fetchLocationCodeAction,
  toggleLocationToFavorite as toggleLocationToFavoriteAction,
} from "../store/actions";
import LocationsDropdown from "../components/LocationsDropdown";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(5),
  },
}));
const Weather = ({
  weather,
  locationKey,
  locationsCode,
  fetchWeather,
  fetchLocationCode,
  toggleLocationToFavorite,
}) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("Tel Aviv");
  const [toggleFavorite, setToggleFavorite] = React.useState(false);
  const anchorRef = React.useRef(null);

  const onSearchClick = React.useCallback(() => {
    setToggleFavorite(false);
    fetchLocationCode(searchTerm);
  }, [fetchLocationCode, searchTerm]);

  const onFavoriteClick = () => {
    setToggleFavorite((f) => !f);
    toggleLocationToFavorite({ key: locationKey, name: searchTerm });
  };

  React.useEffect(() => {
    onSearchClick();
  }, []);
  return (
    <Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid xs={8} item className={classes.container}>
          <TextField
            ref={anchorRef}
            id="city-search-field"
            placeholder="Enter a city to see the upcoming days weather!"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid xs={2} item className={classes.container}>
          <Button onClick={() => onSearchClick()}>Search</Button>
          <Tooltip
            title={toggleFavorite ? "Remove From Favorite" : "Add To Favorite"}
          >
            <IconButton
              color="secondary"
              aria-label="favorite"
              onClick={() => onFavoriteClick()}
            >
              {toggleFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <LocationsDropdown
        anchorRef={anchorRef}
        locations={locationsCode}
        fetchWeather={fetchWeather}
      />
      <WeatehrCard weather={weather} />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    locationsCode: state.locationsCode,
    weather: state.weather.DailyForecasts,
    locationKey: state.weather.Key,
    favorite: state.favorite,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchLocationCode: fetchLocationCodeAction,
      toggleLocationToFavorite: toggleLocationToFavoriteAction,
      fetchWeather: fetchWeatherAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

Weather.propTypes = {
  props: PropTypes.any,
};
