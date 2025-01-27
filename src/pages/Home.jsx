import Hero from "../components/Hero";
import HomeHeader from "../components/HomeHeader";
import { Link, Outlet, useLocation } from "react-router-dom";
import Blob from "../components/blob/Blob";
import { useSelector } from "react-redux";
import { ArrowBigRightDash } from "lucide-react";
import Portfolio from "../assets/icons/coder.png";

function Home() {
  const location = useLocation();
  return (
    <div className="">
      <HomeHeader />
      {!(location.pathname === "/livecanvas") &&
        !(location.pathname === "/canvas") && <Blob />}
      {location.pathname === "/" && (
        <div className="absolute bottom-[25%] flex justify-center items-center w-full">
          <div className="z-10">
            <HeroButton />
          </div>
        </div>
      )}
      {/* <HeroButton /> */}
      {location.pathname === "/" ? <Hero /> : <Outlet />}
      {location.pathname === "/" && <HeroFooter />}
    </div>
  );
}

export default Home;

function HeroButton() {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div className="flex justify-center items-center gap-x-6">
      <Link
        className="group inline-flex items-center justify-center heroButton"
        variant="solid"
        color="slate"
        to={user ? "/canvases" : "/signin"}
      >
        {user ? "Unleash Your Creativity" : "Get Started for Free!"}
        <ArrowBigRightDash className="ml-1 group-hover:translate-x-[3px] transition-all" />
      </Link>
    </div>
  );
}

function HeroFooter() {
  return (
    <footer className="absolute z-10 bottom-0 px-2 left-0 right-0 flex flex-col items-center border-t border-slate-400/10 py-4 sm:flex-row-reverse sm:justify-between bg-[#00000078] backdrop-blur-[100px] shadow-lg">
      <div className="flex gap-x-6">
        <Link
          target="__blank"
          to="https://sauravprasad.vercel.app/"
          className="group"
          aria-label="TaxPal on X"
        >
          <img
            className="h-6 w-6 object-contain contrast-[0.1] group-hover:contrast-[0.5] transition-all"
            src={Portfolio}
            alt=""
          />
        </Link>
        <Link
          target="__blank"
          to="https://www.linkedin.com/in/saurav-prasadd/"
          className="group"
          aria-label="TaxPal on X"
        >
          <svg
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700 transition-all"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z" />
          </svg>
        </Link>
        <Link
          to="https://github.com/saurav-prasad"
          target="__blank"
          className="group"
          aria-label="TaxPal on GitHub"
        >
          <svg
            className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700 transition-all"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"></path>
          </svg>
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-500 sm:mt-0">
        Copyright © 2025 Saurav Prasad. All rights reserved.
      </p>
    </footer>
  );
}
