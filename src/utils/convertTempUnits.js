const CelsiusToFahrenheit = (temp) => {
  const tempInFahrenheit = (temp * 9) / 5 + 32;
  return tempInFahrenheit.toFixed(2);
};
const FahrenheitToCelsius = (temp) => {
  const tempInCelsius = ((temp - 32) * 5) / 9;
  return tempInCelsius.toFixed(2);
};

export { CelsiusToFahrenheit, FahrenheitToCelsius };
