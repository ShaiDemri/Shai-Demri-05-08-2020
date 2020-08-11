import { combineReducers } from "redux";

const fetchLocationCodeReducer = (state = [], action) => {
  //   console.log("fetchLocationCodeReducer");
  switch (action.type) {
    case "FETCH_CITIES_CODE":
      return action.payload;
    default:
      return state;
  }
};

const fetchWeatherReducer = (state = [], action) => {
  //   console.log("fetchWeatherReducer");
  switch (action.type) {
    case "FETCH_WEATHER":
      return action.payload;
    default:
      return state;
  }
};

const parseResponse = (response) => {
  return {
    DailyForecasts: response.DailyForecasts.map((dayForcast) => {
      return {
        Date: dayForcast.Date,
        Unit: dayForcast.Temperature.Minimum.Unit,
        Temperature: {
          Minimum: dayForcast.Temperature.Minimum.Value,
          Maximum: dayForcast.Temperature.Maximum.Value,
        },
        Day: {
          Icon: dayForcast.Day.Icon,
          IconPhrase: dayForcast.Day.IconPhrase,
          HasPrecipitation: dayForcast.Day.HasPrecipitation,
        },
        Night: {
          Icon: dayForcast.Night.Icon,
          IconPhrase: dayForcast.Night.IconPhrase,
          HasPrecipitation: dayForcast.Night.HasPrecipitation,
        },
      };
    }),
  };
};

const fetchOneDayWeatherReducer = (state = {}, action) => {
  //   console.log("fetchOneDayWeatherReducer");
  switch (action.type) {
    case "FETCH_ONE_DAY_WEATHER":
      const favoriteWeather = parseResponse(action.payload.response);
      const newWeather = { ...state };
      newWeather[action.payload.locationCode] =
        favoriteWeather.DailyForecasts[0];
      return newWeather;
    default:
      return state;
  }
};
const favoriteReducer = (state = [], action) => {
  //   console.log("favoriteReducer", state);
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const newFavorite = [...state];

      const index = state.findIndex((fav) => fav.key === action.payload.key);
      if (index === -1) {
        // we don't have it yet, add it
        newFavorite.push(action.payload);
      } else {
        //we have it, remove it
        newFavorite.splice(index, 1);
      }
      return newFavorite;
    default:
      return state;
  }
};

export default combineReducers({
  locationsCode: fetchLocationCodeReducer,
  weather: fetchWeatherReducer,
  oneDayWeather: fetchOneDayWeatherReducer,
  favorite: favoriteReducer,
});
