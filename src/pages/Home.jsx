import React from "react";
import HomeHeader from "../components/HomeHeader";
import CanvasesList from "../components/CanvasesList";
import SigninSignup from "../components/SigninSignup";
import { Outlet } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

function Home() {
  return (
    <div className="">
      <HomeHeader />
      {/* <CanvasesList /> */}
      <Outlet />
      {/* <SigninSignup/> */}
    </div>
  );
}

export default Home;
