import { combineReducers } from "redux";

const fetchWeatherReducer = (state = [], action) => {
  //   console.log("fetchWeatherReducer");
  switch (action.type) {
    case "FETCH_CITIES_CODE":
    case "FETCH_WEATHER":
      return action.payload;
    default:
      return state;
  }
};
const fetchOneDayWeatherReducer = (state = [], action) => {
  //   console.log("fetchOneDayWeatherReducer");
  switch (action.type) {
    case "FETCH_ONE_DAY_WEATHER":
      const favoriteWeather = action.payload;
      return favoriteWeather;
    default:
      return state;
  }
};
const favoriteReducer = (state = [], action) => {
  //   console.log("favoriteReducer");
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  weather: fetchWeatherReducer,
  oneDayWeather: fetchOneDayWeatherReducer,
  favorite: favoriteReducer,
});
