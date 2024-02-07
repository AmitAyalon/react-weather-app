import './layout.scss';
import Navbar from "../navbar/navbar";
import { Outlet } from 'react-router-dom';

const Layout = () => {

  return (
    <div className="layout">
      <Navbar />
      <div className="background-container">
        <h1>React Weather App</h1>
      </div>
      <Outlet />
    </div>
  )
};

export default Layout;