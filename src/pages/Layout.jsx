import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const InviteNotification = lazy(() =>
  import("../components/InviteNotification")
);
const Alert = lazy(() => import("../components/Alert"));

function Layout() {
  return (
    <div>
      <Outlet />
      <Suspense>
        <Alert />
      </Suspense>
      <Suspense>
        <InviteNotification />
      </Suspense>
    </div>
  );
}

export default Layout;
