import React from "react";
import Canvas from "./pages/Canvas";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
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
      path: "/signin" ,
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
