import React from "react";
import HomeHeader from "../components/HomeHeader";
import CanvasesList from "../components/CanvasesList";
import SigninSignup from "../components/SigninSignup";

function Home() {
  return (
    <div className="">
      <HomeHeader />
      {/* <CanvasesList /> */}
      <SigninSignup/>
    </div>
  );
}

export default Home;
