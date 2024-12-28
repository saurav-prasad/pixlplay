import React from "react";
import Canvas from "./pages/Canvas";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import CanvasesList from "./components/CanvasesList";
import Error from "./pages/Error";

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
          path: "/",
        },
        {
          path: "/canvases",
          element: (
            <>
              <CanvasesList />
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
