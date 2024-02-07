import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import rootStore from "../../store/root-store";

const HomePage = observer(() => {
  const { weatherStore } = rootStore;
  const [data, setData] = React.useState(null);

  useEffect(() => {
    if (weatherStore.weatherData) {
      setData(weatherStore.weatherData);
    }
    console.log(weatherStore.weatherData);
  }, [weatherStore.weatherData]);

  return (
    <div id='home-page'>
      {data ? (
        <div>
          <h2>Weather in {data.city.name}, {data.city.country}</h2>
          {data.list.map((item, index) => (
            <div key={index}>
              <p>Date and Time: {item.dt_txt}</p>
              <p>Temperature: {item.main.temp}K</p>
              <p>Feels Like: {item.main.feels_like}K</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Weather: {item.weather[0].description}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
});

export default HomePage;