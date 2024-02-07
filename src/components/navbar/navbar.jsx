import './navbar.scss'
import { observer } from 'mobx-react-lite';
import rootStore from '../../store/root-store';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../../constants/pathConstants';

const Navbar = observer(() => {
  const { weatherStore } = rootStore;
  const navigate = useNavigate();

  const handleCityChange = (e) => {
    weatherStore.setSelectedCity(e.target.value);
  };

  const handleWeatherSearch = async () => {
    await weatherStore.getCityGeocoding(weatherStore.selectedCity);
    await weatherStore.getWeatherData();
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleWeatherSearch();
    }
  };


  return (
    <nav id='navigation'>
      <ul>
        {/* iterate the PathConstans */}
        {Object.keys(PathConstants).map((key, index) => (
          <li key={index}>
            <button className='nav-item' onClick={() => navigate(PathConstants[key])}>
              {key}
            </button>
          </li>
        ))}
      </ul>
      <div id='search-box'>
      <input type="text" value={weatherStore.selectedCity} onChange={handleCityChange} onKeyDown={handleEnterPress} />
      <button onClick={handleWeatherSearch} >Search</button>
      </div>
    </nav>
  );
});

export default Navbar;
