import React, { useEffect } from "react";
import Canvas from "./pages/Canvas";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error";
import AllCanvases from "./pages/AllCanvases";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authRoute } from "./axios/axios";
import { login } from "./app/features/auth";
import getAuthToken from "./utils/getAuthToken";
import getAllCanvases from "./utils/getAllCanvases";
import { setAllCanvases } from "./app/features/allCanvases";
import Alert from "./components/Alert";
import LiveCanvas from "./pages/LiveCanvas";
import socket from "./socket/socket";
import { removeOnlineUser, setOnlineUsers } from "./app/features/onlineUsers";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    async function fetchData() {
      try {
        // if auth token is present in localstorage
        const token = getAuthToken();
        if (token) {
          const result = await authRoute.get("/fetchuser", {
            headers: { "auth-token": token },
          });
          dispatch(login(result.data.data));
          const canvasData = await getAllCanvases();
          dispatch(setAllCanvases(canvasData));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/canvases",
          element: <AllCanvases />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/signin",
          element: <Auth />,
        },
        {
          path: "/signup",
          element: <Auth />,
        },
      ],
    },
    {
      path: "/canvas/:id",
      element: <Canvas />,
    },
    {
      path: "/livecanvas/:id",
      element: <LiveCanvas />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  useEffect(() => {
    if (user) {
      try {
        socket.connect();
        socket.emit("online", {
          userId: user.id,
          username: user.username,
          profilePhoto: user.profilePhoto,
        });
        socket.on("get-online-users", (data) => {
          dispatch(setOnlineUsers(data));
        });
        socket.on("disconnected-user", (userId) => {
          console.log(userId);
          dispatch(removeOnlineUser(userId));
        });
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      socket.off("online");
      socket.off("get-online-users");
      socket.off("disconnected-user");
    };
  }, [user]);

  return (
    <div className="App relative min-h-screen">
      <RouterProvider router={router} />
      <Alert />
    </div>
  );
}

export default App;
