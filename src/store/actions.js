import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
const fetchLocationCodeURL = (locationName) =>
  `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${locationName}`;
const fetchWeatherURL = (locationCode) =>
  `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationCode}?apikey=${API_KEY}&metric=true`;
const fetchOneDayWeatherURL = (locationCode) =>
  `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationCode}?apikey=${API_KEY}&metric=true`;

export const fetchLocationCode = (locationName) => async (dispatch) => {
  if (!locationName) {
    return dispatch({
      type: "FETCH_CITIES_CODE",
      payload: [],
    });
  }
  try {
    const url = fetchLocationCodeURL(locationName);
    const response = await axios.get(url);
    if (response.data.length > 1) {
      const parsedRes = response.data.map((city) => {
        return {
          key: city.Key,
          name: city.LocalizedName,
          country:
            city.AdministrativeArea.LocalizedName +
            "," +
            city.Country.LocalizedName,
        };
      });
      return dispatch({
        type: "FETCH_CITIES_CODE",
        payload: parsedRes,
      });
    } else {
      return dispatch(fetchWeather(response.data[0].Key));
    }
  } catch (err) {
    console.log("Got an error!", JSON.stringify(err));
  }
};
export const fetchWeather = (locationCode) => async (dispatch) => {
  try {
    const url = fetchWeatherURL(locationCode);
    const response = await axios.get(url);
    const parsedResponse = {
      DailyForecasts: response.data.DailyForecasts.map((dayForcast) => {
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
    return dispatch({
      type: "FETCH_WEATHER",
      payload: {
        Key: locationCode,
        DailyForecasts: parsedResponse.DailyForecasts,
      },
    });
  } catch (err) {
    console.log("Got an error!", JSON.stringify(err));
  }
};
export const fetchOneDayWeather = (locationCodes) => (dispatch) => {
  try {
    locationCodes.forEach(async (locationCode) => {
      const url = fetchOneDayWeatherURL(locationCode);
      const response = await axios.get(url);
      return dispatch({
        type: "FETCH_ONE_DAY_WEATHER",
        payload: { response: response.data, locationCode },
      });
    });
  } catch (err) {
    console.log("Got an error!", JSON.stringify(err));
  }
};
export const toggleLocationToFavorite = (favoriteItem) => (dispatch) => {
  return dispatch({
    type: "TOGGLE_FAVORITE",
    payload: favoriteItem,
  });
};
