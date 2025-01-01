import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader";
const ProfileInfo = lazy(() => import("../components/ProfileInfo"));
function Profile() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ProfileInfo />
      </Suspense>
    </div>
  );
}

export default Profile;
