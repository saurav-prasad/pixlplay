import React, { lazy, Suspense } from "react";
import Loader from "../components/Loader";
const ProfileInfo = lazy(() => import("../components/ProfileInfo"));
function Profile() {
  return (
    <div className="pt-24 sm:mx-0 mx-2">
      <h1 className="text-center text-4xl font-bold text-[#3d3850] mb-6 select-none">
        Your Profile
      </h1>
      <Suspense fallback={<Loader />}>
        <ProfileInfo />
      </Suspense>
    </div>
  );
}

export default Profile;
