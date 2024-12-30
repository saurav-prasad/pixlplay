import React from "react";
import Canvas from "./pages/Canvas";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import CanvasesList from "./components/CanvasesList";
import AllCanvases from "./pages/AllCanvases";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
      children: [
        {
          path: "/canvases",
          element: (
            <>
              <AllCanvases/>
            </>
          ),
        },
        {
          path: "/signin",
          element: (
            <>
              <Auth />
            </>
          ),
        },
        {
          path: "/signup",
          element: (
            <>
              <Auth />
            </>
          ),
        },
        {
          path: "/profile",
          element: (
            <>
              <Auth />
            </>
          ),
        },
      ],
    },
    {
      path: "/canvas",
      element: (
        <>
          <Canvas />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Error />
        </>
      ),
    },
  ]);
  return (
    <div className="App relative min-h-screen">
      <RouterProvider router={router} />
      {/* <Canvas /> */}
      {/* <Home /> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
