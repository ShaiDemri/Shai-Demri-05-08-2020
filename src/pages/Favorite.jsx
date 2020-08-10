import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Typography } from "@material-ui/core";
import { fetchOneDayWeather as fetchFavoriteWeatherAction } from "../store/actions";
import FavoriteCard from "../components/FavoriteCard";

const Favorite = ({ favorite, favoriteWeather, fetchFavoriteWeather }) => {
  React.useEffect(() => {
    const favoriteCodes = favorite.map((f) => f.key);
    const fetchWeather = async () => {
      await fetchFavoriteWeather(favoriteCodes);
    };
    fetchWeather();
  }, []);

  return (
    <>
      <Typography>Your Favorite Locations</Typography>

      <FavoriteCard
        key={favorite.length}
        favoriteWeather={favoriteWeather}
        favorite={favorite}
      />
    </>
  );
};
Favorite.propTypes = {
  props: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    favoriteWeather: state.oneDayWeather,
    favorite: state.favorite,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFavoriteWeather: fetchFavoriteWeatherAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
