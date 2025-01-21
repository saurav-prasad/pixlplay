import Hero from "../components/Hero";
import HomeHeader from "../components/HomeHeader";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  return (
    <div className="">
      <HomeHeader />
      {location.pathname === "/" ? <Hero /> : <Outlet />}
    </div>
  );
}

export default Home;
