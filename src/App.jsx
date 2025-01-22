import React, { lazy, Suspense, useEffect } from "react";
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
import LiveCanvas from "./pages/LiveCanvas";
import socket from "./socket/socket";
import { removeOnlineUser, setOnlineUsers } from "./app/features/onlineUsers";
import { setInviteNoi } from "./app/features/inviteNoti";
import { setAlert } from "./app/features/alert";
import { removeCollab, setAllCollab } from "./app/features/allCollaborators";
import Layout from "./pages/Layout";
import { setCanvasAdmin } from "./app/features/canvasAdmin";
import AllLiveCanvases from "./pages/AllLiveCanvases";
import removeAuthToken from "./utils/removeAuthToken";
import removeStoredCanvasBg from "./utils/removeStoredCanvasBg";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  // auth-token based login
  useEffect(() => {
    async function fetchData() {
      try {
        // if auth token is present in localstorage
        const token = getAuthToken();
        if (token) {
          const result = await authRoute.get("/fetchuser", {
            headers: { "auth-token": token },
          });
          const authData = result.data.data;

          socket.emit("check-if-logged-in", authData.id);
          socket.on("if-logged-in", async ({ success, message }) => {
            if (success) {
              removeAuthToken();
              removeStoredCanvasBg();
            } else {
              dispatch(login(authData));
              const canvasData = await getAllCanvases();
              dispatch(setAllCanvases(canvasData));
            }
          });
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
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/canvases",
              element: <AllCanvases />,
            },
            {
              path: "/livecanvases",
              element: <AllLiveCanvases />,
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
      ],
    },
  ]);

  // socket listeners
  useEffect(() => {
    if (user) {
      try {
        // socket.connect();
        socket.emit("online", {
          userId: user.id,
          username: user.username,
          profilePhoto: user.profilePhoto,
        });
        socket.on("get-online-users", (data) => {
          dispatch(setOnlineUsers(data));
        });
        socket.on("disconnected-user", (userId) => {
          dispatch(removeOnlineUser(userId));
        });
        socket.on("receive-invitation", (data) => {
          dispatch(setInviteNoi(data));
        });
        socket.on("error", ({ message }) => {
          dispatch(setAlert({ type: "danger", text: message }));
        });
        socket.on("invitation-accepted", ({ message }) => {
          dispatch(setAlert({ text: message }));
        });
        socket.on("collaborator-joined", (data) => {
          dispatch(setAllCollab(data));
        });
        socket.on("collaborator-leaved", (data) => {
          dispatch(removeCollab(data));
        });
        socket.on("get-admin-of-canvases", (data) => {
          dispatch(setCanvasAdmin(data));
        });
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      socket.off("get-online-users");
      socket.off("disconnected-user");
      socket.off("receive-invitation");
      socket.off("error");
      socket.off("invitation-accepted");
      socket.off("collaborator-joined");
      socket.off("collaborator-leaved");
    };
  }, [user]);

  return (
    <div className="App relative min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
