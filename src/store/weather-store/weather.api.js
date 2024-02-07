import RestApi from '../../services/rest-api.service';
import axios from 'axios';

export class WeatherApi extends RestApi {
  apiKey = 'f22d6958bfb3d4fa57a9acad154dce06';
  constructor() {
    super('https://api.openweathermap.org/data/2.5/forecast');
  }

  getWeatherData(lat, lon) {
    return this.get(`?lon=${lon}&lat=${lat}&appid=${this.apiKey}`);
  }

  getCityGeocoding(city) {
    return axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`
    );
  }
}
