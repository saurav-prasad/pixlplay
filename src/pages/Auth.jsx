import React from "react";
import AuthHeader from "../components/AuthHeader";
import SigninSignup from "../components/SigninSignup";
import HomeHeader from "../components/HomeHeader";

function Auth() {
  return (
    <div>
      <HomeHeader />
      <SigninSignup />
    </div>
  );
}

export default Auth;
