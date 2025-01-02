import React from "react";

function ProfileInfo() {
  return (
    <form className='max-w-xl mx-auto pt-8 px-3 bg-red-700'>
        <div className="flex flex-col space-y-8">
        <img
          className="h-24 w-24 rounded-full border p-1 border-y-purple-600 border-x-violet-500 object-cover"
          src={
            "https://firebasestorage.googleapis.com/v0/b/sociol-f6a41.appspot.com/o/profilePhoto%2F2021-Joker-Whatsapp-Dp-Images-download-1.jpg465ce86e-249b-4439-b5a9-ae69ad8486dc?alt=media&token=7d39067d-2193-45e2-831b-6d1188c5d710"
          }
          alt="dp"
        />
      </div>
      {/* username */}
      <div className="">
        <label
          htmlFor="username"
          className="block text-base font-medium leading-6 text-gray-900 mb-3"
        >
          Username<span className="text-red-600">*</span>
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              pixlplay.vercel.app/
            </span>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="username"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileInfo;
