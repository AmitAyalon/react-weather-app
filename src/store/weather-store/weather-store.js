import { makeAutoObservable } from 'mobx';
import { WeatherApi } from './weather.api';

class WeatherStore {
  weatherApi;
  unitsMode = 'metric';

  weatherData;
  selectedCity;
  selectedCityGeocoding = {
    lat: 0,
    lon: 0,
  };

  isLoading;
  error;

  constructor() {
    makeAutoObservable(this);
    this.weatherApi = new WeatherApi();
  }

  async getWeatherData() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await this.weatherApi.getWeatherData(
        this.selectedCityGeocoding.lat,
        this.selectedCityGeocoding.lon
      );
      this.weatherData = res.data;
    } catch (err) {
      console.log(err);
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  }

  async getCityGeocoding(city) {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await this.weatherApi.getCityGeocoding(city);
      this.selectedCityGeocoding.lat = res.data[0].lat;
      this.selectedCityGeocoding.lon = res.data[0].lon;
    } catch (err) {
      console.log(err);
      this.error = err;
    } finally {
      this.isLoading = false;
    }
  }

  setSelectedCity(city) {
    this.selectedCity = city;
  }

  clearData() {
    this.weatherData = null;
  }
}

export default WeatherStore;
